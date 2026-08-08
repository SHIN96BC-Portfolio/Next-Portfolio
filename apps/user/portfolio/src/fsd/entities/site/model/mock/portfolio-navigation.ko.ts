import { SiteGnb } from '@FsdEntities/site/model/client/gnb';

/** CMS navigation_menu(ko) 와 동일한 구조 — API 미연동 시 fallback */
export const portfolioNavigationKo: SiteGnb[] = [
  {
    id: 1,
    name: '홈',
    path: '/',
  },
  {
    id: 2,
    name: '경력기술서',
    path: '/resume',
  },
];
