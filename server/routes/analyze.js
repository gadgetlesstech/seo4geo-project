import { Router } from 'express';
import { getLocalPackCompetitors } from './maps.js';
import { getDomainKeywordOverlap } from './keywords.js';
import { crawlPage } from './crawl.js';
import { generateGapAnalysis } from '../services/claude.js';
import { sendLeadToN8n } from '../services/n8n.js';

const router = Router();

router.post('/', async (req, res) => {
  const { url, keyword, city } = req.body;

  if (!url || !keyword || !city) {
    return res.status(400).json({ error: 'url, keyword, and city are required' });
  }

  try {
    const [competitors, crawlData] = await Promise.all([
      getLocalPackCompetitors(keyword, city),
      crawlPage(url),
    ]);

    const competitorDomains = competitors.map((c) => c.domain);
    const userDomain = new URL(url).hostname.replace(/^www\./, '');

    const keywordData = await getDomainKeywordOverlap(userDomain, competitorDomains, keyword);

    const auditData = { url, keyword, city, crawlData, competitors, keywordData };

    const report = await generateGapAnalysis(auditData);

    await sendLeadToN8n({ url, keyword, city, report }).catch((err) =>
      console.error('n8n webhook failed (non-fatal):', err.message)
    );

    res.json({ success: true, report, auditData });
  } catch (err) {
    console.error('Analyze error:', err);
    res.status(500).json({ error: err.message || 'Audit failed' });
  }
});

export default router;
