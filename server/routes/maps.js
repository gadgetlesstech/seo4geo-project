import { Router } from 'express';
import axios from 'axios';
import { dataForSEORequest } from '../services/dataforseo.js';

const router = Router();

export async function getLocalPackCompetitors(keyword, city) {
  const payload = [
    {
      keyword: `${keyword} ${city}`,
      location_name: 'United States',
      language_name: 'English',
      depth: 10,
    },
  ];

  const data = await dataForSEORequest('/serp/google/maps/live/advanced', payload);
  const items = data.tasks?.[0]?.result?.[0]?.items ?? [];

  return items
    .filter((item) => item.type === 'maps_search')
    .slice(0, 3)
    .map((place) => ({
      title: place.title,
      domain: place.domain?.replace(/^www\./, '') ?? '',
      rating: place.rating?.value ?? null,
      reviews: place.rating?.votes_count ?? null,
      address: place.address,
      url: place.url,
    }));
}

router.post('/local-pack', async (req, res) => {
  const { keyword, city } = req.body;
  if (!keyword || !city) {
    return res.status(400).json({ error: 'keyword and city are required' });
  }

  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    return res.status(500).json({ error: 'DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be set' });
  }

  try {
    const payload = [
      {
        keyword: `${keyword} ${city}`,
        location_name: 'United States',
        language_name: 'English',
        depth: 10,
      },
    ];

    const response = await axios.post(
      'https://api.dataforseo.com/v3/serp/google/maps/live/advanced',
      payload,
      {
        auth: { username: login, password },
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const taskStatusCode = response.data.tasks?.[0]?.status_code;
    const taskStatusMessage = response.data.tasks?.[0]?.status_message;
    if (taskStatusCode !== 20000) {
      return res.status(502).json({ error: `DataForSEO task error: ${taskStatusMessage}` });
    }

    const items = response.data.tasks?.[0]?.result?.[0]?.items ?? [];
    const competitors = items
      .filter((item) => item.type === 'maps_search')
      .slice(0, 3)
      .map((place) => ({
        name: place.title ?? null,
        address: place.address ?? null,
        phone: place.phone ?? null,
        website: place.domain ? `https://${place.domain.replace(/^www\./, '')}` : (place.url ?? null),
        rating: place.rating?.value ?? null,
        reviews: place.rating?.votes_count ?? null,
      }));

    res.json({ keyword, city, competitors });
  } catch (err) {
    const message = err.response?.data ?? err.message;
    res.status(502).json({ error: message });
  }
});

router.get('/', async (req, res) => {
  const { keyword, city } = req.query;
  if (!keyword || !city) {
    return res.status(400).json({ error: 'keyword and city are required' });
  }
  try {
    const competitors = await getLocalPackCompetitors(keyword, city);
    res.json({ competitors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
