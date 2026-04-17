const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = dir + '/' + file;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.jsx') || name.endsWith('.js')) {
      files.push(name);
    }
  }
  return files;
}

const files = getFiles('./Frontend/src');
let count = 0;

files.forEach(file => {
  if (file.includes('config/api.js')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('http://localhost:5000')) {
    
    // Calculate relative path for import
    const depth = file.split('/').length - 3; 
    let relative = '';
    for(let i = 0; i < depth - 1; i++) relative += '../';
    if(depth <= 1) relative = './';
    
    const importStmt = `import { API_BASE } from '${relative}config/api';\n`;
    
    // Add import statement safely
    if (content.includes('import ') && !content.includes('import { API_BASE }')) {
      content = content.replace(/(import .*?\n)/, `$1${importStmt}`);
    } else if (!content.includes('import { API_BASE }')) {
      content = importStmt + content;
    }
    
    // Replace URL instances. In JSX/JS standard usage:
    // If it's already in quotes "http://localhost:5000/...", maybe replace with `${API_BASE}/...`
    // The safest is to rewrite the string quotes.
    // We will find `"http://localhost:5000/...` and replace with `\`${API_BASE}/...`
    content = content.replace(/"http:\/\/localhost:5000\//g, '`${API_BASE}/');
    content = content.replace(/"http:\/\/localhost:5000"/g, 'API_BASE');
    content = content.replace(/'http:\/\/localhost:5000\//g, '`${API_BASE}/');
    content = content.replace(/'http:\/\/localhost:5000'/g, 'API_BASE');
    
    // For template literals: `http://localhost:5000/...`
    content = content.replace(/`http:\/\/localhost:5000\//g, '`${API_BASE}/');
    content = content.replace(/`http:\/\/localhost:5000`/g, 'API_BASE');
    
    // Also, inside JSX it might be <img src="http://localhost:5000/..." /> which doesn't allow replacing " with ` directly without `{ }`
    // Oh wait! If we replace `"http://localhost:5000/...` with `\`${API_BASE}/...`, inside JSX `src="` would become `src=\`${API_BASE}/...` which is invalid syntax `src="`${API_BASE}/..."` - actually the regex matches the quote! `"` is consumed.
    // Wait, replacing `src="http://localhost:5000/..."` with `src=\`${API_BASE}/...\`` is syntactically invalid, it should be `src={\`${API_BASE}/...\`}`
    
    // This is getting tricky for JSX. Let's do a much safer replacement.
    // We just replace `http://localhost:5000` with `${API_BASE}`. 
    // And if it's not a template literal, JavaScript will treat it as a literal string '${API_BASE}', which is a bug!
    
  }
});
