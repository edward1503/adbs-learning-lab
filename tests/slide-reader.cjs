// Optional real-browser acceptance: bundled Playwright or PLAYWRIGHT_MODULE.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.BASE_URL||'http://127.0.0.1:18335/';
const output=path.resolve(__dirname,'../output/playwright');fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto(base);await page.waitForSelector('h1');
  assert.equal(await page.locator('.catalog-lessons>a').count(),37);
  assert.equal(await page.locator('.study-card').count(),0);
  const resources=await page.evaluate(()=>[...window.LESSONS,...window.SUPPLEMENTS].map(l=>({id:l.id,sections:l.sections.map(s=>s.id),units:l.sections.flatMap(s=>[...s.html.matchAll(/<h3 id="([^"]+)">/g)].map(m=>m[1]))})));
  let routes=0;
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:1000});
   for(const language of ['en','vi']){
    await page.click(`[data-language="${language}"]`);
    for(const r of resources){
     await page.goto(base+'#'+r.id);await page.waitForFunction(id=>document.querySelector('.lesson-section')?.id===id,r.sections[0]);
     assert.equal(await page.locator('.lesson-section').count(),r.sections.length);
     assert.equal(await page.locator('.lesson-section').first().getAttribute('lang'),language);
     assert.deepEqual(await page.locator('.lesson-section h3[id]').evaluateAll(nodes=>nodes.map(n=>n.id)),r.units);
     assert.equal(await page.locator('#toc-links .outline-topic').count(),r.units.length);
     if(r.units.length){
      assert.equal(await page.locator('#lesson-outline-links .outline-topic').count(),r.units.length);
      const mismatches=await page.locator('#lesson-outline-links .outline-topic').evaluateAll(nodes=>nodes.filter(n=>n.textContent!==document.getElementById(n.hash.split('/')[1])?.textContent).map(n=>n.hash));
      assert.deepEqual(mismatches,[],`${language} translated outline ${r.id}`);
     }
     assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow ${width} ${language} ${r.id}`);
     assert.equal(await page.locator('.optional-practice[open]').count(),0);
     routes++;
    }
    await page.goto(base+'#overview');await page.waitForSelector('.catalog-lessons');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overview overflow ${width} ${language}`);
    console.log(JSON.stringify({width,language,routes}));
   }
  }
  await page.setViewportSize({width:1440,height:1000});
  for(const [lesson,unit] of [['lecture-17','lecture-17-p17'],['lecture-25','lecture-25-p31']]){
   await page.goto(base+'#'+lesson+'/'+unit);await page.waitForFunction(id=>Math.abs(document.getElementById(id).getBoundingClientRect().top-90)<5,unit);
   assert.ok(await page.locator('#'+unit).isVisible());
  }
  await page.goto(base+'#lecture-15');await page.click('[data-language="vi"]');await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:path.join(output,'slide-reader-vi-desktop.png')});
  const contrast=await page.evaluate(()=>{
   const rgb=c=>c.match(/[\d.]+/g).slice(0,3).map(Number),lum=c=>{const a=rgb(c).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return .2126*a[0]+.7152*a[1]+.0722*a[2]};
   return [...document.querySelectorAll('.lesson-section p,.reader-tools a,h1,.lesson-section h2,.lesson-link.active,#toc-links a')].filter(e=>e.getBoundingClientRect().height>0).map(e=>{let parent=e,bg='rgb(255,255,255)';while(parent){const c=getComputedStyle(parent).backgroundColor;if(c!=='rgba(0, 0, 0, 0)'&&c!=='transparent'){bg=c;break}parent=parent.parentElement;}const s=getComputedStyle(e),a=lum(s.color),b=lum(bg);return {tag:e.tagName,ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),large:parseFloat(s.fontSize)>=24};});
  });
  for(const c of contrast)assert.ok(c.ratio>=(c.large?3:4.5),`contrast ${JSON.stringify(c)}`);
  await page.goto(base+'#lecture-02/quiz');await page.waitForSelector('.topic-answer',{state:'visible'});
  await page.locator('.topic-answer').first().click();const answers=await page.evaluate(()=>localStorage.getItem('adbs-topic-quiz-v1'));
  assert.ok(answers);await page.click('[data-language="en"]');assert.equal(await page.evaluate(()=>localStorage.getItem('adbs-topic-quiz-v1')),answers);
  await page.click('#complete');await page.reload();assert.ok((await page.locator('#progress-count').textContent()).startsWith('1 /'));
  await page.waitForSelector('.topic-answer',{state:'visible'});
  await page.goto(base+'#lecture-09');await page.locator('.reader-tools a[href$="/interactive"]').click();
  assert.equal(await page.locator('#interactive').evaluate(e=>e.open),true);assert.ok(await page.locator('#active-lab').isVisible());
  await page.goto(base+'#lab-sql');await page.waitForFunction(()=>document.querySelector('.sql-status')?.textContent.includes('ready'));
  await page.fill('#sql-editor','SELECT COUNT(*) AS n FROM students;');await page.click('[data-action="run"]');
  await page.waitForFunction(()=>!document.querySelector('[data-action="run"]').disabled);assert.equal(await page.locator('.sql-results td').textContent(),'6');
  await page.goto(base+'#lecture-15');await page.setViewportSize({width:390,height:844});await page.click('[data-language="vi"]');
  await page.screenshot({path:path.join(output,'slide-reader-vi-mobile.png')});
  await page.click('#menu-toggle');assert.equal(await page.locator('#main').evaluate(e=>e.inert),true);
  await page.keyboard.press('Escape');assert.equal(await page.locator('#main').evaluate(e=>e.inert),false);
  await page.click('#search-open');await page.fill('#search-input','Reserves');assert.ok(await page.locator('#search-results a[href="#lecture-15"]').count());
  await page.keyboard.press('Escape');assert.equal(await page.locator('#search-dialog').evaluate(e=>e.open),false);
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+'#overview');
  await page.screenshot({path:path.join(output,'slide-reader-overview.png')});
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(output,'slide-reader-results.json'),JSON.stringify({base,routes,teachingUnits:resources.reduce((n,r)=>n+r.units.length,0),widths:[320,390,768,1440],languages:['en','vi'],contrastMinimum:Math.min(...contrast.map(c=>c.ratio)),checks:['37 resources in both languages at four widths','all teaching-unit headings and bilingual outline links','direct deep links to histogram and semijoin','no horizontal overflow','collapsed practice','direct quiz route and reload','same-lesson lab link','quiz answer and completion persistence','actual SQLite worker query','mobile drawer and Escape','search','console errors'],errors},null,2));
  console.log(JSON.stringify({pass:true,routes,contrastMinimum:Math.min(...contrast.map(c=>c.ratio)),errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
