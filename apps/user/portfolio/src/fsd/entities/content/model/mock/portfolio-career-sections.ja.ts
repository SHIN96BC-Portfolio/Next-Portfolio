import { portfolioCareerProjectsJa } from '@FsdEntities/content/model/mock/portfolio-career-projects.ja';
import { createPortfolioCareerSections } from '@FsdEntities/content/model/mock/portfolio-career-sections.factory';

const CAREER_INTRO_BODY =
  '5年目のフロントエンド開発者として、レガシーサービスの次世代再構築からEnd-to-Endの新規開発まで幅広く経験しています。大規模リファクタリング・パフォーマンス最適化・フルスタック対応に強みがあり、以下は代表プロジェクトを**課題 → 解決 → 成果**の観点でまとめた内容です。';

const CAREER_STRENGTHS_BODY = `- **レガシー → 次世代移行**を無停止で実施する大規模リファクタリング力
- **パフォーマンスボトルネックを構造的に診断・解決**する最適化力（50倍改善の実績）
- **CI/CDパイプライン・K8sインフラ再設計**まで担うデプロイ・運用力
- 企画からデプロイまで **End-to-Endで完遂**するフルスタックオーナーシップ
- フロント・バック・モバイル・インフラを横断する幅広い技術スペクトラム`;

export const portfolioCareerSectionsJa = createPortfolioCareerSections({
  introTitle: '職務経歴書 — 申秉澈（フロントエンド開発者）',
  introBody: CAREER_INTRO_BODY,
  strengthsTitle: '強みの要約',
  strengthsBody: CAREER_STRENGTHS_BODY,
  projects: portfolioCareerProjectsJa,
});
