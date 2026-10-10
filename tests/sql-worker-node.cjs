// Browser-worker shim for Node tests: executes the production worker unchanged.
const {parentPort}=require('node:worker_threads'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
global.self={location:{href:'file://'+path.join(root,'labs/sql-worker.js')}};
global.postMessage=value=>parentPort.postMessage(value);
global.importScripts=(...files)=>files.forEach(file=>{if(file.includes('sql-wasm.js')){const init=require(path.join(root,'vendor/sql-wasm.js'));global.initSqlJs=()=>init({locateFile:()=>path.join(root,'vendor/sql-wasm.wasm')});}else vm.runInThisContext(fs.readFileSync(path.resolve(root,'labs',file),'utf8'),{filename:file});});
vm.runInThisContext(fs.readFileSync(path.join(root,'labs/sql-worker.js'),'utf8'),{filename:'sql-worker.js'});
parentPort.on('message',data=>global.onmessage({data}));
