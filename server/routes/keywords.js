import { Router } from 'express';
import { dataForSEORequest } from '../services/dataforseo.js';

const router = Router();

const LEGAL_SUFFIXES = /\b(llc|inc|corp|ltd|co|company|group|associates|solutions)\b/gi;
const GENERIC_WORDS = new Set(['and', 'or', 'the', 'of', 'a', 'an', 'for', 'in', 'at', 'by', '&']);
const SERVICE_WORDS = new Set([
  'air', 'heating', 'cooling', 'hvac', 'plumbing', 'electric', 'electrical',
  'repair', 'service', 'services', 'mechanical', 'furnace', 'conditioning',
  'contracting', 'construction', 'roofing', 'cleaning', 'landscaping', 'ac',
]);

function extractBrandTerms(domains, competitorTitles = []) {
  const domainTerms = domains.flatMap((domain) => {
    const base = domain.replace(/\.(com|net|org|io|co|us|biz|info|agency|media)$/i, '').toLowerCase();
    const withoutThe = base.replace(/^the/, '');
    const spaced = withoutThe.replace(/[^a-z0-9]+/g, ' ').trim();
    return [base, withoutThe, spaced].filter((t) => t.length > 2);
  });

  const titleTerms = competitorTitles.filter(Boolean).flatMap((title) => {
    const cleaned = title
      .toLowerCase()
      .replace(LEGAL_SUFFIXES, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const words = cleaned.split(' ').filter((w) => w.length > 1 && !GENERIC_WORDS.has(w));
    const terms = [];

    if (cleaned.length > 2) terms.push(cleaned);
    words.forEach((w) => { if (w.length > 2 && !SERVICE_WORDS.has(w)) terms.push(w); });
    for (let i = 0; i < words.length - 1; i++) {
      if (!SERVICE_WORDS.has(words[i]) || !SERVICE_WORDS.has(words[i + 1])) {
        terms.push(`${words[i]} ${words[i + 1]}`);
      }
    }
    return terms;
  });

  return [...new Set([...domainTerms, ...titleTerms])];
}

function isBrandedKeyword(keyword, brandTerms) {
  const kw = keyword.toLowerCase();
  return brandTerms.some((term) => kw.includes(term));
}

async function getDomainRankedKeywords(domain) {
  const payload = [{ target: domain, language_name: 'English', limit: 100 }];
  const data = await dataForSEORequest('/dataforseo_labs/google/ranked_keywords/live', payload);
  const items = data.tasks?.[0]?.result?.[0]?.items ?? [];
  return new Set(items.map((item) => item.keyword_data?.keyword?.toLowerCase()));
}

export async function getDomainKeywordOverlap(userDomain, competitorDomains, targetKeyword, competitorTitles = []) {
  const allDomains = [userDomain, ...competitorDomains];
  const results = await Promise.allSettled(allDomains.map(getDomainRankedKeywords));

  const [userKeywords, ...competitorKeywordSets] = results.map((r) =>
    r.status === 'fulfilled' ? r.value : new Set()
  );

  const target = targetKeyword.toLowerCase();

  const coverage = {
    userDomain,
    userRanksForKeyword: userKeywords.has(target),
    userKeywordCount: userKeywords.size,
    competitors: competitorDomains.map((domain, i) => {
      const kws = competitorKeywordSets[i];
      const shared = [...kws].filter((k) => userKeywords.has(k));
      return {
        domain,
        keywordCount: kws.size,
        ranksForKeyword: kws.has(target),
        sharedWithUser: shared.length,
        uniqueToCompetitor: kws.size - shared.length,
      };
    }),
    keywordsUserIsMissing: (() => {
      const brandTerms = extractBrandTerms([userDomain, ...competitorDomains], competitorTitles);
      return competitorDomains
        .flatMap((_, i) => [...competitorKeywordSets[i]].filter((k) => !userKeywords.has(k)))
        .filter((v, i, a) => a.indexOf(v) === i)
        .filter((k) => !isBrandedKeyword(k, brandTerms))
        .slice(0, 20);
    })(),
  };

  return coverage;
}

router.get('/', async (req, res) => {
  const { domain, competitors, keyword } = req.query;
  if (!domain || !keyword) {
    return res.status(400).json({ error: 'domain and keyword are required' });
  }
  try {
    const competitorList = competitors ? competitors.split(',') : [];
    const data = await getDomainKeywordOverlap(domain, competitorList, keyword);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
