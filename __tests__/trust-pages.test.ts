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
]

const FORBIDDEN_PROVIDER_STRINGS = [
  'NEXT_PUBLIC_OPENROUTER',
  'NEXT_PUBLIC_AI',
  'openrouter.ai/api',
]

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

// Test 1–11: Trust pages exist
for (const route of TRUST_ROUTES) {
  try {
    readFileSync(join(process.cwd(), route))
    check(`Trust page exists: ${route}`, true)
  } catch {
    check(`Trust page exists: ${route}`, false)
  }
}

// Test 12–14: No fake certification claims in trust pages
for (const route of TRUST_ROUTES) {
  try {
    const content = readFileSync(join(process.cwd(), route), 'utf-8')
    for (const claim of FORBIDDEN_CLAIMS) {
      check(`No fake claim "${claim}" in ${route}`, !content.includes(claim))
    }
  } catch { /* already failed existence check */ }
}

// Test 15: No provider keys in frontend
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
