import { ResumeProjectConfig } from '@FsdEntities/content/model/types';

export const portfolioCareerProjectsJa: ResumeProjectConfig[] = [
  {
    projectId: 'modetour-nextgen',
    orderLabel: '1',
    title: 'モドゥツアー B2C/B2B 旅行プラットフォーム次世代再構築',
    company: 'YRISM',
    period: '2024.08 – 在職中',
    role: 'フロントエンド開発',
    links: [
      { label: 'modetour.com', url: 'https://www.modetour.com' },
      { label: 'elpis.modetour.co.kr', url: 'https://elpis.modetour.co.kr' },
      { label: 'go.modetour.co.kr', url: 'https://go.modetour.co.kr' },
      { label: 'gentlemonster.modetour.com', url: 'https://gentlemonster.modetour.com' },
      { label: 'homeplus1.modetour.co.kr', url: 'https://homeplus1.modetour.co.kr' },
    ],
    problem:
      '稼働中の as-is サービスを維持しながら、次世代フロントエンドを全面再構築する必要がありました。引き継ぎ時点では決済・戻る操作（ルーティング）などのコア機能が正常に動作しないほどバグが多く不安定でした。またコード構造上 props ドリリングが深刻で共通化が進んでおらず、同一コンポーネントがページごとに重複しており、1回の修正で複数ファイルを繰り返し変更し、デバッグにも多くの時間を要していました。限られた人数で300以上の BP/ONBP サイトを効率的に運用する構造も必要でした。',
    workSections: [
      {
        title: '1) サービス安定化（レガシーバグ対応）',
        items: [
          '追加開発案件と決済失敗・異常ルーティングなどの critical バグを含む **300件以上の課題を処理**し、サービスを正常な軌道に安定化',
          '正常に動作していなかったコアフローを一つずつ診断・修正し、サービスの信頼性を確保',
        ],
      },
      {
        title: '2) アーキテクチャ・構造改善',
        items: [
          '**ワンソース・マルチサイト構造の設計** — ドメイン別サイト情報を読み込み、API ヘッダーにサイトコンテキストを注入し、単一コードベースで300以上のサイトを運用する構造を実装',
          '**Turborepo モノレポへの移行** — 300以上の BP/ONBP ドメインを統合管理、ドメイン別 config 分離、yarn→pnpm 移行、サイト別ビルドパイプラインの構築',
          '**共通コンポーネント化 + props ドリリング解消** — ページごとに重複していたコンポーネントを共通化。同一修正時の作業範囲を4ファイル→1ファイルに削減し、保守・デバッグ時間を短縮、副作用とヒューマンエラーの発生点を低減',
          '**FSD アーキテクチャの導入**、FE Model + Mapper パターンで BE API 変更の影響を最小化',
        ],
      },
      {
        title: '3) パフォーマンス最適化',
        items: [
          '**ページ読み込み最適化** — SSG/SSR を状況に応じて組み合わせ、TanStack Query キャッシュで不要な API 重複呼び出し・重複ローディングを排除、不要に繰り返し実行されていた useEffect を整理。最も読み込みに時間がかかっていたページで約15秒→約5秒に短縮',
          '**ビルド〜デプロイ時間の短縮** — 既存パイプラインの非効率を診断・排除。設定のみで実際には動作せずビルド時間だけを増やしていた不要コードを削除、誤設定で正常に動作していなかったキャッシュ設定を Turborepo・Next ビルドキャッシュで正常適用、不要なチェックステップと重複実行されていた `yarn install` を削除。ビルドキュー・キャッシュを整備し、ビルド〜デプロイを30分以上→12〜15分（約50〜60%短縮）',
        ],
      },
      {
        title: '4) UI・技術的負債の改善',
        items: [
          '**自社 UI ライブラリの構築** — 無理な antd 適用による CSS アニメーションのカクつきを解消するため antd を段階的に除去し、モドゥツアー専用 UI ライブラリを構築。react-print・react-date など問題のあるライブラリを自社実装・置換',
          '**Next.js 12→15 メジャーバージョンアップ** — App Router・React 19 対応を含む段階的マイグレーションをサービス無停止で実施',
          'RTK Query→TanStack Query・Redux→Zustand の無停止段階移行、ページ別重複ロジックの共通化、ハードコード定数の外部化',
        ],
      },
      {
        title: '5) チーム生産性・協業',
        items: [
          '**AI 開発ワークフローのチーム標準化** — Cursor Agent ルールおよび Claude Code・Gemini CLI ガイドを導入し、チーム共通の作業方式とオンボーディングプロセスを文書化',
        ],
      },
    ],
    outcomes: [
      '決済・ルーティングなどのコア障害を解消し、**300件以上の課題を処理**して不安定だったレガシーを安定軌道に移行',
      '300サイトを **単一コードベース・単一モノレポ** で運用・デプロイする体制を確立',
      '**デプロイ時間を約50〜60%短縮**、主要ページの読み込みを大幅改善し、開発生産性とユーザー体験を同時に向上',
      'メジャーバージョンアップ・状態管理移行を **サービス停止なしで** 完了し、安定性と最新技術スタックを両立',
    ],
    extraSections: [
      {
        title: 'CI/CD・インフラ再設計（インフラチームと協業）',
        body: '次世代移行に合わせ、デプロイパイプラインとインフラを全面再設計する作業に参画しました。',
        items: [
          '**パイプライン体系の再設計** — B2C 単一サービス基準の8本のパイプラインを、B2C・BP・ONBP × 4環境（dev/stg/prd/stby）の20本以上の体系に分離。`pipeline-deploys.yml` オーケストレーターで必要なサービス・環境のみを選択デプロイする構造を構築',
          '**ビルド方式の改善** — Docker 内ビルド（Yarn workspaces）から Turbo prune + ホスト pnpm/turbo ビルド + Docker パッケージング分離構造へ移行、buildx registry キャッシュ導入でビルド時間を短縮',
          '**デプロイインフラの移行** — Azure AKS から Azure Local ARC（Connected K8s）プロキシ方式へ移行、`kubectl rollout status` ベースのデプロイ検証を追加してデプロイ安定性を確保',
          '**DR・フェイルオーバー対応** — standby パイプラインを新規構成し、failover（active/standby）ベースの災害復旧体制を整備',
          '**Helm チャートの高度化** — topologySpreadConstraints（ノード分散）、readinessProbe（`/api/health`）、CPU/メモリベース HPA オートスケールを適用',
          '**デプロイ戦略の転換判断** — 次世代構築期のリリーストレイン・統合ブランチ方式から、オープン後の頻繁なホットフィックス・緊急デプロイに対応する柔軟な手動デプロイ戦略へ移行',
        ],
      },
    ],
    techStack: [
      'Next.js 12→15',
      'TypeScript',
      'Turborepo',
      'pnpm',
      'FSD',
      'TanStack Query',
      'Zustand',
      'Redux',
      'RTK Query',
      'axios',
      'Tailwind CSS',
      'Azure DevOps',
      'ACR',
      'Helm',
      'Kubernetes',
      'Docker',
      'Git',
    ],
  },
  {
    projectId: 'uteas',
    orderLabel: '2',
    title: '微細粒子状物質排出量 照会・可視化サービス（UTEAS）',
    company: 'ER Solution',
    period: '2023.06 – 2023.07',
    role: 'フルスタック開発（FE・BE・DB 単独）',
    links: [],
    problem:
      '道路・地域・時間単位で微細粒子状物質の排出量を照会・可視化する環境モニタリングサービスの新規開発。**1.4億件以上の大規模テーブル** の照会に4〜6分かかる深刻なパフォーマンスボトルネックが存在しました。',
    workSections: [
      {
        title: '担当業務',
        items: [
          'FE・BE・DB 設計を単独で実施',
          '**インデックス最適化および集計テーブル設計** で大規模照会のボトルネックを構造的に解消',
          'Recharts による統計可視化、v-world-map 地図、Excel アップロード機能を実装',
          'Nest.js API・MariaDB スキーマ設計、AWS EC2 デプロイ',
        ],
      },
    ],
    outcomes: [
      '**1.4億件の照会を4〜6分→5秒以内（約50倍以上の改善）**',
      'フロント・バック・インフラを単独で完成し、End-to-End 開発力を実証',
    ],
    techStack: ['React(Vite)', 'Nest.js', 'TypeScript', 'MariaDB', 'TanStack Query', 'Docker', 'AWS EC2'],
  },
  {
    projectId: 'lhat',
    orderLabel: '3',
    title: 'フィリピン Lhat プラットフォーム バックオフィス・Webアプリ構築',
    company: 'Pinetechsoft',
    period: '2023.11 – 2024.05',
    role: 'フロントエンド開発',
    links: [],
    problem:
      '複数ドメイン（Mall・Food・Store・動物病院）のバックオフィスとユーザー向け Web アプリを新規構築・運用しました。',
    workSections: [
      {
        title: '主要プロジェクト',
        items: [
          '**Lhat Mall Admin** — 商品販売機能追加に伴う管理者バックオフィスを構造設計から API 連携まで単独構築。Firebase 認証、商品・オプション・カテゴリ・イベント・注文・レビュー管理、無限スクロールイベント商品選択、i18n 適用',
          '**Lhat Food / Store Admin** — 基本・距離別配送料ポリシー機能を新規追加、react-hook-form + Zod フォーム検証、店主/顧客負担比率設定 UI を実装',
          '**Zootopia（動物病院）** — 予約管理 Admin + オンライン予約 Web アプリを構築。予約作成・照会・キャンセル、ペット最大10匹管理、Email・SNS 統合ログイン（NextAuth）、FCM プッシュ通知連携、紹介サイトまで構築',
        ],
      },
    ],
    outcomes: [
      '構造設計からデプロイまで **単独オーナーシップ** で複数サービスを完成',
      '認証・決済・通知などコアドメインを横断するバックオフィス・Web アプリ開発経験を蓄積',
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Zustand/Jotai',
      'TanStack Query',
      'MUI',
      'Firebase',
      'AWS Amplify',
      'NextAuth',
      'Zod',
    ],
  },
  {
    projectId: 'er-platform',
    orderLabel: '4',
    title: '多様なプラットフォーム・公共サービス開発',
    company: 'ER Solution',
    period: '2022.07 – 2023.09',
    role: 'フルスタック開発研究員',
    links: [],
    problem: 'フロントエンドを主軸に、フルスタック・モバイルまで幅広く担当しました。',
    workSections: [
      {
        title: '主要プロジェクト',
        items: [
          '**DdaPick / DdaPlace** — B2B・B2C 流通管理 Web アプリおよび B2C ショッピングモールを新規開発。企画段階から参画、フロントエンドを単独構築、Editor.js 商品エディタ・無限スクロール・Atomic Design パターンを導入',
          '**全州経済運転 CMS** — 市内バス経済運転指標管理システム。権限管理、Chart.js 運行指標の可視化、Spring + eGovFrame API・MariaDB 設計・AWS デプロイ（フルスタック）',
          '**ユジンレミコン入庫管理** — キオスク伝票撮影 Android アプリ。外部カメラ連携、キオスク UX、React レンダリング最適化',
          '**ペットパトロール** — リアルタイム散歩機能 iOS ネイティブアプリ（Swift/SwiftUI）、Naver Map ベースのリアルタイム経路・距離表示',
          '**仁川港保安公社** — 公式サイト保守、ウェブアクセシビリティ（WA）認証審査対応・合格、ペネトレーションテスト脆弱性パッチ',
        ],
      },
    ],
    outcomes: [],
    techStack: [
      'React',
      'Next.js',
      'TypeScript',
      'Redux',
      'Java/Spring',
      'eGovFrame',
      'Nest.js',
      'React Native',
      'Swift',
      'MariaDB',
      'AWS',
    ],
  },
];
