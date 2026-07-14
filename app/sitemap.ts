import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://chameleoneye.ai'
  const trustPages = [
    '/trust', '/trust/security', '/trust/privacy', '/trust/data-retention',
    '/trust/local-vs-cloud', '/trust/ai-providers', '/trust/subprocessors',
    '/trust/responsible-disclosure', '/trust/compliance-roadmap',
    '/trust/data-deletion', '/trust/no-training-policy', '/trust/faq',
    '/trust/compliance',
    '/trust/compliance/soc-2',
    '/trust/compliance/iso-27001',
    '/trust/penetration-testing',
    '/trust/dpa',
    '/trust/trust-pack',
  ]
  const mainPages = [
    '/', '/product', '/api', '/apps', '/pricing', '/compare',
    '/free-tools', '/architecture', '/ai-routing', '/api-docs',
    '/enterprise', '/local-mode', '/security', '/privacy',
    '/press', '/partners', '/contact', '/desktop',
    '/api-docs/authentication', '/api-docs/rate-limits',
  ]
  const arPages = [
    '/ar', '/ar/product', '/ar/api', '/ar/apps', '/ar/pricing',
    '/ar/trust', '/ar/trust/security', '/ar/trust/privacy',
    '/ar/trust/data-retention', '/ar/trust/local-vs-cloud',
    '/ar/trust/ai-providers', '/ar/trust/subprocessors',
    '/ar/trust/responsible-disclosure', '/ar/trust/compliance-roadmap',
    '/ar/trust/data-deletion', '/ar/trust/no-training-policy',
    '/ar/security', '/ar/privacy', '/ar/architecture', '/ar/ai-routing',
    '/ar/api-docs', '/ar/enterprise', '/ar/local-mode', '/ar/contact',
  ]

  const allPages = [...mainPages, ...trustPages, ...arPages]

  return allPages.map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: (path.startsWith('/trust') ? 'monthly' : path === '/security' || path === '/privacy' || path.startsWith('/api-docs') ? 'monthly' : 'weekly') as 'monthly' | 'weekly',
    priority: path === '/' ? 1 : path.startsWith('/trust') || path === '/security' || path === '/privacy' || path.startsWith('/api-docs') ? 0.8 : 0.7,
  }))
}
