import { portfolioCareerEmployersKo, portfolioCareerProjectsKo } from './portfolio-career-projects.ko';
import { createPortfolioCareerSections } from './portfolio-career-sections.factory';

const CAREER_INTRO_BODY =
  '5년차 프론트엔드 개발자로, 레거시 서비스의 차세대 재구축과 End-to-End 신규 개발을 모두 수행해왔습니다. 대규모 리팩터링·성능 최적화·풀스택 대응에 강점이 있고, 전환을 안전하게 만드는 테스트·품질 체계와 AI 에이전트 컨텍스트·검증 하네스까지 직접 구축해왔습니다. 아래는 프로젝트별 주요 사례를 **AS-IS → TO-BE** 관점으로 정리한 내용입니다.';

const CAREER_STRENGTHS_BODY = `- **레거시 → 차세대 전환**을 무중단으로 수행하는 대규모 리팩터링 역량
- **성능 병목을 구조적으로 진단·해결**하는 최적화 역량 (50배 개선 사례)
- **FE 배포 파이프라인·Helm 차트를 직접 설계·구축**하는 배포·운영 역량
- **테스트·품질 게이트를 계층으로 설계**해 대규모 전환의 회귀를 차단하는 안정성 역량
- **AI 에이전트의 컨텍스트와 검증 하네스를 설계**해 아키텍처 경계를 지키게 하는 역량
- 프론트·백·모바일·인프라를 아우르며 기획부터 배포까지 **End-to-End로 완성**하는 풀스택 오너십`;

export const portfolioCareerSectionsKo = createPortfolioCareerSections({
  introTitle: '경력기술서 — 신병철 (프론트엔드 개발자)',
  introBody: CAREER_INTRO_BODY,
  strengthsTitle: '강점 요약',
  strengthsBody: CAREER_STRENGTHS_BODY,
  projects: portfolioCareerProjectsKo,
  employers: portfolioCareerEmployersKo,
});
