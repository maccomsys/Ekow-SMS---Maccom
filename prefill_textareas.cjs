const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add defaultValue to textareas
    content = content.replace(/<textarea([^>]*?)>/g, (match, attrs) => {
        if (attrs.includes('defaultValue=') || attrs.includes('value=')) {
            return match;
        }
        return `<textarea${attrs} defaultValue="This is a detailed sample description or note for demonstration purposes.">`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
}
