const fs = require('fs');

const CYAN = '#00b8db';
const SHEET_ID = '1jnps_jwQq6MVTaMHPY4HPCkQPSXK4GquIor6wXi7Wk0';

function wrap(brandLine, body) {
  return [
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>',
    '<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">',
    '<div style="max-width:580px;margin:40px auto;padding:0 20px;">',
    '<div style="background:#000;padding:20px 28px;border-bottom:3px solid ' + CYAN + ';border-radius:8px 8px 0 0;">',
    '<p style="margin:0;color:' + CYAN + ';font-size:10px;letter-spacing:3px;text-transform:uppercase;">' + brandLine + '</p>',
    '<p style="margin:4px 0 0;color:#fff;font-size:18px;font-weight:900;font-style:italic;letter-spacing:-1px;">SEO4GEO</p>',
    '</div>',
    '<div style="background:#fff;padding:32px 28px;font-size:15px;line-height:1.8;color:#333;border-radius:0 0 8px 8px;">',
    body,
    '<hr style="border:none;border-top:1px solid #eee;margin:28px 0;">',
    '<p style="font-size:11px;color:#999;">You received this because you signed up via SEO4GEO or the Gadgetlesstech Blueprint. <a href="#" style="color:' + CYAN + ';">Unsubscribe</a></p>',
    '</div></div></body></html>'
  ].join('');
}

function btn(label, url) {
  return '<table cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr>' +
    '<td style="background:' + CYAN + ';border-radius:6px;">' +
    '<a href="' + url + '" style="display:inline-block;padding:14px 28px;color:#000;font-size:13px;font-weight:900;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">' +
    label + ' &#8594;</a></td></tr></table>';
}

function checkRow(text) {
  return '<tr><td style="padding:10px 0;border-bottom:1px solid #f5f5f5;font-size:14px;">' +
    '<span style="color:' + CYAN + ';font-weight:700;">&#10003;</span> ' + text + '</td></tr>';
}

function arrowRow(text) {
  return '<tr><td style="padding:10px 0;border-bottom:1px solid #f5f5f5;font-size:14px;">' +
    '<span style="color:' + CYAN + ';font-size:16px;">&#8594;</span> ' + text + '</td></tr>';
}

function layer(num, title, desc) {
  return '<div style="border-left:4px solid ' + CYAN + ';background:#f9f9f9;padding:16px;margin-bottom:10px;">' +
    '<p style="margin:0;font-size:10px;color:' + CYAN + ';font-weight:700;text-transform:uppercase;letter-spacing:2px;">Layer ' + num + '</p>' +
    '<p style="margin:4px 0;font-size:15px;font-weight:900;color:#000;">' + title + '</p>' +
    '<p style="margin:4px 0 0;font-size:13px;color:#666;line-height:1.6;">' + desc + '</p></div>';
}

const sig = '<p style="margin:24px 0 0;">&#8212; Kevin<br><span style="color:#999;font-size:13px;">Gadgetlesstech</span></p>';
const n = '{{ $json.body.name || \'there\' }}';

