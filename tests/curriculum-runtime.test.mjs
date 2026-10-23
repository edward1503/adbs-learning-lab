import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const appSource=readFileSync(new URL('../app.js',import.meta.url),'utf8');
const syllabus=JSON.parse(readFileSync(new URL('../docs/audit/syllabus-target.json',import.meta.url),'utf8'));
const paper='https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer6.pdf';
const makeCore=()=>Array.from({length:27},(_,i)=>({
  id:`lecture-${String(i+1).padStart(2,'0')}`,lecture:i+1,title:`Slide lesson ${i+1}`,
  short:`Core ${i+1}`,group:'Core lessons',time:25,lead:'Original source-based explanation',
  goals:['Understand a model'],sections:[{id:`l${i+1}-s1`,title:'Read the model',html:'<p>Original core prose.</p>'}],
  source:{summary:'Core source scope',links:[{label:'Physical PDF page 2',url:'https://opencourse.inf.ed.ac.uk/source.pdf#page=2'}]},
  coverage:{verified:true,topics:['A source topic'],verifiedPages:'1–3',pdfUrl:'https://opencourse.inf.ed.ac.uk/source.pdf',limitations:[]},
  lab:i===3?'buffer':null
}));
const makeSupplements=()=>Array.from({length:10},(_,i)=>{
  const order=i+28,module=order<=31?11:order<=35?12:13,session=module===11?order-27:module===12?order-31:order-35;
  return {id:`supplement-${order}`,lecture:null,order,kind:'supplemental',displayLabel:`M${module} · Session ${session}`,
    module,week:module===11?11:module===12?13:15,suggestedSession:session,
    title:order===29?'Vector search practice':`Supplemental resource ${order}`,short:`Supplement ${order}`,
    group:`${module} · Supplemental learning`,time:45,timeMeaning:'Suggested independent study minutes; not scheduled contact time',
    lead:'Original research or project practice',goals:['Interpret an original example'],
    sections:[{id:`s${order}-1`,title:'Work through the evidence',html:'<p>Original supplemental prose.</p>'}],
    source:{summary:'Original supplemental explanation; Canvas-assigned readings unverified',links:[{url:paper,label:'Primary research paper'}]},
    coverage:{verified:false,sourceEvidenceVerified:true,officialCourseMaterialVerified:false,module,
      topics:['Research evidence'],limitations:['Canvas-assigned paper list unavailable','No instructor rubric asserted']},lab:null};
});
const makeBank=(id,supplemental=false)=>({lessonId:id,topics:[{id:id+'-topic',title:'Practice topic',
  ...(supplemental?{}:{pdfUrl:'https://opencourse.inf.ed.ac.uk/source.pdf',pages:[2,3]}),
  questions:[{id:id+'-q1',prompt:'A fixture question',options:['a','b','c','d'],answer:1,
    explanation:'The fixture answer is b.',...(supplemental?{sources:[{url:paper,label:'Primary research paper'}]}:{pages:[2]})}]}]});

function start({hash='#overview',saved={},noNewGlobals=false,blockedStorage=false,curriculum}={}){
  const data=new Map(Object.entries(saved)),writes=[],nodes=new Map(),events={},quizMounts=[];
  let labMounted=0,labCleaned=0;
  const document={activeElement:{tagName:'BODY'},title:'',body:{classList:{toggle(){}}},addEventListener(){},
    querySelector(selector){if(!nodes.has(selector))nodes.set(selector,new Element(selector));return nodes.get(selector);},
    getElementById(id){return this.querySelector('#'+id);}};
  class Element{
    constructor(selector){this.selector=selector;this.innerHTML='';this.textContent='';this.value='';this.attributes=new Map();this.style={};this.hidden=false;this.open=false;this.tagName='DIV';const classes=new Set();this.classList={toggle(name,on){if(on===undefined)on=!classes.has(name);if(on)classes.add(name);else classes.delete(name);},contains:name=>classes.has(name)};}
    setAttribute(k,v){this.attributes.set(k,v);}
    removeAttribute(k){this.attributes.delete(k);}
    contains(node){return node===this;}
    querySelector(selector){return document.querySelector(selector);}
    querySelectorAll(){return [];}
    focus(){document.activeElement=this;}
    scrollIntoView(){this.scrolled=true;}
    showModal(){this.open=true;}
    close(){this.open=false;}
    getBoundingClientRect(){return {left:0,right:100,top:0,bottom:100};}
  }
  const location={hash,replace(value){this.hash=value;this.replaced=value;}};
  const core=makeCore(),supplements=makeSupplements();
  const coreBanks=Object.fromEntries(core.map(l=>[l.id,makeBank(l.id)])),supplementBanks=Object.fromEntries(supplements.map(l=>[l.id,makeBank(l.id,true)]));
  const window={LESSONS:core,QUIZ_BANKS:coreBanks,GLOSSARY:[{term:'SQL',definition:'Query language',lesson:'lecture-02'}],
    matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener:(name,callback)=>events[name]=callback,
    scrollTo(){},ADBSQuiz:{mount:(container,bank)=>quizMounts.push({container,bank})},
    ADBSLabs:{buffer:{mount(){labMounted++;return()=>labCleaned++;}}}};
  if(!noNewGlobals)Object.assign(window,{SUPPLEMENTS:supplements,CURRICULUM:curriculum||structuredClone(syllabus),SUPPLEMENT_QUIZ_BANKS:supplementBanks});
  const localStorage={getItem(key){if(blockedStorage)throw new Error('Storage blocked');return data.get(key)||null;},setItem(key,value){if(blockedStorage)throw new Error('Storage blocked');writes.push(key);data.set(key,value);}};
  const context={window,document,location,localStorage,requestAnimationFrame:callback=>callback()};
  vm.runInNewContext(appSource,context,{filename:'app.js'});
  return {window,document,location,data,writes,nodes,quizMounts,coreBanks,supplementBanks,
    node:selector=>document.querySelector(selector),
    navigate(route){location.hash=route;events.hashchange();},
    labs:()=>({mounted:labMounted,cleaned:labCleaned})};
}

