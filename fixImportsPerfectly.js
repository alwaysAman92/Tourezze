const fs = require('fs');
const path = require('path');

function getFiles(dir, arr = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.posix.join(dir, f);
    if (fs.statSync(p).isDirectory()) getFiles(p, arr);
    else if (p.endsWith('.jsx')) arr.push(p);
  }
  return arr;
}

const files = getFiles('./Frontend/src');
const apiDir = path.resolve('./Frontend/src/config');
let count = 0;

files.forEach(f => {
  if (f.includes('config/api.js')) return;

  let text = fs.readFileSync(f, 'utf8');
  if (text.includes('API_BASE')) {
    // Remove ALL existing API_BASE imports completely
    text = text.replace(/import\s+\{\s*API_BASE\s*\}\s+from\s+['"][^'"]+['"];?\r?\n?/g, '');

    // Calculate exact relative path using Node path module
    const fileDir = path.resolve(path.dirname(f));
    let rel = path.relative(fileDir, apiDir).replace(/\\/g, '/');
    if (!rel.startsWith('.')) rel = './' + rel;
    
    // Construct the correct import statement
    const imp = `import { API_BASE } from '${rel}/api';\n`;
    
    // Inject it at the very top of the file
    text = imp + text;
    fs.writeFileSync(f, text, 'utf8');
    count++;
  }
});
console.log('Successfully fixed ' + count + ' files with perfect relative paths.');
