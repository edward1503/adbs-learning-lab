import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));

test('final audit maps all 60 accepted findings and 40 syllabus rows to real canonical sections',()=>{
 const matrix=read('docs/audit/coverage-matrix.json');
 assert.equal(matrix.rows.length,40);assert.equal(matrix.findingResolutions.length,60);
 assert.equal(new Set(matrix.findingResolutions.map(f=>f.id)).size,60);
 for(const f of matrix.findingResolutions){
  assert.equal(f.finalStatus,'implemented-and-independently-reviewed');assert.equal(f.independentReview.result,'accepted');
  assert.ok(fs.existsSync(new URL('docs/audit/'+f.independentReview.report,root)));
  assert.ok(f.targets.length&&f.sources.length);
  for(const t of f.targets){let l=read('course/lecture'+t.lessonId.slice(-2)+'.json');if(Array.isArray(l))l=l[0];assert.ok(l.sections.some(s=>s.id===t.sectionId),f.id+' '+t.sectionId);}
  for(const s of f.sources){assert.equal(new URL(s.url).protocol,'https:');for(const p of s.physicalPages||[])assert.ok(Number.isInteger(p)&&p>0);}
 }
 for(const row of matrix.rows){assert.ok(row.baseline&&row.status&&!row.status.includes('awaiting'));assert.ok(row.siteReferences.length);}
 const plan=matrix.rows.find(r=>r.id==='module-05-topic-03');assert.ok(plan.siteReferences.some(r=>r.quizTopicIds.includes('l15-join-algorithm-again-again')));
 const distributed=matrix.rows.find(r=>r.id==='module-08-topic-01');assert.ok(distributed.siteReferences.some(r=>r.quizTopicIds.includes('l22-topic-two-phase-commit')));
 const evaluation=matrix.rows.find(r=>r.id==='module-09-topic-02');assert.ok(['l24-s1','l24-s2'].every(id=>evaluation.siteReferences.some(r=>r.sectionId===id&&r.quizTopicIds.includes('l24-topic-np'))));
 for(const row of matrix.rows.filter(r=>Number(r.moduleId.slice(-2))<=10))for(const ref of row.siteReferences){const bank=read('course/quiz'+ref.lessonId.slice(-2)+'.json');assert.ok(ref.quizTopicIds.every(id=>bank.topics.some(t=>t.id===id)));}
 assert.equal(matrix.finalCounts.preservedOriginalCoreKeys,1100);
 assert.equal(matrix.finalCounts.exactCitationChanges,120);
});

test('original supplemental packet identity is recorded and timetable boundary remains intact',()=>{
 // Readability revisions intentionally change lesson prose. The separate
 // preservation contract compares all non-editorial packet fields, all quiz
 // objects, stable routes, source links and subsection anchors to v3.1.0.
 const baseline=read('tests/readability-preservation-baseline.json');
 assert.equal(baseline.baselineCommit,'0a1fb0363d2c44a0ca8f508f4e964a01af128720');
 assert.equal(baseline.baselineSupplementalPacketSHA256,'722f98721436e1d00486056b4374b886248a8d37bd16da009d7e1d350fb63163');
 assert.equal(baseline.records.filter(r=>r.file.includes('/supplements/')).length,10);
 const syllabus=read('docs/audit/syllabus-target.json');assert.deepEqual(syllabus.totals,{modules:13,weeks:15,sessions:30});
 assert.equal(syllabus.modules.reduce((n,m)=>n+m.sessions,0),30);
 assert.equal(syllabus.resourceTotals.totalLearningResources,37);
 assert.equal(syllabus.supplementaryResourceContract.officialCoverageVerified,false);
});
