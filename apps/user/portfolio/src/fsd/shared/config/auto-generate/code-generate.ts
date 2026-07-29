import AUTO_GEN_MESSAGE from '@FsdShared/config/auto-generate/constants/message';
import fs from 'fs';

interface Args {
  outputPath: string;
  outputDir: string;
  result: string;
  useLocales: string[];
}

export default function codeGenerate({ outputPath, outputDir, result, useLocales }: Args) {
  const newResult = AUTO_GEN_MESSAGE.GENERATE_MESSAGE + result;

  // ✅ 디렉토리가 없으면 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, newResult, 'utf-8');

  console.info(`✅ Generated ${outputPath} with [${useLocales.join(', ')}]`);
}
