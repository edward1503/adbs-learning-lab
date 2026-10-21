import fs from 'node:fs';
import cp from 'node:child_process';
const dir='docs/rewrite-2026-10-21'; fs.mkdirSync(dir,{recursive:true});
const baseline='751115b15eede16c8f7408a1d9bdb96ae31cc681';
const files=cp.execFileSync('git',['ls-tree','-r','--name-only',baseline,'course'],{encoding:'utf8'}).trim().split('\n');
const read=f=>JSON.parse(cp.execFileSync('git',['show',`${baseline}:${f}`],{encoding:'utf8',maxBuffer:20e6}));
const records=files.filter(f=>/course\/(lecture\d+|supplements\/supplement\d+)\.json$/.test(f)).map(f=>{
 const p=read(f), l=Array.isArray(p)?p[0]:p.lesson;
 const locale=`course/translations/${l.id.replace('-','')}.vi.json`, vi=read(locale);
 const quiz=Array.isArray(p)?read(f.replace('lecture','quiz')):p.quizBank;
 return {id:l.id,file:f,locale,title:l.title,goals:l.goals,sections:l.sections.map((s,i)=>({id:s.id,title:s.title,viTitle:vi.sections[i].title,sourceLinks:[...s.html.matchAll(/href="([^"]+)"/g)].map(m=>m[1])})),sources:l.source.links,coverage:l.coverage,quizTopics:quiz.topics.length,questions:quiz.topics.reduce((n,t)=>n+t.questions.length,0),reviewStatus:'assigned; pending editorial and integration review'};
}).sort((a,b)=>Number(a.id.split('-')[1])-Number(b.id.split('-')[1]));
const inventory={baseline,baselineVersion:read('package.json').version,resources:records.length,sections:records.reduce((n,l)=>n+l.sections.length,0),questions:records.reduce((n,l)=>n+l.questions,0),records};
fs.writeFileSync(`${dir}/inventory-baseline.json`,JSON.stringify(inventory,null,2)+'\n');
fs.writeFileSync(`${dir}/source-map.md`,'# Source and review map\n\nSource baseline `'+baseline+'`. Physical PDF pages are used unless a printed slide number is explicitly stated. Historical coverage metadata records earlier checks; fresh checks and access limits belong in each group report.\n\n| Resource | Sections EN/VI | Questions | Source | Review |\n|---|---:|---:|---|---|\n'+records.map(l=>`| ${l.id}: ${l.title} | ${l.sections.length}/${l.sections.length} | ${l.questions} | ${l.sources.map(s=>`[${s.label}](${s.url})`).join('; ')} | Assigned, pending |`).join('\n')+'\n');
console.log(JSON.stringify({resources:inventory.resources,sections:inventory.sections,questions:inventory.questions}));
