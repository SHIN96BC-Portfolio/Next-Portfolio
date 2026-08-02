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
      name: '申炳哲',
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

SI、スタートアップ、旅行・航空、B2C/B2B プラットフォームなど多様な環境でサービスを構築・運用し、**Java API 開発**、**AWS/Azure インフラ**、**CI/CD 自動化**の経験もあります。

新規サービスの立ち上げからレガシー改善まで対応し、エンドツーエンドでプロダクトを完成させるフルスタック力を持っています。

コードレビュー、テスト自動化、設計検証で品質を高め、**AI 支援開発**を積極的に活用しています。`,
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
      body: `私は **問い続け、より良い方向を見つける開発者** です。

SI、スタートアップ、プラットフォーム企業などで、企画参加、設計、DB 設計、フロント/バックエンド開発、デプロイ自動化まで、少人数で最大のビジネス価値を生む働き方をしてきました。

開発者は機能を作るだけでなく、UX を最適化し、リスクを先回りして、必要なら開発外の課題も解決するべきだと考えています。

企画・デザイン・CS など多職種と積極的に協業してきました。

AI 時代には、コード量より **問題定義の精度と AI を通じた価値創出** が重要だと考えています。`,
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
