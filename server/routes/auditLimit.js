import express from 'express';

const router = express.Router();

const WHITELIST = new Set([
  'gadgetlesstech@gmail.com',
  'kevin@gadgetlesstech.com',
  'support@gadgetlesstech.com',
]);

const LIMIT = 2;
const usage = new Map(); // email -> count

router.post('/check', (req, res) => {
  const email = (req.body.email || '').toLowerCase().trim();
  if (!email) return res.status(400).json({ allowed: false, message: 'Email required' });

  if (WHITELIST.has(email)) {
    return res.json({ allowed: true, remaining: null });
  }

  const count = usage.get(email) || 0;
  if (count >= LIMIT) {
    return res.json({ allowed: false, remaining: 0 });
  }

  usage.set(email, count + 1);
  res.json({ allowed: true, remaining: LIMIT - count - 1 });
});

export default router;
