const fs = require('fs');
const path = require('path');

const replacements = {
    'bg-\\[#0a0a0a\\]': 'bg-white',
    'bg-\\[#121212\\]': 'bg-slate-50',
    'bg-\\[#1a1a1a\\]': 'bg-slate-100',
    'bg-\\[#27272a\\]': 'bg-slate-200',
    'border-\\[#27272a\\]': 'border-slate-200',
    'border-\\[#121212\\]': 'border-white',
    'text-white': 'text-slate-900',
    'text-zinc-300': 'text-slate-700',
    'text-zinc-400': 'text-slate-500',
    'text-zinc-500': 'text-slate-400',
    'text-zinc-600': 'text-slate-400',
    'bg-zinc-800': 'bg-slate-200',
    'hover:text-white': 'hover:text-slate-900',
    'hover:bg-\\[#1a1a1a\\]': 'hover:bg-slate-100',
    'hover:bg-\\[#27272a\\]': 'hover:bg-slate-200',
    'text-black': 'text-white',
    'from-emerald-900/40': 'from-emerald-100/80',
    'from-orange-900/40': 'from-orange-100/80',
};

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            if (!file.includes('node_modules') && !file.includes('.next')) {
                results = results.concat(walk(file));
            }
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('.');

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;
    
    for (const [pattern, replacement] of Object.entries(replacements)) {
        const regex = new RegExp(pattern, 'g');
        newContent = newContent.replace(regex, replacement);
    }
    
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
}
