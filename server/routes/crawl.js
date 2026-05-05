import { Router } from 'express';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const router = Router();

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'seo4geo-bot/1.0' },
    timeout: 15000,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}

export async function crawlPage(url) {
  const html = await fetchPage(url);
  const $ = cheerio.load(html);

  const title = $('title').first().text().trim();
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() ?? '';
  const h1s = $('h1').map((_, el) => $(el).text().trim()).get().filter(Boolean);
  const h2s = $('h2').map((_, el) => $(el).text().trim()).get().filter(Boolean);

  const baseOrigin = new URL(url).origin;
  const internalLinks = new Set();
  $('a[href]').each((_, el) => {
    try {
      const href = new URL($(el).attr('href'), url);
      if (href.origin === baseOrigin) internalLinks.add(href.pathname);
    } catch {
      // ignore malformed hrefs
    }
  });

  return {
    url,
    title,
    metaDescription,
    h1s,
    h2s,
    internalLinkCount: internalLinks.size,
    internalLinks: [...internalLinks].slice(0, 50),
  };
}

router.get('/', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url is required' });
  try {
    const data = await crawlPage(url);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
