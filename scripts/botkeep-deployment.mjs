import { createHash } from 'node:crypto';
import { DeploymentError, TARGET, jsonBody, pollOperation, requestKey, verifyLiveRelease } from './botkeep-client.mjs';

export const REPOSITORY = 'edward1503/adbs-learning-lab';
export const ASSETS = Object.freeze([
  'app.js', 'course-data.js', 'editorial.css', 'index.html',
  'labs/core.js', 'labs/labs.css', 'labs/relational.js', 'labs/sql-worker.js',
  'labs/sql.css', 'labs/sql.js', 'labs/systems.js', 'quiz-data.js', 'quiz.js', 'styles.css',
  'vendor/noto-serif-LICENSE.txt', 'vendor/noto-serif-vietnamese.ttf',
  'vendor/sql-js-LICENSE.txt', 'vendor/sql-wasm.js', 'vendor/sql-wasm.wasm',
]);
const SHA = /^[a-f0-9]{40}$/;
const DIGEST = /^[a-f0-9]{64}$/;
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const ACTIVE = new Set(['queued', 'dispatching', 'installing', 'retrying', 'waiting', 'removing']);
const fail = (code, message) => { throw new DeploymentError(code, message); };
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

export function validateRelease(release, expectedCommit) {
  if (release?.sourceRepository !== REPOSITORY || !SHA.test(release?.sourceCommit ?? '') ||
      (expectedCommit !== undefined && release.sourceCommit !== expectedCommit) ||
      !release.files || Array.isArray(release.files) ||
      Object.keys(release.files).length !== ASSETS.length ||
      ASSETS.some(path => !DIGEST.test(release.files[path] ?? ''))) {
    fail('INVALID_RELEASE', 'Release metadata does not match the expected application and asset manifest.');
  }
  return release;
}

export async function publicResponse(url, fetchImpl = fetch) {
  let response;
  try {
    response = await fetchImpl(url, { redirect: 'error', cache: 'no-store',
      signal: AbortSignal.timeout(10000), headers: { Accept: '*/*' } });
  } catch { fail('PUBLIC_FETCH_FAILED', 'Public release assets could not be read.'); }
  if (response.status !== 200) {
    await response.body?.cancel();
    fail('PUBLIC_FETCH_FAILED', `Public release asset returned HTTP ${response.status}.`);
  }
  return response;
}

export async function snapshotLive({ fetchImpl = fetch, save } = {}) {
  if (typeof save !== 'function') fail('INVALID_SNAPSHOT', 'A rollback asset writer is required.');
  const response = await publicResponse(TARGET.release, fetchImpl);
  const release = validateRelease(await jsonBody(response));
  // A fixed allowlist prevents public metadata from requesting unrelated files or paths.
  for (const path of ASSETS) {
    const asset = await publicResponse(new URL(path, TARGET.release), fetchImpl);
    const bytes = Buffer.from(await asset.arrayBuffer());
    if (bytes.length > 8 * 1024 * 1024 || createHash('sha256').update(bytes).digest('hex') !== release.files[path]) {
      fail('ROLLBACK_HASH_MISMATCH', 'Current live assets do not match their release manifest; deployment is stopped.');
    }
    await save(path, bytes);
  }
  // Re-read metadata to avoid mixing releases while a concurrent import is completing.
  const current = validateRelease(await jsonBody(await publicResponse(TARGET.release, fetchImpl)));
  if (current.sourceCommit !== release.sourceCommit || JSON.stringify(current.files) !== JSON.stringify(release.files)) {
    fail('LIVE_CHANGED', 'The live release changed while saving rollback assets.');
  }
  await save('release.json', Buffer.from(JSON.stringify(release, null, 2) + '\n'));
  return release;
}

export function validatePreflight(workload, settings) {
  if (workload?.id !== TARGET.workload || workload.runtime !== 'static' ||
      typeof workload.name !== 'string' || workload.name.length < 2 || workload.name.length > 64) {
    fail('WRONG_WORKLOAD', 'Deployment is restricted to the verified ADBS static workload.');
  }
  const source = settings?.source;
  if (settings?.supported !== true || !DIGEST.test(settings?.revision ?? '') ||
      settings.error !== '' || settings.progress !== null || source?.repository !== REPOSITORY ||
      source.branch !== TARGET.branch || source.access !== 'public' || source.private !== false ||
      source.mode !== 'merge' || source.directory !== '' || !SHA.test(source.commit ?? '')) {
    fail('SOURCE_SETTINGS_MISMATCH', 'Existing hosting source settings do not match the verified public ADBS deployment.');
  }
  if (!UUID.test(settings?.operation?.id ?? '') || settings.operation.phase !== 'complete') {
    fail('HOST_OPERATION_ACTIVE', 'An existing hosting operation or recovery state must be resolved before deployment.');
  }
  // Official UI uses exactly workload.name; do not log, trim, persist, or invent it.
  return { revision: settings.revision, confirmation: workload.name, previousOperation: settings.operation.id };
}

