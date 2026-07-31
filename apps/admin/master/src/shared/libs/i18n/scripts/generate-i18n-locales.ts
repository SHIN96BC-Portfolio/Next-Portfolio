import * as fs from 'fs';
import * as path from 'path';

const localesRoot = path.join(__dirname, '../locales');
const outputDir = path.join(__dirname, '../constants');
const output = path.join(outputDir, 'i18n-locales.ts');

// ✅ 디렉토리가 없으면 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 디렉토리 이름 기준으로 로케일 추출
const localeDirs = fs
  .readdirSync(localesRoot, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const entries = localeDirs.map((locale) => `  ${locale.toUpperCase()}: '${locale}',`).join('\n');

const result = `/* eslint-disable */
// ✅ 이 파일은 자동 생성된 파일입니다. 수동으로 수정하지 마세요.

export const I18N_LOCALE = {
${entries}
} as const;

// 지원하는 언어
export type Locale =
  typeof I18N_LOCALE[keyof typeof I18N_LOCALE];
`;

fs.writeFileSync(output, result, 'utf-8');
console.info(`✅ Generated i18n-locales.ts with [${localeDirs.join(', ')}]`);
