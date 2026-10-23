import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../',import.meta.url),read=f=>JSON.parse(fs.readFileSync(new URL(f,root),'utf8'));
const mapping=read('docs/slide-textbook-2026-10-23/mapping.json');

test('all 27 source PDFs have ordered, gap-free physical-page mappings and matching EN/VI section links',()=>{
 assert.equal(mapping.lectures.length,27);assert.equal(mapping.sources.length,27);
 let count=0;
 for(const m of mapping.lectures){
  const n=String(m.lecture).padStart(2,'0'),en=read(`course/lecture${n}.json`)[0],vi=read(`course/translations/lecture${n}.vi.json`),source=mapping.sources.find(s=>s.lecture===m.lecture);
  assert.match(source.sha256,/^[a-f0-9]{64}$/);assert.equal(m.pdfUrl,source.url);assert.equal(m.pdfUrl,en.coverage.pdfUrl);
  assert.deepEqual(m.sections.map(s=>s.id),en.sections.map(s=>s.id));assert.deepEqual(vi.sections.map(s=>s.id),en.sections.map(s=>s.id));
  let next=1;
  for(const [i,s] of m.sections.entries()){
   const [first,last]=s.physicalPages;assert.equal(first,next,s.id+' contiguous order');assert.ok(last>=first&&last<=source.pages,s.id);next=last+1;
   for(const section of [en.sections[i],vi.sections[i]]){assert.ok(section.html.includes(m.pdfUrl+'#page='+first),s.id+' source page');assert.ok(section.html.length>500,s.id+' substantive explanation');assert.doesNotMatch(section.html,/Try:|Tự làm:|<details|important-note|original teaching rows/);}
   assert.equal(s.title,en.sections[i].title);assert.equal(s.titleVi,vi.sections[i].title);count++;
  }
  assert.equal(next,source.pages+1,m.lessonId+' complete page range');
 }
 assert.equal(count,117);
});

test('reader separates optional practice from prose and opens ancestors for stable quiz/lab routes',()=>{
 const app=fs.readFileSync(new URL('app.js',root),'utf8');
 assert.ok(app.includes('class="optional-practice"'));assert.ok(app.includes('class="inline-lab optional-practice"'));
 assert.ok(app.includes("if(parent.tagName==='DETAILS')parent.open=true"));
 assert.ok(app.includes('revealAnchor(anchor)'));assert.ok(!app.includes('READ · EXPERIMENT · UNDERSTAND'));
 const index=fs.readFileSync(new URL('index.html',root),'utf8');assert.ok(!index.includes('study-card'));assert.ok(!index.includes('Understand first.'));
});
