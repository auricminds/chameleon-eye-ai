// Trust Center — build-time content checks
// Run with: npx ts-node __tests__/trust-pages.test.ts
// or convert to jest if test runner is added

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const TRUST_ROUTES = [
  'app/trust/page.tsx',
  'app/trust/security/page.tsx',
  'app/trust/privacy/page.tsx',
  'app/trust/data-retention/page.tsx',
  'app/trust/local-vs-cloud/page.tsx',
  'app/trust/ai-providers/page.tsx',
  'app/trust/subprocessors/page.tsx',
  'app/trust/responsible-disclosure/page.tsx',
  'app/trust/compliance-roadmap/page.tsx',
  'app/trust/data-deletion/page.tsx',
  'app/trust/no-training-policy/page.tsx',
  // New pages
  'app/trust/compliance/page.tsx',
  'app/trust/compliance/soc-2/page.tsx',
  'app/trust/compliance/iso-27001/page.tsx',
  'app/trust/penetration-testing/page.tsx',
  'app/trust/dpa/page.tsx',
  'app/trust/trust-pack/page.tsx',
]

const FORBIDDEN_CLAIMS = [
  'SOC 2 certified',
  'ISO 27001 certified',
  'HIPAA compliant',
  'GDPR compliant',
  'end-to-end encrypted',
  'penetration tested',
  'audited and certified',
  'open source',
  'no vulnerabilities',
  'no issues found',
  'fully secure',
]

const FORBIDDEN_PROVIDER_STRINGS = [
  'NEXT_PUBLIC_OPENROUTER',
  'NEXT_PUBLIC_AI',
  'openrouter.ai/api',
]

const FORBIDDEN_FAKE_NAMES = [
  'Deloitte',
  'KPMG',
  'PwC',
  'Ernst & Young',
  'EY ',
  'BDO',
  'Grant Thornton',
  'Schellman',
  'Coalfire',
  'A-LIGN',
  'Prescient Assurance',
]

const FORBIDDEN_PERSONAL_NAMES_PATTERNS = [
  /\bJohn\s[A-Z][a-z]+\b/,
  /\bJane\s[A-Z][a-z]+\b/,
]

const REQUIRED_COMPANY_NAMES = ['Chameleon Eye AI', 'Chameleon Eye', 'Chameleon Builder']

let passed = 0
let failed = 0

function check(label: string, condition: boolean) {
  if (condition) {
    console.log(`✓ ${label}`)
    passed++
  } else {
    console.error(`✗ FAIL: ${label}`)
    failed++
  }
}

// Test: Trust pages exist
for (const route of TRUST_ROUTES) {
  try {
    readFileSync(join(process.cwd(), route))
    check(`Trust page exists: ${route}`, true)
  } catch {
    check(`Trust page exists: ${route}`, false)
  }
}

// Test: /trust/compliance returns 200 (existence check as proxy)
check('/trust/compliance page file exists', (() => {
  try { readFileSync(join(process.cwd(), 'app/trust/compliance/page.tsx')); return true } catch { return false }
})())

check('/trust/compliance/soc-2 page file exists', (() => {
  try { readFileSync(join(process.cwd(), 'app/trust/compliance/soc-2/page.tsx')); return true } catch { return false }
})())

check('/trust/compliance/iso-27001 page file exists', (() => {
  try { readFileSync(join(process.cwd(), 'app/trust/compliance/iso-27001/page.tsx')); return true } catch { return false }
})())

check('/trust/penetration-testing page file exists', (() => {
  try { readFileSync(join(process.cwd(), 'app/trust/penetration-testing/page.tsx')); return true } catch { return false }
})())

check('/trust/dpa page file exists', (() => {
  try { readFileSync(join(process.cwd(), 'app/trust/dpa/page.tsx')); return true } catch { return false }
})())

check('/trust/trust-pack page file exists', (() => {
  try { readFileSync(join(process.cwd(), 'app/trust/trust-pack/page.tsx')); return true } catch { return false }
})())

// Test: SOC 2 page does not expose confidential report
try {
  const soc2Content = readFileSync(join(process.cwd(), 'app/trust/compliance/soc-2/page.tsx'), 'utf-8')
  check('SOC 2 page does not expose confidential report content', !soc2Content.includes('BEGIN REPORT') && !soc2Content.includes('CONFIDENTIAL REPORT'))
} catch { check('SOC 2 page readable', false) }

// Test: ISO page does not invent certificate number (placeholder check)
try {
  const isoContent = readFileSync(join(process.cwd(), 'app/trust/compliance/iso-27001/page.tsx'), 'utf-8')
  check('ISO page uses placeholder for certificate number (no invented number)', isoContent.includes('TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR'))
} catch { check('ISO page readable', false) }

// Test: Pen test page does not claim no vulnerabilities
try {
  const penContent = readFileSync(join(process.cwd(), 'app/trust/penetration-testing/page.tsx'), 'utf-8')
  check('Pen test page does not claim no vulnerabilities', !penContent.toLowerCase().includes('no vulnerabilities') && !penContent.toLowerCase().includes('no issues found') && !penContent.toLowerCase().includes('fully secure'))
} catch { check('Pen test page readable', false) }

// Test: DPA request form validates required fields (check form file exists with validation)
try {
  const formContent = readFileSync(join(process.cwd(), 'app/trust/trust-pack/TrustPackForm.tsx'), 'utf-8')
  check('DPA request form includes client-side validation', formContent.includes('validate') && formContent.includes('required'))
} catch { check('TrustPackForm.tsx readable', false) }

