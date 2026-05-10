import os
import glob
import re

replacements = {
    r'bg-\[\#0a0a0a\]': 'bg-white',
    r'bg-\[\#121212\]': 'bg-slate-50',
    r'bg-\[\#1a1a1a\]': 'bg-slate-100',
    r'bg-\[\#27272a\]': 'bg-slate-200',
    r'border-\[\#27272a\]': 'border-slate-200',
    r'border-\[\#121212\]': 'border-white',
    r'text-white': 'text-slate-900',
    r'text-zinc-300': 'text-slate-700',
    r'text-zinc-400': 'text-slate-500',
    r'text-zinc-500': 'text-slate-400',
    r'text-zinc-600': 'text-slate-400',
    r'bg-zinc-800': 'bg-slate-200',
    r'hover:text-white': 'hover:text-slate-900',
    r'hover:bg-\[\#1a1a1a\]': 'hover:bg-slate-100',
    r'hover:bg-\[\#27272a\]': 'hover:bg-slate-200',
    r'text-black': 'text-white',  # for buttons that were green with black text, now green with white text
    r'from-emerald-900/40': 'from-emerald-100/80',
    r'from-orange-900/40': 'from-orange-100/80',
}

files = glob.glob('**/*.tsx', recursive=True) + glob.glob('**/*.ts', recursive=True)

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for pattern, replacement in replacements.items():
        new_content = re.sub(pattern, replacement, new_content)
        
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {file_path}')
