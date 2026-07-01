/* eslint-disable */
const fs = require('fs');
const path = require('path');

const srcDir = `C:\\Users\\m s\\.gemini\\antigravity-ide\\brain\\f6733a63-2be8-4705-8405-d8ad7498f9a6`;
const destDir = `D:\\ai generated projects\\desov_site\\public\\projects`;

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
for (const file of files) {
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    // Simplify file names
    let newName = file.replace(/_\d{13,}\.png/, '.png'); // remove timestamps
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
    console.log(`Copied ${file} -> ${newName}`);
  }
}
