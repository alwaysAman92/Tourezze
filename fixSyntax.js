const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.posix.join(dir, file);
    if (fs.statSync(name).isDirectory()) getFiles(name, files);
    else if (name.endsWith('.jsx') || name.endsWith('.js')) files.push(name);
  }
  return files;
}

const files = getFiles('./Frontend/src');
let count = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Fix double quote endings: `${API_BASE}/... " -> `${API_BASE}/... `
  // Regex looks for `${API_BASE}` followed by everything except quotes, ending with a double or single quote.
  // Wait, if it's `${API_BASE}/something`, the regex would be:
  const fixRegex = /(\`\$\{API_BASE\}[^"'`\s]*)["']/g;
  
  if (fixRegex.test(content)) {
    content = content.replace(fixRegex, '$1`');
    changed = true;
  }
  
  // There may be places where I replaced `"http://localhost:5000"` with `API_BASE` inside fetch
  // Wait, `fetch(API_BASE"` ? If the code was `fetch("http://localhost:5000")`
  // My replace script was `content = content.replace(/"http:\/\/localhost:5000"/g, 'API_BASE');`
  // That replaced BOTH quotes. So it became `fetch(API_BASE)`. That is fine!
  // The issue is ONLY where trailing characters exist. `fetch("http://localhost:5000/api")`
  // My replace was: `content = content.replace(/"http:\/\/localhost:5000\//g, '`${API_BASE}/');`
  // This matches `"http://localhost:5000/` and leaves `api")` behind. Result: `` `${API_BASE}/api") ``.
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
});

console.log(`Syntax issues fixed in ${count} files.`);
