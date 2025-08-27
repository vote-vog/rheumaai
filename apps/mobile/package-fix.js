// apps/mobile/package-fix.js
const fs = require('fs');
const path = require('path');

// Читаем package.json
const packagePath = path.join(__dirname, 'package.json');
const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Добавляем фиксы для AJV
packageData.overrides = {
  "ajv": "^8.12.0",
  "ajv-keywords": "^5.1.0"
};

// Записываем обратно
fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
console.log('✅ AJV фиксы добавлены в package.json');
