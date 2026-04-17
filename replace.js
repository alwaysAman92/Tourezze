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
  if (file.includes('config/api.js')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('http://localhost:5000')) {
    
    // figure out depth to inject correct import path
    const depth = file.split('/').length - 4; // e.g. Frontend/src/components/a.jsx -> 4 parts
    let relative = '';
    for(let i = 0; i < depth; i++) relative += '../';
    if(depth <= 0) relative = './';
    
    const importStmt = `import { API_BASE } from '${relative}config/api';\n`;
    
    if (!content.includes('import { API_BASE }')) {
      if (content.includes('import ')) {
        content = content.replace(/(import .*?\n)/, `$1${importStmt}`);
      } else {
        content = importStmt + content;
      }
    }
    
    // Replace "http://localhost:5000/something" with `${API_BASE}/something`
    content = content.replace(/"http:\/\/localhost:5000\//g, '`${API_BASE}/');
    content = content.replace(/'http:\/\/localhost:5000\//g, '`${API_BASE}/');
    
    // Replace standalone "http://localhost:5000"
    content = content.replace(/"http:\/\/localhost:5000"/g, 'API_BASE');
    content = content.replace(/'http:\/\/localhost:5000'/g, 'API_BASE');
    
    // Replace template literals `http://localhost:5000/` with `${API_BASE}/`
    content = content.replace(/`http:\/\/localhost:5000\//g, '`${API_BASE}/');
    content = content.replace(/`http:\/\/localhost:5000`/g, 'API_BASE');
    
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
});

console.log(`Updated ${count} files.`);
