import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { BotkeepClient, TARGET, jsonBody, requestKey, syncInput } from '../scripts/botkeep-client.mjs';
import { ASSETS, REPOSITORY, deployChecked, operationState, snapshotLive,
  validateInspection, validatePreflight, validateRelease } from '../scripts/botkeep-deployment.mjs';

const sourceCommit = 'a'.repeat(40);
const deployCommit = 'b'.repeat(40);
const revision = 'c'.repeat(64);
const oldId = '11111111-1111-1111-1111-111111111111';
const newId = '22222222-2222-2222-2222-222222222222';
const bytes = Buffer.from('fixture public asset');
const digest = createHash('sha256').update(bytes).digest('hex');
const release = { sourceRepository: REPOSITORY, sourceCommit,
  files: Object.fromEntries(ASSETS.map(path => [path, digest])) };
const workload = { id: TARGET.workload, runtime: 'static', name: 'Exact fixture name' };
const settings = { supported: true, revision, error: '', progress: null,
  source: { repository: REPOSITORY, branch: 'deploy', access: 'public', private: false,
    mode: 'merge', directory: '', commit: 'd'.repeat(40) },
  operation: { id: oldId, phase: 'complete' } };
const inspected = { repository: REPOSITORY, branch: 'deploy', private: false, commit: deployCommit };
const operation = (id, phase = 'complete') => ({ id, workloadId: TARGET.workload,
  operation: { id, phase }, confirmed: true, queueState: 'done', runtimeState: 'running' });
const json = (value, status = 200) => new Response(JSON.stringify(value), {
  status, headers: { 'Content-Type': 'application/json' } });
const noSleep = async () => {};
const clone = value => structuredClone(value);
function publicFetch(metadata = release) {
  return async (url, options) => {
    assert.equal(options.headers.Authorization, undefined);
    assert.equal(options.redirect, 'error');
    return new URL(url).pathname === '/release.json' ? json(metadata) : new Response(bytes);
  };
}
function fixtureClient() {
  let synced = false;
  const calls = [];
  return { calls,
    workload: async () => workload,
    source: async () => synced ? { ...settings, source: { ...settings.source, commit: deployCommit },
      operation: { id: newId, phase: 'complete' } } : settings,
    inspect: async key => { calls.push(['inspect', key]); return inspected; },
    sync: async (value, key) => { calls.push(['sync', value, key]); synced = true; return { deliberately: 'opaque acceptance' }; },
    operation: async id => operation(id),
  };
}
function options(client) {
  return { client, sourceCommit, deployCommit, logicalRunId: 'github-123', expectedRelease: release,
    isCurrent: async () => true, sleep: noSleep,
    verifyOptions: { fetchImpl: publicFetch(), sleep: noSleep }, pollOptions: { sleep: noSleep } };
}

test('preflight obtains exact confirmation from workload and revision from source settings', () => {
  assert.deepEqual(validatePreflight(workload, settings), {
    confirmation: workload.name, revision, previousOperation: oldId,
  });
  const nameWithSpace = { ...workload, name: ' exact name ' };
  assert.equal(validatePreflight(nameWithSpace, settings).confirmation, nameWithSpace.name);
  const input = syncInput({ ...validatePreflight(workload, settings), requestId: requestKey('sync', sourceCommit, 'run') });
  assert.equal(input.mode, 'merge');
  assert.equal(input.restart, true);
  assert.equal(input.autoPull, false);
  assert.equal(input.directory, '');
});

test('wrong workload, private/source mismatch, changed revision, and active recovery fail closed', () => {
  assert.throws(() => validatePreflight({ ...workload, id: newId }, settings), { code: 'WRONG_WORKLOAD' });
  for (const [key, value] of [['repository', 'another/repo'], ['branch', 'main'], ['private', true], ['mode', 'replace']]) {
    const changed = clone(settings); changed.source[key] = value;
    assert.throws(() => validatePreflight(workload, changed), { code: 'SOURCE_SETTINGS_MISMATCH' });
  }
  assert.throws(() => validatePreflight(workload, { ...settings, revision: deployCommit }), { code: 'SOURCE_SETTINGS_MISMATCH' });
  assert.throws(() => validatePreflight(workload, { ...settings, progress: {} }), { code: 'SOURCE_SETTINGS_MISMATCH' });
  assert.throws(() => validatePreflight(workload, { ...settings, operation: { id: oldId, phase: 'installing' } }), { code: 'HOST_OPERATION_ACTIVE' });
});

test('inspection must bind to exact checked public deploy commit', () => {
  validateInspection(inspected, deployCommit);
  for (const [key, value] of [['repository', 'another/repo'], ['branch', 'main'], ['private', true], ['commit', sourceCommit]]) {
    assert.throws(() => validateInspection({ ...inspected, [key]: value }, deployCommit), { code: 'INSPECTION_MISMATCH' });
  }
});

test('operation requires matching identifiers and observed confirmed complete/running tuple', () => {
  assert.equal(operationState(operation(newId), newId), 'succeeded');
  assert.equal(operationState(operation(newId, 'installing'), newId), 'pending');
  assert.throws(() => operationState(operation(oldId), newId), { code: 'OPERATION_BINDING_MISMATCH' });
  assert.throws(() => operationState({ ...operation(newId), workloadId: oldId }, newId), { code: 'OPERATION_BINDING_MISMATCH' });
  for (const changed of [{ ...operation(newId), confirmed: false }, operation(newId, 'failed'),
    { ...operation(newId), runtimeState: 'stopped' }]) {
    assert.throws(() => operationState(changed, newId), { code: 'UNVERIFIED_OPERATION_STATE' });
  }
});

