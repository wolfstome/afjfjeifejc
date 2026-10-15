// Verify JavaScript syntax and local page/asset links before delivery.
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const root = path.join(__dirname,'../dist');
let count = 0;
execFileSync(process.execPath,['--check',path.join(root,'script.js')],{stdio:'inherit'});
for (const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(root,file),'utf8');
  for (const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
    if (/^(?:https?:|mailto:)/.test(match[1])) continue;
    if (!fs.existsSync(path.join(root,match[1]))) throw new Error(`${file}: missing ${match[1]}`);
  }
  count++;
}
console.log(`Passed: shared JavaScript syntax and local references on ${count} HTML pages.`);
