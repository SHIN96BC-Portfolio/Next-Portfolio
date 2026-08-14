import queryOptions from '@FsdEntities/content/api/queries';
import type { ContentLang } from '@FsdEntities/content/model/types/content-lang';
import type { ContentMode } from '@FsdEntities/content/model/types/content-mode';
import type { PageKey } from '@FsdShared/config/routing/page-key';
import { PAGE_KEY } from '@FsdShared/config/routing/page-key';
import { useQuery } from '@tanstack/react-query';

/**
 * Find home/page sections
 */
export const useFindHomeSectionsQuery = (
  lang: ContentLang,
  pageKey: PageKey = PAGE_KEY.HOME,
  mode: ContentMode = 'published',
  lazy?: boolean
) =>
  useQuery({
    ...queryOptions.findHomeSections(pageKey, lang, mode),
    enabled: !lazy,
  });