test('overview shows timetable and resource counts and navigation maps each resource once',()=>{
  const app=start(),html=app.node('#lesson-view').innerHTML,nav=app.node('#lesson-nav').innerHTML;
  for(const [count,label] of [[13,'modules'],[15,'weeks'],[30,'timetabled sessions'],[37,'learning resources']])assert.ok(html.includes(`<strong>${count}</strong><span>${label}</span>`));
  assert.match(html,/27 slide-based lessons \+ 10 original supplemental resources/);
  assert.match(html,/Study estimates are not scheduled contact hours/);
  assert.equal((nav.match(/class="nav-group-title"/g)||[]).length,13);
  for(const id of [...makeCore(),...makeSupplements()].map(l=>l.id))assert.equal((nav.match(new RegExp(`href="#${id}"`,'g'))||[]).length,1,id);
  assert.doesNotMatch(nav,/LECTURE 28|Candidate integration mapping|awaits source-audit packets/);
});

test('supplemental completion preserves existing v1, core v2 and quiz storage',()=>{
  const originalCore='["lecture-01","lecture-07"]',legacy='["sql-basics"]',quiz='{"l01-q1":2}';
  const app=start({hash:'#supplement-28',saved:{'adbs-learning-v2':originalCore,'adbs-learning-v1':legacy,'adbs-topic-quiz-v1':quiz}});
  app.node('#complete').onclick();
  assert.deepEqual(JSON.parse(app.data.get('adbs-supplement-progress-v1')),['supplement-28']);
  assert.equal(app.data.get('adbs-learning-v2'),originalCore);
  assert.equal(app.data.get('adbs-learning-v1'),legacy);
  assert.equal(app.data.get('adbs-topic-quiz-v1'),quiz);
  assert.equal(app.node('#progress-count').textContent,'2 / 27');
  assert.match(app.node('#storage-note').textContent,/Supplemental resources: 1 \/ 10/);
  assert.deepEqual(app.writes,['adbs-supplement-progress-v1']);
  app.node('#complete').onclick();
  assert.deepEqual(JSON.parse(app.data.get('adbs-supplement-progress-v1')),[]);
});

test('core completion writes only v2 and reload restores separately saved supplemental progress',()=>{
  const initialSupp='["supplement-28","supplement-32"]';
  const app=start({hash:'#lecture-02',saved:{'adbs-learning-v2':'["lecture-01"]','adbs-supplement-progress-v1':initialSupp}});
  app.node('#complete').onclick();
  assert.deepEqual(JSON.parse(app.data.get('adbs-learning-v2')),['lecture-01','lecture-02']);
  assert.equal(app.data.get('adbs-supplement-progress-v1'),initialSupp);
  assert.deepEqual(app.writes,['adbs-learning-v2']);
  const reload=start({saved:Object.fromEntries(app.data)});
  assert.equal(reload.node('#progress-count').textContent,'2 / 27');
  assert.match(reload.node('#storage-note').textContent,/Supplemental resources: 2 \/ 10/);
});

test('resume enters the supplemental path after all slide resources are complete',()=>{
  const app=start({saved:{'adbs-learning-v2':JSON.stringify(makeCore().map(l=>l.id)),'adbs-supplement-progress-v1':'["supplement-28"]'}});
  assert.match(app.node('#lesson-view').innerHTML,/class="complete-button" href="#supplement-29"/);
});

