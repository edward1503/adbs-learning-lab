import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const source=fs.readFileSync(new URL('../quiz.js',import.meta.url),'utf8');
const bank={lectureId:'lecture-01',topics:[{id:'test-topic',title:'Source topic',pdfUrl:'https://opencourse.inf.ed.ac.uk/example.pdf',pages:[2,5],questions:Array.from({length:5},(_,i)=>({id:'q'+i,prompt:'Question '+i,options:['one','two','three','four'],answer:i%4,explanation:'The correct choice follows the stated assumption.',pages:[2]}))},{id:'topic-two',title:'Second heading',pdfUrl:'https://opencourse.inf.ed.ac.uk/example.pdf',pages:[6,7],questions:[{id:'q9',prompt:'Other',options:['a','b','c','d'],answer:1,explanation:'Reason',pages:[6]}]}]};
function setup(initial={},blocked=false,selectedBank=bank){const stored=new Map(Object.entries(initial));const context={window:{},localStorage:{getItem:k=>{if(blocked)throw Error();return stored.get(k)},setItem:(k,v)=>{if(blocked)throw Error();stored.set(k,v)}}};vm.runInNewContext(source,context);const el={_html:'',els:{},get innerHTML(){return this._html},set innerHTML(v){this._html=v;this.els={}},querySelector(s){return this.els[s]??= {dataset:{},setAttribute(){},focus(){},scrollIntoView(){}}},querySelectorAll(s){if(s==='[data-q]')return [...this._html.matchAll(/data-q="([^"]+)" data-choice="(\d+)"/g)].map(m=>this.els[m[1]+'-'+m[2]]={dataset:{q:m[1],choice:m[2]}});if(s==='[data-retry]')return [...this._html.matchAll(/data-retry="([^"]+)"/g)].map(m=>this.els['retry-'+m[1]]={dataset:{retry:m[1]}});return[]},scrollIntoView(){}};context.window.ADBSQuiz.mount(el,selectedBank);return {el,stored,api:context.window.ADBSQuiz};}
function choices(el,id){return [...el.innerHTML.matchAll(/<button\b[^>]*data-q="([^"]+)" data-choice="(\d+)" aria-pressed="([^"]+)"[^>]*class="([^"]*)"><span>([^<]+)<\/span>([\s\S]*?)<\/button>/g)].filter(match=>match[1]===id).map(match=>({sourceIndex:Number(match[2]),selected:match[3]==='true',style:match[4],letter:match[5],text:match[6]}));}
test('topic quiz requires actual answers; wrong answers do not pass and cannot be overwritten until retry',()=>{const {el,stored,api}=setup();assert.ok(el.innerHTML.includes('Correct 0/6'));el.els['q0-1'].onclick();assert.ok(el.innerHTML.includes('Not quite.'));assert.equal(api.score(bank.topics[0],JSON.parse(stored.get(api.KEY))).correct,0);el.els['q0-0'].onclick();assert.equal(JSON.parse(stored.get(api.KEY)).q0,1);el.els['retry-q0'].onclick();el.els['q0-0'].onclick();assert.equal(api.score(bank.topics[0],JSON.parse(stored.get(api.KEY))).correct,1);assert.equal(stored.has('adbs-learning-v2'),false);});
test('quiz topic navigation, scoped reset and persistence preserve other topics',()=>{const {el,stored,api}=setup();el.els['q0-0'].onclick();el.querySelector('[data-next]').onclick();assert.ok(el.innerHTML.includes('Second heading'));el.els['q9-1'].onclick();el.querySelector('[data-reset]').onclick();const a=JSON.parse(stored.get(api.KEY));assert.equal(a.q0,0);assert.equal(a.q9,undefined);const again=setup({[api.KEY]:stored.get(api.KEY)});assert.ok(again.el.innerHTML.includes('Correct 1/6'));});
test('blocked or malformed quiz storage recovers and unknown invalid answers do not lock questions',()=>{assert.ok(setup({},true).el.innerHTML.includes('cannot save'));const {el}=setup({'adbs-topic-quiz-v1':'{"q0":999}'});assert.ok(el.innerHTML.includes('Correct 0/6'));el.els['q0-0'].onclick();assert.ok(el.innerHTML.includes('Correct 1/6'));});
test('English quiz labels and saved answers preserve question identity and scoped retry',()=>{
  const {el,stored,api}=setup({'adbs-topic-quiz-v1':'{"q0":0,"q9":1}'});
  assert.equal(api.KEY,'adbs-topic-quiz-v1');
  assert.ok(el.innerHTML.includes('Correct 2/6'));
  assert.ok(el.innerHTML.includes('aria-label="Quiz topic"'));
  assert.ok(el.innerHTML.includes('aria-label="Correct answers in this topic"'));
  assert.ok(el.innerHTML.includes('aria-label="Answer choices for question 1"'));
  assert.ok(el.innerHTML.includes('Retry question 1'));
  el.els['retry-q0'].onclick();
  assert.deepEqual(JSON.parse(stored.get(api.KEY)),{q9:1});
});
test('legacy saved responses migrate into the permuted view without changing selected meaning or grade',()=>{
  const question=bank.topics[0].questions[0];
  for(let oldIndex=0;oldIndex<4;oldIndex++){
    const legacy=JSON.stringify({q0:oldIndex,q9:1,'other-lesson-question':2});
    const lectureProgress='["lecture-01","lecture-27"]';
    const {el,stored,api}=setup({'adbs-topic-quiz-v1':legacy,'adbs-learning-v2':lectureProgress});
    const buttons=choices(el,question.id),selected=buttons.find(button=>button.selected);
    assert.equal(selected.sourceIndex,oldIndex);
    assert.equal(selected.text,question.options[oldIndex]);
    assert.equal(buttons.indexOf(selected),api.displayIndex(question,oldIndex));
    assert.equal(selected.style.includes('is-correct'),oldIndex===question.answer);
    assert.equal(selected.style.includes('is-wrong'),oldIndex!==question.answer);
    assert.equal(api.score(bank.topics[0],JSON.parse(legacy)).correct,oldIndex===question.answer?1:0);
    const correctLetter=String.fromCharCode(65+api.displayIndex(question,question.answer));
    if(oldIndex!==question.answer)assert.ok(el.innerHTML.includes('The answer is '+correctLetter+'.'));
    assert.equal(stored.get(api.KEY),legacy,'mount must not reset or rewrite legacy answers');
    assert.equal(stored.get('adbs-learning-v2'),lectureProgress);
  }
});
test('per-question order is stable across reloads, retries, and topic resets while saved values remain canonical',()=>{
  const initial=setup({'adbs-topic-quiz-v1':'{"q0":1,"q9":1}'});
  const order=choices(initial.el,'q0').map(button=>button.sourceIndex);
  initial.el.els['retry-q0'].onclick();
  assert.deepEqual(choices(initial.el,'q0').map(button=>button.sourceIndex),order);
  initial.el.els['q0-0'].onclick();
  assert.equal(JSON.parse(initial.stored.get(initial.api.KEY)).q0,0);
  assert.ok(initial.el.innerHTML.includes('Correct 2/6'));
  const reloaded=setup({[initial.api.KEY]:initial.stored.get(initial.api.KEY)});
  assert.deepEqual(choices(reloaded.el,'q0').map(button=>button.sourceIndex),order);
  assert.equal(choices(reloaded.el,'q0').find(button=>button.selected).sourceIndex,0);
  reloaded.el.querySelector('[data-reset]').onclick();
  assert.deepEqual(JSON.parse(reloaded.stored.get(reloaded.api.KEY)),{q9:1});
  assert.deepEqual(choices(reloaded.el,'q0').map(button=>button.sourceIndex),order);
  assert.ok(choices(reloaded.el,'q0').every(button=>!button.selected));
});
test('all real question choices preserve source identity and no longer expose a cyclic answer-position key',()=>{
  const {api}=setup();let total=0,unchangedPosition=0;const displayedCorrect=[0,0,0,0];
  for(const file of fs.readdirSync(new URL('../course/',import.meta.url)).filter(file=>/^quiz\d+\.json$/.test(file))){
    const data=JSON.parse(fs.readFileSync(new URL('../course/'+file,import.meta.url)));
    for(const topic of data.topics)for(const question of topic.questions){
      const original=JSON.stringify(question),order=Array.from(api.choiceOrder(question));
      assert.deepEqual([...order].sort((a,b)=>a-b),[0,1,2,3],question.id);
      assert.deepEqual(Array.from(api.choiceOrder({...question,answer:(question.answer+1)%4})),order,'ordering must not depend on the keyed answer');
      const display=api.displayIndex(question,question.answer);
      assert.equal(order[display],question.answer);
      displayedCorrect[display]++;total++;if(display===question.answer)unchangedPosition++;
      assert.equal(JSON.stringify(question),original,'question source data must remain unchanged');
    }
  }
  assert.equal(total,1117);
  assert.ok(displayedCorrect.every(count=>count>total*.15&&count<total*.35),JSON.stringify(displayedCorrect));
  assert.ok(unchangedPosition<total*.4,'the old source-index answer pattern must not survive display permutation');
});
test('question banks have unique IDs, 5–10 questions per slide topic, varied keys and physical citations',()=>{const files=fs.readdirSync(new URL('../course/',import.meta.url)).filter(f=>/^quiz\d+\.json$/.test(f));assert.equal(files.length,27);const ids=new Set();for(const f of files){const b=JSON.parse(fs.readFileSync(new URL('../course/'+f,import.meta.url)));const raw=JSON.parse(fs.readFileSync(new URL('../course/'+f.replace('quiz','lecture'),import.meta.url)));const lesson=Array.isArray(raw)?raw[0]:raw;const maxPage=Number(lesson.coverage.verifiedPages.match(/\d+/g).at(-1));assert.ok(b.topics.length>0);for(const t of b.topics){assert.match(t.id,/^[a-z0-9-]+$/);assert.ok(!ids.has(t.id));ids.add(t.id);assert.ok(t.title.length>2);assert.ok(t.questions.length>=5&&t.questions.length<=10);assert.match(t.pdfUrl,/^https:\/\/opencourse.inf.ed.ac.uk\//);assert.ok(t.pages.every(p=>Number.isInteger(p)&&p>0));assert.ok(new Set(t.questions.map(q=>q.answer)).size>=3);for(const q of t.questions){assert.match(q.id,/^[a-z0-9-]+$/);assert.ok(!ids.has(q.id));ids.add(q.id);assert.equal(new Set(q.options).size,4);assert.ok(q.options[q.answer]);assert.ok(q.prompt.length>10&&q.explanation.length>20);assert.ok(q.pages.every(p=>Number.isInteger(p)&&p>0&&p<=maxPage));}}}});

test('cross-deck questions render their real physical source and CAP retains both evidence sources',()=>{
 const {api}=setup();const b=JSON.parse(fs.readFileSync(new URL('../course/quiz01.json',import.meta.url)));const t=b.topics[0],q=t.questions.find(q=>q.id==='l01-architecture-new-q1');const links=api.citationLinks(api.questionSources(q,t));assert.ok(links.includes('lecture04-hardware-disk-space-management.pdf#page=3'));assert.ok(!links.includes('lecture01-intro.pdf#page=3'));
 const capBank=JSON.parse(fs.readFileSync(new URL('../course/quiz27.json',import.meta.url)));const cap=capBank.topics.find(t=>t.id==='l27-cap');const capLinks=api.citationLinks(api.questionSources(cap.questions[0],cap));assert.ok(capLinks.includes('lecture27-nosql'));assert.ok(capLinks.includes('Gilbert/Brewer6.pdf#page=2'));
});
test('all fifty supplemental questions render, grade and persist with original status and stable identity',()=>{
 const c={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../quiz-data.js',import.meta.url),'utf8'),c);let total=0;
 for(const b of Object.values(c.window.SUPPLEMENT_QUIZ_BANKS)){const {el,api,stored}=setup({'adbs-topic-quiz-v1':'{"q0":0}'},false,b);assert.ok(el.innerHTML.includes('SUPPLEMENTAL PRACTICE'));assert.ok(el.innerHTML.includes('not an official slide or Canvas quiz'));assert.ok(!el.innerHTML.includes('undefined'));for(const q of b.topics[0].questions){assert.ok(el.innerHTML.includes(q.prompt.replaceAll('&','&amp;')));el.els[q.id+'-'+q.answer].onclick();total++;}const answers=JSON.parse(stored.get(api.KEY));assert.equal(api.score(b.topics[0],answers).correct,5);assert.equal(answers.q0,0);assert.equal(stored.has('adbs-learning-v2'),false);assert.equal(stored.has('adbs-supplement-progress-v1'),false);}
 assert.equal(total,50);
});
