import codeGenerate from '@FsdShared/config/auto-generate/code-generate';
import AUTO_GEN_PATH from '@FsdShared/config/auto-generate/constants/path';
import * as fs from 'fs';
import * as path from 'path';

const localesDir = path.join(__dirname, '../locales/ko');
const outputDir = path.join(__dirname, `../${AUTO_GEN_PATH.GENERATE_DIRECTORY}/types`);

// ✅ 디렉토리가 없으면 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, (match) => match.replace(/-/, '').toUpperCase());
}

function jsonToTsType(obj: any, indent = 2): string {
  const pad = ' '.repeat(indent);
  return (
    '{\n' +
    Object.entries(obj)
      .map(([k, v]) => {
        if (typeof v === 'string') {
          return `${pad}${k}: string;`;
        }
        return `${pad}${k}: ${jsonToTsType(v, indent + 2)};`;
      })
      .join('\n') +
    '\n' +
    ' '.repeat(indent - 2) +
    '}'
  );
}

fs.readdirSync(localesDir).forEach((file) => {
  if (!file.endsWith('.json')) {
    return;
  }

  const namespace = path.basename(file, '.json'); // ex) 'common'
  const interfaceName = `Dictionary${toPascalCase(namespace)}`; // → 'DictionaryCommon'

  const filePath = path.join(localesDir, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(raw);
  const result = `export interface ${interfaceName} ${jsonToTsType(json)}`;

  const outputPath = path.join(outputDir, `${namespace}.d.ts`);

  codeGenerate({ outputPath, outputDir, result, useLocales: [namespace] });
});
