import { Router } from 'express';
import { dataForSEORequest } from '../services/dataforseo.js';
import { getLocalPackCompetitors } from './maps.js';

const router = Router();

async function getRankedKeywords(domain) {
  const payload = [{ target: domain, language_name: 'English', limit: 500 }];
  const data = await dataForSEORequest('/dataforseo_labs/google/ranked_keywords/live', payload);
  const items = data.tasks?.[0]?.result?.[0]?.items ?? [];

  const map = new Map();
  for (const item of items) {
    const keyword = item.keyword_data?.keyword?.toLowerCase();
    if (!keyword) continue;
    map.set(keyword, {
      searchVolume: item.keyword_data?.keyword_info?.search_volume ?? 0,
      competition: item.keyword_data?.keyword_info?.competition ?? null,
      position: item.ranked_serp_element?.serp_item?.rank_group ?? null,
    });
  }
  return map;
}

// Strip protocol and www. so callers can pass raw URLs or bare domains
function normalizeDomain(raw) {
  return raw.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase();
}

router.get('/', async (req, res) => {
  const { domain, keyword, city } = req.query;
  if (!domain || !keyword || !city) {
    return res.status(400).json({ error: 'domain, keyword, and city are required' });
  }

  const userDomain = normalizeDomain(domain);

  try {
    const competitors = await getLocalPackCompetitors(keyword, city);
    const competitorDomains = competitors.map((c) => c.domain).filter(Boolean);

    // Fetch user + all competitor keyword sets in parallel; silently skip failed domains
    const [userResult, ...compResults] = await Promise.allSettled(
      [userDomain, ...competitorDomains].map(getRankedKeywords)
    );

    const userKeywords = userResult.status === 'fulfilled' ? userResult.value : new Map();
    const compKeywordMaps = compResults.map((r) =>
      r.status === 'fulfilled' ? r.value : new Map()
    );

    // Build gap: keywords any competitor ranks for that the user does not
    const gapMap = new Map();
    for (let i = 0; i < competitorDomains.length; i++) {
      for (const [kw, meta] of compKeywordMaps[i]) {
        if (userKeywords.has(kw)) continue;
        if (!gapMap.has(kw)) {
          gapMap.set(kw, { keyword: kw, searchVolume: meta.searchVolume, rankedBy: [] });
        }
        gapMap.get(kw).rankedBy.push({ domain: competitorDomains[i], position: meta.position });
      }
    }

    const gapKeywords = [...gapMap.values()]
      .sort((a, b) => (b.searchVolume ?? 0) - (a.searchVolume ?? 0))
      .slice(0, 50);

    res.json({
      userDomain,
      keyword,
      city,
      userKeywordCount: userKeywords.size,
      competitors: competitors.map((c, i) => ({
        ...c,
        keywordCount: compKeywordMaps[i]?.size ?? 0,
      })),
      gapKeywords,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
