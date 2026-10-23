import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=f=>JSON.parse(fs.readFileSync(new URL('../'+f,import.meta.url),'utf8'));
const notes=(n,vi=false)=>(vi?read(`course/translations/lecture${n}.vi.json`):read(`course/lecture${n}.json`)[0]).sections.map(s=>s.html).join('');

test('source Reserves/Sailors costs count base scans, temp writes, rescans and sort passes consistently',()=>{
 const reserves=1000,sailors=500,filteredR=reserves/100,filteredS=sailors/2,buffers=5;
 const costs=[sailors+sailors*reserves,sailors+filteredS*reserves,reserves+filteredR*sailors,
  reserves+sailors+filteredS+filteredR*filteredS,
  sailors+reserves+filteredR+filteredS*filteredR,
  reserves+sailors+filteredR+2*filteredR+filteredS+3*2*filteredS+filteredR+filteredS,
  reserves+sailors+filteredR+Math.ceil(filteredS/(buffers-2))*filteredR,
  reserves+sailors,filteredR+1000];
 assert.deepEqual(costs,[500500,250500,6000,4250,4010,3540,2350,1500,1010]);
 for(const vi of [false,true])for(const cost of [4250,4010,3540,2350,1500,1010])assert.ok(notes('15',vi).includes(String(cost)),String(cost));
 assert.doesNotMatch(notes('15'),/Orders|Customers/);
});

test('actual source composite index explains a contiguous prefix range versus residual salary filtering',()=>{
 const rows=[['Jones',31,300],['Smith',32,400],['Gold',55,140],['Alvaro',55,400],['McDonald',79,300]];
 assert.deepEqual(rows.filter(([,age,salary])=>age===55&&salary>200).map(r=>r[0]),['Alvaro']);
 assert.deepEqual(rows.filter(([,age,salary])=>age>31&&salary===400).map(r=>r[0]),['Smith','Alvaro']);
 const scanned=rows.filter(([,age])=>age>31);
 assert.ok(scanned.some(([,age,salary])=>age===55&&salary===140));
 for(const vi of [false,true]){assert.ok(notes('16',vi).includes('Age = 55 AND Salary &gt; 200'));assert.ok(notes('16',vi).includes('Age &gt; 31 AND Salary = 400'));assert.doesNotMatch(notes('16',vi),/Linh, 20|Students page table/);}
});

test('source flight witness fixes constants and yields the projected airline in both languages',()=>{
 const flights=[['VIE','LHR','BA'],['LHR','EDI','BA'],['LGW','GLA','U2'],['LCA','VIE','OS']];
 const airports=new Map([['VIE','Vienna'],['LHR','London'],['LGW','London'],['LCA','Larnaca'],['GLA','Glasgow'],['EDI','Edinburgh']]);
 const result=[...new Set(flights.filter(([x,y])=>airports.get(x)==='London'&&airports.get(y)==='Glasgow').map(r=>r[2]))];
 assert.deepEqual(result,['U2']);
 for(const vi of [false,true]){assert.ok(notes('23',vi).includes('Flight(LGW,GLA,U2)'));assert.ok(notes('23',vi).includes('h(x) = LGW'));}
});
