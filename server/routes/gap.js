import { Router } from 'express';
import { dataForSEORequest } from '../services/dataforseo.js';
import { getLocalPackCompetitors } from './maps.js';

const router = Router();

const STOP_WORDS = new Set([
  'a','an','the','and','or','for','in','on','at','to','of','by','with',
  'near','best','top','local','free','cheap','affordable','how','what',
  'when','where','why','who','is','are','was','were','be','been','do',
  'does','did','get','find','your','my','our','their','this','that',
  'these','those','not','no','vs','like','just','about','near','me',
]);

// Generic brand/platform terms that will never be relevant to a local business niche
const BRAND_BLOCKLIST = new Set([
  'youtube','amazon','google','facebook','instagram','twitter','reddit',
  'netflix','tiktok','porn','pornhub','xxx','sex','ebay','walmart',
  'target','apple','microsoft','chatgpt','openai','weather','news',
  'gmail','yahoo','bing','espn','cnn','fox','nfl','nba','mlb','nhl',
  'spotify','linkedin','pinterest','snapchat','twitch','discord','zoom',
  'paypal','venmo','cashapp','uber','lyft','doordash','airbnb',
]);

// Max search volume — filters out mega-generic keywords (youtube, amazon, etc.)
const MAX_VOLUME = 500_000;

// Generic business words that are too broad to use as the sole matching signal.
// e.g. "roofing contractor" → only "roofing" is specific; "contractor" alone
// would match painting contractors, landscapers, etc.
const GENERIC_BUSINESS_TOKENS = new Set([
  'contractor','contractors','contracting',
  'company','companies','co',
  'service','services','servicing',
  'professional','professionals',
  'business','businesses',
  'provider','providers',
  'specialist','specialists',
  'expert','experts',
  'agency','agencies',
  'firm','firms',
  'group','groups',
  'solutions','solution',
  'licensed','certified','insured',
  'commercial','residential','industrial',
]);

// Strip common suffixes to get root so "roofing" → "roof" matches
// "roofer", "roofers", "roof replacement", etc.
function stemToken(token) {
  return token
    .replace(/(?:ing|ers?|tions?|ed|ists?|ment)$/, '')
    .replace(/ies$/, 'y')
    .replace(/s$/, '');
}

function getTargetTokens(keyword) {
  const all = keyword.toLowerCase().split(/\W+/).filter(t => t.length > 2 && !STOP_WORDS.has(t));
  // Prefer specific tokens; fall back to all tokens if everything is generic
  const specific = all.filter(t => !GENERIC_BUSINESS_TOKENS.has(t));
  return specific.length > 0 ? specific : all;
}

function isRelevant(gapKeyword, targetTokens, city) {
  const kw = gapKeyword.toLowerCase();
  const words = kw.split(/\W+/);

  if (words.some(w => BRAND_BLOCKLIST.has(w))) return false;

  // Accept if contains city name
  if (city && kw.includes(city.toLowerCase())) return true;

  // Accept if the gap keyword contains a specific target token or its stem
  return targetTokens.some(token => {
    const root = stemToken(token);
    return kw.includes(token) || (root.length > 2 && kw.includes(root));
  });
}

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

    const targetTokens = getTargetTokens(keyword);

    // Build gap: keywords any competitor ranks for that the user does not
    const gapMap = new Map();
    for (let i = 0; i < competitorDomains.length; i++) {
      for (const [kw, meta] of compKeywordMaps[i]) {
        if (userKeywords.has(kw)) continue;
        if ((meta.searchVolume ?? 0) > MAX_VOLUME) continue;
        if (!isRelevant(kw, targetTokens, city)) continue;
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
