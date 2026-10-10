import { createHash } from 'node:crypto';

export const ACTIONS_SECRET_NAME = 'BOTKEEP_API_KEY';

export const TARGET = Object.freeze({
  api: 'https://api.botkeep.cloud',
  workload: '9b7d483e-c0a1-4d0c-ba04-f0df64ae972c',
  repository: 'https://github.com/edward1503/adbs-learning-lab',
  branch: 'deploy',
  release: 'https://adbs-learning-lab.bot-keep.xyz/release.json',
});

export class DeploymentError extends Error {
  constructor(code, message, status) {
    super(message);
    this.name = 'DeploymentError';
    this.code = code;
    if (status !== undefined) this.status = status;
  }
}

const fail = (code, message, status) => { throw new DeploymentError(code, message, status); };
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const keyPattern = /^[A-Za-z0-9_-]{16,64}$/;
const shaPattern = /^[a-f0-9]{40}$/;

function requireKey(value) {
  if (!keyPattern.test(value ?? '')) fail('INVALID_IDEMPOTENCY_KEY', 'A valid stable request key is required.');
}

export function requestKey(stage, sourceCommit, logicalRunId) {
  if (!['inspect', 'sync'].includes(stage) || !shaPattern.test(sourceCommit ?? '') ||
      typeof logicalRunId !== 'string' || !logicalRunId.length || logicalRunId.length > 128) {
    fail('INVALID_RELEASE_CONTEXT', 'Source commit and logical run ID are required.');
  }
  // Keep the logicalRunId unchanged when retrying an uncertain deployment.
  return createHash('sha256').update([stage, TARGET.workload, sourceCommit, logicalRunId].join('|')).digest('hex');
}

export function inspectInput() {
  return { repository: TARGET.repository, branch: TARGET.branch, access: 'public' };
}

export function syncInput({ revision, confirmation, requestId } = {}) {
  if (!/^[a-f0-9]{64}$/.test(revision ?? '') || typeof confirmation !== 'string' ||
      confirmation.length < 2 || confirmation.length > 64) {
    fail('INVALID_INSPECTION_VALUES', 'Verified inspection revision and confirmation are required.');
  }
  requireKey(requestId);
  return { ...inspectInput(), mode: 'merge', directory: '', autoPull: false,
    revision, confirmation, requestId, restart: true };
}

async function jsonBody(response) {
  if (!/^application\/(?:[\w.+-]*\+)?json(?:\s*;|$)/i.test(response.headers.get('content-type') ?? '')) {
    fail('INVALID_RESPONSE', 'Expected a JSON response; response content is not logged.');
  }
  if (!response.body) fail('INVALID_RESPONSE', 'Expected a JSON response body.');
  const reader = response.body.getReader();
  const chunks = [];
  let length = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 1024 * 1024) {
        await reader.cancel();
        fail('OVERSIZED_RESPONSE', 'Response exceeds the safe JSON size limit.');
      }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch (error) {
    if (error instanceof DeploymentError) throw error;
    // Never propagate server payloads, auth headers, or transport error details.
    fail('INVALID_RESPONSE', 'Could not decode JSON response; response content is not logged.');
  } finally {
    reader.releaseLock();
  }
}

export class BotkeepClient {
  #apiKey;
  #fetch;
  #sleep;
  #postRetryConfirmed;

  constructor({ apiKey, fetchImpl = fetch, sleep = pause, postRetryConfirmed = false } = {}) {
    if (typeof apiKey !== 'string' || !apiKey.trim() || /[\r\n]/.test(apiKey)) {
      fail('MISSING_KEY', 'An authorized Botkeep key is required; never supply it as a command argument.');
    }
    this.#apiKey = apiKey;
    this.#fetch = fetchImpl;
    this.#sleep = sleep;
    this.#postRetryConfirmed = postRetryConfirmed === true;
  }

  async #request(path, { method = 'GET', body, idempotencyKey, expectedStatus = 200 } = {}) {
    if (method === 'POST') requireKey(idempotencyKey);
    const serialized = body === undefined ? undefined : JSON.stringify(body);
    const attempts = method === 'GET' || this.#postRetryConfirmed ? 3 : 1;
    for (let attempt = 0; attempt < attempts; attempt++) {
      let response;
      try {
        response = await this.#fetch(new URL(path, TARGET.api), {
          method, redirect: 'error', signal: AbortSignal.timeout(10000),
          headers: { Authorization: `Bearer ${this.#apiKey}`, Accept: 'application/json',
            ...(serialized === undefined ? {} : { 'Content-Type': 'application/json' }),
            ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}) },
          body: serialized,
        });
      } catch {
        if (attempt + 1 < attempts) {
          await this.#sleep(500 * 2 ** attempt);
          continue;
        }
        fail('TRANSPORT_UNCERTAIN', 'Request outcome is uncertain. Preserve its request key; do not create a new logical request.');
      }
      if (response.status === expectedStatus) return jsonBody(response);
      const retryable = response.status === 429 || [500, 502, 503, 504].includes(response.status);
      if (retryable && attempt + 1 < attempts) {
        await response.body?.cancel();
        const retryAfter = response.headers.get('retry-after');
        const seconds = retryAfter === null ? NaN : Number(retryAfter);
        const delay = Number.isFinite(seconds) && seconds >= 0 ? Math.min(seconds * 1000, 5000) : 500 * 2 ** attempt;
        await this.#sleep(delay);
        continue;
      }
      await response.body?.cancel();
      fail('HTTP_FAILURE', `Botkeep returned HTTP ${response.status}; response content is not logged.`, response.status);
    }
    fail('RETRIES_EXHAUSTED', 'The bounded request attempts were exhausted.');
  }

  inspect(idempotencyKey) {
    return this.#request(`/api/v1/developer/workloads/${TARGET.workload}/github/inspect`,
      { method: 'POST', body: inspectInput(), idempotencyKey });
  }

  workload() {
    return this.#request(`/api/v1/developer/workloads/${TARGET.workload}`);
  }

  source() {
    return this.#request(`/api/v1/developer/workloads/${TARGET.workload}/github`);
  }

  sync(values, idempotencyKey) {
    const body = syncInput(values);
    return this.#request(`/api/v1/developer/workloads/${TARGET.workload}/github/sync`,
      { method: 'POST', body, idempotencyKey, expectedStatus: 202 });
  }

  operation(operationId) {
    if (typeof operationId !== 'string' || !operationId.length || operationId.length > 200) {
      fail('INVALID_OPERATION_ID', 'A verified operation identifier is required.');
    }
    return this.#request(`/api/v1/developer/operations/${encodeURIComponent(operationId)}`);
  }
}