test('rollback copies only allowlisted public files with verified SHA256 and release metadata', async () => {
  const saved = new Map();
  const result = await snapshotLive({ fetchImpl: publicFetch(), save: async (path, value) => saved.set(path, value) });
  assert.equal(result.sourceCommit, sourceCommit);
  assert.equal(saved.size, 20);
  assert.deepEqual(saved.get('index.html'), bytes);
  assert.equal(JSON.parse(saved.get('release.json')).sourceCommit, sourceCommit);
});

test('rollback refuses hash mismatch, unsafe manifests, or a release changing during capture', async () => {
  const wrong = clone(release); wrong.files['index.html'] = '0'.repeat(64);
  await assert.rejects(snapshotLive({ fetchImpl: publicFetch(wrong), save: async () => {} }), { code: 'ROLLBACK_HASH_MISMATCH' });
  const unsafe = clone(release); delete unsafe.files['index.html']; unsafe.files['../private'] = digest;
  assert.throws(() => validateRelease(unsafe), { code: 'INVALID_RELEASE' });
  let reads = 0;
  await assert.rejects(snapshotLive({ save: async () => {}, fetchImpl: async url => {
    if (new URL(url).pathname === '/release.json') return json(++reads === 1 ? release : { ...release, sourceCommit: deployCommit });
    return new Response(bytes);
  } }), { code: 'LIVE_CHANGED' });
});

test('controlled deployment ignores opaque acceptance and verifies new operation, branch, live commit and assets', async () => {
  const client = fixtureClient();
  const result = await deployChecked(options(client));
  assert.equal(result.verified, true);
  assert.equal(result.operationId, newId);
  const sent = client.calls.find(call => call[0] === 'sync');
  assert.equal(sent[1].confirmation, workload.name);
  assert.equal(sent[1].revision, revision);
  assert.equal(sent[1].requestId, sent[2]);
});

test('superseded main commit skips before any API request or before sync', async () => {
  const client = fixtureClient();
  assert.deepEqual(await deployChecked({ ...options(client), isCurrent: async () => false }), { skipped: true });
  assert.equal(client.calls.length, 0);
  let checks = 0;
  assert.deepEqual(await deployChecked({ ...options(client), isCurrent: async () => ++checks === 1 }), { skipped: true });
  assert.equal(client.calls.filter(call => call[0] === 'sync').length, 0);
});

test('acceptance without a new operation never reports success or resubmits', async () => {
  const client = fixtureClient(); client.source = async () => settings;
  await assert.rejects(deployChecked(options(client)), { code: 'OPERATION_NOT_OBSERVED' });
  assert.equal(client.calls.filter(call => call[0] === 'sync').length, 1);
});

test('live release from another repository or source is never accepted', async () => {
  await assert.rejects(deployChecked({ ...options(fixtureClient()), verifyOptions: {
    fetchImpl: publicFetch({ ...release, sourceRepository: 'another/repo' }), sleep: noSleep, attempts: 1,
  } }), { code: 'LIVE_RELEASE_MISMATCH' });
});

test('request keys are stable across a workflow retry and separate release/stage', () => {
  assert.equal(requestKey('sync', sourceCommit, 'github-123'), requestKey('sync', sourceCommit, 'github-123'));
  assert.notEqual(requestKey('sync', sourceCommit, 'github-123'), requestKey('inspect', sourceCommit, 'github-123'));
  assert.notEqual(requestKey('sync', sourceCommit, 'github-123'), requestKey('sync', deployCommit, 'github-123'));
});

test('GitHub raw text/plain metadata is parsed only through an explicit public-reader option', async () => {
  const plain = () => new Response(JSON.stringify(release), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  await assert.rejects(jsonBody(plain()), { code: 'INVALID_RESPONSE' });
  assert.deepEqual(await jsonBody(plain(), { allowTextPlain: true }), release);
  await assert.rejects(jsonBody(new Response('<html>error</html>', {
    headers: { 'Content-Type': 'text/html' },
  }), { allowTextPlain: true }), { code: 'INVALID_RESPONSE' });
});

test('API GET retries transient failure; POST timeout is single and never exposes credentials', async () => {
  let reads = 0;
  const apiKey = 'fixture-secret-never-log';
  const client = new BotkeepClient({ apiKey, sleep: noSleep, fetchImpl: async (url, init) => {
    assert.equal(new URL(url).origin, TARGET.api);
    assert.equal(init.headers.Authorization, `Bearer ${apiKey}`);
    assert.equal(init.redirect, 'error');
    return ++reads === 1 ? new Response('', { status: 429, headers: { 'retry-after': '0' } }) : json(workload);
  } });
  assert.equal((await client.workload()).id, TARGET.workload);
  assert.equal(reads, 2);
  let writes = 0;
  const uncertain = new BotkeepClient({ apiKey, fetchImpl: async () => { writes++; throw new Error(apiKey); } });
  await assert.rejects(uncertain.sync({ revision, confirmation: workload.name,
    requestId: requestKey('sync', sourceCommit, 'run') }, requestKey('sync', sourceCommit, 'run')),
  error => error.code === 'TRANSPORT_UNCERTAIN' && error.message.includes('sync request') && !error.message.includes(apiKey));
  assert.equal(writes, 1);
});
