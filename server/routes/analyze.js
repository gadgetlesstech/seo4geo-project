import { Router } from 'express';
import { getLocalPackCompetitors } from './maps.js';
import { getDomainKeywordOverlap } from './keywords.js';
import { crawlPage } from './crawl.js';
import { generateGapAnalysis } from '../services/claude.js';
import { sendLeadToN8n } from '../services/n8n.js';
import { sendMetaCapiEvent } from '../services/metaCapi.js';
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
  const { url, keyword, city, metaEventIds } = req.body;

  if (!url || !keyword || !city) {
    return res.status(400).json({ error: 'url, keyword, and city are required' });
  }

  if (metaEventIds?.start) {
    sendMetaCapiEvent({
      eventName: 'AuditStart',
      eventId: metaEventIds.start,
      req,
      customData: { keyword, city },
    });
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
      topCompetitorDomains.map(c => getContentGap(userDomain, c, 200))
    );

    const _GAP_BRAND_BLOCKLIST = new Set([
      'youtube','amazon','google','facebook','instagram','twitter','reddit',
      'netflix','tiktok','porn','pornhub','xxx','sex','ebay','walmart',
      'target','apple','microsoft','chatgpt','openai','weather','news',
      'gmail','yahoo','bing','espn','cnn','fox','nfl','nba','mlb','nhl',
      'spotify','linkedin','pinterest','snapchat','twitch','discord','zoom',
      'paypal','venmo','cashapp','uber','lyft','doordash','airbnb',
      'blookets','boblox','roblox','minecraft','calculator','craigslist',
    ]);
    const _GAP_GENERIC_TOKENS = new Set([
      'contractor','contractors','contracting','company','companies','co',
      'service','services','servicing','professional','professionals',
      'business','businesses','provider','providers','specialist','specialists',
      'expert','experts','agency','agencies','firm','firms','group','groups',
      'solutions','solution','licensed','certified','insured',
      'commercial','residential','industrial',
    ]);
    const _GAP_STOP_WORDS = new Set([
      'a','an','the','and','or','for','in','on','at','to','of','by','with',
      'near','best','top','local','free','cheap','affordable','how','what',
      'when','where','why','who','is','are','was','were','be','been','do',
      'does','did','get','find','your','my','our','their','this','that',
      'these','those','not','no','vs','like','just','about','me',
    ]);
    const _GAP_MAX_VOLUME = 10_000;

    function _gapStemToken(t) {
      return t.replace(/(?:ing|ers?|tions?|ed|ists?|ment)$/, '').replace(/ies$/, 'y').replace(/s$/, '');
    }
    const _kwTokens = keyword.toLowerCase().split(/\W+/)
      .filter(t => t.length > 2 && !_GAP_STOP_WORDS.has(t));
    const _specificTokens = _kwTokens.filter(t => !_GAP_GENERIC_TOKENS.has(t));
    const _targetTokens = _specificTokens.length > 0 ? _specificTokens : _kwTokens;
    const _cityLower = city.toLowerCase();

    const contentGap = gapResults
      .flatMap(r => r.status === 'fulfilled' ? r.value : [])
      .filter((item, i, arr) => {
        const kw = (item.keyword_data?.keyword ?? '').toLowerCase();
        if (!kw) return false;
        // deduplicate
        if (arr.findIndex(x => (x.keyword_data?.keyword ?? '').toLowerCase() === kw) !== i) return false;
        // volume cap
        const vol = item.keyword_data?.keyword_info?.search_volume ?? 0;
        if (vol > _GAP_MAX_VOLUME) return false;
        // brand blocklist
        const words = kw.split(/\W+/);
        if (words.some(w => _GAP_BRAND_BLOCKLIST.has(w))) return false;
        // relevance: city or niche token match
        if (_cityLower && kw.includes(_cityLower)) return true;
        return _targetTokens.some(token => {
          const root = _gapStemToken(token);
          return kw.includes(token) || (root.length > 2 && kw.includes(root));
        });
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

    if (metaEventIds?.complete) {
      sendMetaCapiEvent({
        eventName: 'AuditComplete',
        eventId: metaEventIds.complete,
        req,
        customData: { keyword, city },
      });
    }

    res.json({ success: true, report, auditData });
  } catch (err) {
    console.error('Analyze error:', err);
    res.status(500).json({ error: err.message || 'Audit failed' });
  }
});

export default router;
