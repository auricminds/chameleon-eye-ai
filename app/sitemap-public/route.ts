import { NextResponse } from 'next/server';

const PRIORITY_PAGES = [
  'https://chameleoneye.ai/',
  'https://chameleoneye.ai/trust',
  'https://chameleoneye.ai/security',
  'https://chameleoneye.ai/privacy',
  'https://chameleoneye.ai/enterprise',
  'https://chameleoneye.ai/developers',
  'https://chameleoneye.ai/api-docs',
  'https://chameleoneye.ai/trust/compliance/soc-2',
  'https://chameleoneye.ai/trust/compliance/iso-27001',
  'https://chameleoneye.ai/trust/penetration-testing',
  'https://chameleoneye.ai/trust/dpa',
  'https://chameleoneye.ai/trust/trust-pack',
  'https://chameleoneye.ai/trust/local-vs-cloud',
  'https://chameleoneye.ai/trust/subprocessors',
  'https://chameleoneye.ai/trust/responsible-disclosure',
  'https://chameleoneye.ai/trust/company',
  'https://chameleoneye.ai/changelog',
  'https://chameleoneye.ai/pricing',
  'https://chameleoneye.ai/free-tools',
  'https://chameleoneye.ai/terminal',
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PRIORITY_PAGES.map(url => `  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
