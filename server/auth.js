import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

function ensureStore() {
  const dir = path.dirname(USERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]', 'utf8');
}

function readUsers() {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeUsers(users) {
  ensureStore();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export function createAuthRouter(express, { jwtSecret }) {
  const router = express.Router();

  router.get('/providers', (_req, res) => {
    res.json({
      providers: [
        { id: 'email', name: 'Email & Password', status: 'active' },
        { id: 'google', name: 'Google', status: 'coming_soon' },
        { id: 'github', name: 'GitHub', status: 'coming_soon' },
        { id: 'whmcs', name: 'WHMCS Client Area', status: 'planned' },
      ],
    });
  });

  router.post('/register', async (req, res) => {
    try {
      const name = String(req.body?.name || '').trim();
      const email = String(req.body?.email || '').trim().toLowerCase();
      const password = String(req.body?.password || '');

      if (!name || name.length < 2) {
        return res.status(400).json({ error: 'Name must be at least 2 characters' });
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Valid email is required' });
      }
      if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
      }

      const users = readUsers();
      if (users.some((u) => u.email === email)) {
        return res.status(409).json({ error: 'An account with this email already exists' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = {
        id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        name,
        email,
        passwordHash,
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      writeUsers(users);

      const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' });
      return res.status(201).json({ token, user: publicUser(user) });
    } catch (err) {
      console.error('register error:', err.message);
      return res.status(500).json({ error: 'Registration failed' });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const email = String(req.body?.email || '').trim().toLowerCase();
      const password = String(req.body?.password || '');

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const users = readUsers();
      const user = users.find((u) => u.email === email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' });
      return res.json({ token, user: publicUser(user) });
    } catch (err) {
      console.error('login error:', err.message);
      return res.status(500).json({ error: 'Login failed' });
    }
  });

  router.get('/me', (req, res) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const payload = jwt.verify(token, jwtSecret);
      const users = readUsers();
      const user = users.find((u) => u.id === payload.sub);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });
      return res.json({ user: publicUser(user) });
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  });

  return router;
}
