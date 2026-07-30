import { getPortfolioProjectsMock } from '@FsdEntities/content/model/mock/portfolio-projects.mock';
import { portfolioSkillsMock } from '@FsdEntities/content/model/mock/portfolio-skills.mock';
import { CONTENT_LANG, HomeSectionRes, PAGE_KEY, SECTION_TYPE } from '@FsdEntities/content/model/types';

export const portfolioHomeSectionsEn: HomeSectionRes[] = [
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

I have built and operated web services across SI, startups, travel/aviation, and B2C/B2B platforms, with hands-on experience in **Java API development**, **AWS/Azure infrastructure**, and **CI/CD automation**.

I have delivered greenfield products and modernized legacy systems, with full-stack capability to ship end-to-end.

I improve quality through code review, test automation, and design validation, and actively use **AI-assisted workflows** to balance accuracy and productivity.`,
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
      body: `I am a developer who **keeps asking questions to find better directions**.

Across SI, startups, and platform companies, I have worked on planning, architecture, DB design, frontend/backend development, and deployment automation—maximizing business value with small teams.

I believe developers should optimize user experience, anticipate risks, and solve problems beyond coding when needed.

I collaborate actively with planning, design, and CS teams because better outcomes come from working together.

In the AI era, I focus on **defining problems accurately and delivering value quickly with AI**, not just writing more code.`,
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
      companies: getPortfolioProjectsMock(CONTENT_LANG.EN),
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
          period: 'Aug 2024 – Present',
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
          period: 'Oct 2023 – May 2024 (8 months)',
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
          period: 'Jul 2022 – Sep 2023 (1 yr 3 mo)',
          location: 'South Korea',
          department: 'Development Team 1',
          position: 'Research Engineer',
          role: 'Full Stack Developer',
          description: 'Web application SI development (frontend & backend)',
          isDevRole: true,
        },
        {
          id: 'career-education-prep',
          company: 'Korea Software Human Resource Development',
          period: 'Nov 2021 – Apr 2022',
          location: 'South Korea',
          department: 'Java Full Stack Program',
          position: 'Graduate',
          role: 'Developer Trainee',
          description: '6-month Java full-stack bootcamp — career transition to developer',
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
