// Scans frontend files for exposed provider/model strings
// Run with: node scripts/check-provider-leaks.mjs
// Lines containing "// trust-ok" are suppressed from violation reporting.
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const FORBIDDEN = [
  'NEXT_PUBLIC_OPENROUTER',
  'NEXT_PUBLIC_AI',
  'openrouter.ai/api',
  'claude-3',
  'gpt-4',
  'gemini-pro',
  'deepseek',
  'llama-3',
  'qwen',
];

const SCAN_DIRS = ['app', 'components', 'lib'];
const SKIP_DIRS = ['node_modules', '.next', 'lib/ai', 'compare', 'lib/demo/architecture'];

const violations = [];

function shouldSkip(filePath) {
  return SKIP_DIRS.some((skip) => filePath.includes(skip));
}

function scanDir(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry);

    if (shouldSkip(fullPath)) continue;

    let stat;
    try {
      stat = statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content;
      try {
        content = readFileSync(fullPath, 'utf8');
      } catch {
        continue;
      }

      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Allow suppression with inline comment: // trust-ok
        if (line.includes('trust-ok')) continue;

        for (const forbidden of FORBIDDEN) {
          if (line.toLowerCase().includes(forbidden.toLowerCase())) {
            violations.push({
              file: fullPath,
              line: i + 1,
              content: line.trim(),
              pattern: forbidden,
            });
          }
        }
      }
    }
  }
}

const cwd = process.cwd();

for (const dir of SCAN_DIRS) {
  scanDir(join(cwd, dir));
}

if (violations.length === 0) {
  console.log('✓ No provider/model leaks found in frontend files.');
  process.exit(0);
} else {
  console.error(`\n✗ Found ${violations.length} provider/model leak(s):\n`);
  for (const v of violations) {
    const relPath = v.file.replace(cwd + '/', '');
    console.error(`  ${relPath}:${v.line} — matched pattern "${v.pattern}"`);
    console.error(`    ${v.content}\n`);
  }
  process.exit(1);
}
