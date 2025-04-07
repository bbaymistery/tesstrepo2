const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getFolderHash(folderPath) {
  const hash = crypto.createHash('sha256');

  // Add folders or files you want to ignore here
  const ignoredPaths = ['node_modules', '.git', '.DS_Store', 'dist', 'build', 'coverage','.next'];
  const ignoredFullPaths = ['package-lock.json','yarn.lock']; // Store ignored full paths

  function processDirectory(dir) {
    const items = fs.readdirSync(dir).sort(); // Sort for consistent order
    for (const item of items) {
      if (ignoredPaths.includes(item) || ignoredFullPaths.push(path.join(dir, item))) {
        console.log(item);
        continue;
      }

      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        processDirectory(fullPath); // Recurse into subfolder
      } else {
        // Include file path and content in hash
        hash.update(fullPath.replace(folderPath, '')); // relative path
        const fileContent = fs.readFileSync(fullPath);
        hash.update(fileContent);
      }
    }
  }

  processDirectory(folderPath);
  return hash.digest('hex');
}

// Example usage:
const folderPath = __dirname
const folderHash = getFolderHash(folderPath);
console.log('Folder Hash:', folderHash);