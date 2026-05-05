import fetch from 'node-fetch';

export async function sendLeadToN8n(data) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) throw new Error('N8N_WEBHOOK_URL must be set');

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`n8n webhook ${res.status}: ${text}`);
  }

  return res.json().catch(() => ({ ok: true }));
}
