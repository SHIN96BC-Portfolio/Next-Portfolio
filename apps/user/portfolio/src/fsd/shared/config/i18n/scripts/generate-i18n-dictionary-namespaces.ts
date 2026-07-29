import codeGenerate from '@FsdShared/config/auto-generate/code-generate';
import AUTO_GEN_PATH from '@FsdShared/config/auto-generate/constants/path';
import * as fs from 'fs';
import * as path from 'path';

const fileName = 'i18n-namespaces.ts';

const koLocaleDir = path.join(__dirname, '../locales/ko');
const outputDir = path.join(__dirname, `../${AUTO_GEN_PATH.GENERATE_DIRECTORY}/constants`);
const outputPath = path.join(outputDir, fileName);

const useLocales = fs
  .readdirSync(koLocaleDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => path.basename(file, '.json'));

const toEnumKey = (name: string) => name.toUpperCase();

const entries = useLocales.map((name) => `  ${toEnumKey(name)}: '${name}',`).join('\n');

const result = `export const I18N_DICTIONARY_NAMESPACE = {
${entries}
} as const;

// 지원하는 페이지
export type Namespace = (typeof I18N_DICTIONARY_NAMESPACE)[keyof typeof I18N_DICTIONARY_NAMESPACE];
`;

codeGenerate({ outputPath, outputDir, result, useLocales });
