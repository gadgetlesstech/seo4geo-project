import { Router } from 'express';
import { getLocalPackCompetitors } from './maps.js';
import { getDomainKeywordOverlap } from './keywords.js';
import { crawlPage } from './crawl.js';
import { generateGapAnalysis } from '../services/claude.js';
import { sendLeadToN8n } from '../services/n8n.js';
import {
  getDomainOverview,
  getDomainCompetitors,
  getRankedKeywordsFull,
  getContentGap,
  getBacklinkSummary,
  getOnPageInstant,
} from '../services/dataforseo.js';
import {
  getLlmMentions,
  getLlmTopDomains,
  getAiKeywordVolume,
  getLlmMentionMetrics,
} from '../services/aiOptimization.js';
import {
  computeKeywordScore,
  computeTechnicalScore,
  computeCompetitiveScore,
  computeContentScore,
  computeAuthorityScore,
  computeCompositeScore,
  computeAiVisibilityScore,
} from '../services/scoring.js';

const router = Router();

router.post('/', async (req, res) => {
  const { url, keyword, city } = req.body;

  if (!url || !keyword || !city) {
    return res.status(400).json({ error: 'url, keyword, and city are required' });
  }

  try {
    const userDomain = new URL(url).hostname.replace(/^www\./, '');
    const localKeyword = `${keyword} ${city}`;

    // Phase 1: Fast parallel — local pack + page crawl
    const [competitors, crawlData] = await Promise.all([
      getLocalPackCompetitors(keyword, city),
      crawlPage(url),
    ]);

    const competitorDomains = competitors.map(c => c.domain);
    const competitorTitles = competitors.map(c => c.title).filter(Boolean);

    // Phase 2: Traditional SEO enrichment + AI visibility in parallel
    const [
      keywordData,
      domainOverview,
      seoCompetitors,
      rankedKeywords,
      backlinkSummary,
      onPageData,
      llmMentions,
      llmTopDomains,
      aiKeywordVolume,
      mentionMetrics,
    ] = await Promise.all([
      getDomainKeywordOverlap(userDomain, competitorDomains, keyword, competitorTitles),
      getDomainOverview(userDomain),
      getDomainCompetitors(userDomain, 10),
      getRankedKeywordsFull(userDomain, 200),
      getBacklinkSummary(userDomain),
      getOnPageInstant(url),
      getLlmMentions(userDomain),
      getLlmTopDomains(localKeyword),
      getAiKeywordVolume([keyword, localKeyword]),
      getLlmMentionMetrics(userDomain),
    ]);

    // Phase 3: Content gap from top 3 organic competitors
    const topCompetitorDomains = seoCompetitors.slice(0, 3).map(c => c.domain);
    const gapResults = await Promise.allSettled(
      topCompetitorDomains.map(c => getContentGap(userDomain, c, 30))
    );
    const contentGap = gapResults
      .flatMap(r => r.status === 'fulfilled' ? r.value : [])
      .filter((item, i, arr) => {
        const kw = item.keyword_data?.keyword ?? '';
        return kw && arr.findIndex(x => x.keyword_data?.keyword === kw) === i;
      })
      .slice(0, 50);

    // Phase 4: Compute all scores
    const technicalResult = computeTechnicalScore(onPageData);
    const dimensionScores = {
      keyword:     computeKeywordScore(rankedKeywords),
      technical:   technicalResult.score,
      competitive: computeCompetitiveScore(domainOverview, seoCompetitors),
      content:     computeContentScore(rankedKeywords),
      authority:   computeAuthorityScore(backlinkSummary),
    };
    const scores = {
      ...dimensionScores,
      overall:      computeCompositeScore(dimensionScores),
      aiVisibility: computeAiVisibilityScore(llmMentions, llmTopDomains, mentionMetrics, userDomain),
    };

    const auditData = {
      url,
      keyword,
      city,
      crawlData,
      competitors,
      keywordData,
      domainOverview,
      seoCompetitors,
      rankedKeywords,
      backlinkSummary,
      onPageData,
      technicalIssues: {
        critical: technicalResult.criticalIssues,
        high:     technicalResult.highIssues,
        medium:   technicalResult.mediumIssues,
      },
      contentGap,
      aiData: {
        llmMentions,
        llmTopDomains,
        aiKeywordVolume,
        mentionMetrics,
        isCited: llmMentions.some(item =>
          item.sources?.some(s => (s.domain ?? '').includes(userDomain))
        ),
        citingCompetitors: llmTopDomains.slice(0, 5).map(d => d.domain).filter(Boolean),
      },
      scores,
    };

    const report = await generateGapAnalysis(auditData);

    await sendLeadToN8n({ url, keyword, city, report }).catch(err =>
      console.error('n8n webhook failed (non-fatal):', err.message)
    );

    res.json({ success: true, report, auditData });
  } catch (err) {
    console.error('Analyze error:', err);
    res.status(500).json({ error: err.message || 'Audit failed' });
  }
});

export default router;
