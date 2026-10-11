import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const lesson = n => JSON.parse(readFileSync(new URL(`../course/lecture${String(n).padStart(2, '0')}.json`, import.meta.url), 'utf8'))[0];
const bank = n => JSON.parse(readFileSync(new URL(`../course/quiz${String(n).padStart(2, '0')}.json`, import.meta.url), 'utf8'));
const question = (n, id) => bank(n).topics.flatMap(t => t.questions).find(q => q.id === id);

// This reference router uses separators as inclusive lower bounds for the right
// child. Children are symbolic ranges, so a repair must preserve all routes.
const route = (node, key) => {
  const position = node.keys.filter(boundary => key >= boundary).length;
  const child = node.children[position];
  return typeof child === 'string' ? child : route(child, key);
};

test('internal merge and rotation preserve child routing across separator boundaries', () => {
  const beforeMerge = {keys: [30], children: [
    {keys: [10, 20], children: ['a', 'b', 'c']},
    {keys: [40], children: ['d', 'e']}
  ]};
  const merged = {keys: [10, 20, 30, 40], children: ['a', 'b', 'c', 'd', 'e']};
  const beforeRotation = {keys: [40], children: [
    {keys: [10, 20, 30], children: ['a', 'b', 'c', 'd']},
    {keys: [60], children: ['e', 'f']}
  ]};
  const rotated = {keys: [30], children: [
    {keys: [10, 20], children: ['a', 'b', 'c']},
    {keys: [40, 60], children: ['d', 'e', 'f']}
  ]};
  for (const key of [5, 10, 15, 20, 25, 30, 35, 40, 45, 60, 70]) {
    assert.equal(route(merged, key), route(beforeMerge, key));
    assert.equal(route(rotated, key), route(beforeRotation, key));
  }
  const mergeQuestion = question(9, 'l09-internal-merge-new-q1');
  assert.equal(mergeQuestion.options[mergeQuestion.answer], '[10,20,30,40]');
  const rotateQuestion = question(9, 'l09-internal-rotate-new-q2');
  assert.equal(rotateQuestion.options[rotateQuestion.answer], '30');
});

test('final-pass fusion tests the combined run budget before charging fused I/O', () => {
  const runBudget = (rPages, sPages, frames) => ({
    runs: Math.ceil(rPages / frames) + Math.ceil(sPages / frames),
    inputBuffers: frames - 1
  });
  const small = runBudget(120, 40, 12);
  assert.deepEqual(small, {runs: 14, inputBuffers: 11});
  assert.ok(small.runs > small.inputBuffers);
  const large = runBudget(120, 40, 16);
  assert.deepEqual(large, {runs: 11, inputBuffers: 15});
  assert.ok(large.runs <= large.inputBuffers);
  const pages = 120 + 40;
  const passZero = pages * 2;
  const fused = passZero + pages;
  const separate = passZero + pages * 2 + pages;
  assert.equal(fused, 480);
  assert.equal(separate, 800);
  assert.equal(separate - fused, 320);
  const q = question(12, 'l12-fusion-new-q1');
  assert.match(q.options[q.answer], /14.*11/);
});

test('dictionary payload includes the dictionary and external hashing includes state overhead', () => {
  const rawBytes = 100 * 10;
  const encodedPayload = 100 * 1 + 4 * 10;
  assert.equal(rawBytes, 1000);
  assert.equal(encodedPayload, 140);
  const expandedPartitionPages = 1.2 * 90 / (10 - 1);
  assert.equal(expandedPartitionPages, 12);
  assert.ok(expandedPartitionPages > 10);
  assert.match(lesson(7).sections.find(s => s.id === 'l7-3').html, /140 payload bytes before metadata/);
  assert.match(lesson(11).sections.find(s => s.id === 'l11-s3').html, /12 pages of state, exceeding 10/);
});

test('duplicate join groups preserve all six pairs and cross-document quiz provenance', () => {
  const build = [{id: 'r1', key: 7}, {id: 'r2', key: 7}];
  const probe = [{id: 's1', key: 7}, {id: 's2', key: 7}, {id: 's3', key: 7}];
  const pairs = build.flatMap(r => probe.filter(s => r.key === s.key).map(s => [r.id, s.id]));
  assert.deepEqual(pairs, [['r1','s1'], ['r1','s2'], ['r1','s3'], ['r2','s1'], ['r2','s2'], ['r2','s3']]);
  const q = question(12, 'l12-skew-new-q1');
  assert.equal(q.options[q.answer], 'It must preserve every matching build/probe pair');
  assert.equal(q.sources.length, 2);
  assert.deepEqual(q.pages, q.sources[0].physicalPages);
  assert.ok(q.sources[0].url.endsWith('lecture12-joins.pdf'));
  assert.ok(q.sources[1].url.endsWith('lecture11-sorting-aggregation_0.pdf'));
});