// Test: Document request API validates input
try {
  const apiContent = readFileSync(join(process.cwd(), 'app/api/v1/trust/document-request/route.ts'), 'utf-8')
  check('Document request API validates fullName', apiContent.includes('fullName'))
  check('Document request API validates workEmail', apiContent.includes('workEmail'))
  check('Document request API returns 400 for invalid input', apiContent.includes('400'))
  check('Document request API returns 201 on success', apiContent.includes('201'))
} catch { check('Document request API route readable', false) }

// Test: Owner trust page exists
check('Owner trust page exists', (() => {
  try { readFileSync(join(process.cwd(), 'app/owner/trust/page.tsx')); return true } catch { return false }
})())

// Test: Sitemap includes compliance sub-pages
try {
  const sitemapContent = readFileSync(join(process.cwd(), 'app/sitemap.ts'), 'utf-8')
  check('Sitemap includes /trust/compliance', sitemapContent.includes('/trust/compliance'))
  check('Sitemap includes /trust/compliance/soc-2', sitemapContent.includes('/trust/compliance/soc-2'))
  check('Sitemap includes /trust/compliance/iso-27001', sitemapContent.includes('/trust/compliance/iso-27001'))
  check('Sitemap includes /trust/penetration-testing', sitemapContent.includes('/trust/penetration-testing'))
  check('Sitemap includes /trust/dpa', sitemapContent.includes('/trust/dpa'))
  check('Sitemap includes /trust/trust-pack', sitemapContent.includes('/trust/trust-pack'))
} catch { check('Sitemap readable', false) }

// Test: Footer includes SOC 2 and ISO 27001 links
try {
  const uiContent = readFileSync(join(process.cwd(), 'lib/i18n/ui.ts'), 'utf-8')
  check('Footer includes SOC 2 link', uiContent.includes('/trust/compliance/soc-2'))
  check('Footer includes ISO 27001 link', uiContent.includes('/trust/compliance/iso-27001'))
  check('Footer includes Compliance link', uiContent.includes('/trust/compliance'))
  check('Footer includes DPA link', uiContent.includes('/trust/dpa'))
} catch { check('ui.ts readable', false) }

// Test: No confidential docs committed to public docs
try {
  const publicDocsDir = join(process.cwd(), 'docs/trust-pack/public')
  const privateReadme = readFileSync(join(process.cwd(), 'docs/trust-pack/private/README.md'), 'utf-8')
  check('Private docs README warns against committing confidential docs', privateReadme.includes('Do not commit'))
  check('Public docs directory exists (summaries only)', (() => {
    try { readdirSync(publicDocsDir); return true } catch { return false }
  })())
} catch { check('Trust pack docs readable', false) }

// Test: No fake auditor names appear in trust pages
for (const route of ['app/trust/compliance/soc-2/page.tsx', 'app/trust/compliance/iso-27001/page.tsx', 'app/trust/penetration-testing/page.tsx']) {
  try {
    const content = readFileSync(join(process.cwd(), route), 'utf-8')
    for (const name of FORBIDDEN_FAKE_NAMES) {
      check(`No fake auditor name "${name}" in ${route}`, !content.includes(name))
    }
  } catch { /* already checked existence */ }
}

// Test: No fake certificate number appears
try {
  const isoContent = readFileSync(join(process.cwd(), 'app/trust/compliance/iso-27001/page.tsx'), 'utf-8')
  check('No invented certificate number in ISO page (no pattern like IS-12345)', !(/IS-\d{5}/.test(isoContent)) && !(/ISO-\d/.test(isoContent)))
} catch { /* already handled */ }

// Test: No personal name appears on public trust pages
for (const route of TRUST_ROUTES) {
  try {
    const content = readFileSync(join(process.cwd(), route), 'utf-8')
    for (const pattern of FORBIDDEN_PERSONAL_NAMES_PATTERNS) {
      check(`No personal name pattern in ${route}`, !pattern.test(content))
    }
  } catch { /* already checked existence */ }
}

// Test: All pages use Chameleon Eye / Chameleon Eye AI language
for (const route of ['app/trust/page.tsx', 'app/trust/compliance/page.tsx', 'app/trust/compliance/soc-2/page.tsx', 'app/trust/compliance/iso-27001/page.tsx']) {
  try {
    const content = readFileSync(join(process.cwd(), route), 'utf-8')
    const hasCompanyName = REQUIRED_COMPANY_NAMES.some(name => content.includes(name))
    check(`${route} uses Chameleon Eye AI / Chameleon Eye language`, hasCompanyName)
  } catch { /* already checked */ }
}

// Test: No forbidden claims in trust pages
for (const route of TRUST_ROUTES) {
  try {
    const content = readFileSync(join(process.cwd(), route), 'utf-8')
    for (const claim of FORBIDDEN_CLAIMS) {
      check(`No forbidden claim "${claim}" in ${route}`, !content.toLowerCase().includes(claim.toLowerCase()))
    }
  } catch { /* already failed existence check */ }
}

// Test: No provider keys in frontend
function scanDir(dir: string): string[] {
  const files: string[] = []
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory() && !['node_modules', '.next', 'lib/ai'].includes(entry.name)) {
        files.push(...scanDir(full))
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        files.push(full)
      }
    }
  } catch {}
  return files
}

const frontendFiles = scanDir(join(process.cwd(), 'components'))
for (const file of frontendFiles) {
  const content = readFileSync(file, 'utf-8')
  for (const forbidden of FORBIDDEN_PROVIDER_STRINGS) {
    check(`No provider key exposure in ${file.split('/').pop()}`, !content.includes(forbidden))
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
