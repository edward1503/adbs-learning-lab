// Run against a local candidate or the deployed release, using an installed
// Playwright module supplied in PLAYWRIGHT_MODULE. No runtime dependency added.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const base=process.env.SMOKE_BASE||'http://127.0.0.1:18973/',out=path.resolve('output/playwright/rewrite');fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});
 const result={base,appVersion:require('../package.json').version,routes:[],screenshots:[],checks:[],errors:[]};
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>result.errors.push(e.message));
  assert.equal((await page.goto(base)).status(),200);await page.waitForSelector('[data-language="vi"]');
  if(process.env.SMOKE_COMMIT){const r=await (await page.request.get(base+'release.json?review='+Date.now())).json();assert.equal(r.sourceCommit,process.env.SMOKE_COMMIT);assert.equal(r.appVersion,result.appVersion);result.release=r;}
  const ids=await page.evaluate(()=>[...window.LESSONS,...window.SUPPLEMENTS].map(l=>l.id));assert.equal(ids.length,37);
  for(const width of [1440,390]){
   await page.setViewportSize({width,height:width===390?844:1000});
   for(const language of ['en','vi']){
    await page.locator(`[data-language="${language}"]`).click();
    for(const id of ids){
     await page.goto(base+'#'+id);await page.waitForSelector('.lesson-section');
     await page.waitForFunction(lang=>document.documentElement.lang===lang,language);
     const check=await page.evaluate(({id,language})=>{
      const expected=language==='vi'?window.LESSON_LOCALES[id]:(window.LESSONS.concat(window.SUPPLEMENTS)).find(l=>l.id===id);
      const actual=[...document.querySelectorAll('.lesson-section')];
      const normalize=s=>s.replace(/\s+/g,' ').trim();
      const mismatch=expected.sections.filter((s,i)=>{
       const doc=new DOMParser().parseFromString(s.html,'text/html'),p=doc.querySelector('p');
       return actual[i]?.id!==s.id||!normalize(actual[i]?.textContent||'').includes(normalize(p?.textContent||''));
      }).map(s=>s.id);
      document.querySelectorAll('.lesson-section details').forEach(d=>d.open=true);
      return {sections:actual.length,mismatch,overflow:document.documentElement.scrollWidth>innerWidth+1,text:document.querySelector('#lesson-view').innerText};
     },{id,language});
     assert.deepEqual(check.mismatch,[],`${width}/${language}/${id}: rendered source mismatch`);assert.equal(check.overflow,false,`${width}/${language}/${id}: page overflow`);
     assert.ok(!check.text.includes('undefined'),id);result.routes.push({width,language,id,sections:check.sections,pass:true});
     if(width===1440)fs.writeFileSync(path.join(out,`${id}-${language}.txt`),check.text);
     if(['lecture-02','lecture-05','lecture-16','lecture-21'].includes(id)){
      await page.locator('.lesson-section').first().evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+window.scrollY-90));
      const file=`${id}-${language}-${width}.png`;await page.screenshot({path:path.join(out,file)});result.screenshots.push(file);
     }
    }
   }
  }
  result.checks.push('all 37 routes render expected EN/VI paragraphs and section IDs at both widths; solutions expanded; no page overflow');
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+'#lecture-01');await page.locator('[data-language="en"]').click();
  const q=await page.evaluate(()=>window.QUIZ_BANKS['lecture-01'].topics[0].questions[0]);
  await page.locator(`[data-q="${q.id}"][data-choice="${q.answer}"]`).click();
  const answers=await page.evaluate(()=>localStorage.getItem('adbs-topic-quiz-v1'));
  await page.locator('#complete').click();await page.locator('[data-language="vi"]').click();
  assert.equal(await page.evaluate(()=>localStorage.getItem('adbs-topic-quiz-v1')),answers);
  await page.reload();assert.equal(await page.locator('html').getAttribute('lang'),'vi');assert.equal(await page.locator('#progress-count').textContent(),'1 / 27');
  result.checks.push('quiz answer identity and completed progress survive language switch and reload');
  await page.goto(base+'#lab-sql');await page.waitForFunction(()=>document.querySelector('[data-action="run"]')&&!document.querySelector('[data-action="run"]').disabled);
  const sql='SELECT COUNT(*) AS n FROM students;';await page.locator('#sql-editor').fill(sql);await page.locator('[data-action="run"]').click();
  await page.waitForFunction(()=>document.querySelector('.sql-results td')?.textContent==='6');await page.locator('[data-language="en"]').click();
  assert.equal(await page.locator('#sql-editor').inputValue(),sql);assert.equal(await page.locator('.sql-results td').textContent(),'6');
  result.checks.push('real SQLite/WASM returns six students; editor and results survive EN/VI switch');
  await page.setViewportSize({width:390,height:844});await page.goto(base+'#lecture-16');await page.locator('[data-language="vi"]').click();
  await page.locator('#menu-toggle').click();assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'true');
  await page.keyboard.press('Escape');assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false');
  result.checks.push('mobile contents drawer opens and closes with Escape');assert.deepEqual(result.errors,[]);result.pass=true;
 }finally{await browser.close();fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(result,null,2)+'\n');}
 console.log(JSON.stringify({pass:result.pass,routes:result.routes.length,checks:result.checks,errors:result.errors}));
})().catch(e=>{console.error(e);process.exit(1);});
