import { I18N_LOCALE } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { HomeSectionGetRes, PAGE_KEY, SECTION_TYPE } from '..';
import { getPortfolioProjectsMock } from './portfolio-projects.mock';
import { portfolioSkillsMock } from './portfolio-skills.mock';

export const portfolioHomeSectionsEn: HomeSectionGetRes[] = [
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
      name: 'Byeongcheol Shin',
      title: 'Frontend Developer · 5 Years',
      tagline: 'A developer who keeps asking questions to find better directions',
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
      body: `Frontend developer with 5 years of experience, specializing in **Next.js-based web services**. I have delivered both greenfield builds and legacy-to-next-gen migrations across SI, startups, and travel platforms.

Currently at Modetour's B2C/B2B platform, running as-is operations alongside a full next-gen rebuild. I designed and implemented the **multi-tenant architecture** that operates ~300 BP/ONBP sites from a single Turborepo monorepo, completed the Next.js 12→15 major upgrade and state management migration with zero downtime, and personally built everything from the **FE deployment pipeline and Helm charts** to the **context system that keeps AI coding agents inside the monorepo's architectural boundaries** — now the team standard.

Frontend-first, but equally comfortable with Java/Spring and Nest.js backends, DB design, and AWS/Azure infrastructure, delivering products end-to-end. My strength is **finding and removing structural bottlenecks**, not just shipping features.`,
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
      body: `## Core Strengths

· **Large-scale refactoring & architecture migration** — Experience rebuilding legacy services into next-gen structures with zero downtime (Next.js major upgrades, monorepo migration, state management migration)

· **Performance optimization** — Structurally diagnosing large-data query and rendering bottlenecks, improving by orders of magnitude

· **Full-stack & infrastructure** — Frontend-first, spanning Java/Spring·Nest.js backends through FE deployment pipelines and Helm chart design across deployment and operations

· **End-to-end from planning to deployment** — Planning, architecture, DB design, frontend/backend development, and deployment automation—delivering complete products with small teams

## Key Achievements

· **Unified 300+ multi-tenant sites into a single monorepo** — Operate and deploy ~150 shared-base BP sites plus ~150 fully custom ONBP sites per agency (still growing) from a single Turborepo codebase

· **Stabilized legacy services plagued by critical payment & routing bugs** — Resolved 300+ issues including payment failures and abnormal routing, significantly improving service reliability

· **140M-row table queries: 4–6 min → under 5 sec (~50×+ improvement)** — Eliminated query bottlenecks with index and statistics table design

· **Designed and built the FE deployment pipeline and Helm charts** — Restructured into 20+ pipelines across multi-service (B2C·BP·ONBP) × 4 environments; advanced Helm configuration (HPA, readinessProbe, node distribution). Azure Local ARC migration and DR failover done in collaboration with the infrastructure team. Build-to-deploy 30+ min → 12–15 min

· **Cut key page load times to about one-third** — SSG/SSR mix, TanStack Query caching, and removal of unnecessary useEffect calls (Lighthouse mobile)

· **Led Next.js 12→15 major upgrade** — Incremental migration including App Router and React 19 with zero service interruption

· **Built the testing and quality system** — Vitest unit and integration tests plus Playwright E2E against remotely deployed environments, with a purpose-built Testbed for execution and reporting. Husky quality gates block regressions during component consolidation and major version upgrades

· **Built a context system for AI coding agents** — Encoded monorepo architectural boundaries (API contract / adapter / HTTP layer separation, B2C↔ONBP isolation) into AGENTS.md and path-scoped Rules so agents cannot cross layers. Standardized as shared context across Cursor, Claude, Gemini, and Codex, with a loop that feeds E2E failures back into follow-up work`,
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
      companies: getPortfolioProjectsMock(I18N_LOCALE.EN),
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
          company: 'YRISM Inc.',
          period: '2024.08 – Present',
          location: 'South Korea',
          department: 'Web Development Team',
          position: 'Manager',
          role: 'Frontend Developer',
          description: 'Next-gen Modetour service development and operations',
          isDevRole: true,
        },
        {
          id: 'career-pinetechsoft',
          company: 'Pinetechsoft Inc.',
          period: '2023.10 – 2024.05',
          location: 'South Korea',
          department: 'Development Team 1',
          position: 'Research Engineer',
          role: 'Frontend Developer',
          description: 'In-house platform services (Lahat, Zootopia) development',
          isDevRole: true,
        },
        {
          id: 'career-er',
          company: 'ER Solution Inc.',
          period: '2022.07 – 2023.09',
          location: 'South Korea',
          department: 'Development Team 1',
          position: 'Research Engineer',
          role: 'Full Stack Developer',
          description: 'Web application SI development (frontend & backend)',
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
        { name: 'Engineer Information Processing', date: '2024.09.10' },
        { name: 'Associate Information Processing', date: '2021.11.26' },
        { name: 'JLPT N1', date: '2021.01.13' },
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
          school: 'Korea National Open University',
          period: 'Sep 2023 – Enrolled',
          location: 'South Korea',
          details: ['Computer Science', 'Junior transfer (3rd year)'],
        },
        {
          school: 'Korea Software Human Resource Development',
          period: 'Nov 2021 – Apr 2022',
          location: 'South Korea',
          details: ['Java full-stack bootcamp (6 months)', 'Team lead on all projects', 'Excellence awards'],
        },
        {
          school: 'TOHO GAKUEN Media Training College',
          period: 'Apr 2019 – Mar 2021',
          location: 'Japan',
          details: ['Broadcast Audio Department', 'Academic excellence scholarship'],
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
      message: 'Open to project collaboration and hiring inquiries.',
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
