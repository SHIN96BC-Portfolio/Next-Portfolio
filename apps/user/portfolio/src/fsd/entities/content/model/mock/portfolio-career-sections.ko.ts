import { portfolioCareerProjectsKo } from '@FsdEntities/content/model/mock/portfolio-career-projects.ko';
import { createPortfolioCareerSections } from '@FsdEntities/content/model/mock/portfolio-career-sections.factory';

const CAREER_INTRO_BODY =
  '5년차 프론트엔드 개발자로, 레거시 서비스의 차세대 재구축과 End-to-End 신규 개발을 모두 수행해왔습니다. 대규모 리팩터링·성능 최적화·풀스택 대응에 강점이 있으며, 아래는 대표 프로젝트를 **문제 → 해결 → 성과** 관점으로 정리한 내용입니다.';

const CAREER_STRENGTHS_BODY = `- **레거시 → 차세대 전환**을 무중단으로 수행하는 대규모 리팩터링 역량
- **성능 병목을 구조적으로 진단·해결**하는 최적화 역량 (50배 개선 사례)
- **CI/CD 파이프라인·K8s 인프라 재설계**까지 다루는 배포·운영 역량
- 기획부터 배포까지 **End-to-End로 완성**하는 풀스택 오너십
- 프론트·백·모바일·인프라를 아우르는 넓은 기술 스펙트럼`;

export const portfolioCareerSectionsKo = createPortfolioCareerSections({
  introTitle: '경력기술서 — 신병철 (프론트엔드 개발자)',
  introBody: CAREER_INTRO_BODY,
  strengthsTitle: '강점 요약',
  strengthsBody: CAREER_STRENGTHS_BODY,
  projects: portfolioCareerProjectsKo,
});
