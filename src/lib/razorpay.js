const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

function apiUrl(path) {
  return `${API_BASE}${path}`;
}

export function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Razorpay requires a browser'));
      return;
    }
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const existing = document.querySelector('script[data-razorpay-checkout]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Razorpay));
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay checkout')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.dataset.razorpayCheckout = 'true';
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error('Failed to load Razorpay checkout'));
    document.body.appendChild(script);
  });
}

/**
 * Create order → open Standard Checkout → verify signature on success.
 * @param {{ amountPaise: number, planName?: string, billingCycle?: string, customer?: { name?: string, email?: string, contact?: string } }} opts
 */
export async function startRazorpayCheckout({
  amountPaise,
  planName = 'Mercion Hosting',
  billingCycle = 'monthly',
  customer = {},
} = {}) {
  const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
  if (!key) {
    throw new Error('Missing VITE_RAZORPAY_KEY_ID');
  }

  if (!Number.isFinite(amountPaise) || amountPaise < 100) {
    throw new Error('Invalid amount. Minimum is ₹1.');
  }

  const orderRes = await fetch(apiUrl('/api/create-order'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: Math.round(amountPaise),
      currency: 'INR',
      receipt: `plan_${Date.now()}`,
      notes: { plan: planName, billingCycle },
    }),
  });

  const orderData = await orderRes.json().catch(() => ({}));
  if (!orderRes.ok) {
    throw new Error(orderData.error || orderData.details || 'Could not create payment order');
  }

  const RazorpayCtor = await loadRazorpayScript();

  return new Promise((resolve, reject) => {
    const rzp = new RazorpayCtor({
      key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Mercion',
      description: `${planName} (${billingCycle})`,
      order_id: orderData.order_id,
      prefill: {
        name: customer.name || '',
        email: customer.email || '',
        contact: customer.contact || '',
      },
      theme: { color: '#E60000' },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment cancelled'));
        },
      },
      handler: async (response) => {
        try {
          const verifyRes = await fetch(apiUrl('/api/verify-payment'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json().catch(() => ({}));
          if (!verifyRes.ok || !verifyData.success) {
            reject(new Error(verifyData.error || 'Payment verification failed'));
            return;
          }
          resolve({
            ...verifyData,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
          });
        } catch (err) {
          reject(err instanceof Error ? err : new Error('Verification request failed'));
        }
      },
    });

    rzp.on('payment.failed', (event) => {
      const desc = event?.error?.description || event?.error?.reason || 'Payment failed';
      reject(new Error(desc));
    });

    rzp.open();
  });
}
