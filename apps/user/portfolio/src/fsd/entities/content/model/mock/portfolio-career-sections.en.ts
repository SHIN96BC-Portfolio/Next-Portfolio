import { portfolioCareerProjectsEn } from '@FsdEntities/content/model/mock/portfolio-career-projects.en';
import { createPortfolioCareerSections } from '@FsdEntities/content/model/mock/portfolio-career-sections.factory';

const CAREER_INTRO_BODY =
  'Frontend developer with 5 years of experience, having delivered both next-generation rebuilds of legacy services and end-to-end greenfield development. Skilled in large-scale refactoring, performance optimization, and full-stack delivery. Below is a summary of representative projects organized around **problem → solution → outcome**.';

const CAREER_STRENGTHS_BODY = `- **Zero-downtime legacy → next-gen migration** at scale
- **Structural diagnosis and resolution of performance bottlenecks** (including a 50× improvement case)
- **CI/CD pipeline and Kubernetes infrastructure redesign** for deployment and operations
- **End-to-end ownership** from planning through deployment
- Broad technical range across frontend, backend, mobile, and infrastructure`;

export const portfolioCareerSectionsEn = createPortfolioCareerSections({
  introTitle: 'Resume — Byeongcheol Shin (Frontend Developer)',
  introBody: CAREER_INTRO_BODY,
  strengthsTitle: 'Key Strengths',
  strengthsBody: CAREER_STRENGTHS_BODY,
  projects: portfolioCareerProjectsEn,
});
