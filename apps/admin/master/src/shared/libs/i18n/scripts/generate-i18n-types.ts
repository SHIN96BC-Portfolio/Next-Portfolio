// shared/libs/i18n/scripts/generate-i18n-types.ts
import * as fs from 'fs';
import * as path from 'path';

const localesDir = path.join(__dirname, '../locales/ko');
const outputDir = path.join(__dirname, '../types');

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
  const tsType = `/* eslint-disable */
// ✅ 자동 생성된 파일입니다. 수동으로 수정하지 마세요.
   
export interface ${interfaceName} ${jsonToTsType(json)}\n
`;

  const outputFile = path.join(outputDir, `${namespace}.d.ts`);
  fs.writeFileSync(outputFile, tsType);
  console.info(`✅ Generated ${interfaceName} → ${outputFile}`);
});
