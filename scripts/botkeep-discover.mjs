import { BotkeepClient, DeploymentError, requestKey } from './botkeep-client.mjs';
import { responseShape } from './botkeep-response-shape.mjs';

try {
  if (process.env.GITHUB_REPOSITORY !== 'edward1503/adbs-learning-lab' || process.env.GITHUB_REF !== 'refs/heads/main') {
    throw new DeploymentError('WRONG_TARGET', 'Discovery is restricted to this repository on main.');
  }
  const client = new BotkeepClient({ apiKey: process.env.BOTKEEP_API_KEY });
  delete process.env.BOTKEEP_API_KEY;
  const key = requestKey('inspect', process.env.GITHUB_SHA, `discovery-${process.env.GITHUB_RUN_ID}`);
  const inspected = await client.inspect(key);
  console.log(JSON.stringify({ phase: 'inspect', httpStatus: 200, structure: responseShape(inspected) }, null, 2));
} catch (error) {
  const safe = error instanceof DeploymentError ? { code: error.code, status: error.status, message: error.message } :
    { code: 'DISCOVERY_FAILED', message: 'Discovery failed; raw error details are suppressed.' };
  console.error(JSON.stringify(safe));
  process.exitCode = 1;
}
