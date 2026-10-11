import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const init = require('../vendor/sql-wasm.js');
const core = require('../labs/core.js');
const SQL = await init({
  locateFile: () => fileURLToPath(new URL('../vendor/sql-wasm.wasm', import.meta.url)),
});

function question(lecture, id) {
  const quiz = JSON.parse(readFileSync(new URL(`../course/quiz${lecture}.json`, import.meta.url), 'utf8'));
  const found = quiz.topics.flatMap(topic => topic.questions).find(item => item.id === id);
  assert.ok(found, `Missing question ${id}`);
  return found;
}

function answer(lecture, id) {
  const item = question(lecture, id);
  return item.options[item.answer];
}

function memberDatabase() {
  const db = new SQL.Database();
  // Deliberately no foreign key: Borrow(4,'D') demonstrates an unmatched right row.
  db.run(`
    CREATE TABLE Member(mid INTEGER, name TEXT);
    CREATE TABLE Borrow(mid INTEGER, item TEXT);
    INSERT INTO Member VALUES (1,'An'), (2,'Binh'), (3,'Chi');
    INSERT INTO Borrow VALUES (1,'A'), (1,'B'), (2,'C'), (4,'D');
  `);
  return db;
}

test('foundation outer-join example executes exact rows in the bundled SQLite engine', () => {
  const db = memberDatabase();
  try {
    const join = kind => db.exec(`
      SELECT m.name, b.item FROM Member AS m ${kind} JOIN Borrow AS b ON m.mid=b.mid
      ORDER BY COALESCE(m.mid,b.mid), b.item
    `)[0].values;
    assert.deepEqual(join('LEFT'), [['An','A'], ['An','B'], ['Binh','C'], ['Chi',null]]);
    assert.deepEqual(join('RIGHT'), [['An','A'], ['An','B'], ['Binh','C'], [null,'D']]);
    assert.deepEqual(join('FULL'), [['An','A'], ['An','B'], ['Binh','C'], ['Chi',null], [null,'D']]);
  } finally {
    db.close();
  }
});

test('correlated NOT EXISTS finds Chi and NOT IN preserves SQL UNKNOWN', () => {
  const db = memberDatabase();
  try {
    const notExists = `SELECT m.mid,m.name FROM Member AS m
      WHERE NOT EXISTS (SELECT 1 FROM Borrow AS b WHERE b.mid=m.mid)`;
    assert.deepEqual(db.exec(notExists)[0].values, [[3,'Chi']]);
    assert.deepEqual(db.exec('SELECT 2 NOT IN (1,NULL), 1 NOT IN (1,NULL), 2 NOT IN (1)')[0].values,
      [[null,0,1]]);
    assert.deepEqual(db.exec('SELECT 2 WHERE 2 NOT IN (1,NULL)'), []);
    // A NULL candidate does not create a matching row for the correlated equality.
    db.run("INSERT INTO Borrow VALUES (NULL,'E')");
    assert.deepEqual(db.exec(notExists)[0].values, [[3,'Chi']]);
    assert.deepEqual(db.exec('SELECT mid FROM Member WHERE mid NOT IN (SELECT mid FROM Borrow)'), []);
  } finally {
    db.close();
  }
});

test('empty membership comparisons and decisive matches retain the SQL NULL rules', () => {
  const db = memberDatabase();
  try {
    // PostgreSQL documents IN as = ANY and NOT IN as <> ALL. SQLite executes
    // these equality forms; general operator ANY/ALL is checked against that source.
    assert.deepEqual(db.exec(`SELECT
      2 IN (SELECT mid FROM Borrow WHERE 0),
      2 NOT IN (SELECT mid FROM Borrow WHERE 0),
      2 IN (1,NULL), 1 IN (1,NULL), 1 NOT IN (1,NULL)
    `)[0].values, [[0,1,null,1,0]]);
  } finally {
    db.close();
  }
});

// Independent recency-stack oracle. All requests pin and immediately unpin clean pages.
// MRU is prose-only in the course; the interactive runtime exports LRU and FIFO.
function immediateUnpinMru(sequence, capacity) {
  const recency = [];
  return sequence.map(page => {
    const position = recency.indexOf(page);
    const hit = position !== -1;
    let evicted = null;
    if (hit) recency.splice(position, 1);
    else if (recency.length === capacity) evicted = recency.pop();
    recency.push(page);
    return { page, hit, evicted, oldestToNewest: [...recency] };
  });
}

test('repeated four-page scan has eight LRU misses and five MRU misses with specified victims', () => {
  const sequence = ['A','B','C','D','A','B','C','D'];
  const lru = core.bufferTrace(sequence, 3, 'LRU');
  const mru = immediateUnpinMru(sequence, 3);
  assert.equal(lru.at(-1).misses, 8);
  assert.equal(lru.at(-1).hits, 0);
  assert.deepEqual(lru.map(step => step.evicted), [null,null,null,'A','B','C','D','A']);
  assert.equal(mru.filter(step => !step.hit).length, 5);
  assert.deepEqual(mru.map(step => step.evicted), [null,null,null,'C',null,null,'B',null]);
  assert.deepEqual(mru.map(step => step.oldestToNewest), [
    ['A'], ['A','B'], ['A','B','C'], ['A','B','D'],
    ['B','D','A'], ['D','A','B'], ['D','A','C'], ['A','C','D'],
  ]);
  assert.equal(Number(answer('05', 'l05-scan-policies-q2')), lru.at(-1).misses);
  assert.equal(answer('05', 'l05-scan-policies-q3'), mru[3].evicted);
});

test('buffer questions preserve the lecture unpin and pin-increase conventions', () => {
  assert.equal(answer('05', 'l05-lru-q1'), 'When the frame is unpinned');
  assert.equal(answer('05', 'l05-clock-q4'), 'When the pin count increases');
});

test('heap directory capacity and free-list questions retain their explicit assumptions', () => {
  const capacities = { P1: 20, P2: 90, P3: 40 };
  const suitable = Object.keys(capacities).filter(page => capacities[page] >= 60);
  assert.deepEqual(suitable, ['P2']);
  assert.equal(answer('06', 'l06-heap-directory-q5'), suitable[0]);
  assert.match(question('06', 'l06-heap-directory-q5').prompt, /no additional overhead/);
  const freeList = [2,5,8];
  const insertedSlot = freeList.shift();
  assert.equal(insertedSlot, 2);
  assert.deepEqual(freeList, [5,8]);
  freeList.unshift(4);
  assert.deepEqual(freeList, [4,5,8]);
  // The existing question deletes 4 before any insertion, so its old head remains 2.
  assert.equal(answer('06', 'l06-unpacked-q5'), [4,2,5,8].join('→'));
});

test('slotted RID and NULL questions distinguish identities from byte offsets', () => {
  assert.equal(answer('06', 'l06-slotted-q1'), 'A page ID and a slot ID');
  assert.equal(answer('06', 'l06-record-layout-q4'),
    'Both can have no payload bytes while having different meanings');
});

test('DDL and algorithm-choice citations use physical PDF page eight, printed slide nine', () => {
  for (const id of ['l02-terminology-q4', 'l02-terminology-q5']) {
    assert.deepEqual(question('02', id).pages, [8], id);
  }
  const document = JSON.parse(readFileSync(new URL('../course/lecture02.json', import.meta.url), 'utf8'));
  const lecture = Array.isArray(document)
    ? document.find(item => item.id === 'lecture-02')
    : document;
  assert.ok(lecture, 'Missing lecture-02 fixture');
  assert.equal(lecture.coverage.pageMap.find(page => page.pdfPage === 8).printedSlide, 9);
});
