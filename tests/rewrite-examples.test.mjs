import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=f=>JSON.parse(fs.readFileSync(new URL('../'+f,import.meta.url),'utf8'));
function students(html){
 const body=html.match(/<table[^>]*>[\s\S]*?<tbody>([\s\S]*?)<\/tbody>[\s\S]*?<\/table>/)?.[1];assert.ok(body,'Students page table');
 return [...body.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].flatMap(([,row])=>{
  const cells=[...row.matchAll(/<td>(.*?)<\/td>/g)].map(m=>m[1]);
  return cells.slice(1).map((cell,i)=>{const [name,age]=cell.split(', ');return{page:cells[0],slot:i+1,name,age:Number(age)};});
 });
}
test('approved Students example has identical EN/VI data and its actual index order explains repeated page fetches',()=>{
 const en=read('course/lecture16.json')[0],vi=read('course/translations/lecture16.vi.json');
 const rows=students(en.sections[0].html);assert.deepEqual(students(vi.sections[0].html),rows);
 assert.equal(rows.length,12);assert.equal(new Set(rows.map(r=>r.page)).size,4);
 assert.deepEqual(rows.filter(r=>r.age===20),[{page:'P3',slot:2,name:'Linh',age:20}]);
 assert.equal(rows.filter(r=>r.age>=19).length,12);
 const range=rows.filter(r=>r.age>=20&&r.age<=24).sort((a,b)=>a.age-b.age);
 assert.deepEqual(range.map(r=>[r.age,r.page]),[[20,'P3'],[22,'P2'],[23,'P4'],[24,'P2']]);
 assert.equal(new Set(range.map(r=>r.page)).size,3);
 // Changed projection needs information absent from the age/RID entry.
 const index=rows.map(({age,page,slot})=>({age,page,slot}));
 const found=index.find(r=>r.age===20);assert.equal(Object.hasOwn(found,'name'),false);
 assert.equal(rows.find(r=>r.page===found.page&&r.slot===found.slot).name,'Linh');
});
