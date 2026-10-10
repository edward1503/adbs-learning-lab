import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const root=new URL('../',import.meta.url);
test('English edition declares its language and preserves learner progress storage keys',()=>{const html=fs.readFileSync(new URL('index.html',root),'utf8');assert.match(html,/<html lang="en">/);assert.ok(html.includes('?v=3.0.0'));const app=fs.readFileSync(new URL('app.js',root),'utf8'),quiz=fs.readFileSync(new URL('quiz.js',root),'utf8');assert.ok(app.includes('adbs-learning-v2'));assert.ok(quiz.includes('adbs-topic-quiz-v1'));});
test('English course has all original takeaway notes and meaningful explanations',()=>{const context={window:{}};vm.runInNewContext(fs.readFileSync(new URL('course-data.js',root),'utf8'),context);const lessons=context.window.LESSONS;assert.equal(lessons.length,27);const html=lessons.flatMap(l=>l.sections.map(s=>s.html)).join('');assert.equal((html.match(/class="important-note"/g)||[]).length,56);assert.equal((html.match(/aria-label="Key takeaway"/g)||[]).length,56);assert.ok(!html.includes('Quan trọng'));for(const l of lessons){assert.ok(l.lead.length>30,l.id);assert.ok(l.sections.every(s=>s.html.includes('<p>')),l.id);}});

test('all 54 source files contain English prose and valid embedded quote syntax',()=>{
  const files=fs.readdirSync(new URL('course/',root)).filter(f=>/^(lecture|quiz)\d+\.json$/.test(f));
  assert.equal(files.length,54);
  const vietnamese=/[àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵ]/iu;
  function walk(value,path){
    if(Array.isArray(value))return value.forEach((v,i)=>walk(v,`${path}[${i}]`));
    if(value&&typeof value==='object')return Object.entries(value).forEach(([k,v])=>walk(v,`${path}.${k}`));
    if(typeof value!=='string')return;
    const prose=value.replaceAll('Hà Nội','').replaceAll('Huế','').replaceAll('Bình','');
    assert.ok(!vietnamese.test(prose),`${path}: unexpected untranslated text`);
    assert.ok(!value.includes('\\"'),`${path}: invalid escaped HTML attribute quotes`);
    assert.ok(!/\b(?:TODO|TRANSLATE_ME|PLACEHOLDER_TEXT)\b/.test(value),`${path}: placeholder`);
  }
  files.forEach(f=>walk(JSON.parse(fs.readFileSync(new URL(`course/${f}`,root),'utf8')),f));
});

test('English lessons preserve section routes, source links, coverage maps and self-check answers',()=>{
  const expected=JSON.parse(fs.readFileSync(new URL('tests/lesson-structure-baseline.json',root),'utf8'));
  assert.equal(Object.keys(expected).length,27);
  for(const [file,baseline]of Object.entries(expected)){
    const l=JSON.parse(fs.readFileSync(new URL(`course/${file}`,root),'utf8'))[0];
    const actual={id:l.id,lecture:l.lecture,time:l.time,lab:l.lab,
      sections:l.sections.map(s=>({id:s.id,links:[...s.html.matchAll(/href="([^"]+)"/g)].map(m=>m[1])})),
      sourceURLs:l.source.links.map(x=>x.url),coverage:Object.fromEntries(['pdfUrl','verified','verifiedPages'].map(k=>[k,l.coverage[k]])),
      quiz:{answer:l.quiz.answer,optionCount:l.quiz.options.length}};
    assert.deepEqual(actual,baseline,file);
  }
});

test('generated English lessons and quizzes exactly match every source JSON',()=>{
  const context={window:{}};
  for(const file of ['course-data.js','quiz-data.js'])vm.runInNewContext(fs.readFileSync(new URL(file,root),'utf8'),context);
  const lessons=[],banks={};
  for(const file of fs.readdirSync(new URL('course/',root)).sort()){
    if(!/^(lecture|quiz)\d+\.json$/.test(file))continue;
    const data=JSON.parse(fs.readFileSync(new URL(`course/${file}`,root),'utf8'));
    if(file.startsWith('lecture'))lessons.push(...data);else banks[data.lectureId]=data;
  }
  assert.deepEqual(JSON.parse(JSON.stringify(context.window.LESSONS)),lessons);
  assert.deepEqual(JSON.parse(JSON.stringify(context.window.QUIZ_BANKS)),banks);
});
