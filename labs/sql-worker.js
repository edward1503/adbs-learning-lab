/* Dedicated worker: real SQLite never executes on the UI thread. */
importScripts('../vendor/sql-wasm.js','sql.js');
let SQL, sandbox;
const lab=globalThis.ADBSLabs.sql;
function fresh(){const db=new SQL.Database();db.run(lab.seed);return db;}
function execute(db,sql){
  if(typeof sql!=='string'||!sql.trim())throw new Error('Enter a SQL statement.');
  if(sql.length>20000)throw new Error('SQL is limited to 20,000 characters.');
  const results=[];let count=0;
  for(const statement of db.iterateStatements(sql)){
    if(++count>8)throw new Error('At most 8 statements are allowed per run.');
    try{const columns=statement.getColumnNames();if(columns.length>40)throw new Error('At most 40 result columns are allowed.');const values=[];let truncated=false;
      while(statement.step()){if(values.length>=200){truncated=true;break;}const row=statement.get();if(row.some(v=>(typeof v==='string'&&v.length>2000)||(v instanceof Uint8Array)))throw new Error('A value is too large, or is a BLOB that cannot be displayed in the result table.');values.push(row);}
      if(columns.length){if(columns.length>40)throw new Error('At most 40 result columns are allowed.');results.push({columns,values,truncated});}
    }finally{statement.free();}
  }
  return results;
}
const ready=initSqlJs({locateFile:()=>new URL('../vendor/sql-wasm.wasm',self.location.href).href}).then(engine=>{SQL=engine;sandbox=fresh();const tables=['students','courses','enrollments'].map(name=>({...execute(sandbox,'SELECT * FROM '+name)[0],label:name}));postMessage({type:'ready',tables});});
onmessage=async({data})=>{try{await ready;if(data.type==='grade'){const ex=lab.exercises.find(e=>e.id===data.exercise);if(!ex)throw new Error('Exercise not found.');const db=fresh();try{const expected=execute(db,ex.solution)[0];db.run('PRAGMA query_only=ON');const results=execute(db,data.sql);if(results.length!==1)throw new Error('Grading requires exactly one result table.');postMessage({id:data.id,results,grade:lab.compare(results[0],expected,ex.ordered)});}finally{db.close();}}else if(data.type==='run'){postMessage({id:data.id,results:execute(sandbox,data.sql)});}else throw new Error('Invalid worker command.');}catch(error){postMessage({id:data.id,error:error.message||String(error)});}};
