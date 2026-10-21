import fs from 'node:fs';
import cp from 'node:child_process';
import {createHash} from 'node:crypto';
import {rewriteImmutableMetadata} from '../tests/rewrite-contract-helper.mjs';
const baseline='751115b15eede16c8f7408a1d9bdb96ae31cc681';
const read=f=>JSON.parse(cp.execFileSync('git',['show',`${baseline}:${f}`],{encoding:'utf8',maxBuffer:20e6}));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
// Historical snapshots remain untouched. The new authorization allows prompt,
// explanation and hint edits, while retaining answer meaning and saved identity.
const inventory=JSON.parse(fs.readFileSync('docs/rewrite-2026-10-21/inventory-baseline.json','utf8'));
const quizzes={};
const records=[];
for(const r of inventory.records){
 const p=read(r.file),lesson=Array.isArray(p)?p[0]:p.lesson;
 const b=Array.isArray(p)?read(r.file.replace('lecture','quiz')):p.quizBank;
 records.push({file:r.file,lessonId:r.id,immutableMetadataSHA256:hash(rewriteImmutableMetadata(p))});
 quizzes[r.id]={inline:{answer:lesson.quiz.answer,options:lesson.quiz.options},topics:b.topics.map(t=>({id:t.id,questions:t.questions.map(q=>({id:q.id,answer:q.answer,options:q.options}))}))};
}
fs.writeFileSync('tests/rewrite-2026-10-21-baseline.json',JSON.stringify({baseline,records,quizzes,quizAnswerIdentitySHA256:hash(quizzes)},null,2)+'\n');
console.log('Saved independently extracted 21 October answer-identity baseline.');
