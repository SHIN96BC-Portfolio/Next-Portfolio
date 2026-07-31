import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const clientOutputs = [
  'dist/index.js',
  'dist/index.cjs',
  'dist/accordion/index.js',
  'dist/accordion/index.cjs',
  'dist/modal/index.js',
  'dist/modal/index.cjs',
];

const directive = '"use client";';

for (const relativePath of clientOutputs) {
  const filePath = path.join(root, relativePath);

  if (!fs.existsSync(filePath)) {
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  if (content.startsWith(directive)) {
    continue;
  }

  fs.writeFileSync(filePath, `${directive}\n${content}`);
}
