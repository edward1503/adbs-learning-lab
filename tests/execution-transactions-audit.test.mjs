import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url), core=require('../labs/core.js');
const lesson=n=>JSON.parse(fs.readFileSync(new URL(`../course/lecture${n}.json`,import.meta.url),'utf8'))[0];
const bank=n=>JSON.parse(fs.readFileSync(new URL(`../course/quiz${n}.json`,import.meta.url),'utf8'));

test('execution audit examples retain a partial vector batch and preserve bag self-join multiplicity',()=>{
  const rows=Array.from({length:2050},(_,i)=>i), batches=[];
  for(let pos=0;pos<rows.length;pos+=1000)batches.push(rows.slice(pos,pos+1000));
  assert.deepEqual(batches.map(b=>b.length),[1000,1000,50]);
  assert.deepEqual(batches.flat(),rows);
  const selfJoin=rs=>rs.flatMap(l=>rs.filter(r=>l.id===r.id).map(r=>[l,r]));
  assert.equal(selfJoin([{id:1,tag:'A'},{id:2,tag:'B'}]).length,2);
  assert.equal(selfJoin([{id:1,tag:'A'},{id:1,tag:'B'}]).length,4);
});

test('execution audit sort costs charge each base scan once and expose the fan-in boundary',()=>{
  const sortAfterBaseScan=(pages,buffers)=>{
    let runs=Math.ceil(pages/buffers),io=pages,passes=0;
    while(runs>1){runs=Math.ceil(runs/(buffers-1));io+=2*pages;passes++;}
    return {io,passes};
  };
  assert.deepEqual(sortAfterBaseScan(50,8),{io:150,passes:1});
  assert.deepEqual(sortAfterBaseScan(50,7),{io:250,passes:2});
  assert.equal(800+sortAfterBaseScan(12,8).io+sortAfterBaseScan(50,8).io+12+50,1048);
  assert.equal(800+sortAfterBaseScan(12,7).io+sortAfterBaseScan(50,7).io+12+50,1148);
  assert.equal(12+1200,1212);assert.equal(12+200,212);
  assert.equal(1+30,31);assert.equal(1+200,201);
  assert.equal(3+0.05*120+0.05*900,54);
  assert.equal(3+0.05*120,9);
  assert.equal(new Set([7,2,7,4,2]).size,3);
});

test('equi-depth examples distinguish bucket depth from width and count integer endpoints',()=>{
  const buckets=[{lo:1,hi:3,rows:30},{lo:4,hi:9,rows:30},{lo:10,hi:12,rows:30}];
  const estimate=predicate=>buckets.reduce((sum,b)=>{
    const values=Array.from({length:b.hi-b.lo+1},(_,i)=>b.lo+i);
    return sum+b.rows*values.filter(predicate).length/values.length;
  },0);
  assert.equal(estimate(a=>a===5),5);assert.equal(estimate(a=>a===11),10);
  assert.equal(estimate(a=>a>=7),45);assert.equal(estimate(a=>a>=2&&a<=10),60);
  assert.equal(Array.from({length:20},(_,i)=>10+i).filter(a=>a>24).length/20,0.25);
  assert.equal((30-24)/(30-10),0.3);
});

test('plan enumeration ledger retains the lower-cost extension and the required final order',()=>{
  const routes=[{subset:40,extension:45,order:null},{subset:52,extension:20,order:'b'},{subset:35,extension:50,order:null},{subset:60,extension:10,order:'a'}];
  assert.deepEqual(routes.map(r=>r.subset+r.extension),[85,72,85,70]);
  assert.deepEqual(routes.map(r=>r.subset+r.extension+(r.order==='a'?0:30)),[115,102,115,70]);
  const factorial=n=>n<=1?1:n*factorial(n-1);
  const shapes=n=>n<=1?1:Array.from({length:n-1},(_,i)=>shapes(i+1)*shapes(n-i-1)).reduce((a,b)=>a+b,0);
  assert.equal(shapes(3)*factorial(3),12);assert.equal(shapes(4)*factorial(4),120);
  assert.equal(factorial(4),24);
});

test('transaction additions distinguish conflict cycles, view reads and independent serial placements',()=>{
  const op=(kind,tx,item)=>({kind,tx,item});
  const trace=[op('r','2','A'),op('w','2','A'),op('r','1','A'),op('r','1','B'),op('w','1','B'),op('r','3','B'),op('w','3','B')];
  const graph=core.conflicts(trace);
  assert.equal(graph.cyclic,false);assert.deepEqual(graph.order,['2','1','3']);
  const viewTrace=[op('r','1','A'),op('w','2','A'),op('w','1','A'),op('w','3','A')];
  assert.equal(core.conflicts(viewTrace).cyclic,true);
  const view=schedule=>{
    const writes=new Map(),reads=[],finalWriters={};
    for(const o of schedule){
      if(o.kind==='r')reads.push({reader:o.tx,item:o.item,from:writes.get(o.item)??'initial'});
      else {writes.set(o.item,o.tx);finalWriters[o.item]=o.tx;}
    }
    return {reads,finalWriters};
  };
  const serial=[op('r','1','A'),op('w','1','A'),op('w','2','A'),op('w','3','A')];
  assert.deepEqual(view(viewTrace),view(serial));
  const mixed=[op('r','1','A'),op('w','2','A'),op('r','1','A')];
  assert.notDeepEqual(view(mixed),view([op('r','1','A'),op('r','1','A'),op('w','2','A')]));
  assert.notDeepEqual(view(mixed),view([op('w','2','A'),op('r','1','A'),op('r','1','A')]));
});

test('integrated recovery language preserves the prepared-participant boundary and refined quiz citations',()=>{
  assert.match(lesson(21).sections.find(s=>s.id==='l21-s5').html,/including logged updates of transactions that may later be undone/);
  assert.match(lesson(22).sections.find(s=>s.id==='l22-s5').html,/prepared participant without a final decision must inquire and wait/);
  assert.match(lesson(22).sections.find(s=>s.id==='l22-s3').html,/Commit requires YES from all participants/);
  const q=(n,id)=>bank(n).topics.flatMap(t=>t.questions).find(q=>q.id===id);
  assert.deepEqual(q(16,'l16-index-scan-q3').pages,[4,5,6,19]);
  assert.equal(q(16,'l16-clustered-b-tree-scan-q1').answer,0);
  assert.match(q(16,'l16-clustered-b-tree-scan-q1').prompt,/Internal-node descent before leaf scanning/);
  assert.equal(q(22,'l22-two-phase-commit-q5').answer,2);
  assert.ok(q(22,'l22-two-phase-commit-q5').pages.includes(38));
  for(let n=13;n<=22;n++)for(const t of bank(n).topics)assert.ok(t.questions.length<=10);
});
