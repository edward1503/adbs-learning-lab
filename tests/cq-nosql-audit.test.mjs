import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

// Independent finite-instance checks for the original worked additions.
// This evaluator is a witness enumerator for positive CQs, not a production SQL engine.
const variable = name => ({variable: name});
const constant = value => ({constant: value});
const atom = (relation, ...terms) => ({relation, terms});
function evaluate(database, atoms, head) {
  let assignments = [{}];
  for (const {relation, terms} of atoms) {
    const next = [];
    for (const assignment of assignments) for (const row of database[relation] || []) {
      const candidate = {...assignment};
      let matches = row.length === terms.length;
      for (let i = 0; matches && i < terms.length; i++) {
        const term = terms[i];
        if ('constant' in term) matches = term.constant === row[i];
        else if (Object.hasOwn(candidate, term.variable)) matches = candidate[term.variable] === row[i];
        else candidate[term.variable] = row[i];
      }
      if (matches) next.push(candidate);
    }
    assignments = next;
  }
  const tuples = assignments.map(a => head.map(name => a[name]));
  return {assignments, tuples: [...new Map(tuples.map(t => [JSON.stringify(t), t])).values()]};
}
const subsets = rows => Array.from({length: 2 ** rows.length}, (_, mask) => rows.filter((_,i) => mask & 2 ** i));

test('CQ examples distinguish witnesses, head projection and Boolean existence', () => {
  const enrol = {Enrol: [['A','DB'],['A','AI'],['B','AI']], Teach: [['Linh','DB'],['Linh','AI']]};
  const query = [atom('Enrol',variable('s'),variable('c')), atom('Teach',constant('Linh'),variable('c'))];
  const result = evaluate(enrol, query, ['s']);
  assert.equal(result.assignments.length, 3);
  assert.deepEqual(result.tuples, [['A'],['B']]);
  assert.deepEqual(evaluate(enrol, query, ['s','c']).tuples, [['A','DB'],['A','AI'],['B','AI']]);
  const paths = {Link: [['a','b'],['b','c'],['a','c'],['c','c']]};
  const path = [atom('Link',variable('x'),variable('y')), atom('Link',variable('y'),variable('z'))];
  const result2 = evaluate(paths, path, ['x','z']);
  assert.equal(result2.assignments.length, 4);
  assert.deepEqual(result2.tuples, [['a','c'],['b','c'],['c','c']]);
  assert.deepEqual(evaluate(paths, path, []).tuples, [[]]);
  assert.deepEqual(evaluate({Link: []}, path, []).tuples, []);
});

test('constant-preserving CQ minimization agrees on every small instance and needs both remaining atoms', () => {
  const relationRows = [['a','a'],['a','b'],['b','a'],['b','b']];
  const original = [atom('R',variable('x'),variable('y')),atom('R',variable('x'),constant('a')),atom('S',variable('x')),atom('S',variable('x'))];
  const core = [atom('R',variable('x'),constant('a')),atom('S',variable('x'))];
  const twoR = [atom('R',variable('x'),variable('y')),atom('R',variable('x'),variable('z'))];
  const oneR = [atom('R',variable('x'),variable('y'))];
  for (const R of subsets(relationRows)) {
    assert.deepEqual(evaluate({R},twoR,['x']).tuples,evaluate({R},oneR,['x']).tuples);
    for (const S of subsets([['a'],['b']])) {
      assert.deepEqual(evaluate({R,S},original,['x']).tuples,evaluate({R,S},core,['x']).tuples);
    }
  }
  assert.deepEqual(evaluate({R: [['b','a']],S: []},core,['x']).tuples,[]);
  assert.deepEqual(evaluate({R: [['b','a']],S: []},core.slice(0,1),['x']).tuples,[['b']]);
  assert.deepEqual(evaluate({R: [],S: [['b']]},core,['x']).tuples,[]);
  assert.deepEqual(evaluate({R: [],S: [['b']]},core.slice(1),['x']).tuples,[['b']]);
});

function primal(edges) {
  const pairs = new Set();
  for (const edge of edges) for (let i=0;i<edge.length;i++) for (let j=i+1;j<edge.length;j++) pairs.add([edge[i],edge[j]].sort().join(','));
  return [...pairs].sort();
}
function gyo(edges) {
  let remaining = edges.map(e => new Set(e));
  let changed = true;
  while (changed) {
    changed = false;
    const counts = new Map();
    for (const e of remaining) for (const v of e) counts.set(v,(counts.get(v)||0)+1);
    for (const e of remaining) for (const v of e) if (counts.get(v) <= 1) {e.delete(v);changed=true;}
    for (let i=remaining.length-1;i>=0;i--) {
      const edge=remaining[i];
      if (!edge.size || remaining.some((other,j) => j!==i && [...edge].every(v=>other.has(v)))) {
        remaining.splice(i,1);changed=true;
      }
    }
  }
  return remaining.length===0;
}
test('equal primal graphs do not imply equal hypergraph acyclicity', () => {
  const ternary = [['a','b','c']], triangle = [['a','b'],['b','c'],['c','a']];
  assert.deepEqual(primal(ternary),primal(triangle));
  assert.equal(gyo(ternary),true);
  assert.equal(gyo(triangle),false);
  assert.equal(gyo([...triangle,['a','b','c']]),true);
});

