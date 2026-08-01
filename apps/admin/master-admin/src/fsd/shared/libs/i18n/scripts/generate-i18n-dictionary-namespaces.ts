import * as fs from 'fs';
import * as path from 'path';

const enLocaleDir = path.join(__dirname, '../locales/ko');
const outputDir = path.join(__dirname, '../constants');
const outputPath = path.join(outputDir, 'i18n-namespaces.ts');

// ✅ 디렉토리가 없으면 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const filenames = fs
  .readdirSync(enLocaleDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => path.basename(file, '.json'));

const toEnumKey = (name: string) => name.toUpperCase();

const entries = filenames.map((name) => `  ${toEnumKey(name)}: '${name}',`).join('\n');

const result = `/* eslint-disable */
// ✅ 자동 생성된 파일입니다. 수동으로 수정하지 마세요.

export const I18N_DICTIONARY_NAMESPACE = {
${entries}
} as const;

// 지원하는 페이지
export type Namespace = (typeof I18N_DICTIONARY_NAMESPACE)[keyof typeof I18N_DICTIONARY_NAMESPACE];
`;

fs.writeFileSync(outputPath, result, 'utf-8');
console.info(`✅ Generated i18n-namespaces.ts with [${filenames.join(', ')}]`);