export function validateInspection(inspected, deployCommit) {
  if (inspected?.repository !== REPOSITORY || inspected.branch !== TARGET.branch ||
      inspected.private !== false || !SHA.test(deployCommit ?? '') || inspected.commit !== deployCommit) {
    fail('INSPECTION_MISMATCH', 'Botkeep preview does not match the checked public deployment commit.');
  }
}

export function operationState(operation, operationId) {
  if (operation?.id !== operationId || operation?.operation?.id !== operationId ||
      operation.workloadId !== TARGET.workload) {
    fail('OPERATION_BINDING_MISMATCH', 'Operation status does not belong to this deployment target.');
  }
  const phase = operation.operation.phase;
  if (ACTIVE.has(phase)) return 'pending';
  // Developer GET confirmed this intermediate state while the imported static server started.
  if (phase === 'complete' && operation.confirmed === true && operation.queueState === 'done' &&
      operation.runtimeState === 'starting') return 'pending';
  // This exact successful tuple was observed from the developer endpoint.
  if (phase === 'complete' && operation.confirmed === true && operation.queueState === 'done' &&
      operation.runtimeState === 'running') return 'succeeded';
  fail('UNVERIFIED_OPERATION_STATE', 'Hosting has not reported the verified successful terminal state; inspect it before retrying.');
}

export function pollSettings(value = '900') {
  if (typeof value !== 'string' || !/^\d+$/.test(value) || Number(value) < 120 || Number(value) > 900) {
    fail('INVALID_POLL_LIMIT', 'Operation timeout must be between 120 and 900 seconds.');
  }
  return { maxMs: Number(value) * 1000, maxPolls: Math.ceil(Number(value) / 10), intervalMs: 10000 };
}

export async function deployChecked({ client, sourceCommit, deployCommit, logicalRunId, expectedRelease,
  isCurrent, sleep = pause, verifyOptions, pollOptions, onAccepted = () => {} } = {}) {
  if (!SHA.test(sourceCommit ?? '') || !SHA.test(deployCommit ?? '') || typeof isCurrent !== 'function') {
    fail('INVALID_RELEASE_CONTEXT', 'Checked source, deployment commit, and freshness guard are required.');
  }
  validateRelease(expectedRelease, sourceCommit);
  if (!await isCurrent()) return { skipped: true };
  const [workload, settings] = await Promise.all([client.workload(), client.source()]);
  const values = validatePreflight(workload, settings);
  operationState(await client.operation(values.previousOperation), values.previousOperation);
  validateInspection(await client.inspect(requestKey('inspect', sourceCommit, logicalRunId)), deployCommit);
  if (!await isCurrent()) return { skipped: true };
  const key = requestKey('sync', sourceCommit, logicalRunId);
  // POST is sent once. Its opaque 202 response is acceptance only, never completion.
  await client.sync({ revision: values.revision, confirmation: values.confirmation, requestId: key }, key);
  onAccepted();
  // GET /github supplies operation.id, already verified in read-only discovery.
  let operationId;
  for (let attempt = 0; attempt < 12; attempt++) {
    const current = await client.source();
    const source = current?.source;
    if (source?.repository !== REPOSITORY || source.branch !== TARGET.branch || source.access !== 'public' || source.private !== false) {
      fail('SOURCE_SETTINGS_MISMATCH', 'Hosting source changed during the deployment.');
    }
    if (UUID.test(current?.operation?.id ?? '') && current.operation.id !== values.previousOperation) {
      operationId = current.operation.id;
      break;
    }
    if (attempt < 11) await sleep(2500);
  }
  if (!operationId) fail('OPERATION_NOT_OBSERVED', 'Sync was accepted but its operation was not observed; do not resubmit automatically.');
  await pollOperation(client, operationId, value => operationState(value, operationId), pollOptions);
  const finalSource = (await client.source())?.source;
  if (finalSource?.commit !== deployCommit || finalSource.repository !== REPOSITORY || finalSource.branch !== TARGET.branch) {
    fail('HOST_SOURCE_MISMATCH', 'The completed hosting import does not match the checked deployment commit.');
  }
  validateRelease(await verifyLiveRelease(sourceCommit, verifyOptions), sourceCommit);
  const live = await snapshotLive({ fetchImpl: verifyOptions?.fetchImpl, save: async () => {} });
  validateRelease(live, sourceCommit);
  if (ASSETS.some(path => live.files[path] !== expectedRelease.files[path])) {
    fail('LIVE_ASSET_MISMATCH', 'The live files do not match the checked deployment artifact.');
  }
  return { verified: true, sourceCommit, deployCommit, operationId };
}
