import test from 'node:test';
import assert from 'node:assert/strict';
import { accessDiagnosis, responseShape } from '../scripts/botkeep-response-shape.mjs';

test('response discovery shows structure without exposing scalar values', () => {
  const value = { revision: 'private-revision-placeholder', confirmation: 'private-confirmation-placeholder',
    nested: { token: 'private-token-placeholder', count: 23, allowed: true }, list: [{ field: 'private-value-placeholder' }] };
  const shape = responseShape(value);
  const text = JSON.stringify(shape);
  for (const hidden of ['private-revision-placeholder', 'private-confirmation-placeholder', 'private-token-placeholder', 'private-value-placeholder']) {
    assert.ok(!text.includes(hidden));
  }
  assert.ok(shape.some(row => row.path === '$["confirmation"]' && row.type === 'string'));
  assert.ok(shape.some(row => row.path === '$["nested"]["count"]' && row.type === 'number'));
});

test('response discovery limits depth and number of rows', () => {
  const shape = responseShape(Object.fromEntries(Array.from({ length: 1000 }, (_, i) => [`field${i}`, i])));
  assert.ok(shape.length <= 400);
});

test('access diagnosis emits only public scopes and booleans, never raw error detail', () => {
  const text = JSON.stringify(accessDiagnosis({ detail: 'private-message-placeholder scope deploy:write imaginary:secret' }));
  assert.ok(text.includes('deploy:write'));
  assert.ok(!text.includes('private-message-placeholder'));
  assert.ok(!text.includes('imaginary:secret'));
});
