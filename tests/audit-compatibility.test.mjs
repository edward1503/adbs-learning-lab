import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const root=new URL('../',import.meta.url);
const contract=JSON.parse(fs.readFileSync(new URL('tests/audit-question-compatibility.json',root)));
const hash=q=>crypto.createHash('sha256').update(JSON.stringify({prompt:q.prompt,options:q.options,answer:q.answer,explanation:q.explanation})).digest('hex');
test('all 1100 original quiz option meanings and grades survive the audited additions',()=>{
 const questions=new Map();
 for(const f of fs.readdirSync(new URL('course/',root)).filter(f=>/^quiz\d+\.json$/.test(f)))for(const t of JSON.parse(fs.readFileSync(new URL('course/'+f,root))).topics)for(const q of t.questions)questions.set(q.id,q);
 assert.equal(Object.keys(contract.original).length,1100);assert.equal(Object.keys(contract.newQuestions).length,17);assert.equal(questions.size,1117);
 for(const [id,original]of Object.entries(contract.original)){
  const q=questions.get(id);assert.ok(q,id);const clarification=contract.promptClarifications[id];
  if(clarification)assert.equal(q.prompt,clarification.newPrompt,id);
  assert.equal(hash({...q,prompt:clarification?.oldPrompt||q.prompt}),original.semanticSha256,id);
 }
 for(const [id,approved]of Object.entries(contract.newQuestions)){const q=questions.get(id);assert.ok(q,id);assert.equal(hash(q),approved.semanticSha256,id);assert.equal(q.answer,approved.answer,id);}
});
test('exact audited citation changes retain historical fixture values for comparison',()=>{
 const old=JSON.parse(fs.readFileSync(new URL('tests/quiz-structure-baseline.json',root)));
 const originalQuestions=new Map(Object.values(old).flatMap(b=>b.topics.flatMap(t=>t.questions)).map(q=>[q.id,q]));
 assert.equal(Object.keys(contract.citationCorrections).length,120);
 for(const [id,change]of Object.entries(contract.citationCorrections))assert.deepEqual(change.oldPhysicalPages,originalQuestions.get(id).pages,id);
 assert.deepEqual(contract.citationCorrections['l02-terminology-q4'].newPhysicalPages,[8]);
 assert.deepEqual(contract.citationCorrections['l02-terminology-q5'].newPhysicalPages,[8]);
});
