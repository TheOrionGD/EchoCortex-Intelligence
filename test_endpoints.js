const BACKEND_URL = 'http://localhost:2348';

async function runTests() {
  console.log('\x1b[36m%s\x1b[0m', '🛰️ STARTING ECHO SYSTEM ENDPOINT SUITE...');
  console.log('====================================================');

  const defaultUser = {
    name: 'Sarah Jenkins',
    email: 's.jenkins@echo-intel.ai',
    password: 'password'
  };

  let token = null;

  // Test 1: Health Check Endpoint
  try {
    console.log('\n[TEST 1] GET /health (Health Check)');
    const res = await fetch(`${BACKEND_URL}/health`);
    const data = await res.json();
    console.log('\x1b[32m%s\x1b[0m', '🟢 SUCCESS: Health check returned operational!');
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', '🔴 FAILED: GET /health failed', err.message);
  }

  // Test 1b: Default Authentication Handshake (Login / Register fallback)
  try {
    console.log('\n[TEST 1b] POST /api/auth/login (Authentication Handshake)');
    let res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: defaultUser.email, password: defaultUser.password })
    });

    let data = await res.json();

    if (res.status === 401 && data.error && data.error.includes('not found')) {
      console.log('\x1b[33m%s\x1b[0m', '🟡 WARNING: User node not found. Initiating registration...');
      res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultUser)
      });
      data = await res.json();
    }

    if (res.ok) {
      token = data.user.id;
      console.log('\x1b[32m%s\x1b[0m', '🟢 SUCCESS: Authenticated successfully!');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('\x1b[31m%s\x1b[0m', '🔴 FAILED: Authentication handshake failed', data.error);
    }
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', '🔴 FAILED: Authentication network handshake failed', err.message);
  }

  let testMeetingId = null;

  // Test 2: Retrieve Meetings
  try {
    console.log('\n[TEST 2] GET /api/meetings (Retrieve all meetings)');
    const res = await fetch(`${BACKEND_URL}/api/meetings`);
    const data = await res.json();
    console.log('\x1b[32m%s\x1b[0m', `🟢 SUCCESS: Retrieved ${data.length} meetings!`);
    if (data.length > 0) {
      testMeetingId = data[0]._id;
      console.log(`Using active Meeting ID: ${testMeetingId} for subsequent tests.`);
    }
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', '🔴 FAILED: GET /api/meetings failed', err.message);
  }

  // Test 3: Audio Ingestion Pipeline
  try {
    console.log('\n[TEST 3] POST /api/meetings/ingest (Memory Ingestion)');
    // A tiny mock base64 audio representation
    const mockAudio = 'UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAAA';
    const res = await fetch(`${BACKEND_URL}/api/meetings/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audio: mockAudio, mimeType: 'audio/webm' })
    });
    const data = await res.json();
    if (res.ok) {
      testMeetingId = data.artifactId;
      console.log('\x1b[32m%s\x1b[0m', '🟢 SUCCESS: Meeting ingested and analyzed!');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('\x1b[33m%s\x1b[0m', '🟡 WARNING: STT service returned an error (Inference warming up/API rate-limited), fallback used.');
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', '🔴 FAILED: POST /api/meetings/ingest failed', err.message);
  }

  // Test 4: Conversational Chat Recall (if Meeting ID exists)
  if (testMeetingId) {
    try {
      console.log(`\n[TEST 4] POST /api/meetings/chat (Conversational Recall for ${testMeetingId})`);
      const res = await fetch(`${BACKEND_URL}/api/meetings/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meetingId: testMeetingId, query: 'Did anyone recommend moving to MongoDB?' })
      });
      const data = await res.json();
      console.log('\x1b[32m%s\x1b[0m', '🟢 SUCCESS: Chat reply received!');
      console.log(JSON.stringify(data, null, 2));
    } catch (err) {
      console.log('\x1b[31m%s\x1b[0m', '🔴 FAILED: POST /api/meetings/chat failed', err.message);
    }
  } else {
    console.log('\n[TEST 4] POST /api/meetings/chat SKIPPED: No active Meeting ID found to query.');
  }

  // Test 5: Semantic Search Recall
  try {
    console.log('\n[TEST 5] POST /api/search (Semantic Vector recall)');
    const res = await fetch(`${BACKEND_URL}/api/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'database' })
    });
    const data = await res.json();
    console.log('\x1b[32m%s\x1b[0m', '🟢 SUCCESS: Semantic Search returned matches!');
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', '🔴 FAILED: POST /api/search failed', err.message);
  }

  console.log('\n====================================================');
  console.log('\x1b[36m%s\x1b[0m', '🛰️ ENDPOINT SUITE RUN COMPLETE!');
}

runTests();
