const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add defaultValue to inputs
    content = content.replace(/<input([^>]*?)>/g, (match, attrs) => {
        if (attrs.includes('defaultValue=') || attrs.includes('value=') || attrs.includes('type="checkbox"') || attrs.includes('type="radio"') || attrs.includes('type="submit"') || attrs.includes('type="file"')) {
            return match;
        }
        
        let sample = "Sample Data";
        if (attrs.includes('type="email"')) sample = "sample@school.edu.gh";
        else if (attrs.includes('type="tel"')) sample = "024 123 4567";
        else if (attrs.includes('type="date"')) sample = "2024-01-01";
        else if (attrs.includes('type="number"')) sample = "10";
        else if (attrs.match(/placeholder="[^"]*Kofi[^"]*"/i)) sample = "Kofi";
        else if (attrs.match(/placeholder="[^"]*Name[^"]*"/i)) sample = "Kwame Osei";
        else if (attrs.match(/placeholder="[^"]*Title[^"]*"/i)) sample = "Mathematics Assignment";
        else if (attrs.match(/placeholder="[^"]*address[^"]*"/i)) sample = "123 Independence Ave, Accra";
        else {
            const placeholderMatch = attrs.match(/placeholder="e\.g\.\s*([^"]+)"/i);
            if (placeholderMatch) {
                sample = placeholderMatch[1];
            } else {
                const placeholderMatch2 = attrs.match(/placeholder="([^"]+)"/i);
                if (placeholderMatch2) {
                    sample = placeholderMatch2[1];
                }
            }
        }
        
        // Remove closing slash if any and append defaultValue
        let newAttrs = attrs;
        if (newAttrs.endsWith('/')) {
            newAttrs = newAttrs.slice(0, -1);
            return `<input${newAttrs} defaultValue="${sample}" />`;
        } else {
            return `<input${newAttrs} defaultValue="${sample}">`;
        }
    });

    // Add defaultValue to textareas
    content = content.replace(/<textarea([^>]*?)>/g, (match, attrs) => {
        if (attrs.includes('defaultValue=') || attrs.includes('value=')) {
            return match;
        }
        return `<textarea${attrs} defaultValue="This is a detailed sample description or note for demonstration purposes.">`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
}
