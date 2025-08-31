const fs = require('fs');
const path = require('path');

/**
 * Script to generate evidence files for PDF documentation
 * Requires server to be running on localhost:3000
 */

const BASE_URL = 'http://localhost:3000';
const EVIDENCE_DIR = './evidences';

// Ensure evidences directory exists
if (!fs.existsSync(EVIDENCE_DIR)) {
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
}

// Endpoints to test
const endpoints = [
  { name: 'health', path: '/health' },
  { name: 'raw-payments', path: '/raw/payments' },
  { name: 'payments-by-property', path: '/analytics/payments-by-property' },
  { name: 'sales-by-month', path: '/analytics/sales-by-month' },
  { name: 'sales-share-by-type', path: '/analytics/sales-share-by-type' },
];

async function fetchAndSave(endpoint) {
  try {
    console.log(`📡 Fetching ${endpoint.path}...`);

    const response = await fetch(`${BASE_URL}${endpoint.path}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const filename = path.join(EVIDENCE_DIR, `${endpoint.name}.json`);

    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`✅ Saved ${filename}`);

    return data;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint.path}:`, error.message);
    return null;
  }
}

async function generateMetadata(results) {
  const metadata = {
    generated_at: new Date().toISOString(),
    server_url: BASE_URL,
    endpoints_tested: endpoints.length,
    success_count: results.filter((r) => r !== null).length,
    results: endpoints.map((endpoint, index) => ({
      name: endpoint.name,
      path: endpoint.path,
      success: results[index] !== null,
      filename: `${endpoint.name}.json`,
    })),
  };

  const metadataFile = path.join(EVIDENCE_DIR, 'metadata.json');
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));
  console.log(`📋 Generated ${metadataFile}`);

  return metadata;
}

function generateCurlCommands() {
  const commands = endpoints
    .map((endpoint) => `curl -s ${BASE_URL}${endpoint.path} | jq`)
    .join('\n');

  const curlFile = path.join(EVIDENCE_DIR, 'curl-commands.txt');
  fs.writeFileSync(curlFile, commands);
  console.log(`📝 Generated ${curlFile}`);
}

async function main() {
  console.log('🎯 HOW VII - Evidence Generation Script');
  console.log(`🌐 Testing server at: ${BASE_URL}`);
  console.log(`📁 Output directory: ${EVIDENCE_DIR}`);
  console.log('');

  // Test all endpoints
  const results = [];
  for (const endpoint of endpoints) {
    const result = await fetchAndSave(endpoint);
    results.push(result);
  }

  // Generate metadata
  const metadata = await generateMetadata(results);

  // Generate curl commands
  generateCurlCommands();

  console.log('');
  console.log('📊 Evidence Generation Summary:');
  console.log(`✅ Success: ${metadata.success_count}/${metadata.endpoints_tested}`);
  console.log(`📁 Files generated in: ${EVIDENCE_DIR}`);

  if (metadata.success_count === metadata.endpoints_tested) {
    console.log('🎉 All endpoints tested successfully!');
    console.log('📋 Evidence files ready for PDF documentation.');
  } else {
    console.log('⚠️  Some endpoints failed. Check server status.');
    process.exit(1);
  }
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
  console.error('❌ This script requires Node.js 18+ for fetch API');
  process.exit(1);
}

main().catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});
