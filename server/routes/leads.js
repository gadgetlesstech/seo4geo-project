import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, website, source } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, website, source }),
      });
    } catch (_) {}
  }

  res.json({ ok: true });
});

export default router;
