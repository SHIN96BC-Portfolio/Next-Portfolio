import { portfolioCareerEmployersJa, portfolioCareerProjectsJa } from './portfolio-career-projects.ja';
import { createPortfolioCareerSections } from './portfolio-career-sections.factory';

const CAREER_INTRO_BODY =
  '5年目のフロントエンド開発者として、レガシーサービスの次世代再構築からEnd-to-Endの新規開発まで幅広く経験しています。大規模リファクタリング・パフォーマンス最適化・フルスタック対応に強みがあり、移行を安全にするテスト・品質体系や AI エージェントのコンテキスト・検証ハーネスまで自ら構築してきました。以下はプロジェクトごとの主要事例を **AS-IS → TO-BE** の観点でまとめた内容です。';

const CAREER_STRENGTHS_BODY = `- **レガシー → 次世代移行**を無停止で実施する大規模リファクタリング力
- **パフォーマンスボトルネックを構造的に診断・解決**する最適化力（50倍改善の実績）
- **FE デプロイパイプライン・Helm チャートを自ら設計・構築**するデプロイ・運用力
- **テスト・品質ゲートを階層として設計**し、大規模移行の回帰を遮断する安定性
- **AI エージェントのコンテキストと検証ハーネスを設計**し、アーキテクチャ境界を守らせる力
- フロント・バック・モバイル・インフラを横断し、企画からデプロイまで **End-to-Endで完遂**するフルスタックオーナーシップ`;

export const portfolioCareerSectionsJa = createPortfolioCareerSections({
  introTitle: '職務経歴書 — 申秉澈（フロントエンド開発者）',
  introBody: CAREER_INTRO_BODY,
  strengthsTitle: '強みの要約',
  strengthsBody: CAREER_STRENGTHS_BODY,
  projects: portfolioCareerProjectsJa,
  employers: portfolioCareerEmployersJa,
});
