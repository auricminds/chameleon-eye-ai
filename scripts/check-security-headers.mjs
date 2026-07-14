// Security headers verification script
// Run: node scripts/check-security-headers.mjs [url]
// Default URL: https://chameleoneye.ai

const url = process.argv[2] || 'https://chameleoneye.ai';

const REQUIRED_HEADERS = [
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
  'permissions-policy',
  'content-security-policy',
];

const RECOMMENDED_HEADERS = [
  'strict-transport-security',
];

async function checkHeaders(targetUrl) {
  console.log(`\nChecking security headers for: ${targetUrl}\n`);

  let response;
  try {
    response = await fetch(targetUrl, { method: 'HEAD', redirect: 'follow' });
  } catch (err) {
    console.error(`Failed to fetch ${targetUrl}: ${err.message}`);
    process.exit(1);
  }

  let passed = 0;
  let failed = 0;
  let warned = 0;

  for (const header of REQUIRED_HEADERS) {
    const value = response.headers.get(header);
    if (value) {
      console.log(`PASS ${header}: ${value}`);
      passed++;
    } else {
      console.log(`FAIL MISSING: ${header}`);
      failed++;
    }
  }

  for (const header of RECOMMENDED_HEADERS) {
    const value = response.headers.get(header);
    if (value) {
      console.log(`PASS ${header}: ${value}`);
      passed++;
    } else {
      console.log(`WARN RECOMMENDED MISSING: ${header}`);
      warned++;
    }
  }

  console.log(`\nResult: ${passed} passed, ${failed} required missing, ${warned} recommended missing`);

  if (failed > 0) {
    console.log('\nSecurity header check FAILED');
    process.exit(1);
  } else if (warned > 0) {
    console.log('\nSecurity header check PASSED with warnings');
  } else {
    console.log('\nSecurity header check PASSED');
  }
}

checkHeaders(url);
