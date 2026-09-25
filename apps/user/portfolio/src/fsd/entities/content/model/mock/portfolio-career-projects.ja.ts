import { ResumeEmployer, ResumeProjectConfig } from '../types';

export const portfolioCareerEmployersJa: Record<string, ResumeEmployer> = {
  YRISM株式会社: {
    period: '2024.08 – 在職中',
    detail: 'Web開発チーム · システム運用マネージャー（社内職級） · フロントエンド開発者',
  },
  Pinetechsoft株式会社: {
    period: '2023.10 – 2024.05',
    detail: '開発1チーム · 研究員 · フロントエンド開発者',
  },
  'ER Solution株式会社': {
    period: '2022.07 – 2023.09',
    detail: '開発1チーム · 研究員 · フルスタック開発者',
  },
};

export const portfolioCareerProjectsJa: ResumeProjectConfig[] = [
  {
    projectId: 'travel-platform-nextgen',
    title: 'M社 B2C/B2B 旅行プラットフォーム次世代再構築',
    company: 'YRISM株式会社',
    period: '2024.08 – 在職中',
    role: 'フロントエンド開発',
    links: [],
    scopeTags: ['FE 3名 → 5名', 'PL とアーキテクチャを共同設計'],
    cases: [
      {
        title: 'レガシーサービスの安定化',
        asIs: '引き継ぎ時点で、決済・戻る操作（ルーティング）などのコアフローが正常に動作しないほど不安定',
        approach: '正常に動作しないコアフローを一つずつ診断・修正し、追加開発案件と並行して対応',
        toBe: '`イシュー400件以上` を処理 · 決済失敗・異常ルーティングを解消し、運用可能な状態へ転換',
      },
      {
        title: '次世代コアドメインの再構築',
        asIs: 'as-is の B2C/B2B サービスを運用しながら、PC・MO のコアドメインを全面的に再構築する必要がある状況。as-is になかったセキュリティ要件が存在',
        approach:
          '航空（Topas 連携の予約・照会・決済フローを再設計）、ツアーパス（Klook 連携、探索・オプション選択・予約 UX の改善）、ホテル（検索・フィルター・詳細・予約の移行）、プロモーション・割引条件・クーポン（複雑な割引ルールを FE で安定して処理する構造）、B2B 予約・管理画面、認証（ログイン・セッション・権限）を再設計。暗号・復号モジュールを新規導入。移行期間中も as-is B2C PC/MO の運用・追加開発を並行',
        toBe: 'B2C・B2B の PC/MO コアドメインを次世代へ移行 · 移行期間中も as-is サービスの安定運用を維持',
      },
      {
        title: 'マルチテナント運用構造の設計',
        asIs: 'B2C 本サイト、機能基盤は同じで商品・一部カスタムのみが異なる BP 約150サイト、代理店ごとに画面・機能がすべて異なるフルカスタムの ONBP 約150サイト（増加中）を、すべて PC・MO で限られた人数が運用。APP は WebView ベースのため画面・機能は FE の領域だが、アプリのシェルは外部業者が管理しており、問題のたびに原因が WebView 側かアプリ側かの切り分けから必要',
        approach:
          'BP — ドメイン別の init 時にサイト情報を読み込み、API リクエストヘッダーにサイトコンテキストを注入するワンソース・マルチサイト。ONBP — Turborepo モノレポで共通コンポーネントの分離 + サイト別ビルドパイプラインによりカスタム領域と共通領域を隔離、ドメイン別 config でカスタム要素を体系化、yarn→pnpm へ移行',
        toBe: '`300以上` のサイトを単一コードベースで運用 · サイトが増えてもコードベース・運用コストが比例して増えない構造',
      },
      {
        title: 'コード構造の改善 — 共通化・FSD・FE Model',
        asIs: 'props drilling が深刻で同一コンポーネントがページごとに重複し、1回の修正で複数ファイルを繰り返し変更、デバッグも長期化。フィルター・予約・alert・popup のロジックが散在、文字列はハードコード。BE API 仕様の変更に FE が過度に依存',
        approach:
          'FSD アーキテクチャを導入。重複コンポーネントを次世代再構築と並行して段階的に共通化、散在ロジックを共通モジュールへ抽出、ハードコードを定数化。FE Model レイヤー + Mapper パターンで BE API Model への直接依存を排除',
        toBe: '同一修正 `4ファイル → 1ファイル` · BE 仕様変更の影響をドメイン単位に隔離 · 副作用・ヒューマンエラーの発生箇所を削減',
      },
      {
        title: 'UI システムの置き換え',
        asIs: '無理に適用された antd のグローバルスタイル競合により UI 崩れ・CSS アニメーションのカクつきが発生。react-print は大容量ページで印刷画面が数十秒遅延、react-date はバグが多発',
        approach:
          'antd を段階的に撤去して専用 UI ライブラリ（Core UI）を構築し、playground でコンポーネント単位の検証環境を用意。iframe ベースの印刷を自前実装し、react-day-picker へ置き換え',
        toBe: 'デザインの一貫性を確保し、スタイルの副作用を根本から解消 · 印刷遅延（数十秒）を解消 · 日付選択 UX を安定化',
      },
      {
        title: 'Next.js 12→15・状態管理の無停止移行',
        asIs: 'Next.js 12 + RTK Query・Redux ベース。稼働中の大規模サービスのため一括移行は不可能',
        approach:
          'ドメイン・ページ単位で段階的に移行（App Router・React 19 対応）。RTK Query→TanStack Query、Redux→Zustand を並行運用しながら移行。バージョンアップの過程で、残っていた Babel 設定が SWC のコンパイル経路を無効化していることを発見して撤去',
        toBe: 'サービスを止めずにメジャーバージョンアップ・状態管理移行を完了 · Babel 撤去でビルド・dev サーバー起動時間を短縮',
      },
      {
        title: 'デプロイパイプライン・ビルドの再設計',
        asIs: 'B2C 単一の8本のパイプライン体系で、ビルド〜デプロイに30分以上。動作せずにビルド時間だけを増やす設定、誤ったキャッシュ設定、不要なチェックステップ・重複した `yarn install`。Docker 内部ビルド（Yarn workspaces）',
        approach:
          '*（直接担当）* オーケストレーターパイプラインで B2C・BP・ONBP × 4環境の20本以上の体系に分離して選択デプロイを実現、standby パイプラインを新規構成。Turbo prune + ホスト側 pnpm/turbo ビルド + Docker パッケージングを分離し、buildx registry キャッシュを導入、Turborepo・Next のビルドキャッシュを正常化。Helm チャートの作成・高度化（topologySpreadConstraints、readinessProbe、CPU/メモリ HPA）、`kubectl rollout status` によるデプロイ検証。*（インフラチームと協業）* Azure AKS → Azure Local ARC 移行、active/standby failover による災害復旧、Akamai CDN、インフラセキュリティ、Pod 運用・モニタリング、サーバーログ分析',
        decision:
          '構築期のリリーストレイン・統合ブランチ方式が、オープン後の頻繁なホットフィックス・緊急デプロイに合わないと判断し、柔軟な手動デプロイ戦略への転換を提案・適用',
        toBe: 'ビルド〜デプロイ `30分以上 → 12〜15分`（約50〜60%短縮） · パイプライン `8本 → 20本以上` でサービス・環境単位の選択デプロイ',
      },
      {
        title: 'ページ読み込みの最適化',
        asIs: '不要な API の重複呼び出し・重複ローディング、繰り返し実行される useEffect',
        approach:
          'ページの性質に合わせて SSG/SSR を組み合わせ、TanStack Query のキャッシュを導入、不要な useEffect を整理',
        toBe: '最も遅かったページの読み込みを `約1/3` に短縮（Lighthouse モバイル基準）',
      },
      {
        title: 'テスト・品質体系',
        asIs: '共通コンポーネントの統合とメジャーバージョンアップを並行する中で、変更がどのサイトに影響するかを確認する手段がない。テスト自動化の専任者がおらず、QA が直接アクセスして手作業で確認する体制',
        approach:
          'Vitest 3 のマルチプロジェクト（ドメインパッケージ、B2C/ONBP 共通パッケージ）+ React Testing Library で HTTP クライアント・暗号/復号・決済/予約ユーティリティ・カスタムフックを検証し、パッケージ単位で選択実行。Playwright E2E を運用環境（legacy API）・dev 環境（FE Server/BFF）とシート・ドメイン（B2C・BP・ONBP PC/MO）単位でリモート実行 — 実 SSO 連携・BFF probe で実際の経路を検証し、実行・レポート用の Testbed UI を自作。Husky pre-commit（Biome + 変更に関連する Vitest）・pre-push（ビルド・型チェック・全テスト）。OpenAPI 仕様から Zod/TypeBox を生成',
        toBe: '共通化・バージョンアップによる回帰をコミット・プッシュ段階で遮断 · BE 仕様変更の FE 影響箇所をコンパイル時に露出',
      },
      {
        title: 'AI エージェントのコンテキスト・ハーネスエンジニアリング',
        asIs: 'モノレポの規模拡大に伴い、AI エージェントがレイヤー境界を越えたり規約を外れたコードを繰り返し生成 — 人がレビューで指摘する構造',
        approach:
          '*（コンテキスト）* ルートの AGENTS.md を単一ソースとし、Cursor・Claude・Gemini・Codex のエントリポイントを統一してツールごとにルール文書が分岐しないよう構成。パッケージ別の AGENTS.md で API 契約・ブラウザアダプター・HTTP 通信本体の役割と B2C↔ONBP の相互 import 禁止を作業パスごとに注入。人向けのガイドと Cursor Skill・path-scoped Rule を分離 — TS/TSX 編集時のみ #region・Named Export・Biome・イベント規則を注入し、レガシーの一括リファクタは対象外。*（検証ハーネス）* エージェントの成果物も人と同じ Husky の品質ゲート（Biome・変更関連の Vitest、ビルド・型チェック・全テスト）を通過しなければ反映されないよう構成。Playwright シナリオのメタデータから registry を自動生成して CLI/Testbed UI で実行し、失敗原因・修正オプション・再検証手順をドキュメント化して後続のエージェント作業へ連結',
        toBe: '生成時点（コンテキスト）とコミット・プッシュ時点（検証ハーネス）の2段階でアーキテクチャ違反・回帰を遮断 · 新規メンバーも構造を把握する前から境界内で作業',
      },
      {
        title: 'チームの作業基準の策定',
        asIs: 'ドキュメント・オンボーディングがなく、新規メンバーのプロジェクト把握が遅延',
        approach:
          'PL とともに FSD アーキテクチャ・FE Model+Mapper パターン・コンポーネント共通化基準・ブランチ・デプロイ規則を定義し文書化、ドキュメント自動化ツールを導入。PL 不在時はスケジュール調整・課題配分・技術的意思決定を代行',
        toBe: 'アーキテクチャ・作業基準をチーム共通のドキュメントとして確立 · ドキュメント自動化でプロジェクト構造・デプロイ規則を把握する経路を用意',
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
    ],
  },
  {
    projectId: 'visa-center',
    title: 'V社 海外ビザセンター Web サービス新規構築',
    company: 'YRISM株式会社',
    period: '2025.02 – 2025.03',
    role: 'フロントエンド開発',
    links: [],
    scopeTags: ['FE 単独'],
    overview:
      '中国・青島のビザセンター向けに、ビザ申請・案内の Web サービスを新規構築。Next.js 15 App Router・Zustand・TanStack Query による画面・API 連携、Tailwind CSS 4 のレスポンシブ UI、韓国語ページ構成、Azure へのデプロイ',
    techStack: ['Next.js 15', 'TypeScript', 'Zustand', 'TanStack Query', 'axios', 'Tailwind CSS 4', 'Azure'],
  },
  {
    projectId: 'commerce-backoffice',
    title: 'フィリピン コマース・配達プラットフォーム バックオフィス（自社サービス）',
    company: 'Pinetechsoft株式会社',
    period: '2024.02 – 2024.05',
    role: 'フロントエンド開発',
    links: [],
    scopeTags: ['Mall Admin 1人開発'],
    cases: [
      {
        title: 'Mall バックオフィスの新規構築',
        asIs: 'プラットフォームに商品販売（Mall）機能が追加され、管理用バックオフィスが必要',
        approach:
          '構造設計・共通コンポーネント・REST API 連携を単独で担当。Firebase Authentication による管理者ログイン、商品 CRUD・オプション自動生成（カンマ入力）・検索・詳細、カテゴリーの Drag & Drop・並び替え、イベント別の商品無限スクロール選択、配達料・レビュー（返信・非表示）・注文検索・処理、i18n',
        toBe: 'Mall バックオフィスを単独で構築',
      },
      {
        title: '配達料ポリシーの拡張（Food・Store）',
        asIs: '稼働中の Food・Store バックオフィスに配達料ポリシー（基本・距離別、店舗・顧客の負担割合）の機能追加要望',
        approach:
          '基本・距離別の配達料設定 UI と API 連携、店舗/顧客/一部店舗負担の複合ポリシー UI、react-hook-form + Zod のフォーム検証、既存の JWT デコード・暗号化認証フローとの連携、Food と分離した Store ドメインの要件を反映。Food Admin のバグ修正・機能補完も並行',
        toBe: 'Food・Store バックオフィスにサービス別の配達料ポリシーを反映',
      },
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Zustand',
      'Jotai',
      'TanStack Query',
      'MUI',
      'react-hook-form',
      'Zod',
      'Firebase',
      'AWS Amplify',
    ],
  },
  {
    projectId: 'vet-reservation',
    title: 'フィリピン 動物病院予約プラットフォーム（自社サービス）',
    company: 'Pinetechsoft株式会社',
    period: '2023.10 – 2024.02',
    role: 'フロントエンド開発',
    links: [],
    scopeTags: ['1人開発', 'Admin · 予約 Web App · 紹介サイト'],
    cases: [
      {
        title: 'オフライン予約のオンライン化',
        asIs: 'オフライン中心の動物病院予約',
        approach:
          '予約 Web App — 予約の作成・照会・取消、ペット最大10匹の管理、Web/iOS/Android の FCM プッシュ。病院向け Admin — 予約不可日カレンダー、予約確定/取消時のユーザープッシュ、ユーザー照会・検索、登録・退会状況ダッシュボード',
        toBe: '予約 Web App と病院 Admin を1人で構築し、オンライン予約へ移行',
      },
      {
        title: 'ログインシステムの全面刷新',
        asIs: 'メール・SNS アカウントの統合で要件が変わり、ログインプロセスの大幅な修正が必要となって副作用が多発',
        approach:
          'Firebase を活用し、FE 主導でログインシステムを全面刷新 — Firebase Email + Google/Facebook/Apple/Kakao の統合ログイン（NextAuth）',
        toBe: 'メール・SNS アカウントの統合ログイン体系へ移行',
      },
      {
        title: 'プッシュ誤送信の防止',
        asIs: '既存の FCM トークン管理構造では、誤ったユーザーにプッシュが送信され得る問題',
        approach: 'FCM トークンをデバイス単位で管理する構造へ改善',
        toBe: '誤ったユーザーへのプッシュ送信を防止',
      },
      {
        title: '紹介サイトのスライダー不具合',
        asIs: 'Swiper がビューポートのリサイズ時に画像を誤って表示する不具合',
        approach:
          'ライブラリを撤去し、fade in/out の切り替えを自前実装。モバイル・タブレット対応のレスポンシブ、Google Map による病院位置、お知らせ一覧・詳細',
        toBe: 'スライダー不具合を解消 · モバイル中心の紹介サイトを構築',
      },
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Jotai',
      'MUI',
      'Firebase',
      'NextAuth',
      'react-hook-form',
      'Yup',
      'AWS Amplify',
      'Vercel',
    ],
  },
  {
    projectId: 'patrol-app',
    title: '犬のパトロール活動 iOS アプリ',
    company: 'ER Solution株式会社',
    period: '2023.08',
    role: 'iOS 開発',
    links: [],
    scopeTags: ['1人開発'],
    overview:
      '既存のペット管理 Web App にリアルタイムのパトロール（散歩）機能を追加し、iOS ネイティブアプリへ移行。Naver Map によるリアルタイムの移動経路・時間・距離、撮影写真の位置マーカー、終了時の地図キャプチャ（パトロール日誌）',
    cases: [
      {
        title: '強制終了後のパトロール再開',
        asIs: 'アプリを強制終了してもパトロールを継続できるようにする要件が追加。経過時間はストップウォッチ方式で計算する構造',
        approach: 'プロジェクト構造を修正し、経過時間を（現在時刻 − 開始時刻 + 累積時間）で計算するよう変更',
        toBe: 'アプリ強制終了後も前回のパトロールを再開可能',
      },
    ],
    techStack: ['Swift', 'SwiftUI', 'Realm DB'],
  },
  {
    projectId: 'emission-dashboard',
    title: '大気汚染 排出量照会・可視化システム',
    company: 'ER Solution株式会社',
    period: '2023.06 – 2023.07',
    role: 'フルスタック開発',
    links: [],
    scopeTags: ['FE・BE・DB 単独'],
    overview:
      '道路・地域・時間単位で微細粒子状物質の排出量を照会・可視化するサービス。Recharts の統計・v-world-map の地図、照会・フィルター、Excel アップロード、Nest.js REST API・MariaDB スキーマ・Swagger、AWS EC2 + Docker + Nginx + PM2 でのデプロイ',
    cases: [
      {
        title: '大容量テーブルの照会性能',
        asIs: '1.4億件以上のテーブル照会に4〜6分かかる',
        approach: 'インデックス最適化と統計テーブル設計により、照会のボトルネックを構造的に解消',
        toBe: '照会 `4〜6分 → 5秒以内`（複雑な join でも10秒以内、`約50倍以上`）',
      },
      {
        title: 'チャートの再レンダリング問題',
        asIs: 'Recharts の再レンダリング時にアニメーションが繰り返される問題',
        approach: 'useMemo + React.memo で不要な再レンダリングを遮断',
        toBe: '再レンダリング時のアニメーション問題を解消',
      },
    ],
    techStack: [
      'React(Vite)',
      'Nest.js',
      'TypeScript',
      'MariaDB',
      'TanStack Query',
      'Recoil',
      'Docker',
      'AWS EC2',
      'Nginx',
    ],
  },
  {
    projectId: 'kiosk-app',
    title: 'E社 生コン入庫管理キオスクアプリ',
    company: 'ER Solution株式会社',
    period: '2023.05 – 2023.06',
    role: 'フロントエンド開発',
    links: [],
    scopeTags: ['1人開発'],
    overview:
      '生コン車両の運転手がキオスクで送り状を撮影すると入庫情報を案内する Android キオスクアプリを新規開発。外部 USB カメラ連携・送り状アップロード、入庫案内画面、一定時間無操作でメイン画面へ自動復帰、自動ログイン',
    cases: [
      {
        title: 'キオスクのレンダリング性能',
        asIs: 'React の再レンダリングによる性能低下',
        approach: 'useCallback + React.memo でレンダリングを最適化',
        toBe: '再レンダリングによる性能低下を解消',
      },
    ],
    techStack: ['React Native', 'TypeScript', 'Redux', 'TanStack Query'],
  },
  {
    projectId: 'eco-driving-cms',
    title: 'J市 市内バス エコドライブ管理 CMS',
    company: 'ER Solution株式会社',
    period: '2023.03 – 2023.04',
    role: 'フルスタック開発',
    links: [],
    scopeTags: ['FE・BE・DB 単独'],
    cases: [
      {
        title: 'エコドライブ指標管理システムの構築',
        asIs: 'バス運送会社の管理者が、運行データから急加速・急減速などのエコドライブ指標を確認できる CMS が必要',
        approach:
          '急加速・急減速・急な車線変更・急旋回の回数を Chart.js で可視化、管理者・運用者のロールベース権限と運送会社別のデータアクセス制御、複数バス・路線のマルチセレクト。Java Spring + eGovFrame REST API、MariaDB 設計、AWS EC2/RDS へのデプロイ',
        toBe: 'フロントエンド・バックエンド・DB・デプロイを単独で構築',
      },
    ],
    techStack: ['JSP', 'jQuery', 'Java', 'Spring', 'eGovFrame', 'MariaDB', 'Docker', 'AWS EC2/RDS'],
  },
  {
    projectId: 'distribution-platform',
    title: 'D社 B2B・B2C 流通 SCM・モバイルコマース',
    company: 'ER Solution株式会社',
    period: '2022.10 – 2023.06',
    role: 'フロントエンド開発',
    links: [],
    scopeTags: ['FE メイン', 'SCM 100% · コマース 60%'],
    overview:
      'サプライヤーが登録した商品を販売者が仕入れ、自社のモバイルコマースやオープンマーケット（スマートストア・Gマーケット・オークション）で販売する B2B・B2C 流通プラットフォーム。サプライヤー・販売者・管理者向けの SCM 管理画面と、販売者参加型モバイルコマース Web App のフロントエンドを開発。Atomic Design・Git Flow を導入',
    cases: [
      {
        title: 'ロール別の流通 SCM 管理画面の構築',
        asIs: 'サプライヤー・販売者・管理者が、商品・在庫・注文・精算をそれぞれ異なる権限と視点で扱う B2B 流通管理画面が必要',
        approach:
          'Coupang の販売者管理画面を参考に画面構成を設計。サプライヤー — 商品登録・在庫管理、特定の販売者にのみ供給する指定販売、割引率と販売者を決めて短期間に集中販売するディール（販売者が申請 → サプライヤーが選択）。販売者 — 販売提案価格・最高/最低価格・評価・年代別購入者比率を確認して仕入れる供給商品マーケット。共通 — 注文/配送・クレーム/精算・会員・商品状況のダッシュボード、売上・決済手段・商品・販売者別の統計と Excel ダウンロード、精算予定・支払履歴の照会。管理者 — 販売商品の強制終了・解除',
        toBe: '供給 → 仕入れ → 販売 → 精算へとつながる流通の流れを、ロール別の管理画面として実装',
      },
      {
        title: '販売者参加型モバイルコマース Web App',
        asIs: '一般ユーザーも販売者として参加し、仕入れた商品を宣伝・販売して手数料やリワードを得るモバイル専用コマースを、ネイティブアプリではなく WebView ベースの Web App で提供する必要',
        approach:
          'アプリで包む WebView 構成に合わせ、モバイル優先で全画面をパブリッシング — 個人・事業者販売者の登録分岐、ライブ配信タブ（チャット・クーポン・終了間近タイマー UI）、ひとり購入・みんなで購入のディールと共有リンクによる購入者募集ランキング・リワード、販売・動画レビュー・ディールのランキング、カート・注文/決済、キャッシュのチャージ・出金申請、販売者・購入者のマイページ。Editor.js による商品詳細登録、Intersection Observer + React Query の無限スクロール商品一覧',
        toBe: '販売者の参加 → ライブ販売 → 共同購入ディール → ランキングリワードへとつながるコマースの流れを、モバイル Web App の画面として実装',
      },
      {
        title: 'ネストしたポップアップの UX 改善',
        asIs: 'ポップアップが4〜5個ネストする企画',
        approach: 'ポップアップを1〜2個に減らし、詳細はページ遷移に変えるよう提案',
        toBe: 'ネストしたポップアップ `4〜5個 → 1〜2個`',
      },
      {
        title: '議事録による要件整理',
        asIs: '会議で合意した変更が企画書に反映されず、会議のたびに前回の議論を確認し直すことが繰り返された',
        approach:
          'デザイナー・企画者との会議内容を議事録として要約・共有し、確定していない企画は開発チームが要件を整理しながら企画段階から参加',
        toBe: '過去の議論を確認し直す時間を削減 · 空白になっていた企画を開発チーム主導で整理',
      },
    ],
    techStack: ['React(CRA)', 'JavaScript', 'Redux Toolkit', 'React Query', 'React Router', 'Nginx'],
  },
  {
    projectId: 'public-site-maintenance',
    title: 'I公社 公式サイト保守',
    company: 'ER Solution株式会社',
    period: '2022.09 – 2023.09',
    role: '保守',
    links: [],
    scopeTags: ['保守担当', '在職期間を通じて並行'],
    cases: [
      {
        title: 'Web アクセシビリティ認証・セキュリティ点検への対応',
        asIs: '公共機関として Web アクセシビリティ（WA）認証審査とペネトレーションテストへの対応が必要',
        approach:
          'Web アクセシビリティ基準への対応、ペネトレーションテスト結果に基づく脆弱性の修正・強化、JSP・Spring のレガシーページ構造の把握・改善。機能追加・修正・障害対応も並行',
        toBe: '`WA 認証取得` · セキュリティ脆弱性を解消',
      },
    ],
    techStack: ['JSP', 'jQuery', 'Java', 'Spring', 'eGovFrame', 'Oracle'],
  },
  {
    projectId: 'cms-site',
    title: 'S社 ユーザーサイト・管理者 CMS',
    company: 'ER Solution株式会社',
    period: '2022.07 – 2022.09',
    role: 'フルスタック開発',
    links: [],
    scopeTags: ['フルスタック'],
    overview:
      'ユーザーサイト（JSP）と管理者 CMS（React）を新規構築。DB・プロジェクト構造の設計、Q&A 掲示板（MVC）、CMS からユーザーサイトのメニューを DB ベースで動的に管理、Container-Presenter パターン・メニュー別の権限管理、Spring Boot REST API・MySQL、AWS EC2/RDS へのデプロイ',
    techStack: ['React', 'Redux', 'Material UI', 'JSP', 'jQuery', 'Java', 'Spring Boot', 'MySQL', 'AWS'],
  },
];
