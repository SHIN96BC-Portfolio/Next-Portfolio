import { ResumeProjectConfig } from '../types';

export const portfolioCareerProjectsJa: ResumeProjectConfig[] = [
  {
    projectId: 'modetour-nextgen',
    orderLabel: '1',
    title: 'モドゥツアー B2C/B2B 旅行プラットフォーム次世代再構築',
    company: '(주) YRISM',
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
      '稼働中の as-is サービスを維持しながら、次世代フロントエンドを全面再構築する必要がありました。引き継ぎ時点では決済・戻る操作（ルーティング）などのコア機能が正常に動作しないほどバグが多く不安定でした。またコード構造上 props ドリリングが深刻で共通化が進んでおらず、同一コンポーネントがページごとに重複しており、1回の修正で複数ファイルを繰り返し変更し、デバッグにも多くの時間を要していました。運用対象も1種類ではありませんでした。B2C 本サイト、機能基盤は B2C と同じで取扱商品と一部カスタムのみが異なる BP 約150サイト、代理店の要望どおり画面・機能がすべて変わるフルカスタムの ONBP 約150サイト（現在も増加中）— 性格の異なる3種類をすべて PC・MO で併せて管理する必要がありました。APP も WebView ベースのため画面・機能は FE の管理領域である一方、アプリのシェルは外部業者が管理しており、問題が起きるたびに原因が WebView 側かアプリ側かの切り分けから始める必要がありました。限られた人数でこのすべてを同じ方法で運用することは不可能でした。共通コンポーネントの統合とメジャーバージョンアップを並行する状況で、変更がどのサイトに影響するかを確認する手段がないことも課題でした。さらにチームで AI コーディングツールを使い始めたことで、構造を把握しないまま生成されたコードがレイヤー境界を越える事例も増えていました。',
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
          '**ワンソース・マルチサイト構造の設計** — ドメイン別サイト情報を読み込み、API ヘッダーにサイトコンテキストを注入し、B2C と機能基盤を共有する BP 約150サイトを単一コードベースで運用',
          '**Turborepo モノレポへの移行** — カスタム範囲が予測できない ONBP 約150サイト（継続増加）を、共通コンポーネント分離 + サイト別ビルドパイプラインで統合管理。ドメイン別 config 分離、yarn→pnpm 移行',
          '**共通コンポーネント化 + props ドリリング解消** — ページごとに重複していたコンポーネントを共通化。同一修正時の作業範囲を4ファイル→1ファイルに削減し、保守・デバッグ時間を短縮、副作用とヒューマンエラーの発生点を低減',
          '**FSD アーキテクチャの導入**、FE Model + Mapper パターンで BE API 変更の影響を最小化',
        ],
      },
      {
        title: '3) パフォーマンス最適化',
        items: [
          '**ページ読み込み最適化** — SSG/SSR を状況に応じて組み合わせ、TanStack Query キャッシュで不要な API 重複呼び出し・重複ローディングを排除、不要に繰り返し実行されていた useEffect を整理。最も読み込みに時間がかかっていたページを約1/3に短縮（Lighthouse モバイル基準）',
          '**ビルド〜デプロイ時間の短縮** — 既存パイプラインの非効率を診断・排除。設定のみで実際には動作せずビルド時間だけを増やしていた不要コードを削除。Next.js 12→15 のバージョンアップ過程で、残っていた Babel 設定が SWC のコンパイル経路を無効化していることを発見して撤去し、ビルドと dev サーバー起動の時間を短縮。誤設定で正常に動作していなかったキャッシュ設定を Turborepo・Next ビルドキャッシュで正常適用、不要なチェックステップと重複実行されていた `yarn install` を削除。ビルドキュー・キャッシュを整備し、ビルド〜デプロイを30分以上→12〜15分（約50〜60%短縮）',
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
        title: '5) テスト・品質体系',
        items: [
          '**単体・統合** — Vitest 3 のマルチプロジェクト（ドメインパッケージ、B2C/ONBP 共通パッケージ）と React Testing Library で、HTTP クライアント、暗号・復号、決済・予約ユーティリティ、カスタムフックなどビジネスロジックを検証。パッケージ別にテストプロジェクトを分離し、変更の影響範囲だけを選択実行できるよう構成',
          '**E2E** — 専用のテストワークスペースで Playwright により、運用環境（legacy API）と dev 環境（FE Server/BFF）をシート・ドメイン（B2C・BP・ONBP PC/MO）単位に分け、リモートデプロイ環境を対象にシナリオを実行。mock ではなく実 SSO 連携と BFF probe で実際の認証・レスポンス経路まで検証し、シナリオメタデータに基づく実行・レポート用の Testbed UI を自ら構築してチームで運用',
          '**品質ゲート** — Husky の pre-commit で Biome + 変更に関連する Vitest、pre-push でビルド・型チェック・全テストを強制',
          '**API 契約** — OpenAPI 仕様から Zod/TypeBox を生成し、型検証とランタイム検証を同一ソースで連結。BE 仕様変更時に FE の影響箇所をコンパイル時に露出',
          '次のステップとして、CI テストゲートの導入とページ単位テストの拡大を予定',
        ],
      },
      {
        title: '6) AI 開発体系 — エージェントコンテキストエンジニアリング',
        items: [
          'モノレポの規模が大きくなるにつれ、AI コーディングエージェントがレイヤー境界を越えたり規約を外れたコードを生成する問題が繰り返し発生。ツールを増やすのではなく、**エージェントが読むコンテキスト自体を設計する**方向を選択',
          '**コンテキストの単一ソース** — ルートの AGENTS.md を単一ソースとし、Cursor・Claude・Gemini・Codex のエントリポイントをこれに合わせ、ツールが異なっても同じ境界・規約に従うよう構成。ツールごとにルール文書が分化し、互いに食い違う問題を遮断',
          '**パッケージ境界の注入** — パッケージ別の AGENTS.md で API 契約定義・ブラウザアダプター・HTTP 通信本体の役割と、B2C ↔ ONBP の相互 import 禁止を作業パスに合わせて注入。人がレビューで指摘していたアーキテクチャ違反を生成時点で遮断',
          '**コンベンションガードレール** — 人が読む規約ガイドと、エージェントが読む Cursor Skill・path-scoped Rule を分離。TS/TSX 編集時のみ #region 構成・Named Export・Biome・イベント規則を注入して不要なコンテキスト消費を抑え、レガシーの一括リファクタは適用範囲から明示的に除外して意図しない大規模変更を防止',
          '**E2E フィードバックループ** — Playwright シナリオにメタデータを付与して registry を自動生成し、sheet（legacy/fe-server）・domain 単位で CLI 実行と Testbed UI 実行の両方に対応。失敗原因・修正オプション・再検証手順をドキュメント化し、後続のエージェントが引き継げるよう連結',
          '**オンボーディング** — 上記の体系をチーム共通の作業方式として文書化し、新規メンバーがプロジェクト構造を把握する前でも境界を外れずに作業できる環境を構成',
        ],
      },
      {
        title: '7) チーム生産性・協業',
        items: [
          '次世代再構築を FE 3名で開始し現在5名規模となったチームで、PL とともにアーキテクチャと作業基準を設計し、リード不在時はスケジュール調整・課題配分・技術的意思決定を代行',
          '**技術標準の策定** — FSD アーキテクチャ、FE Model + Mapper パターン、コンポーネント共通化基準、ブランチ・デプロイ規則を定義し文書化',
          '**デプロイ戦略転換の判断** — 構築期のリリーストレイン・統合ブランチ方式が、オープン後の頻繁なホットフィックス・緊急デプロイに合わないと判断し、柔軟な手動デプロイ戦略への転換を提案・適用',
        ],
      },
    ],
    outcomes: [
      '引き継ぎ時点で決済・ルーティングなどコアフローが動作しなかったサービスを、**300件以上のイシュー対応を経て運用可能な状態へ転換**',
      'サイト数が300から増え続ける中でも、**サイト増加がコードベース・運用コストの増加に直結しない構造**を確保',
      '**デプロイ時間を約50〜60%短縮**、主要ページの読み込みを約1/3（Lighthouse モバイル基準）',
      'メジャーバージョンアップ・状態管理移行を **サービス停止なしで** 完了し、安定性と最新技術スタックを両立',
    ],
    extraSections: [
      {
        title: 'CI/CD・インフラ再設計',
        body: '次世代移行に合わせてデプロイパイプラインとインフラを再設計しました。FE デプロイパイプライン・Helm は自ら担当し、CDN・セキュリティ・Pod 運用はインフラチームと役割を分けました。',
        items: [
          '**直接担当** — FE デプロイパイプラインの設計・構築（オーケストレーターパイプラインで B2C 単一8本 → B2C・BP・ONBP × 4環境 20本以上の体系へ分離し、必要なサービス・環境のみを選択してデプロイ）、Helm チャートの作成および高度化（topologySpreadConstraints、readinessProbe、CPU/メモリベースの HPA）、`kubectl rollout status` によるデプロイ検証、standby パイプラインの新規構成',
          '**ビルド方式の改善** — Docker 内部ビルド（Yarn workspaces）から、Turbo prune + ホスト側 pnpm/turbo ビルド + Docker パッケージングを分離した構造へ転換し、buildx registry キャッシュを導入',
          '**インフラチームとの協業** — Azure AKS → Azure Local ARC（Connected K8s）移行、failover（active/standby）による災害復旧体系、Akamai CDN、インフラセキュリティ、Pod 運用・モニタリング、サーバーログ分析',
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
      'Vitest',
      'React Testing Library',
      'Playwright',
      'Biome',
      'Husky',
      'Zod',
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
    company: '(주) ER Solution',
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
      '**1.4億件の照会を4〜6分→5秒以内（複雑 join 時は10秒以内、約50倍以上の改善）**',
      'フロント・バック・インフラを単独で完成し、End-to-End 開発力を実証',
    ],
    techStack: ['React(Vite)', 'Nest.js', 'TypeScript', 'MariaDB', 'TanStack Query', 'Docker', 'AWS EC2'],
  },
  {
    projectId: 'lhat',
    orderLabel: '3',
    title: 'フィリピン Lahat プラットフォーム バックオフィス・Webアプリ構築',
    company: '(주) Pinetechsoft',
    period: '2023.10 – 2024.05',
    role: 'フロントエンド開発',
    links: [],
    problem:
      '複数ドメイン（Mall・Food・Store・動物病院）のバックオフィスとユーザー向け Web アプリを新規構築・運用しました。',
    workSections: [
      {
        title: '主要プロジェクト',
        items: [
          '**Lahat Mall Admin** — 商品販売機能追加に伴う管理者バックオフィスを構造設計から API 連携まで単独構築。Firebase 認証、商品・オプション・カテゴリ・イベント・注文・レビュー管理、無限スクロールイベント商品選択、i18n 適用',
          '**Lahat Food / Store Admin** — 基本・距離別配送料ポリシー機能を新規追加、react-hook-form + Zod フォーム検証、店主/顧客負担比率設定 UI を実装',
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
    title: '(주) ER Solution — その他プラットフォーム・公共サービス開発',
    company: '(주) ER Solution',
    period: '2022.07 – 2023.09',
    role: 'フルスタック開発研究員',
    links: [],
    problem: 'フロントエンドを主軸に、フルスタック・モバイルまで幅広く担当しました。',
    workSections: [
      {
        title: '主要プロジェクト',
        items: [
          '**Dada Pick / Dada Place** — B2B・B2C 流通管理 Web アプリおよび B2C ショッピングモールを新規開発。企画段階から参画、フロントエンドを単独構築、Editor.js 商品エディタ・無限スクロール・Atomic Design パターンを導入',
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
