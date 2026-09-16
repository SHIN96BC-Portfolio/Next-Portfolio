import { I18N_LOCALE } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { HomeSectionGetRes, PAGE_KEY, SECTION_TYPE } from '..';
import { getPortfolioProjectsMock } from './portfolio-projects.mock';
import { portfolioSkillsMock } from './portfolio-skills.mock';

export const portfolioHomeSectionsJa: HomeSectionGetRes[] = [
  {
    id: 'sec-hero',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'hero',
    sectionType: SECTION_TYPE.HERO,
    title: null,
    configSchemaVersion: 1,
    displayOrder: 0,
    isActive: true,
    config: {
      name: '申秉澈(シン・ビョンチョル)',
      title: 'Frontend Developer（5年目）',
      tagline: '問い続け、より良い方向を見つける開発者',
      links: [
        { type: 'github', label: 'GitHub', url: 'https://github.com/SHIN96BC' },
        { type: 'email', label: 'Email', url: 'mailto:mousecjf@gmail.com' },
        {
          type: 'portfolio',
          label: 'GitHub Portfolio Source',
          url: 'https://github.com/orgs/SHIN96BC-Portfolio/repositories',
        },
      ],
    },
  },
  {
    id: 'sec-intro',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'introduction',
    sectionType: SECTION_TYPE.MARKDOWN,
    title: 'Introduction',
    configSchemaVersion: 1,
    displayOrder: 1,
    isActive: true,
    config: {
      body: `**Next.js** ベースのウェブサービスを専門とする、経験5年のフロントエンド開発者です。SI・スタートアップ・旅行プラットフォームなど多様な環境で、新規構築とレガシーの次世代移行の両方を担当してきました。

現在は Modetour の B2C/B2B プラットフォームで as-is 運用と次世代再構築を並行し、約300の BP/ONBP サイトを単一 Turborepo モノレポで運用する**マルチテナント構造**を設計・実装しました。Next.js 12→15 メジャーバージョンアップと状態管理の移行をサービス無停止で完了し、**FE デプロイパイプライン・Helm チャートの設計**から、**AI コーディングエージェントがモノレポのアーキテクチャ境界を守るためのコンテキスト体系**まで自ら構築し、チーム標準として運用しています。

フロントエンドを主軸としながら、Java/Spring・Nest.js バックエンド、DB 設計、AWS・Azure インフラまで扱い、プロダクトを End-to-End で完成させてきました。機能実装にとどまらず、**構造的なボトルネックを見つけて解消すること**を強みと考えています。`,
    },
  },
  {
    id: 'sec-about',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'about',
    sectionType: SECTION_TYPE.MARKDOWN,
    title: 'About Me',
    configSchemaVersion: 1,
    displayOrder: 2,
    isActive: true,
    config: {
      body: `## コアスキル

· **大規模リファクタリング・アーキテクチャ移行** — レガシーサービスを無停止で次世代構造に再構築した経験（Next.js メジャーバージョンアップ、モノレポ移行、状態管理マイグレーション）

· **パフォーマンス最適化** — 大容量データの照会・レンダリングのボトルネックを構造的に診断し、数十倍単位で改善

· **フルスタック・インフラ対応** — フロントエンド中心に、Java/Spring・Nest.js バックエンドから FE デプロイパイプライン・Helm チャート設計まで、デプロイ・運用全体をカバー

· **企画からデプロイまで End-to-End** — 企画参加・構造設計・DB 設計・フロント/バックエンド開発・デプロイ自動化まで、少人数でプロダクトをエンドツーエンドで完成させた経験

## 主な実績

· **300以上のマルチテナントサイトを単一モノレポに統合** — 共通基盤の BP 約150サイト + 代理店別にフルカスタムする ONBP 約150サイト（継続増加）を単一 Turborepo コードベースで運用・デプロイ

· **決済・ルーティングなど critical バグで不安定だったレガシーサービスを安定化** — 300 件以上のイシューを処理し、決済失敗・異常ルーティングなどの核心障害を解消、サービス信頼性を大幅に改善

· **1.4億件の大容量テーブル照会 4〜6分 → 5秒以内（約50倍+改善）** — インデックス・統計テーブル設計で照会ボトルネックを解消

· **FE デプロイパイプライン・Helm チャートを自ら設計・構築** — マルチサービス（B2C・BP・ONBP）× 4環境の20以上のパイプライン体系へ再設計、Helm の高度化（HPA・readinessProbe・ノード分散）。Azure Local ARC 移行・DR フェイルオーバーはインフラチームと協業。ビルド〜デプロイ 30分+ → 12〜15分短縮

· **主要ページの読み込みを約1/3に短縮** — SSG/SSR の組み合わせ・TanStack Query キャッシュ・不要な useEffect の整理（Lighthouse モバイル基準）

· **Next.js 12→15 メジャーバージョンアップを主導** — App Router・React 19 対応を含む段階的マイグレーションをサービス無停止で実施

· **テスト・品質体系の構築** — Vitest による単体・統合テストと、リモートデプロイ環境を対象とした Playwright E2E を構成し、実行・レポート用の Testbed を自作。Husky の品質ゲートで共通化・メジャーバージョンアップ時のリグレッションを遮断

· **AI コーディングエージェント向けコンテキスト体系の構築** — モノレポのアーキテクチャ境界（API 契約・アダプター・HTTP レイヤーの分離、B2C↔ONBP の隔離）を AGENTS.md と path-scoped Rule にエンコードし、エージェントがレイヤーを越えないガードレールを構成。Cursor・Claude・Gemini・Codex の共通コンテキストとして標準化し、E2E の失敗を後続作業へ連結するループを運用`,
    },
  },
  {
    id: 'sec-projects',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'project-grid',
    sectionType: SECTION_TYPE.PROJECT_GRID,
    title: 'Work Projects',
    configSchemaVersion: 1,
    displayOrder: 3,
    isActive: true,
    config: {
      companies: getPortfolioProjectsMock(I18N_LOCALE.JA),
    },
  },
  {
    id: 'sec-career',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'career',
    sectionType: SECTION_TYPE.TIMELINE,
    title: 'Career',
    configSchemaVersion: 1,
    displayOrder: 4,
    isActive: true,
    config: {
      items: [
        {
          id: 'career-yrism',
          company: 'YRISM株式会社',
          period: '2024.08 – 在職中',
          location: '韓国',
          department: 'Web開発チーム',
          position: 'マネージャー',
          role: 'Frontend Developer',
          description: 'モドゥール次世代サービス開発・運用',
          isDevRole: true,
        },
        {
          id: 'career-pinetechsoft',
          company: 'Pinetechsoft株式会社',
          period: '2023.10 – 2024.05',
          location: '韓国',
          department: '開発1チーム',
          position: '研究員',
          role: 'Frontend Developer',
          description: '自社プラットフォーム（Lahat, Zootopia）開発・運用',
          isDevRole: true,
        },
        {
          id: 'career-er',
          company: 'ER Solution株式会社',
          period: '2022.07 – 2023.09',
          location: '韓国',
          department: '開発1チーム',
          position: '研究員',
          role: 'フルスタックエンジニア',
          description: 'Web アプリケーション SI 開発（フロント・バックエンド）',
          isDevRole: true,
        },
      ],
    },
  },
  {
    id: 'sec-skills',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'skills',
    sectionType: SECTION_TYPE.CUSTOM,
    title: 'Skills',
    configSchemaVersion: 1,
    displayOrder: 5,
    isActive: true,
    config: portfolioSkillsMock,
  },
  {
    id: 'sec-licenses',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'licenses',
    sectionType: SECTION_TYPE.CUSTOM,
    title: 'Licenses & Certificates',
    configSchemaVersion: 1,
    displayOrder: 6,
    isActive: true,
    config: {
      items: [
        { name: '情報処理技師', date: '2024.09.10' },
        { name: '情報処理産業技師', date: '2021.11.26' },
        { name: '日本語能力試験（JLPT）N1', date: '2021.01.13' },
      ],
    },
  },
  {
    id: 'sec-education',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'education',
    sectionType: SECTION_TYPE.CUSTOM,
    title: 'Education',
    configSchemaVersion: 1,
    displayOrder: 7,
    isActive: true,
    config: {
      items: [
        {
          school: '韓国放送通信大学校',
          period: '2023.09 – 在学中',
          location: '韓国',
          details: ['コンピュータ科学科', '3年次編入'],
        },
        {
          school: '韓国ソフトウェア人材開発院',
          period: '2021.11 – 2022.04',
          location: '韓国',
          details: [
            'Java フルスタック Web 開発者養成課程（6ヶ月）',
            '全チームプロジェクトリーダー',
            '模範・奉仕賞受賞',
          ],
        },
        {
          school: '東放学園メディア・トレーニング・カレッジ',
          period: '2019.04 – 2021.03',
          location: '日本',
          details: ['放送音響科 卒業', '成績優秀奨学金受賞'],
        },
      ],
    },
  },
  {
    id: 'sec-contact',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'contact',
    sectionType: SECTION_TYPE.CUSTOM,
    title: 'Contact',
    configSchemaVersion: 1,
    displayOrder: 8,
    isActive: true,
    config: {
      email: 'mousecjf@gmail.com',
      message: 'プロジェクト協業・採用に関するお問い合わせを歓迎します。',
      links: [
        { type: 'github', label: 'GitHub', url: 'https://github.com/SHIN96BC' },
        { type: 'email', label: 'Email', url: 'mailto:mousecjf@gmail.com' },
        {
          type: 'portfolio',
          label: 'GitHub Portfolio Source',
          url: 'https://github.com/orgs/SHIN96BC-Portfolio/repositories',
        },
      ],
    },
  },
];
