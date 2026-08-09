import { getPortfolioProjectsMock } from '@FsdEntities/content/model/mock/portfolio-projects.mock';
import { portfolioSkillsMock } from '@FsdEntities/content/model/mock/portfolio-skills.mock';
import { CONTENT_LANG, HomeSectionRes, PAGE_KEY, SECTION_TYPE } from '@FsdEntities/content/model/types';

export const portfolioHomeSectionsJa: HomeSectionRes[] = [
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
      body: `**Next.js** を中心としたフロントエンド開発を専門とする、経験5年のウェブ開発者です。

SI、スタートアップ、旅行・航空、B2C/B2B プラットフォームなど多様な環境でウェブサービスを構築・運用し、**Java API 開発**、**AWS/Azure インフラ設計・デプロイ**、**CI/CD 自動化**の経験もあります。

新規サービスをゼロベースから開発したり、レガシー構造の改善や次世代サービスの構築を行い、エンドツーエンドでプロダクトを完成させるフルスタック力を持っています。

開発者は単に機能を作る仕事ではないと考えています。ユーザー体験を最適化し、サービスが成長できるよう問題を予測・防止し、必要なら開発以外の課題も自発的に解決することが本当の実力だと信じています。

一人より一緒に働くときにより大きな成果が出ると考え、企画・デザイン・CS など多様な職種と積極的にコミュニケーションしてきました。

AI 時代には、どれだけコードを書いたかより、**問題をどれだけ正確に定義し、AI を通じて素早く価値を生み出せるか**が重要だと考えています。サービス全体の構造、ビジネスの流れ、問題の本質を理解する力が不可欠であり、深く分析し、リスクを事前に把握し、正確な問いを投げる習慣を磨き続けています。`,
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

· **フルスタック・インフラ対応** — フロントエンド中心に、Java/Spring・Nest.js バックエンドから CI/CD パイプライン・K8s インフラ再設計まで、デプロイ・運用全体をカバー

· **企画からデプロイまで End-to-End** — 企画参加・構造設計・DB 設計・フロント/バックエンド開発・デプロイ自動化まで、少人数でプロダクトをエンドツーエンドで完成させた経験

## 主な実績

· **300以上の BP/ONBP サイトを単一 Turborepo モノレポに統合** — ワンソース・マルチサイト構造を設計し、単一コードベースで 300 以上のサイトを運用・デプロイ（yarn→pnpm 移行、サイト別ビルドパイプライン構成）

· **決済・ルーティングなど critical バグで不安定だったレガシーサービスを安定化** — 300 件以上のイシューを処理し、決済失敗・異常ルーティングなどの核心障害を解消、サービス信頼性を大幅に改善

· **1.4億件の大容量テーブル照会 4〜6分 → 5秒以内（約50倍+改善）** — インデックス・統計テーブル設計で照会ボトルネックを解消

· **CI/CD パイプライン・K8s インフラ再設計に参画** — マルチサービス（B2C・BP・ONBP）のデプロイパイプラインをサービス・環境別に細分化して再設計、Azure Local ARC 移行・DR フェイルオーバー構成に貢献。ビルド〜デプロイ 30分+ → 12〜15分短縮、ページ読み込み最大 15秒 → 5秒（SSG/SSR 組み合わせ・キャッシュ・useEffect 整理）

· **Next.js 12→15 メジャーバージョンアップを主導** — App Router・React 19 対応を含む段階的マイグレーションをサービス無停止で実施

· **AI 開発ワークフローをチーム標準として確立** — Cursor Agent ルール、Claude Code・Gemini CLI ガイドを導入し、チーム共通の作業方式・オンボーディングを文書化`,
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
      companies: getPortfolioProjectsMock(CONTENT_LANG.JA),
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
          department: '開発チーム',
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
          department: '開発3チーム',
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
