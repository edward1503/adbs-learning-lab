import { readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Expand test filenames here rather than relying on shell globbing on Windows.
const tests = new URL('../tests/', import.meta.url);
const files = (await readdir(tests)).filter(file => file.endsWith('.test.mjs')).sort();
if (!files.length) throw new Error('No test files found.');
const result = spawnSync(process.execPath, [
  '--test', ...files.map(file => fileURLToPath(new URL(file, tests))),
], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
