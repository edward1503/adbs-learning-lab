import { DeploymentError, TARGET, inspectInput, requestKey } from './botkeep-client.mjs';
import { accessDiagnosis, responseShape } from './botkeep-response-shape.mjs';

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
    const targetMetadata = phase === 'workload' && response.status === 200 ?
      { workloadMatches: value?.id === TARGET.workload, staticRuntime: value?.runtime === 'static' } :
      phase === 'inspect' && response.status === 200 ? {
        repositoryMatches: value?.repository === TARGET.repository.replace('https://github.com/', ''),
        branchMatches: value?.branch === TARGET.branch,
        publicRepository: value?.private === false,
        commitHasShaForm: /^[a-f0-9]{40}$/.test(value?.commit ?? ''),
      } : undefined;
    const structure = value === undefined ? [] : responseShape(value);
    console.log(JSON.stringify({ phase, httpStatus: response.status, mediaType, targetMetadata,
      errorMetadata: response.ok ? undefined : accessDiagnosis(value),
      structure: ['inspect', 'source', 'operation'].includes(phase) ? structure : structure.filter(row => row.path.split('[').length <= 2) }));
    return { status: response.status, value };
  }
  await probe('workload', `/api/v1/developer/workloads/${TARGET.workload}`);
  const source = await probe('source', `/api/v1/developer/workloads/${TARGET.workload}/github`);
  if (source.status === 200 && typeof source.value?.operation?.id === 'string') {
    const operation = await probe('operation', `/api/v1/developer/operations/${encodeURIComponent(source.value.operation.id)}`);
    const value = operation.value;
    const phase = value?.operation?.phase;
    const queueState = value?.queueState;
    const runtimeState = value?.runtimeState;
    if ([phase, queueState, runtimeState].every(item => typeof item === 'string' && /^[a-z][a-z_-]{0,24}$/.test(item))) {
      console.log(JSON.stringify({ phase: 'operation-state', observedPhase: phase, queueState, runtimeState,
        confirmed: value.confirmed === true, workloadMatches: value.workloadId === TARGET.workload,
        operationMatches: value.id === source.value.operation.id }));
    }
  }
  const inspected = await probe('inspect', `/api/v1/developer/workloads/${TARGET.workload}/github/inspect`, 'POST', inspectInput());
  if (inspected.status !== 200) process.exitCode = 1;
} catch (error) {
  const safe = error instanceof DeploymentError ? { code: error.code, status: error.status, message: error.message } :
    { code: 'DISCOVERY_FAILED', message: 'Discovery failed; raw error details are suppressed.' };
  console.error(JSON.stringify(safe));
  process.exitCode = 1;
}
