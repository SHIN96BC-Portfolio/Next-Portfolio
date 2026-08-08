import { ResumeProjectConfig } from '@FsdEntities/content/model/types';

export const portfolioCareerProjectsEn: ResumeProjectConfig[] = [
  {
    projectId: 'modetour-nextgen',
    orderLabel: '1',
    title: 'Modetour B2C/B2B Travel Platform Next-Gen Rebuild',
    company: 'YRISM',
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
      'Rebuild the next-generation frontend while keeping the live as-is service running. At handover, critical flows such as payment and back-navigation (routing) were unreliable due to severe bugs and instability. The codebase suffered from deep props drilling and poor reuse—identical components were duplicated across pages, forcing repeated edits across multiple files and long debugging cycles. A structure was also needed to operate 300+ BP/ONBP sites efficiently with a limited team.',
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
          '**Designed a one-source multi-site architecture** — load per-domain site metadata and inject site context into API headers to operate 300+ sites from a single codebase',
          '**Migrated to a Turborepo monorepo** — unified management of 300+ BP/ONBP domains, per-domain config separation, yarn→pnpm migration, and per-site build pipelines',
          '**Shared components + eliminated props drilling** — consolidated duplicated page-level components into shared modules, reducing change scope from 4 files to 1 per fix, shortening maintenance and debugging time, and reducing side effects and human error',
          '**Adopted FSD architecture** with FE Model + Mapper pattern to minimize impact from backend API changes',
        ],
      },
      {
        title: '3) Performance Optimization',
        items: [
          '**Page load optimization** — combined SSG/SSR as appropriate and used TanStack Query caching to remove redundant API calls and duplicate loading; cleaned up unnecessary useEffect re-runs. Cut load time on the slowest pages from ~15s to ~5s',
          '**Reduced build-to-deploy time** — diagnosed and removed pipeline inefficiencies, dead config that only increased build time, and misconfigured caches; applied Turborepo and Next.js build caches correctly; removed redundant check steps and duplicate `yarn install` runs. Improved build queues and caching to cut build-to-deploy from 30+ minutes to 12–15 minutes (~50–60% reduction)',
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
        title: '5) Team Productivity & Collaboration',
        items: [
          '**Standardized AI development workflows** — introduced Cursor Agent rules and Claude Code·Gemini CLI guides, documenting shared team practices and onboarding',
        ],
      },
    ],
    outcomes: [
      'Resolved critical payment and routing failures and **handled 300+ issues**, moving an unstable legacy system onto a stable footing',
      'Established operations and deployment for **300+ sites** on a **single codebase and monorepo**',
      '**Cut deployment time by ~50–60%** and significantly improved key page load times, boosting both developer productivity and user experience',
      'Completed major version upgrades and state-management migration **without service downtime**, balancing stability with a modern stack',
    ],
    extraSections: [
      {
        title: 'CI/CD & Infrastructure Redesign (with Infrastructure Team)',
        body: 'Contributed to a full redesign of deployment pipelines and infrastructure aligned with the next-gen transition.',
        items: [
          '**Redesigned pipeline structure** — split 8 B2C-only pipelines into 20+ pipelines across B2C·BP·ONBP × 4 environments (dev/stg/prd/stby); built a `pipeline-deploys.yml` orchestrator to deploy selected services and environments on demand',
          '**Improved build approach** — moved from in-Docker builds (Yarn workspaces) to Turbo prune + host pnpm/turbo build + Docker packaging; introduced buildx registry cache to shorten build times',
          '**Shifted deployment infrastructure** — migrated from Azure AKS to Azure Local ARC (Connected K8s) proxy model; added `kubectl rollout status`-based deployment verification for reliability',
          '**DR & failover** — introduced standby pipelines and an active/standby failover model for disaster recovery',
          '**Enhanced Helm charts** — applied topologySpreadConstraints (node spread), readinessProbe (`/api/health`), and CPU/memory-based HPA autoscaling',
          '**Deployment strategy decision** — moved from release-train and integration-branch flows during the rebuild to a flexible manual deployment strategy to support frequent hotfixes and urgent releases post-launch',
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
    title: 'Fine Dust Emissions Query & Visualization Service (UTEAS)',
    company: 'ER Solution',
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
      '**140M-row queries: 4–6 minutes → under 5 seconds (~50× improvement)**',
      'Delivered frontend, backend, and infrastructure solo, demonstrating end-to-end ownership',
    ],
    techStack: ['React(Vite)', 'Nest.js', 'TypeScript', 'MariaDB', 'TanStack Query', 'Docker', 'AWS EC2'],
  },
  {
    projectId: 'lhat',
    orderLabel: '3',
    title: 'Philippines Lhat Platform Back Office & Web Apps',
    company: 'Pinetechsoft',
    period: '2023.11 – 2024.05',
    role: 'Frontend Development',
    links: [],
    problem:
      'Built and operated back offices and consumer web apps across multiple domains (Mall·Food·Store·Veterinary).',
    workSections: [
      {
        title: 'Major Projects',
        items: [
          '**Lhat Mall Admin** — solo build from architecture through API integration for admin back office supporting new product sales. Firebase auth; product·option·category·event·order·review management; infinite-scroll event product picker; i18n',
          '**Lhat Food / Store Admin** — added base and distance-based delivery fee policies; react-hook-form + Zod validation; owner/customer cost-share UI',
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
    title: 'Diverse Platform & Public Sector Projects',
    company: 'ER Solution',
    period: '2022.07 – 2023.09',
    role: 'Full-Stack Development Engineer',
    links: [],
    problem: 'Primarily frontend-focused role spanning full-stack and mobile delivery.',
    workSections: [
      {
        title: 'Major Projects',
        items: [
          '**DdaPick / DdaPlace** — greenfield B2B·B2C distribution management web app and B2C mall. Joined from planning; solo frontend build; Editor.js product editor, infinite scroll, Atomic Design',
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
