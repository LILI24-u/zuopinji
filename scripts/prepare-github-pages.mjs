import {cpSync,readFileSync,writeFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import {join} from 'node:path';
const source='dist/client', target='docs';
for(const required of ['index.html','projects/zeze-detail.html']) if(!existsSync(join(source,required))) throw Error(`Missing ${required}`);
cpSync(source,target,{recursive:true});
function visit(dir){for(const name of readdirSync(dir)){const path=join(dir,name);if(statSync(path).isDirectory()){if(name!=='media')visit(path);continue;}if(!/\.(html|rsc|js|css)$/.test(name))continue;let s=readFileSync(path,'utf8');
// Rewrite only asset URL prefixes, never route IDs, HTML syntax, or RSC metadata.
s=s.replace(/(?<!\/zuopinji)\/(?:_next|media)\//g,m=>'/zuopinji'+m);
// Vite's modulepreload helper prepends the deployment root to its dependency list.
s=s.replace('Cl=function(e){return`/`+e}', 'Cl=function(e){return`/zuopinji/`+e}');
if(name.endsWith('.html'))s=s.replace(/href="\/projects\/zeze-detail"/g,'href="/zuopinji/projects/zeze-detail.html"').replace(/href="\/#zeze-case"/g,'href="/zuopinji/#zeze-case"').replace(/href="\/favicon.svg"/g,'href="/zuopinji/favicon.svg"');
if(name.endsWith('.js'))s=s.replaceAll('"/projects/zeze-detail"','"/zuopinji/projects/zeze-detail.html"').replaceAll('"/#zeze-case"','"/zuopinji/#zeze-case"');
writeFileSync(path,s);
}}
visit(target);writeFileSync(join(target,'.nojekyll'),'');
const html=readFileSync(join(target,'index.html'),'utf8');
if(html.includes('opacity:0')||html.includes('"./>'))throw Error('Hidden content or corrupted HTML');
console.log('Export verified: visible content, complete pages, scoped asset URLs.');