const emails = [
  {
    name: 'Email 1 — Welcome to SEO4GEO',
    subject: "You found the tool. Here's the full picture.",
    body: wrap('Gadgetlesstech Ranking System&#8482;',
      '<p>Hey, ' + n + ',</p>' +
      '<p>Most people find Gadgetlesstech through the theory. You found it through the proof &#8212; and that tells me you are serious about understanding where your rankings actually stand.</p>' +
      '<p>SEO4GEO is the tool that makes keyword gaps impossible to ignore. But it is one piece of a larger system. Over the next few weeks I will show you the full picture:</p>' +
      '<table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">' +
      '<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;"><span style="color:' + CYAN + ';font-weight:700;">01 &#8212;</span> <strong>Your SEO4GEO audit</strong> &#8212; what the data is telling you</td></tr>' +
      '<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;"><span style="color:' + CYAN + ';font-weight:700;">02 &#8212;</span> <strong>Why the gap exists</strong> &#8212; the Query Expansion System explained</td></tr>' +
      '<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;"><span style="color:' + CYAN + ';font-weight:700;">03 &#8212;</span> <strong>How to close it</strong> &#8212; the 4-layer Ranking System</td></tr>' +
      '<tr><td style="padding:10px 0;font-size:14px;"><span style="color:' + CYAN + ';font-weight:700;">04 &#8212;</span> <strong>Who executes it</strong> &#8212; Gadgetlesstech, if you want the full build</td></tr>' +
      '</table>' +
      '<p>If you have not run your free audit yet, start there. It takes 60 seconds and shows you exactly where you stand.</p>' +
      btn('Run Your Free Audit', 'https://seo4geo.com/audit') + sig)
  },
  {
    name: 'Email 2 — What Your Audit Shows',
    subject: "What your keyword gap report is actually telling you",
    body: wrap('Reading the Data',
      '<p>Hey, ' + n + ',</p>' +
      '<p>When you run an SEO4GEO audit, you are not just getting a list of keywords. You are getting a map of every search your competitors are winning that you are not even showing up for.</p>' +
      '<p>Here is how to read what you see:</p>' +
      '<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">' +
      checkRow('<strong>Keyword gaps</strong> &#8212; searches where your competitor ranks in the top 10 and you do not appear at all') +
      checkRow('<strong>Visibility score</strong> &#8212; your share of the total search demand in your market') +
      checkRow('<strong>Competitor advantage</strong> &#8212; the specific topics where they have authority and you do not') +
      checkRow('<strong>AI action plan</strong> &#8212; the fastest gaps to close based on your current rankings') +
      '</table>' +
      '<p>The number that usually surprises people most is the visibility score. Most local businesses are capturing less than 10% of the searches available to them in their market.</p>' +
      '<p>The other 90% is going to competitors &#8212; not because they have a better business, but because they have broader search coverage.</p>' +
      '<p>In the next email I will explain exactly why that gap exists and how it compounds over time.</p>' +
      btn('View Your Audit', 'https://seo4geo.com/audit') + sig)
  },
  {
    name: 'Email 3 — Why the Gap Exists (QES)',
    subject: "Why your competitors rank for searches you never thought to target",
    body: wrap('The Why',
      '<p>Hey, ' + n + ',</p>' +
      '<p>Your SEO4GEO audit showed you the gap. Now let me explain why it exists.</p>' +
      '<p>Most businesses build their SEO around a fixed list of keywords &#8212; the obvious ones. Their top competitor is doing something different. They are capturing every variation, every phrasing, every related question a potential customer might search.</p>' +
      '<p>This is called <strong>Query Expansion</strong> &#8212; and it is the single biggest lever in modern local SEO.</p>' +
      '<div style="border-left:4px solid ' + CYAN + ';background:#f9f9f9;padding:20px;margin:20px 0;font-size:16px;line-height:1.8;">' +
      '<p style="margin:0;">The average local business ranks for <strong>47 keywords.</strong></p>' +
      '<p style="margin:4px 0 0;">Their top local competitor ranks for <strong style="color:' + CYAN + ';">430+.</strong></p>' +
      '</div>' +
      '<p>That 10x gap is not built with 10x the content. It is built with a system that compresses hundreds of keyword variations into lean, structured pages that signal topical authority at scale.</p>' +
      '<p>The Query Expansion System Blueprint breaks down exactly how this works &#8212; and it is free.</p>' +
      btn('Download the Free Blueprint', 'https://queryexpansionsystem.com') + sig)
  },
  {
    name: 'Email 4 — The 4-Layer System',
    subject: "The 4-layer system that closes the gap",
    body: wrap('The Methodology',
      '<p>Hey, ' + n + ',</p>' +
      '<p>Now that you understand the gap, let me show you how we close it.</p>' +
      '<p>The Gadgetlesstech Ranking System runs four layers simultaneously. Most agencies touch one &#8212; if they touch any at all.</p>' +
      layer('01', 'Keyword Compression', 'Cover thousands of search variations through phrase stacking. Maximum visibility, zero content bloat.') +
      layer('02', 'Topical Authority', 'Own entire subject areas through semantic saturation. Become the source Google and AI models trust above everyone else.') +
      layer('03', 'Page Authority', 'Optimize individual pages to gain independent ranking power using on-page signals and engagement triggers.') +
      layer('04', 'Query Expansion', 'Capture long-tail and AI-driven queries using People Also Ask strategies and query fan-out. Where most competitors have zero coverage.') +
      '<p>Your SEO4GEO audit shows you exactly where you stand on each of these layers versus your top competitor. Every gap in your report maps back to one of these four areas.</p>' +
      '<p>In the next email I will show you how to start closing those gaps systematically.</p>' + sig)
  },
  {
    name: 'Email 5 — How to Close the Gaps',
    subject: "The fastest way to start closing your keyword gaps",
    body: wrap('The Action Plan',
      '<p>Hey, ' + n + ',</p>' +
      '<p>Your SEO4GEO audit gives you an AI-generated action plan. Here is how to prioritize it.</p>' +
      '<p><strong>Start with Layer 04 &#8212; Query Expansion.</strong> This is where most businesses have the largest gaps and the fastest wins. You are not competing on these searches at all, which means even modest content improvements will produce visible ranking movement.</p>' +
      '<p>Then move to <strong>Layer 02 &#8212; Topical Authority.</strong> This is the long game. Google and AI search engines reward businesses that comprehensively cover a subject area. Each piece of content you add compounds the authority signal.</p>' +
      '<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">' +
      arrowRow('Run your audit and export the keyword gap report') +
      arrowRow('Identify the top 10 queries your competitor ranks for that you do not') +
      arrowRow('Create one page that directly addresses each cluster of those queries') +
      arrowRow('Repeat monthly &#8212; the compounding effect builds fast') +
      '</table>' +
      '<p>If this sounds like a lot to manage alone, that is what the next email is about.</p>' +
      btn('Get My Full Action Plan', 'https://seo4geo.com/audit') + sig)
  },
  {
    name: 'Email 6 — Audit Push',
    subject: "Have you run your free audit yet?",
    body: wrap('The Proof',
      '<p>Hey, ' + n + ',</p>' +
      '<p>Quick check-in. Have you run your free SEO4GEO audit yet?</p>' +
      '<p>If not &#8212; this is the single most valuable thing you can do in the next 60 seconds. It shows you:</p>' +
      '<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">' +
      arrowRow('Every keyword your top competitor ranks for that you do not') +
      arrowRow('Your local visibility score vs. the market average') +
      arrowRow('An AI-generated action plan mapped to the 4-layer system') +
      arrowRow('Your fastest wins &#8212; things you can act on this week') +
      '</table>' +
      '<p>Just your website URL and one competitor. No credit card. No sales call to see results.</p>' +
      btn('Run My Free Audit Now', 'https://seo4geo.com/audit') +
      '<p>If you have already run it and want someone to walk through the results with you live, just reply to this email and we will set it up.</p>' + sig)
  },
  {
    name: 'Email 7 — Gadgetlesstech',
    subject: "When you are ready to stop doing this alone",
    body: wrap('The Who',
      '<p>Hey, ' + n + ',</p>' +
      '<p>You have seen the gap. You understand the system. Now let me tell you about the team that executes it.</p>' +
      '<p><strong>Gadgetlesstech</strong> is not a typical SEO agency. We do not do keyword reports. We do not sell monthly blog posts. We do not send dashboards that say rankings are trending up with no explanation of why.</p>' +
      '<p>We build the full 4-layer Ranking System for your business &#8212; engineered for your specific market and competitors. Our clients rank for 10x more searches than their competitors, and they stay there.</p>' +
      '<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">' +
      checkRow('Full keyword gap analysis across your entire market') +
      checkRow('Custom Ranking System built around your business') +
      checkRow('Ongoing optimization across all 4 layers') +
      checkRow('Transparent reporting tied to actual ranking gains') +
      '</table>' +
      '<p>Book a free strategy call. We will run through your SEO4GEO audit results live and build a custom roadmap on the call &#8212; no pressure, just clarity.</p>' +
      btn('Book a Free Strategy Call', 'https://gadgetlesstech.com') + sig)
  },
  {
    name: 'Email 8 — Final Nudge',
    subject: "One last thing before I leave you alone",
    body: wrap('The Open Door',
      '<p>Hey, ' + n + ',</p>' +
      '<p>Last email. I will keep it short.</p>' +
      '<table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">' +
      '<tr><td style="padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:14px;"><span style="color:' + CYAN + ';font-weight:900;">&#8594;</span> <strong>See your gaps</strong> &#8212; <a href="https://seo4geo.com/audit" style="color:' + CYAN + ';font-weight:700;">seo4geo.com/audit</a></td></tr>' +
      '<tr><td style="padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:14px;"><span style="color:' + CYAN + ';font-weight:900;">&#8594;</span> <strong>Understand why</strong> &#8212; <a href="https://queryexpansionsystem.com" style="color:' + CYAN + ';font-weight:700;">queryexpansionsystem.com</a></td></tr>' +
      '<tr><td style="padding:8px 0;font-size:14px;"><span style="color:' + CYAN + ';font-weight:900;">&#8594;</span> <strong>Get it done</strong> &#8212; <a href="https://gadgetlesstech.com" style="color:' + CYAN + ';font-weight:700;">gadgetlesstech.com</a></td></tr>' +
      '</table>' +
      '<p>The door is always open.</p>' + sig +
      '<p style="font-size:12px;color:#bbb;margin-top:16px;">P.S. If these emails were not valuable, no hard feelings &#8212; <a href="#" style="color:' + CYAN + ';">unsubscribe here</a>.</p>')
  }
];

