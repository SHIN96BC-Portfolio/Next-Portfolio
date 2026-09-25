import { portfolioCareerEmployersEn, portfolioCareerProjectsEn } from './portfolio-career-projects.en';
import { createPortfolioCareerSections } from './portfolio-career-sections.factory';

const CAREER_INTRO_BODY =
  'Frontend developer with 4+ years of experience, having delivered both next-generation rebuilds of legacy services and end-to-end greenfield development. Skilled in large-scale refactoring, performance optimization, and full-stack delivery, and hands-on with the testing systems and AI agent context and verification harness that make those migrations safe. Below are the key cases from each project, organized as **AS-IS → TO-BE**.';

const CAREER_STRENGTHS_BODY = `- **Zero-downtime legacy → next-gen migration** at scale
- **Structural diagnosis and resolution of performance bottlenecks** (including a 50× improvement case)
- **Designing and building FE deployment pipelines and Helm charts** first-hand
- **Layered testing and quality gates** that block regressions during large-scale migrations
- **Designing the context and verification harness that keep AI agents inside architectural boundaries**
- **End-to-end ownership** from planning through deployment, across frontend, backend, mobile, and infrastructure`;

export const portfolioCareerSectionsEn = createPortfolioCareerSections({
  introTitle: 'Resume — Byeongcheol Shin (Frontend Developer)',
  introBody: CAREER_INTRO_BODY,
  strengthsTitle: 'Key Strengths',
  strengthsBody: CAREER_STRENGTHS_BODY,
  projects: portfolioCareerProjectsEn,
  employers: portfolioCareerEmployersEn,
});