export function requireResponseContract(contract) {
  const names = ['inspectionValues', 'operationId', 'operationState'];
  if (!contract || names.some(name => typeof contract[name] !== 'function')) {
    fail('RESPONSE_CONTRACT_UNVERIFIED',
      'Botkeep inspect, sync, and operation success responses have no OpenAPI schema. Verified response adapters are required before deployment.');
  }
}

export async function pollOperation(client, operationId, operationState, {
  sleep = pause, now = Date.now, maxPolls = 24, maxMs = 120000, intervalMs = 5000,
} = {}) {
  if (typeof operationState !== 'function') fail('RESPONSE_CONTRACT_UNVERIFIED', 'Operation status mapping is unverified.');
  if (!Number.isInteger(maxPolls) || maxPolls < 1 || maxPolls > 24 || maxMs < 1 || maxMs > 120000 ||
      intervalMs < 0 || intervalMs > 5000) fail('INVALID_POLL_LIMIT', 'Polling limits are invalid.');
  const start = now();
  for (let attempt = 0; attempt < maxPolls && now() - start < maxMs; attempt++) {
    // These three states are our internal adapter protocol, not assumed Botkeep fields or values.
    const state = operationState(await client.operation(operationId));
    if (state === 'succeeded') return;
    if (state === 'failed') fail('OPERATION_FAILED', 'The deployment operation failed; response content is not logged.');
    if (state !== 'pending') fail('INVALID_OPERATION_STATE', 'The verified adapter did not return a recognized internal state.');
    if (attempt + 1 < maxPolls) await sleep(intervalMs);
  }
  fail('OPERATION_TIMEOUT', 'Operation polling reached its bound; do not infer deployment success.');
}

export async function verifyLiveRelease(sourceCommit, {
  fetchImpl = fetch, sleep = pause, attempts = 12,
} = {}) {
  if (!shaPattern.test(sourceCommit ?? '') || !Number.isInteger(attempts) || attempts < 1 || attempts > 12) {
    fail('INVALID_RELEASE_CONTEXT', 'Expected source commit and verification bounds are required.');
  }
  for (let attempt = 0; attempt < attempts; attempt++) {
    let response;
    try {
      const url = new URL(TARGET.release);
      url.searchParams.set('expected', sourceCommit);
      url.searchParams.set('attempt', String(attempt));
      response = await fetchImpl(url, { redirect: 'error', signal: AbortSignal.timeout(5000),
        cache: 'no-store', headers: { Accept: 'application/json' } });
    } catch { /* A temporarily unavailable host is retried within the fixed bound. */ }
    if (response?.status === 200) {
      const release = await jsonBody(response);
      if (release && typeof release === 'object' && !Array.isArray(release) && release.sourceCommit === sourceCommit) return release;
    } else await response?.body?.cancel();
    if (attempt + 1 < attempts) await sleep(5000);
  }
  fail('LIVE_RELEASE_MISMATCH', 'The live release did not match the exact expected source commit within the verification bound.');
}

export async function deploy({ client, sourceCommit, logicalRunId, contract, pollOptions, verifyOptions } = {}) {
  // Preflight before even inspect: this default prevents API writes while response discovery is pending.
  requireResponseContract(contract);
  const inspectKey = requestKey('inspect', sourceCommit, logicalRunId);
  const syncKey = requestKey('sync', sourceCommit, logicalRunId);
  const inspected = await client.inspect(inspectKey);
  // A future VERIFIED adapter must validate workload/repository/branch/snapshot binding before returning these values.
  const values = contract.inspectionValues(inspected, TARGET, sourceCommit);
  const accepted = await client.sync({ ...values, requestId: syncKey }, syncKey);
  const operationId = contract.operationId(accepted);
  await pollOperation(client, operationId, contract.operationState, pollOptions);
  await verifyLiveRelease(sourceCommit, verifyOptions);
  return { verified: true, sourceCommit };
}

// No CLI, environment-key loader, runtime response adapters, or enabled workflow is shipped here.
// Importing/running this module performs no network request.