const waits = [2, 3, 3, 3, 3, 4, 4];

let nodeIdx = 1;
function uid(n) {
  const hex = n.toString(16).padStart(8, '0');
  return `${hex}-b2c3-d4e5-f6a7-${(8901 + n).toString().padStart(12, '0')}`;
}

const nodes = [];
let y = 80;

// 1. Webhook
nodes.push({
  parameters: { httpMethod: 'POST', path: 'seo4geo-drip', responseMode: 'onReceived', options: {} },
  id: uid(nodeIdx++), name: 'SEO4GEO Signup Webhook',
  type: 'n8n-nodes-base.webhook', typeVersion: 1, position: [260, y],
  webhookId: uid(99)
});
y += 160;

// 2. Google Sheets - Add Lead (defineBelow with populated schema)
nodes.push({
  parameters: {
    operation: 'append',
    documentId: { __rl: true, value: SHEET_ID, mode: 'id' },
    sheetName: { __rl: true, value: 'SEO4GEO', mode: 'name' },
    columns: {
      mappingMode: 'defineBelow',
      value: {
        name:    "={{ $json.body.name || '' }}",
        email:   '={{ $json.body.email }}',
        website: "={{ $json.body.website || '' }}",
        source:  "={{ $json.body.source || '' }}"
      },
      matchingColumns: [],
      schema: [
        { id: 'name',    displayName: 'name',    required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
        { id: 'email',   displayName: 'email',   required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
        { id: 'website', displayName: 'website', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
        { id: 'source',  displayName: 'source',  required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }
      ]
    },
    options: {}
  },
  id: uid(nodeIdx++), name: 'Add Lead to CRM',
  type: 'n8n-nodes-base.googleSheets', typeVersion: 4, position: [260, y],
  credentials: { googleSheetsOAuth2Api: { id: null, name: 'Google Sheets Account' } }
});
y += 160;

// Emails + Waits
emails.forEach((email, i) => {
  nodes.push({
    parameters: {
      fromEmail: 'kevin@gadgetlesstech.com',
      toEmail: '={{ $json.email }}',
      subject: email.subject,
      emailFormat: 'html',
      html: email.body
    },
    id: uid(nodeIdx++), name: email.name,
    type: 'n8n-nodes-base.emailSend', typeVersion: 2, position: [260, y],
    credentials: { smtp: { id: null, name: 'Gmail SMTP' } }

  });
  y += 160;

  if (i < waits.length) {
    nodes.push({
      parameters: { resume: 'timeInterval', amount: waits[i], unit: 'days' },
      id: uid(nodeIdx++), name: `Wait ${waits[i]} Days (${i + 1})`,
      type: 'n8n-nodes-base.wait', typeVersion: 1, position: [260, y],
      webhookId: uid(50 + i)
    });
    y += 160;
  }
});


// Linear connections
const connections = {};
for (let i = 0; i < nodes.length - 1; i++) {
  connections[nodes[i].name] = { main: [[{ node: nodes[i + 1].name, type: 'main', index: 0 }]] };
}

const workflow = {
  id: 'c3d4e5f6-a7b8-9012-c3d4-e5f6a7b8c9d0',
  name: 'SEO4GEO — Exit Popup Drip Campaign',
  nodes,
  connections,
  active: false,
  settings: { executionOrder: 'v1' },
  pinData: {},
  versionId: 'd4e5f6a7-b8c9-0123-d4e5-f6a7b8c9d0e1',
  tags: []
};

const json = JSON.stringify(workflow, null, 2);

try {
  JSON.parse(json);
  console.log('VALID — nodes:', nodes.length);
} catch (e) {
  console.error('INVALID JSON:', e.message);
  process.exit(1);
}

fs.writeFileSync(
  'c:/Users/gadge/Downloads/seo4geo-project/drip-campaign/seo4geo-drip-workflow.json',
  json, 'utf8'
);
console.log('Written: seo4geo-drip-workflow.json');
