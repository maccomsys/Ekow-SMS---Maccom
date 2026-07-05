const fs = require('fs');
const path = require('path');

const pagesDir = 'src/pages';
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

pages.forEach(page => {
  let content = fs.readFileSync(path.join(pagesDir, page), 'utf-8');
  let changed = false;
  
  // Rule 1: <button className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">
  // is often the Bell icon for NotificationsInbox
  if (content.includes('className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative"')) {
      content = content.replace(/<button className="p-2 text-gray-500 hover:bg\[#DCE6F1\] rounded-full transition-colors relative">(\s*<Bell)/g, '<button onClick={() => navigate(\'notifications_inbox\')} className="p-2 text-gray-500 hover:bg-[#DCE6F1] rounded-full transition-colors relative">$1');
      changed = true;
  }
  
  // For the grey versions:
  if (content.includes('className="p-2 text-gray-400 hover:text-[#1F3864] transition-colors relative"')) {
      content = content.replace(/<button className="p-2 text-gray-400 hover:text\[#1F3864\] transition-colors relative">(\s*<Bell)/g, '<button onClick={() => navigate(\'notifications_inbox\')} className="p-2 text-gray-400 hover:text-[#1F3864] transition-colors relative">$1');
      changed = true;
  }
  
  if (changed) {
      fs.writeFileSync(path.join(pagesDir, page), content);
  }
});

