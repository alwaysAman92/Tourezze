const fs = require('fs');
const path = require('path');

function getFiles(dir, arr = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.posix.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      getFiles(p, arr);
    } else if (p.endsWith('.jsx')) {
      arr.push(p);
    }
  }
  return arr;
}

const files = getFiles('./Frontend/src');
let count = 0;

files.forEach(f => {
  let text = fs.readFileSync(f, 'utf8');
  if (text.includes('API_BASE') && !text.includes('import { API_BASE }')) {
    const parts = f.split('/');
    const depth = parts.length - 4; // './Frontend/src/something.jsx' length=4, depth=0
    let rel = '';
    for (let i = 0; i < depth; i++) rel += '../';
    if (depth <= 0) rel = './';
    
    const imp = `import { API_BASE } from '${rel}config/api';\n`;
    text = imp + text;
    fs.writeFileSync(f, text, 'utf8');
    count++;
  }
});
console.log('Fixed imports in ' + count + ' files.');
