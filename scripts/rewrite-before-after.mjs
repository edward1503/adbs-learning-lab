import fs from 'node:fs';
import cp from 'node:child_process';
const baseline='751115b15eede16c8f7408a1d9bdb96ae31cc681';
const strip=s=>s.replace(/<[^>]*>/g,' ').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
let out='# Actual before/after teaching excerpts\n\nBefore is extracted from deployed commit `'+baseline+'`; after is extracted from current canonical EN/VI JSON. These excerpts show opening pacing; the complete sections retain the wider technical scope.\n';
for(const n of ['02','05','16','21']){
 const file=`course/lecture${n}.json`, old=JSON.parse(cp.execFileSync('git',['show',`${baseline}:${file}`],{encoding:'utf8'}))[0], current=JSON.parse(fs.readFileSync(file,'utf8'))[0], vi=JSON.parse(fs.readFileSync(`course/translations/lecture${n}.vi.json`,'utf8'));
 out+=`\n## Lecture ${Number(n)} — ${current.title}\n\nCanonical section: \`${current.sections[0].id}\`.\n\n**Before EN:** ${strip(old.sections[0].html).slice(0,1300)}\n\n**After EN:** ${strip(current.sections[0].html).slice(0,2200)}\n\n**After VI:** ${strip(vi.sections[0].html).slice(0,2200)}\n`;
}
fs.writeFileSync('docs/rewrite-2026-10-21/before-after.md',out);
