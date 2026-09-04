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
      body: `I am a web developer with 5 years of experience, specializing in **Next.js-based frontend development**.

I have built and operated web services across SI, startups, travel/aviation, and B2C/B2B platforms, with hands-on experience in **Java API development**, **AWS/Azure infrastructure design and deployment**, and **CI/CD automation**.

I have delivered greenfield products from scratch and modernized legacy systems, with full-stack capability to ship products end-to-end.

I believe being a developer is not just about implementing features. True skill means optimizing user experience, anticipating and preventing problems as services grow, and voluntarily tackling work beyond pure development when needed.

I collaborate actively with planning, design, CS, and other roles because I believe better outcomes come from working together.

In the AI era, I believe what matters more than how much code you write is **how accurately you define problems and create value quickly through AI**. Understanding overall service architecture, business flows, and the essence of problems is essential—and I keep building habits of deep analysis, early risk identification, and asking the right questions.`,
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

· **Full-stack & infrastructure** — Frontend-first, spanning Java/Spring·Nest.js backends through CI/CD pipelines and K8s infrastructure redesign across deployment and operations

· **End-to-end from planning to deployment** — Planning, architecture, DB design, frontend/backend development, and deployment automation—delivering complete products with small teams

## Key Achievements

· **Unified 300+ BP/ONBP sites into a single Turborepo monorepo** — Designed one-source multi-site architecture to operate and deploy 300+ sites from one codebase (yarn→pnpm migration, per-site build pipelines)

· **Stabilized legacy services plagued by critical payment & routing bugs** — Resolved 300+ issues including payment failures and abnormal routing, significantly improving service reliability

· **140M-row table queries: 4–6 min → under 5 sec (~50×+ improvement)** — Eliminated query bottlenecks with index and statistics table design

· **CI/CD pipeline & K8s infrastructure redesign** — Reorganized multi-service (B2C·BP·ONBP) deployment pipelines by service and environment; contributed to Azure Local ARC migration and DR failover. Build-to-deploy 30+ min → 12–15 min; page load up to 15 sec → 5 sec (SSG/SSR mix, caching, useEffect cleanup)

· **Led Next.js 12→15 major upgrade** — Incremental migration including App Router and React 19 with zero service interruption

· **Established AI development workflow as team standard** — Introduced Cursor Agent rules and Claude Code·Gemini CLI guides, documenting shared team practices and onboarding`,
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
          department: 'Development Team',
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
          department: 'Development Team 3',
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
