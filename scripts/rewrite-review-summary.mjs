import fs from 'node:fs';
import cp from 'node:child_process';
const dir='docs/rewrite-2026-10-21',inventory=JSON.parse(fs.readFileSync(`${dir}/inventory-baseline.json`,'utf8'));
const old=f=>JSON.parse(cp.execFileSync('git',['show',`${inventory.baseline}:${f}`],{encoding:'utf8',maxBuffer:20e6}));
const current=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const unwrap=p=>Array.isArray(p)?p[0]:p.lesson;
const group=n=>n<=6?'01-06':n<=12?'07-12':n<=18?'13-18':n<=22?'19-22':n<=27?'23-27':'28-37';
const review=n=>n<=27?group(n):n<=31?'28-31':'32-37';
const records=inventory.records.map(r=>{
 const n=Number(r.id.split('-')[1]),p=current(r.file),l=unwrap(p),before=unwrap(old(r.file)),vi=current(r.locale),oldVi=old(r.locale);
 const bank=Array.isArray(p)?current(r.file.replace('lecture','quiz')):p.quizBank,oldBank=Array.isArray(p)?old(r.file.replace('lecture','quiz')):old(r.file).quizBank;
 const prior=new Map(oldBank.topics.flatMap(t=>t.questions).map(q=>[q.id,q]));
 const questionChanges=bank.topics.flatMap(t=>t.questions).filter(q=>JSON.stringify(q)!==JSON.stringify(prior.get(q.id))).map(q=>({id:q.id,promptChanged:(q.prompt||q.question)!==(prior.get(q.id).prompt||prior.get(q.id).question),explanationChanged:q.explanation!==prior.get(q.id).explanation}));
 return{id:r.id,title:l.title,file:r.file,locale:r.locale,sections:l.sections.map((s,i)=>({id:s.id,enRewritten:s.html!==before.sections[i].html,viRewritten:vi.sections[i].html!==oldVi.sections[i].html})),sources:l.source.links,authorReport:`group-${group(n)}.md`,crossReview:`cross-review-${review(n)}.md`,questionChanges};
});
for(const r of records){if(r.sections.some(s=>!s.enRewritten||!s.viRewritten))throw Error('Unchanged teaching section '+r.id);for(const p of [r.authorReport,r.crossReview])if(!fs.existsSync(`${dir}/${p}`))throw Error('Missing review evidence '+p);}
fs.writeFileSync(`${dir}/review-map.json`,JSON.stringify({baseline:inventory.baseline,records},null,2)+'\n');
fs.writeFileSync(`${dir}/source-map.md`,'# Whole-course source and review map\n\nAll section IDs and sources remain canonical. Linked author reports record physical PDF counts, printed-number checks and access limitations; independent cross-reviews record changed-input reasoning checks. This is editorial evidence, not measured learner comprehension.\n\n| Resource | Sections EN/VI | Sources | Author review | Independent review |\n|---|---:|---|---|---|\n'+records.map(r=>`| ${r.id}: ${r.title} | ${r.sections.length}/${r.sections.length} | ${r.sources.map(s=>`[${s.label}](${s.url})`).join('; ')} | [Completed](${r.authorReport}) | [Reviewed](${r.crossReview}) |`).join('\n')+'\n');
console.log(JSON.stringify({resources:records.length,pairedSections:records.reduce((n,r)=>n+r.sections.length,0),changedBankItems:records.reduce((n,r)=>n+r.questionChanges.length,0)}));
