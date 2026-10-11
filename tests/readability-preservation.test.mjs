import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';

const root = new URL('../', import.meta.url);
const read = file => JSON.parse(fs.readFileSync(new URL(file, root), 'utf8'));
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const baseline = read('tests/readability-preservation-baseline.json');

function immutableMetadata(packet) {
  const result = structuredClone(packet);
  const lesson = Array.isArray(result) ? result[0] : result.lesson;
  for (const key of ['title', 'short', 'lead', 'goals']) delete lesson[key];
  lesson.sections = lesson.sections.map(({title, html, ...rest}) => rest);
  return result;
}

test('readability edits preserve every resource identity, self-check, quiz packet and source metadata', () => {
  assert.equal(baseline.records.length, 37);
  for (const record of baseline.records) {
    const packet = read(record.file);
    const lesson = Array.isArray(packet) ? packet[0] : packet.lesson;
    assert.equal(lesson.id, record.lessonId);
    assert.equal(hash(JSON.stringify(immutableMetadata(packet))), record.immutableMetadataSHA256,
      `${record.file}: only approved editorial fields may change`);
    assert.deepEqual(lesson.sections.map(section => section.id), record.sectionIds, record.file);
  }
});

test('readability integration retains original subsection anchors and every cited URL', () => {
  for (const record of baseline.records) {
    const packet = read(record.file);
    const lesson = Array.isArray(packet) ? packet[0] : packet.lesson;
    const html = lesson.sections.map(section => section.html).join('');
    const notes = [...html.matchAll(/<aside\b[^>]*class="[^"]*\bimportant-note\b[^"]*"[^>]*>[\s\S]*?<\/aside>/g)]
      .map(match => hash(match[0]));
    assert.deepEqual(notes, record.importantNoteHTMLSHA256, `${record.file}: retain exact ordered Key takeaways`);
    const anchors = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    const links = new Set([...html.matchAll(/href="([^"]+)"/g)].map(match => match[1]));
    assert.equal(new Set(anchors).size, anchors.length, `${record.file}: duplicate subsection anchor`);
    for (const anchor of record.subsectionAnchors) assert.ok(anchors.includes(anchor), `${record.file}: ${anchor}`);
    for (const link of record.sourceLinks) assert.ok(links.has(link), `${record.file}: ${link}`);
    for (const section of lesson.sections) {
      const sectionLinks = new Set([...section.html.matchAll(/href="([^"]+)"/g)].map(match => match[1]));
      for (const link of record.sectionSourceLinks[section.id]) {
        assert.ok(sectionLinks.has(link), `${record.file}/${section.id}: retain original source location ${link}`);
      }
    }
  }
});
