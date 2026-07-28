const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'HeroSection.tsx' && f !== 'Navbar.tsx');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Broader regex for text and border colors
  content = content.replace(/text-amber-100\/\d+/g, 'text-gray-600');
  content = content.replace(/text-amber-[234]00\/\d+/g, 'text-gray-800');
  content = content.replace(/text-amber-200/g, 'text-gray-900');
  content = content.replace(/text-amber-300/g, 'text-gray-900');
  
  content = content.replace(/border-amber-\d+\/\d+/g, 'border-gray-200');
  
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Cleanup script part 2 completed.");
