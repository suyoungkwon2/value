import { mkdir, copyFile, rm, cp } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const name of ['index.html', 'styles.css', 'app.js', 'values.mjs', 'chart.mjs', 'i18n.mjs']) await copyFile(name, `dist/${name}`);
await cp('assets', 'dist/assets', { recursive: true });
console.log('Static site built in dist/');
