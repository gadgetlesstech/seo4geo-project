import fetch from 'node-fetch';

const BASE_URL = 'https://api.dataforseo.com/v3';

function getAuthHeader() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) throw new Error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be set');
  return 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');
}

export async function dataForSEORequest(endpoint, payload) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DataForSEO ${res.status}: ${text}`);
  }

  const json = await res.json();

  const taskStatusCode = json.tasks?.[0]?.status_code;
  const taskStatusMessage = json.tasks?.[0]?.status_message;
  if (taskStatusCode !== 20000) {
    throw new Error(`DataForSEO task error: ${taskStatusMessage}`);
  }

  return json;
}
