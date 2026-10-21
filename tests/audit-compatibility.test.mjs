import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const root=new URL('../',import.meta.url);
const contract=JSON.parse(fs.readFileSync(new URL('tests/audit-question-compatibility.json',root)));
const hash=q=>crypto.createHash('sha256').update(JSON.stringify({prompt:q.prompt,options:q.options,answer:q.answer,explanation:q.explanation})).digest('hex');
test('all 1100 original quiz option meanings and grades survive the audited additions',()=>{
 // The newly authorized whole-course rewrite may improve prompts and reasons.
 // Keep historical audit fixtures intact; compare keyed option meanings against
 // the independently extracted deployed v3.2.0 source instead of freezing prose.
 const rewrite=JSON.parse(fs.readFileSync(new URL('tests/rewrite-2026-10-21-baseline.json',root)));
 const questions=new Map();
 for(const f of fs.readdirSync(new URL('course/',root)).filter(f=>/^quiz\d+\.json$/.test(f)))for(const t of JSON.parse(fs.readFileSync(new URL('course/'+f,root))).topics)for(const q of t.questions)questions.set(q.id,q);
 assert.equal(Object.keys(contract.original).length,1100);assert.equal(Object.keys(contract.newQuestions).length,17);assert.equal(questions.size,1117);
 for(const b of Object.values(rewrite.quizzes))for(const t of b.topics)for(const old of t.questions){
  if(!questions.has(old.id))continue;const q=questions.get(old.id);
  assert.equal(q.answer,old.answer,old.id);assert.deepEqual(q.options,old.options,old.id);
  assert.ok(q.prompt&&q.explanation,old.id);
 }
 for(const id of Object.keys(contract.original))assert.ok(questions.has(id),id);
 for(const [id,approved]of Object.entries(contract.newQuestions))assert.equal(questions.get(id).answer,approved.answer,id);
});
test('exact audited citation changes retain historical fixture values for comparison',()=>{
 const old=JSON.parse(fs.readFileSync(new URL('tests/quiz-structure-baseline.json',root)));
 const originalQuestions=new Map(Object.values(old).flatMap(b=>b.topics.flatMap(t=>t.questions)).map(q=>[q.id,q]));
 assert.equal(Object.keys(contract.citationCorrections).length,120);
 for(const [id,change]of Object.entries(contract.citationCorrections))assert.deepEqual(change.oldPhysicalPages,originalQuestions.get(id).pages,id);
 assert.deepEqual(contract.citationCorrections['l02-terminology-q4'].newPhysicalPages,[8]);
 assert.deepEqual(contract.citationCorrections['l02-terminology-q5'].newPhysicalPages,[8]);
});
