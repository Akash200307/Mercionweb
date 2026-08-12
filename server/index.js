import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { createAuthRouter } from './auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = Number(process.env.PORT) || 3001;

const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const JWT_SECRET = process.env.JWT_SECRET || KEY_SECRET || 'mercion-dev-jwt-secret';

// Payments require Razorpay credentials. When they are absent we keep the
// server running (auth and the rest of the site stay available) and only the
// payment endpoints report that they are not configured. This avoids taking
// the whole app down over a missing/optional payment key on first deploy.
const paymentsEnabled = Boolean(KEY_ID && KEY_SECRET);
const razorpay = paymentsEnabled
  ? new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })
  : null;

if (!paymentsEnabled) {
  console.warn(
    'RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET not set — payment endpoints are disabled. ' +
      'Set them to enable checkout; auth and the site work without them.'
  );
}

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', createAuthRouter(express, { jwtSecret: JWT_SECRET }));
/**
 * POST /api/create-order
 * Body: { amount: number (paise), currency?: string, receipt?: string, notes?: object }
 */
app.post('/api/create-order', async (req, res) => {
  if (!paymentsEnabled) {
    return res.status(503).json({ error: 'Payments are not configured on the server.' });
  }
  try {
    const amount = Number(req.body?.amount);
    const currency = (req.body?.currency || 'INR').toUpperCase();
    const receipt = req.body?.receipt || `rcpt_${Date.now()}`;
    const notes = req.body?.notes && typeof req.body.notes === 'object' ? req.body.notes : undefined;

    if (!Number.isFinite(amount) || amount < 100) {
      return res.status(400).json({
        error: 'Invalid amount. Minimum is 100 paise (₹1).',
      });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency,
      receipt: String(receipt).slice(0, 40),
      notes,
    });

    return res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    const status = err?.statusCode || err?.status || 500;
    const description = err?.error?.description || err?.message || 'Failed to create order';

    if (status === 401 || status === 403) {
      return res.status(401).json({ error: 'Razorpay authentication failed', details: description });
    }

    console.error('create-order error:', description);
    return res.status(500).json({ error: 'Failed to create Razorpay order', details: description });
  }
});

/**
 * POST /api/verify-payment
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */
app.post('/api/verify-payment', (req, res) => {
  if (!paymentsEnabled) {
    return res.status(503).json({ success: false, error: 'Payments are not configured on the server.' });
  }
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      error: 'Missing razorpay_order_id, razorpay_payment_id, or razorpay_signature',
    });
  }

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto.createHmac('sha256', KEY_SECRET).update(payload).digest('hex');

  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(String(razorpay_signature), 'utf8');

  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(400).json({
      success: false,
      error: 'Payment signature verification failed',
    });
  }

  return res.json({
    success: true,
    order_id: razorpay_order_id,
    payment_id: razorpay_payment_id,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
