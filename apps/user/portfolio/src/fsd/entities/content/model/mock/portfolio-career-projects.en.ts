import { ResumeProjectConfig } from '../types';

export const portfolioCareerProjectsEn: ResumeProjectConfig[] = [
  {
    projectId: 'modetour-nextgen',
    orderLabel: '1',
    title: 'Modetour B2C/B2B Travel Platform Next-Gen Rebuild',
    company: '(주) YRISM',
    period: '2024.08 – Present',
    role: 'Frontend Development',
    links: [
      { label: 'modetour.com', url: 'https://www.modetour.com' },
      { label: 'elpis.modetour.co.kr', url: 'https://elpis.modetour.co.kr' },
      { label: 'go.modetour.co.kr', url: 'https://go.modetour.co.kr' },
      { label: 'gentlemonster.modetour.com', url: 'https://gentlemonster.modetour.com' },
      { label: 'homeplus1.modetour.co.kr', url: 'https://homeplus1.modetour.co.kr' },
    ],
    problem:
      'Rebuild the next-generation frontend while keeping the live as-is service running. At handover, critical flows such as payment and back-navigation (routing) were unreliable due to severe bugs and instability. The codebase suffered from deep props drilling and poor reuse—identical components were duplicated across pages, forcing repeated edits across multiple files and long debugging cycles. The operating surface was not one kind of site either: the B2C site itself; ~150 BP sites that share the B2C functional base and differ only in products offered and some customization; and ~150 fully custom ONBP sites (still growing) where agencies dictate entirely different screens and features. All three kinds had to be maintained for PC and mobile web alike. The apps are WebView wrappers, so their screens and behavior fall inside the frontend scope while the app shell is managed by an external vendor — every incident started with working out whether the cause sat in the WebView or the shell. Operating all of it the same way with a limited team was not viable. With component consolidation and a major version upgrade running in parallel, there was also no way to tell which sites a given change would affect. And as the team started using AI coding tools, generated code that did not understand the structure increasingly crossed layer boundaries.',
    workSections: [
      {
        title: '1) Service Stabilization (Legacy Bug Fixes)',
        items: [
          'Resolved **300+ issues** including critical bugs (payment failures, abnormal routing) and new feature work, restoring the service to a stable state',
          'Diagnosed and fixed core flows one by one to restore service reliability',
        ],
      },
      {
        title: '2) Architecture & Structural Improvements',
        items: [
          '**Designed a one-source multi-site architecture** — load per-domain site metadata and inject site context into API headers, operating the ~150 BP sites that share a functional base with B2C from a single codebase',
          '**Migrated to a Turborepo monorepo** — unified management of ~150 ONBP sites (still growing) whose customization scope is unpredictable, via shared-component extraction plus per-site build pipelines, with per-domain config separation and a yarn→pnpm migration',
          '**Shared components + eliminated props drilling** — consolidated duplicated page-level components into shared modules, reducing change scope from 4 files to 1 per fix, shortening maintenance and debugging time, and reducing side effects and human error',
          '**Adopted FSD architecture** with FE Model + Mapper pattern to minimize impact from backend API changes',
        ],
      },
      {
        title: '3) Performance Optimization',
        items: [
          '**Page load optimization** — combined SSG/SSR as appropriate and used TanStack Query caching to remove redundant API calls and duplicate loading; cleaned up unnecessary useEffect re-runs. Cut load time on the slowest pages to about one-third (Lighthouse mobile)',
          '**Reduced build-to-deploy time** — diagnosed and removed pipeline inefficiencies and dead config that only increased build time; during the Next.js 12→15 upgrade, found that a leftover Babel config was disabling the SWC compile path and removed it, cutting build and dev server startup time; fixed misconfigured caches; applied Turborepo and Next.js build caches correctly; removed redundant check steps and duplicate `yarn install` runs. Improved build queues and caching to cut build-to-deploy from 30+ minutes to 12–15 minutes (~50–60% reduction)',
        ],
      },
      {
        title: '4) UI & Technical Debt Reduction',
        items: [
          '**Built an in-house UI library** — gradually removed antd to fix CSS animation jank and built a Modetour-specific UI library; replaced problematic libraries such as react-print and react-date with custom implementations',
          '**Next.js 12→15 major upgrade** — performed incremental, zero-downtime migration including App Router and React 19 support',
          'Zero-downtime migration from RTK Query→TanStack Query and Redux→Zustand; consolidated duplicated page logic; externalized hard-coded constants',
        ],
      },
      {
        title: '5) Testing & Quality System',
        items: [
          '**Unit & integration** — Vitest 3 multi-project setup (the domain package and the B2C/ONBP shared packages) with React Testing Library covering business logic: the HTTP client, encryption/decryption, payment and booking utilities, and custom hooks. Test projects are split per package so only the affected scope needs to run',
          '**E2E** — Playwright in a dedicated test workspace runs scenarios against remotely deployed environments, split by sheet and domain (B2C·BP·ONBP PC/MO) across production (legacy API) and the dev environment (FE Server/BFF). Real SSO integration and BFF probes verify actual auth and response paths rather than mocks, and I built a metadata-driven Testbed UI for execution and reporting that the team now uses',
          '**Quality gates** — Husky enforces Biome plus Vitest on changed files at pre-commit, and build, typecheck, and the full test run at pre-push',
          '**API contracts** — Zod/TypeBox generated from the OpenAPI spec links type checking and runtime validation to one source, surfacing the frontend impact of backend spec changes at compile time',
          'Next steps: a CI test gate and broader page-level test coverage',
        ],
      },
      {
        title: '6) AI Development System — Agent Context Engineering',
        items: [
          'As the monorepo grew, AI coding agents repeatedly produced code that crossed layer boundaries or ignored conventions. Rather than adding more tools, I chose to **design the context the agents read**',
          '**Single source of context** — a root AGENTS.md as the single source, with Cursor, Claude, Gemini, and Codex entry points aligned to it so different tools follow the same boundaries and conventions, preventing rule documents from forking per tool and drifting apart',
          '**Injecting package boundaries** — per-package AGENTS.md files inject the roles of the API contract package (definitions only), the browser adapter, and the HTTP core, plus the B2C ↔ ONBP cross-import ban, scoped to the working path. Architecture violations that people used to catch in review are blocked at generation time',
          '**Convention guardrails** — human-facing convention guides kept separate from agent-facing Cursor Skills and path-scoped Rules. #region structure, Named Export, Biome, and event rules are injected only when editing TS/TSX to reduce wasted context, and bulk legacy refactors are explicitly excluded to prevent unintended large-scale changes',
          '**E2E feedback loop** — Metadata on Playwright scenarios auto-generates a registry, supporting both CLI and Testbed UI execution per sheet (legacy/fe-server) and domain. Failure causes, fix options, and re-verification steps are written up so a follow-up agent can pick them up',
          "**Onboarding** — documented the whole system as the team's shared way of working, so new members can work inside the boundaries before they have learned the project structure",
        ],
      },
      {
        title: '7) Team Productivity & Collaboration',
        items: [
          'On a team that started the next-gen rebuild with 3 frontend engineers and now numbers 5, I designed the architecture and working standards together with the PL, and stand in for the lead on scheduling, issue distribution, and technical decisions when they are absent',
          '**Established technical standards** — defined and documented FSD architecture, the FE Model + Mapper pattern, component consolidation criteria, and branch/deployment rules',
          '**Judgment call on deployment strategy** — concluded that the build-phase release train and integration-branch model no longer fit the frequent hotfixes and emergency deploys that followed launch, and proposed and applied a more flexible manual deployment strategy',
        ],
      },
    ],
    outcomes: [
      'Took a service whose core flows (payment, routing) did not work at handover and **brought it to an operable state after resolving 300+ issues**',
      'Kept the site count growing past 300 **without that growth translating into a larger codebase or operating cost**',
      '**Cut deployment time by ~50–60%**; key page load times down to about one-third (Lighthouse mobile)',
      'Completed major version upgrades and state-management migration **without service downtime**, balancing stability with a modern stack',
    ],
    extraSections: [
      {
        title: 'CI/CD & Infrastructure Redesign',
        body: 'Redesigned the deployment pipeline and infrastructure alongside the next-gen migration. Owned FE deployment pipelines and Helm; partnered with the infrastructure team on CDN, security, and cluster operations.',
        items: [
          '**Hands-on** — designed and built FE deployment pipelines (an orchestrator pipeline splitting a single 8-pipeline B2C setup into 20+ pipelines across B2C·BP·ONBP × 4 environments, with selective per-service and per-environment deploys), authored and hardened Helm charts (topologySpreadConstraints, readinessProbe, CPU/memory-based HPA), deployment verification via `kubectl rollout status`, and a new standby pipeline',
          '**Build process improvements** — moved from in-Docker builds (Yarn workspaces) to a split structure of Turbo prune + host-side pnpm/turbo build + Docker packaging, and introduced a buildx registry cache',
          '**With infrastructure team** — Azure AKS → Azure Local ARC (Connected K8s) migration, active/standby failover for disaster recovery, Akamai CDN, infrastructure security, Pod operations and monitoring, server log analysis',
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
    title: 'Fine Dust Emissions Query & Visualization Service (UTEAS)',
    company: '(주) ER Solution',
    period: '2023.06 – 2023.07',
    role: 'Full-Stack Development (Solo FE·BE·DB)',
    links: [],
    problem:
      'Greenfield development of an environmental monitoring service to query and visualize fine dust emissions by road, region, and time. **Queries against tables with 140M+ rows** took 4–6 minutes, creating a severe performance bottleneck.',
    workSections: [
      {
        title: 'Key Contributions',
        items: [
          'Owned FE·BE·DB design end to end',
          '**Index optimization and aggregate table design** to structurally resolve large-scale query bottlenecks',
          'Implemented Recharts analytics, v-world-map visualization, and Excel upload',
          'Designed Nest.js APIs and MariaDB schema; deployed on AWS EC2',
        ],
      },
    ],
    outcomes: [
      '**140M-row queries: 4–6 minutes → under 5 seconds (under 10 seconds for complex joins, ~50× improvement)**',
      'Delivered frontend, backend, and infrastructure solo, demonstrating end-to-end ownership',
    ],
    techStack: ['React(Vite)', 'Nest.js', 'TypeScript', 'MariaDB', 'TanStack Query', 'Docker', 'AWS EC2'],
  },
  {
    projectId: 'lhat',
    orderLabel: '3',
    title: 'Philippines Lahat Platform Back Office & Web Apps',
    company: '(주) Pinetechsoft',
    period: '2023.10 – 2024.05',
    role: 'Frontend Development',
    links: [],
    problem:
      'Built and operated back offices and consumer web apps across multiple domains (Mall·Food·Store·Veterinary).',
    workSections: [
      {
        title: 'Major Projects',
        items: [
          '**Lahat Mall Admin** — solo build from architecture through API integration for admin back office supporting new product sales. Firebase auth; product·option·category·event·order·review management; infinite-scroll event product picker; i18n',
          '**Lahat Food / Store Admin** — added base and distance-based delivery fee policies; react-hook-form + Zod validation; owner/customer cost-share UI',
          '**Zootopia (Veterinary)** — built reservation admin and online booking web app. Create·view·cancel reservations; manage up to 10 pets; Email·SNS login via NextAuth; FCM push notifications; marketing site',
        ],
      },
    ],
    outcomes: [
      'Completed multiple services with **solo ownership** from design through deployment',
      'Gained back-office and web app experience across auth, payments, notifications, and other core domains',
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
    title: 'ER Solution — Other Platform & Public Sector Projects',
    company: '(주) ER Solution',
    period: '2022.07 – 2023.09',
    role: 'Full-Stack Development Engineer',
    links: [],
    problem: 'Primarily frontend-focused role spanning full-stack and mobile delivery.',
    workSections: [
      {
        title: 'Major Projects',
        items: [
          '**Dada Pick / Dada Place** — greenfield B2B·B2C distribution management web app and B2C mall. Joined from planning; solo frontend build; Editor.js product editor, infinite scroll, Atomic Design',
          '**Jeonju Economic Driving CMS** — city bus economic driving metrics admin. Role-based access; Chart.js operations dashboards; Spring + eGovFrame API and MariaDB design with AWS deployment (full-stack)',
          '**Eugene Ready-Mix Receiving** — Android kiosk app for invoice capture. External camera integration, kiosk UX, React rendering optimization',
          '**Pet Patrol** — real-time walk-tracking iOS native app (Swift/SwiftUI) with Naver Map live route and distance display',
          '**Incheon Port Security Corporation** — official site maintenance; web accessibility (WA) certification support and pass; penetration-test vulnerability remediation',
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
