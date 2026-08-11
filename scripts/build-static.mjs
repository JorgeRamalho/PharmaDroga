import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true });
}

mkdirSync(dist, { recursive: true });

const copies = [
  ['index.html', 'index.html'],
  ['js', 'js'],
  ['src/styles', 'src/styles'],
  ['api', 'api'],
  ['public/og-image.png', 'og-image.png'],
  ['public/robots.txt', 'robots.txt'],
  ['public/sitemap.xml', 'sitemap.xml'],
  ['public/api', 'api'],
];

for (const [from, to] of copies) {
  const source = join(root, from);
  if (!existsSync(source)) continue;
  cpSync(source, join(dist, to), { recursive: true });
}

console.log('Static build ready in dist/');
