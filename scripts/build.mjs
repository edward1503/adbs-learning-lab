import {mkdir,copyFile,readFile,writeFile,readdir,cp,rm} from 'node:fs/promises';
const root=new URL('../',import.meta.url),course=new URL('course/',root);let lessons=[];
for(const file of (await readdir(course)).filter(x=>/^lecture\d+\.json$/.test(x)).sort()){const data=JSON.parse(await readFile(new URL(file,course),'utf8'));lessons.push(...(Array.isArray(data)?data:[data]));}
lessons.sort((a,b)=>a.lecture-b.lecture);
if(lessons.length!==27)throw Error(`Expected 27 source-grounded lectures, found ${lessons.length}`);
for(const l of lessons){if(!l.id||!l.source?.links?.length||!l.coverage?.verified||l.sections?.length<3)throw Error(`Incomplete lesson ${l.id}`);}
// Supplements have a separate contract. They cannot pass the official-slide
// validator merely by setting the legacy verified flag.
const supplementalPackets=[];
for(const file of (await readdir(new URL('supplements/',course))).filter(x=>/^supplement\d+\.json$/.test(x)).sort())supplementalPackets.push(JSON.parse(await readFile(new URL('supplements/'+file,course),'utf8')));
const supplements=supplementalPackets.map(p=>p.lesson).sort((a,b)=>a.order-b.order);
if(supplements.length!==10)throw Error(`Expected 10 supplemental resources, found ${supplements.length}`);
const curriculum=JSON.parse(await readFile(new URL('docs/audit/syllabus-target.json',root),'utf8'));
if(curriculum.modules.length!==13||curriculum.modules.reduce((n,m)=>n+m.sessions,0)!==30||new Set(curriculum.modules.flatMap(m=>m.weeks)).size!==15)throw Error('Invalid syllabus timetable');
const resourceIds=new Set([...lessons,...supplements].map(l=>l.id));
const mapped=curriculum.modules.flatMap(m=>[...m.scheduledLessonIds,...m.supplementaryResourceIds]);
if(mapped.length!==37||new Set(mapped).size!==37||mapped.some(id=>!resourceIds.has(id)))throw Error('Incomplete curriculum resource mapping');
for(const [i,l]of supplements.entries()){
 if(l.id!==`supplement-${28+i}`||l.kind!=='supplemental'||l.lecture!==null||l.coverage?.verified!==false||l.coverage?.officialCourseMaterialVerified!==false||!l.source?.links?.length||!l.displayLabel||!l.sections?.length||l.module<11||l.module>13)throw Error('Invalid supplemental status boundary '+l.id);
 if(l.sections.some(s=>!s.id.startsWith(l.id+'-')||!s.html.includes('<p>')||s.html.includes('&lt;p&gt;')))throw Error('Invalid supplemental markup '+l.id);
}
const glossary=[{"term": "Selection (σ)", "definition": "Selection keeps the tuples that satisfy a condition.", "lesson": "lecture-03"}, {"term": "Projection (π)", "definition": "Projection keeps selected attributes. Under set semantics, it also removes duplicate tuples.", "lesson": "lecture-03"}, {"term": "Buffer pool", "definition": "The buffer pool is an area of memory divided into frames that hold database pages.", "lesson": "lecture-05"}, {"term": "Pin count", "definition": "The pin count records active uses of a page. A pinned page cannot be selected for eviction.", "lesson": "lecture-05"}, {"term": "Slotted page", "definition": "A slot directory maps each stable slot ID to the current location of its record within a page.", "lesson": "lecture-06"}, {"term": "B+ tree", "definition": "A B+ tree is a balanced index whose leaves contain data entries and are linked to support range scans.", "lesson": "lecture-09"}, {"term": "Conflict serializability", "definition": "A schedule is conflict-serializable if it is conflict-equivalent to a serial schedule. Its precedence graph must be acyclic.", "lesson": "lecture-19"}, {"term": "WAL", "definition": "Write-ahead logging requires the relevant log records to reach durable storage before their changed data pages.", "lesson": "lecture-21"}, {"term": "Two-phase commit", "definition": "This distributed commit protocol first gathers prepare votes and then announces a decision. It can block after a failure.", "lesson": "lecture-22"}, {"term": "EXCEPT ALL", "definition": "For each tuple, bag difference returns max(mA − mB, 0) copies. SQLite does not support this operator; the Relational Lab simulates it separately.", "lesson": "lecture-03"}];
await writeFile(new URL('course-data.js',root),'// Generated from canonical core and supplemental records. Edit course/ JSON.\nwindow.LESSONS='+JSON.stringify(lessons)+';\nwindow.GLOSSARY='+JSON.stringify(glossary)+';\nwindow.SUPPLEMENTS='+JSON.stringify(supplements)+';\nwindow.CURRICULUM='+JSON.stringify(curriculum)+';\n');
const banks={};
for(const file of (await readdir(course)).filter(x=>/^quiz\d+\.json$/.test(x)).sort()){const bank=JSON.parse(await readFile(new URL(file,course),'utf8'));if(!lessons.some(l=>l.id===bank.lectureId))throw Error('Unknown quiz lecture '+file);const ids=new Set();for(const topic of bank.topics){if(!topic.title||!topic.pdfUrl.startsWith('https://opencourse.inf.ed.ac.uk/')||topic.questions.length<5||topic.questions.length>10)throw Error('Invalid topic '+topic.id);for(const q of topic.questions){if(ids.has(q.id)||q.options.length!==4||new Set(q.options).size!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3||!q.explanation||!q.pages?.length)throw Error('Invalid question '+q.id);ids.add(q.id);}}banks[bank.lectureId]=bank;}
if(Object.keys(banks).length!==27)throw Error(`Expected 27 complete quiz banks, found ${Object.keys(banks).length}`);
const supplementalBanks={};
const sourcePageLimits=new Map(lessons.map(l=>[l.coverage.pdfUrl,l.coverage.pageMap?.length?Math.max(...l.coverage.pageMap.map(p=>p.pdfPage)):Number(l.coverage.verifiedPages.match(/\d+/g).at(-1))]));
function validateCitation(s,id){const url=new URL(s.url);if(url.protocol!=='https:'||url.username||url.password)throw Error('Invalid source URL '+id);if(s.physicalPages&&(!s.physicalPages.length||s.physicalPages.some(p=>!Number.isInteger(p)||p<1||(sourcePageLimits.has(s.url)&&p>sourcePageLimits.get(s.url)))))throw Error('Invalid source pages '+id);}
for(const b of Object.values(banks))for(const t of b.topics)for(const q of t.questions)for(const s of q.sources||[])validateCitation(s,q.id);
for(const packet of supplementalPackets){const {lesson,quizBank,sources}=packet;
 if(quizBank.lessonId!==lesson.id||quizBank.kind!=='supplemental')throw Error('Invalid supplemental bank '+lesson.id);
 const ids=new Set();const topics=quizBank.topics.map(t=>({...t,sourceLinks:lesson.source.links,questions:t.questions.map(q=>{
  if(ids.has(q.id)||q.options.length!==4||new Set(q.options).size!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3||!q.question||!q.explanation||!q.origin||q.sourceKeys?.some(k=>!sources[k])||q.lessonSectionIds?.some(id=>!lesson.sections.some(s=>s.id===id)))throw Error('Invalid supplemental question '+q.id);
  ids.add(q.id);const citations=q.sourceKeys.map(k=>({url:sources[k].url,label:sources[k].title}));citations.forEach(s=>validateCitation(s,q.id));return {...q,prompt:q.question,sources:citations};
 })}));
 if(topics.reduce((n,t)=>n+t.questions.length,0)!==5||JSON.stringify(lesson.quiz)!==JSON.stringify(quizBank.topics[0].questions[0]))throw Error('Incomplete supplemental quiz '+lesson.id);
 supplementalBanks[lesson.id]={...quizBank,topics};
}
await writeFile(new URL('quiz-coverage.json',root),JSON.stringify({edition:'Spring 2026',lectures:Object.values(banks).map(b=>({lectureId:b.lectureId,topics:b.topics.map(t=>({id:t.id,title:t.title,pdfUrl:t.pdfUrl,pages:t.pages,questions:t.questions.length}))}))},null,2));
await writeFile(new URL('quiz-data.js',root),'// Generated from canonical core and supplemental quiz records.\nwindow.QUIZ_BANKS='+JSON.stringify(banks)+';\nwindow.SUPPLEMENT_QUIZ_BANKS='+JSON.stringify(supplementalBanks)+';\n');
await rm(new URL('dist/',root),{recursive:true,force:true});await mkdir(new URL('dist/',root),{recursive:true});
for(const file of ['index.html','styles.css','editorial.css','course-data.js','quiz-data.js','quiz.js','app.js'])await copyFile(new URL(file,root),new URL('dist/'+file,root));
for(const dir of ['labs','vendor'])await cp(new URL(dir+'/',root),new URL('dist/'+dir+'/',root),{recursive:true});
await writeFile(new URL('coverage-manifest.json',root),JSON.stringify({edition:'Spring 2026',generated:new Date().toISOString(),lectures:lessons.map(l=>({lecture:l.lecture,id:l.id,title:l.title,...l.coverage}))},null,2));
console.log(`Built ${lessons.length} slide-based resources + ${supplements.length} original supplements across 13 modules / 30 sessions, 10 labs and vendored SQLite assets in dist/`);
