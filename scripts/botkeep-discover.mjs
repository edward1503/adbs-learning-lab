import { DeploymentError, TARGET, inspectInput, requestKey } from './botkeep-client.mjs';
import { responseShape } from './botkeep-response-shape.mjs';

try {
  if (process.env.GITHUB_REPOSITORY !== 'edward1503/adbs-learning-lab' || process.env.GITHUB_REF !== 'refs/heads/main') {
    throw new DeploymentError('WRONG_TARGET', 'Discovery is restricted to this repository on main.');
  }
  const apiKey = process.env.BOTKEEP_API_KEY;
  if (typeof apiKey !== 'string' || !apiKey.trim() || /[\r\n]/.test(apiKey)) {
    throw new DeploymentError('MISSING_KEY', 'A valid Actions secret is required.');
  }
  delete process.env.BOTKEEP_API_KEY;
  const key = requestKey('inspect', process.env.GITHUB_SHA, `discovery-${process.env.GITHUB_RUN_ID}`);
  async function probe(phase, path, method = 'GET', body) {
    const response = await fetch(new URL(path, TARGET.api), {
      method, redirect: 'error', signal: AbortSignal.timeout(10000),
      headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json', 'Idempotency-Key': key } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    const mediaType = response.headers.get('content-type')?.split(';')[0] ?? 'unknown';
    const text = await response.text();
    let value;
    if (text.length <= 1024 * 1024 && /application\/(?:[\w.+-]*\+)?json/i.test(mediaType)) {
      try { value = JSON.parse(text); } catch { /* Do not expose undecodable content. */ }
    }
    console.log(JSON.stringify({ phase, httpStatus: response.status, mediaType,
      structure: value === undefined ? [] : responseShape(value) }, null, 2));
    return response.status;
  }
  await probe('capabilities', '/api/v1/developer/capabilities');
  await probe('workload', `/api/v1/developer/workloads/${TARGET.workload}`);
  const status = await probe('inspect', `/api/v1/developer/workloads/${TARGET.workload}/github/inspect`, 'POST', inspectInput());
  if (status !== 200) process.exitCode = 1;
} catch (error) {
  const safe = error instanceof DeploymentError ? { code: error.code, status: error.status, message: error.message } :
    { code: 'DISCOVERY_FAILED', message: 'Discovery failed; raw error details are suppressed.' };
  console.error(JSON.stringify(safe));
  process.exitCode = 1;
}
