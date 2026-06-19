import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, website, source } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('[leads] N8N_WEBHOOK_URL not set — skipping webhook');
    return res.json({ ok: true });
  }

  try {
    const r = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, website, source }),
    });
    if (!r.ok) {
      const text = await r.text().catch(() => '');
      console.error(`[leads] n8n webhook returned ${r.status}: ${text}`);
    } else {
      console.log(`[leads] webhook ok for ${email} (${source})`);
    }
  } catch (err) {
    console.error('[leads] webhook fetch failed:', err.message);
  }

  res.json({ ok: true });
});

export default router;