test('previous and next routes cross the core/supplement boundary without inventing lectures',()=>{
  const app=start({hash:'#lecture-27'});
  assert.match(app.node('#lesson-view').innerHTML,/href="#supplement-28">Next resource: M11 · Session 1/);
  app.navigate('#supplement-28');
  const html=app.node('#lesson-view').innerHTML;
  assert.match(html,/Lectures<\/a> \/ M11 · Session 1/);
  assert.match(html,/href="#lecture-27">← Previous resource: Lecture 27/);
  assert.match(html,/href="#supplement-29">Next resource: M11 · Session 2/);
  assert.doesNotMatch(html,/LECTURE 28|Lecture null|FROM THE SOURCE SLIDES/);
  app.navigate('#supplement-37');
  assert.match(app.node('#lesson-view').innerHTML,/M13 · Session 2/);
  assert.match(app.node('#lesson-view').innerHTML,/href="#overview">Back to curriculum/);
});

test('core and supplemental readers mount their own normalized quiz banks',()=>{
  const app=start({hash:'#lecture-01'});
  assert.equal(app.quizMounts.at(-1).bank,app.coreBanks['lecture-01']);
  app.navigate('#supplement-28/quiz');
  assert.equal(app.quizMounts.at(-1).bank,app.supplementBanks['supplement-28']);
  assert.ok(app.node('#quiz').scrolled);
  app.navigate('#supplement-28/s28-1');
  assert.ok(app.node('#s28-1').scrolled);
  assert.equal(app.window.LESSONS.length,27);
  assert.equal(app.window.SUPPLEMENTS.length,10);
});

test('coverage distinguishes reviewed references from unavailable official Canvas material',()=>{
  const app=start({hash:'#coverage'}),html=app.node('#lesson-view').innerHTML;
  assert.equal((html.match(/class="coverage-status verified"/g)||[]).length,27);
  assert.equal((html.match(/Original supplemental resource<\/span>/g)||[]).length,10);
  assert.match(html,/Primary-reference evidence: reviewed\. Official Canvas\/instructor alignment: unverified/);
  assert.match(html,/docs\/audit\/README\.md/);
  assert.ok(html.includes(paper));
  assert.doesNotMatch(html,/no lectures in Week 11|#page=undefined|href="undefined"|37 lectures|37 timetabled sessions/);
});

test('search reaches supplements with source-kind labels and retains core glossary and lab results',()=>{
  const app=start();app.node('#search-input').value='vector';app.node('#search-input').oninput();
  let html=app.node('#search-results').innerHTML;
  assert.match(html,/href="#supplement-29"/);
  assert.match(html,/M11 · Session 2 · ORIGINAL SUPPLEMENT/);
  assert.doesNotMatch(html,/LECTURE 29/);
  app.node('#search-input').value='SQL';app.node('#search-input').oninput();html=app.node('#search-results').innerHTML;
  assert.match(html,/href="#lab-sql"/);
  assert.match(html,/href="#lecture-02">SQL/);
});

test('legacy bundles remain usable when new globals have not loaded',()=>{
  const app=start({hash:'#lecture-03',noNewGlobals:true});
  assert.match(app.node('#lesson-view').innerHTML,/Lecture 03/);
  assert.equal(app.node('#progress-count').textContent,'0 / 27');
  app.navigate('#overview');assert.match(app.node('#lesson-view').innerHTML,/27 slide-based lessons/);
  app.navigate('#lab-buffer');assert.equal(app.labs().mounted,1);
  app.navigate('#lecture-01');assert.equal(app.labs().cleaned,1);
});

test('blocked storage keeps supplemental completion only in the current session',()=>{
  const app=start({hash:'#supplement-32',blockedStorage:true});app.node('#complete').onclick();
  assert.match(app.node('#complete').textContent,/Completed/);
  assert.match(app.node('#storage-note').textContent,/Supplemental resources: 1 \/ 10/);
  assert.match(app.node('#storage-note').textContent,/Cannot save permanently/);
  assert.equal(app.writes.length,0);
});

test('duplicate schedule references do not duplicate navigation or sequencing',()=>{
  const curriculum=structuredClone(syllabus);curriculum.modules[0].scheduledLessonIds.push('lecture-04');
  const app=start({curriculum});
  assert.equal((app.node('#lesson-nav').innerHTML.match(/href="#lecture-04"/g)||[]).length,1);
});

test('core inline lab lifecycle still cleans up when navigating to a supplement',()=>{
  const app=start({hash:'#lecture-04'});assert.equal(app.labs().mounted,1);
  app.navigate('#supplement-28');assert.equal(app.labs().cleaned,1);
});
