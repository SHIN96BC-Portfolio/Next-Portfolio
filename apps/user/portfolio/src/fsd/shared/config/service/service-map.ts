import type ContentService from '@FsdEntities/content/api/ContentService';
import type SiteService from '@FsdEntities/site/api/SiteService';

export const SERVICE_KEY = {
  SITE: 'site',
  CONTENT: 'content',
} as const;

export type AppServiceMap = {
  [SERVICE_KEY.SITE]: SiteService;
  [SERVICE_KEY.CONTENT]: ContentService;
};
