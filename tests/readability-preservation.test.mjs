import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {rewriteImmutableMetadata} from './rewrite-contract-helper.mjs';

const root = new URL('../', import.meta.url);
const read = file => JSON.parse(fs.readFileSync(new URL(file, root), 'utf8'));
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const baseline = read('tests/readability-preservation-baseline.json');

test('whole-course rewrite preserves resource identity, quiz answer meaning and source metadata', () => {
  assert.equal(baseline.records.length, 37);
  for (const record of baseline.records) {
    const packet = read(record.file);
    const lesson = Array.isArray(packet) ? packet[0] : packet.lesson;
    assert.equal(lesson.id, record.lessonId);
    const current=read('tests/rewrite-2026-10-21-baseline.json').records.find(r=>r.file===record.file);
    assert.equal(hash(JSON.stringify(rewriteImmutableMetadata(packet))), current.immutableMetadataSHA256,
      `${record.file}: only authorized 21 October teaching fields may change`);
    assert.deepEqual(lesson.sections.map(section => section.id), record.sectionIds, record.file);
  }
});

test('slide rewrite retains subsection anchors and current mapping; supplements retain exact sources', () => {
  for (const record of baseline.records) {
    const packet = read(record.file);
    const lesson = Array.isArray(packet) ? packet[0] : packet.lesson;
    const html = lesson.sections.map(section => section.html).join('');
    const notes = [...html.matchAll(/<aside\b[^>]*class="[^"]*\bimportant-note\b[^"]*"[^>]*>[\s\S]*?<\/aside>/g)]
      .map(match => hash(match[0]));
    if(!lesson.lecture)assert.deepEqual(notes, record.importantNoteHTMLSHA256, `${record.file}: supplemental notes unchanged`);else assert.equal(notes.length,0,`${record.file}: requested plain prose`);
    const anchors = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    const links = new Set([...html.matchAll(/href="([^"]+)"/g)].map(match => match[1]));
    assert.equal(new Set(anchors).size, anchors.length, `${record.file}: duplicate subsection anchor`);
    for (const anchor of record.subsectionAnchors) assert.ok(anchors.includes(anchor), `${record.file}: ${anchor}`);
    if(lesson.lecture){
      const mapping=read('docs/slide-textbook-2026-10-23/mapping.json').lectures.find(m=>m.lessonId===lesson.id);
      for(const mapped of mapping.sections){const section=lesson.sections.find(s=>s.id===mapped.id);assert.ok(section.html.includes(mapping.pdfUrl+'#page='+mapped.physicalPages[0]),mapped.id);}
      continue;
    }
    for (const link of record.sourceLinks) assert.ok(links.has(link), `${record.file}: ${link}`);
    for (const section of lesson.sections) {
      const sectionLinks = new Set([...section.html.matchAll(/href="([^"]+)"/g)].map(match => match[1]));
      for (const link of record.sectionSourceLinks[section.id]) {
        assert.ok(sectionLinks.has(link), `${record.file}/${section.id}: retain original source location ${link}`);
      }
    }
  }
});
