import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=f=>JSON.parse(fs.readFileSync(new URL('../'+f,import.meta.url),'utf8'));
const audit=read('docs/full-slide-audit-2026-10-23/coverage.json');
const lesson=n=>read(`course/lecture${String(n).padStart(2,'0')}.json`)[0];
const notes=(n,vi=false)=>(vi?read(`course/translations/lecture${String(n).padStart(2,'0')}.vi.json`):lesson(n)).sections.map(s=>s.html).join('');

test('detailed page audit points every physical page to an ordered, unique EN/VI teaching unit',()=>{
 assert.deepEqual(audit.totals,{lectures:27,physicalPages:845,sections:117,teachingUnits:245});
 for(const l of audit.lectures){
  const en=lesson(l.lecture),vi=read(`course/translations/lecture${String(l.lecture).padStart(2,'0')}.vi.json`),units=l.sections.flatMap(s=>s.units);
  assert.equal(l.pages.length,l.physicalPages);assert.deepEqual(l.pages.map(p=>p.page),Array.from({length:l.physicalPages},(_,i)=>i+1));
  assert.equal(new Set(units.map(u=>u.id)).size,units.length);
  let next=1;
  for(const [si,s] of l.sections.entries()){
   for(const u of s.units){
    assert.equal(u.physicalPages[0],next);next=u.physicalPages[1]+1;
    assert.ok(u.requirements.length>0);assert.ok(['technical','context','administrative'].includes(u.kind));
    for(const html of [en.sections[si].html,vi.sections[si].html]){
     assert.equal(html.split(`id="${u.id}"`).length,2);
     assert.ok(html.includes(`${l.source}#page=${u.physicalPages[0]}`));
    }
    assert.deepEqual(l.pages.filter(p=>p.target===u.id).map(p=>p.page),Array.from({length:u.physicalPages[1]-u.physicalPages[0]+1},(_,i)=>u.physicalPages[0]+i));
   }
   for(const html of [en.sections[si].html,vi.sections[si].html])assert.deepEqual([...html.matchAll(/<h3 id="([^"]+)">/g)].map(m=>m[1]),s.units.map(u=>u.id));
  }
  assert.equal(next,l.physicalPages+1);
 }
});

test('source delta blocks decode exactly and include minimum/width overhead',()=>{
 const values=[100,101,101,102,101,101,102,101,99,100,105,107,114,116,119,120,121];
 const deltas=values.slice(1).map((x,i)=>x-values[i]);
 const blocks=[deltas.slice(0,8),deltas.slice(8)].map(d=>{const min=Math.min(...d),residuals=d.map(x=>x-min);return{min,residuals,width:Math.ceil(Math.log2(Math.max(...residuals)+1))};});
 assert.deepEqual(blocks,[{min:-2,residuals:[3,2,3,1,2,3,1,0],width:2},{min:1,residuals:[0,4,1,6,1,2,0,0],width:3}]);
 const decoded=[100];for(const b of blocks)for(const r of b.residuals)decoded.push(decoded.at(-1)+b.min+r);
 assert.deepEqual(decoded,values);assert.equal(8+blocks.reduce((s,b)=>s+8+1+b.width*8/8,0),31);assert.equal(values.length*8,136);
 for(const vi of [false,true])for(const fragment of ['3,2,3,1,2,3,1,0','0,4,1,6,1,2,0,0','31','136'])assert.ok(notes(7,vi).includes(fragment));
});

test('extendible hashing sends the source collision group to the correct three-bit buckets',()=>{
 const keys=[21,25,29,5],partition=new Map();for(const k of keys){const low=k&7;partition.set(low,[...(partition.get(low)||[]),k]);}
 assert.deepEqual(partition.get(1),[25]);assert.deepEqual(partition.get(5),[21,29,5]);
 for(const vi of [false,true])for(const fragment of ['001','101','25','21,29,5'])assert.ok(notes(10,vi).includes(fragment));
});

test('histogram source counts distinguish both lower bounds and actual from estimated cardinalities',()=>{
 const f=[1,2,2,0,1,6,4,8,8,9,7,3,3,5,3,2],sum=a=>a.reduce((x,y)=>x+y,0);
 assert.equal(sum(f),64);assert.deepEqual([0,4,8,12].map(i=>sum(f.slice(i,i+4))),[5,19,27,13]);
 assert.deepEqual([[0,7],[7,9],[9,11],[11,16]].map(([a,b])=>sum(f.slice(a,b))),[16,16,16,16]);
 assert.equal(19/4,4.75);assert.equal(27+13+19/4,44.75);assert.equal(sum(f.slice(7)),48);
 assert.equal(sum(f.slice(5)),58);assert.ok(Math.abs(48+2/7*16-52.57142857142857)<1e-10);
 for(const vi of [false,true])for(const fragment of ['19/4','16/7','48','58','52'])assert.ok(notes(17,vi).includes(fragment));
});

function homs(atoms,target,variables,head=[],targetHead=[]){
 const terms=[...new Set(target.flatMap(a=>a.slice(1)))],found=[];
 function visit(i,m){if(i===variables.length){const image=t=>m[t]??t;if(head.some((t,j)=>image(t)!==targetHead[j]))return;if(atoms.every(a=>target.some(b=>b.length===a.length&&a.every((t,j)=>j===0?t===b[j]:image(t)===b[j]))))found.push({...m});return;}for(const t of terms){m[variables[i]]=t;visit(i+1,m);}delete m[variables[i]];}
 visit(0,{});return found;
}
test('source atom mappings preserve every atom and constants, including collapsed variables',()=>{
 const a=[['R','x','a','y'],['R','a','x','b'],['S','x','c','y'],['T','x','x','d']];
 const b=[['R','b','a','c'],['R','a','a','b'],['R','a','b','b'],['S','a','c','b'],['S','b','c','c'],['T','a','a','d'],['T','b','b','d']];
 assert.deepEqual(homs(a,b,['x','y']),[{x:'b',y:'c'},{x:'a',y:'b'}]);
 for(const vi of [false,true])for(const fragment of ['R(a,b,b)','T(a,a,d)','T(b,b,d)'])assert.ok(notes(23,vi).includes(fragment));
});
test('containment maps in the reverse direction and minimisation preserves the distinguished head',()=>{
 const q1=[['R','x','z'],['S','z','z'],['R','z','y']],q2=[['R','a','c'],['S','c','d'],['R','d','b']];
 assert.deepEqual(homs(q2,q1,['a','b','c','d'],['a','b'],['x','y']),[{a:'x',b:'y',c:'z',d:'z'}]);
 assert.equal(homs(q1,q2,['x','y','z'],['x','y'],['a','b']).length,0);
 const full=[['R','x','y'],['R','x','b'],['R','a','b'],['R','u','c'],['R','u','v'],['S','a','c','d']];
 const minimal=[full[1],full[2],full[3],full[5]];
 assert.ok(homs(full,minimal,['x','y','u','v'],['x'],['x']).length>0);
 for(let i=0;i<minimal.length;i++)assert.equal(homs(minimal,minimal.filter((_,j)=>j!==i),['x','u'],['x'],['x']).length,0);
 for(const vi of [false,true])for(const fragment of ['Q2→Q1','c⁻¹','g∘h','R(u,c)'])assert.ok(notes(24,vi).includes(fragment));
});

test('GYO reduces the source hypergraph but gets stuck on the binary triangle',()=>{
 function reduce(input){let edges=input.map(a=>new Set(a)),changed=true;while(changed){changed=false;const counts=new Map();for(const e of edges)for(const v of e)counts.set(v,(counts.get(v)||0)+1);for(const e of edges)for(const v of [...e])if(counts.get(v)<=1){e.delete(v);changed=true;}for(let i=edges.length-1;i>=0;i--){if(!edges[i].size||edges.some((other,j)=>i!==j&&[...edges[i]].every(v=>other.has(v)))){edges.splice(i,1);changed=true;}}}return edges;}
 assert.equal(reduce([[8,9],[1,3,4,5,6,7,8],[9,10,11],[1,2,3],[11,12],[12,13]]).length,0);
 assert.equal(reduce([[1,2],[2,3],[1,3]]).length,3);assert.equal(reduce([[1,2],[2,3],[1,3],[1,2,3]]).length,0);
 for(const vi of [false,true])assert.ok(notes(25,vi).includes('GYO(H)=∅'));
});
test('source bottom-up semijoins retain exactly one Boolean root witness',()=>{
 const semi=(a,b,keysA,keysB)=>a.filter(x=>b.some(y=>keysA.every((k,i)=>x[k]===y[keysB[i]])));
 let r1=[['s1','c2','b1'],['s1','c1','b2'],['s3','c3','b1'],['s3','c1','b4'],['s2','c2','b3']],r2=[['c1','b2'],['c2','b1'],['c4','b6']];
 const r3=[['c1','d2'],['c1','d1'],['c3','d1']],r4=[['b1'],['b2']],r5=[['c2','a1','b1'],['c1','a1','b2'],['c1','a2','b2']];
 r1=semi(r1,r4,[2],[0]);assert.equal(r1.length,3);r1=semi(r1,r5,[1,2],[0,2]);assert.deepEqual(r1,[['s1','c2','b1'],['s1','c1','b2']]);
 r2=semi(r2,r1,[0,1],[1,2]);assert.equal(r2.length,2);r2=semi(r2,r3,[0],[0]);assert.deepEqual(r2,[['c1','b2']]);
 for(const vi of [false,true])for(const fragment of ['(s3,c1,b4)','(s2,c2,b3)','(s3,c3,b1)','(c4,b6)','(c2,b1)','(c1,b2)'])assert.ok(notes(25,vi).includes(fragment));
});
