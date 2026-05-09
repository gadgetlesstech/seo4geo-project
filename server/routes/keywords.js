import { Router } from 'express';
import { dataForSEORequest } from '../services/dataforseo.js';

const router = Router();

function extractBrandTerms(domains) {
  return domains.flatMap((domain) => {
    const base = domain.replace(/\.(com|net|org|io|co|us|biz|info|agency|media)$/i, '').toLowerCase();
    const spaced = base.replace(/[^a-z0-9]+/g, ' ').trim();
    return [base, spaced].filter((t) => t.length > 2);
  });
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

export async function getDomainKeywordOverlap(userDomain, competitorDomains, targetKeyword) {
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
      const brandTerms = extractBrandTerms([userDomain, ...competitorDomains]);
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
