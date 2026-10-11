import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
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
 assert.equal(matrix.finalCounts.preservedOriginalCoreKeys,1100);
 assert.equal(matrix.finalCounts.exactCitationChanges,120);
});

test('full supplemental packet identity and timetable boundary remain intact',()=>{
 const files=fs.readdirSync(new URL('course/supplements/',root)).filter(f=>/^supplement\d+\.json$/.test(f)).sort();
 const hash=crypto.createHash('sha256');for(const f of files)hash.update(fs.readFileSync(new URL('course/supplements/'+f,root)));
 assert.equal(hash.digest('hex'),'722f98721436e1d00486056b4374b886248a8d37bd16da009d7e1d350fb63163');
 const syllabus=read('docs/audit/syllabus-target.json');assert.deepEqual(syllabus.totals,{modules:13,weeks:15,sessions:30});
 assert.equal(syllabus.modules.reduce((n,m)=>n+m.sessions,0),30);
 assert.equal(syllabus.resourceTotals.totalLearningResources,37);
 assert.equal(syllabus.supplementaryResourceContract.officialCoverageVerified,false);
});