function semijoin(left,right,keys) {
  return left.filter(l=>right.some(r=>keys.every(k=>l[k]===r[k])));
}
test('branching semijoins reduce the parent against every child and match full-query existence', () => {
  const R=[{A:'a',B:1},{A:'b',B:1},{A:'c',B:2}], S=[{B:1,C:'k'},{B:2,C:'m'}], U=[{C:'k'}];
  const reducedS=semijoin(S,U,['C']);
  assert.deepEqual(reducedS,[{B:1,C:'k'}]);
  const afterS=semijoin(R,reducedS,['B']);
  assert.deepEqual(afterS,[{A:'a',B:1},{A:'b',B:1}]);
  const reducedR=semijoin(afterS,[{A:'b'},{A:'c'}],['A']);
  assert.deepEqual(reducedR,[{A:'b',B:1}]);
  assert.deepEqual(semijoin(afterS,[{A:'c'}],['A']),[]);
  const query=[atom('R',variable('A'),variable('B')),atom('S',variable('B'),variable('C')),atom('T',variable('A')),atom('U',variable('C'))];
  const database={R:R.map(r=>[r.A,r.B]),S:S.map(r=>[r.B,r.C]),T:[['b'],['c']],U:[['k']]};
  assert.deepEqual(evaluate(database,query,['A','B','C']).tuples,[['b',1,'k']]);
  assert.deepEqual(evaluate({...database,T:[['c']]},query,[]).tuples,[]);
});

test('parallel joins need aligned ranges; row count and replica count represent different quantities', () => {
  const R=[[20,'r1'],[75,'r2'],[130,'r3']], S=[[75,'s1'],[130,'s2']];
  const join=(r,s)=>r.flatMap(x=>s.filter(y=>x[0]===y[0]).map(y=>[x[0],x[1],y[1]]));
  const localJoin=(rBoundary,sBoundary)=>[0,1].flatMap(worker=>join(R.filter(x=>Number(x[0]>=rBoundary)===worker),S.filter(x=>Number(x[0]>=sBoundary)===worker)));
  assert.deepEqual(join(R,S),[[75,'r2','s1'],[130,'r3','s2']]);
  assert.deepEqual(localJoin(100,100),join(R,S));
  assert.deepEqual(localJoin(100,50),[[130,'r3','s2']]);
  const rr=[[],[],[]];
  for(let row=1;row<=10;row++) rr[(row-1)%3].push(row);
  assert.deepEqual(rr,[[1,4,7,10],[2,5,8],[3,6,9]]);
  assert.equal(new Set(rr.flat()).size,10);
  assert.equal(3*100*2,600); // Three 100 GB shards with two total copies each.
  assert.deepEqual([{name:'An',age:25},{name:'Bo',age:26},{name:'Cy',age:30}].filter(x=>x.age>25).map(x=>x.name),['Bo','Cy']);
  assert.notDeepEqual(['a','b'],['b','a']);
});

test('existing CAP questions carry the formal primary evidence without changing keys', () => {
  const bank=JSON.parse(fs.readFileSync(new URL('../course/quiz27.json',import.meta.url),'utf8'));
  const cap=bank.topics.find(t=>t.id==='l27-cap');
  assert.equal(cap.questions.length,5);
  assert.deepEqual(cap.questions.map(q=>q.answer),[1,2,3,0,1]);
  for(const q of cap.questions) assert.deepEqual(q.sources,[{url:'https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer6.pdf',physicalPages:[2,3,4]}]);
});

test('a labeled two-hop property-graph pattern excludes unrelated outgoing edges', () => {
  const edges=[{from:'An',to:'Bo',label:'FRIEND'},{from:'Bo',to:'Cy',label:'FRIEND'},{from:'An',to:'Car7',label:'DRIVES'}];
  const friends=edges.filter(e=>e.label==='FRIEND');
  const twoHop=friends.filter(e=>e.from==='An').flatMap(first=>friends.filter(second=>second.from===first.to).map(second=>second.to));
  assert.deepEqual(twoHop,['Cy']);
  assert.equal(twoHop.includes('Car7'),false);
  assert.equal(twoHop.includes('Car8'),false);
});
