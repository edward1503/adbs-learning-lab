import { execFileSync } from 'node:child_process';
import { appendFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { BotkeepClient, DeploymentError, TARGET, jsonBody } from './botkeep-client.mjs';
import { REPOSITORY, deployChecked, publicResponse, snapshotLive, validateRelease } from './botkeep-deployment.mjs';

const fail = (code, message) => { throw new DeploymentError(code, message); };
async function summary(line) {
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, line + '\n');
}
async function output(name, value) {
  if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}
function refs() {
  let result;
  try {
    result = execFileSync('git', ['ls-remote', '--heads', TARGET.repository, 'main', 'deploy'],
      { encoding: 'utf8', timeout: 15000, stdio: ['ignore', 'pipe', 'pipe'] });
  } catch { fail('GITHUB_READ_FAILED', 'Could not verify current source and deployment branch heads.'); }
  const values = {};
  for (const line of result.trim().split('\n')) {
    const match = /^([a-f0-9]{40})\s+refs\/heads\/(main|deploy)$/.exec(line);
    if (match) values[match[2]] = match[1];
  }
  if (!values.main || !values.deploy) fail('GITHUB_READ_FAILED', 'Both required public branch heads must exist.');
  return values;
}

try {
  const sourceCommit = process.env.GITHUB_SHA;
  if (process.env.GITHUB_REPOSITORY !== REPOSITORY || process.env.GITHUB_REF !== 'refs/heads/main' ||
      process.env.GITHUB_EVENT_NAME !== 'push' || !/^[a-f0-9]{40}$/.test(sourceCommit ?? '') ||
      !/^\d+$/.test(process.env.GITHUB_RUN_ID ?? '')) {
    fail('WRONG_TARGET', 'Deployment is restricted to a main push in the ADBS repository.');
  }
  const current = refs();
  if (current.main !== sourceCommit) {
    console.log('A newer main commit exists; skipping this superseded deployment.');
    await output('active', 'false');
  } else {
    const deployCommit = current.deploy;
    const expected = validateRelease(await jsonBody(await publicResponse(
      `https://raw.githubusercontent.com/${REPOSITORY}/${deployCommit}/release.json`)), sourceCommit);
    if (expected.workflowRun !== `https://github.com/${REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`) {
      fail('WRONG_ARTIFACT', 'Deployment output was not published by this checked workflow run.');
    }
    const command = process.argv[2];
    if (command === 'snapshot') {
      if (!process.env.ROLLBACK_DIR) fail('INVALID_SNAPSHOT', 'An explicit rollback directory is required.');
      const root = resolve(process.env.ROLLBACK_DIR);
      const previous = await snapshotLive({ save: async (path, bytes) => {
        const destination = join(root, path);
        await mkdir(dirname(destination), { recursive: true });
        await writeFile(destination, bytes);
      } });
      await output('active', 'true');
      await summary(`Saved and SHA-256 verified the previous live release: \`${previous.sourceCommit}\` (19 assets plus release metadata).`);
      console.log('Rollback snapshot verified.');
    } else if (command === 'deploy') {
      const apiKey = process.env.BOTKEEP_API_KEY;
      delete process.env.BOTKEEP_API_KEY;
      const live = validateRelease(await jsonBody(await publicResponse(TARGET.release)));
      let result;
      if (live.sourceCommit === sourceCommit) {
        const checked = await snapshotLive({ save: async () => {} });
        validateRelease(checked, sourceCommit);
        if (Object.keys(expected.files).some(path => checked.files[path] !== expected.files[path])) {
          fail('LIVE_ASSET_MISMATCH', 'Already-live release files differ from the checked artifact.');
        }
        result = { verified: true, alreadyLive: true, sourceCommit, deployCommit };
      } else result = await deployChecked({ client: new BotkeepClient({ apiKey }), sourceCommit, deployCommit, expectedRelease: expected,
        logicalRunId: `github-${process.env.GITHUB_RUN_ID}`,
        isCurrent: async () => { const latest = refs(); return latest.main === sourceCommit && latest.deploy === deployCommit; },
        onAccepted: () => console.log('Hosting accepted the import; checking its operation and live release.'),
      });
      if (result.skipped) {
        console.log('A newer branch commit exists; skipping this superseded deployment.');
        await summary('Hosting sync skipped because this workflow was superseded.');
      } else {
        await summary(`${result.alreadyLive ? 'Already-live output was verified without another sync' : 'Botkeep import completed'}; the [live release](${TARGET.release}) and all asset hashes match source \`${sourceCommit}\`. Deployment branch commit: \`${deployCommit}\`${result.operationId ? `. Operation: \`${result.operationId}\`` : ''}.`);
        console.log(JSON.stringify(result));
      }
    } else fail('INVALID_COMMAND', 'Use snapshot or deploy.');
  }
} catch (error) {
  const safe = error instanceof DeploymentError ? { code: error.code, message: error.message, status: error.status } :
    { code: 'DEPLOYMENT_FAILED', message: 'Deployment stopped; raw error details are suppressed.' };
  console.error(JSON.stringify(safe));
  await summary(`Hosting deployment stopped: ${safe.code}. Preserve the rollback artifact and inspect hosting state before a new sync request.`);
  process.exitCode = 1;
}
