import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, relative, resolve, sep } from 'node:path';

const sourceCommit = process.env.GITHUB_SHA;
const sourceRepository = process.env.GITHUB_REPOSITORY;
const runId = process.env.GITHUB_RUN_ID;
if (!/^[a-f0-9]{40}$/.test(sourceCommit ?? '') || !sourceRepository || !runId) {
  throw new Error('Release metadata requires a GitHub source commit, repository, and run ID.');
}
const output = resolve('dist');
await access(join(output, 'index.html'));
const files = {};
async function record(directory) {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await record(path);
    else if (entry.isFile() && path !== join(output, 'release.json')) {
      files[relative(output, path).split(sep).join('/')] = createHash('sha256').update(await readFile(path)).digest('hex');
    } else if (!entry.isFile()) throw new Error(`Unexpected deployment entry: ${entry.name}`);
  }
}
await record(output);
await writeFile(resolve(output, 'release.json'), JSON.stringify({
  appVersion: JSON.parse(await readFile('package.json', 'utf8')).version,
  sourceCommit,
  sourceRepository,
  workflowRun: `https://github.com/${sourceRepository}/actions/runs/${runId}`,
  runAttempt: process.env.GITHUB_RUN_ATTEMPT ?? '1',
  files,
}, null, 2) + '\n');
