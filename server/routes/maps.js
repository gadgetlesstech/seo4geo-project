import { Router } from 'express';
import { dataForSEORequest } from '../services/dataforseo.js';

const router = Router();

export async function getLocalPackCompetitors(keyword, city) {
  const payload = [
    {
      keyword: `${keyword} ${city}`,
      location_name: city,
      language_name: 'English',
      depth: 10,
    },
  ];

  const data = await dataForSEORequest('/serp/google/maps/live/advanced', payload);
  const items = data.tasks?.[0]?.result?.[0]?.items ?? [];

  const localPack = items
    .filter((item) => item.type === 'maps_search')
    .flatMap((item) => item.items ?? [])
    .slice(0, 3)
    .map((place) => ({
      title: place.title,
      domain: place.domain?.replace(/^www\./, '') ?? '',
      rating: place.rating?.value ?? null,
      reviews: place.rating?.votes_count ?? null,
      address: place.address,
      url: place.url,
    }));

  return localPack;
}

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
