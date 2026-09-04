import type { Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import type { PageKey } from '@FsdShared/config/routing/page-key';
import { PAGE_KEY } from '@FsdShared/config/routing/page-key';
import { useQuery } from '@tanstack/react-query';
import type { ContentMode } from '../model/types/content-mode';
import queryOptions from './queries';

/**
 * Find home/page sections
 */
export const useFindHomeSectionsQuery = (
  lang: Locale,
  pageKey: PageKey = PAGE_KEY.HOME,
  mode: ContentMode = 'published',
  lazy?: boolean
) =>
  useQuery({
    ...queryOptions.findHomeSections(pageKey, lang, mode),
    enabled: !lazy,
  });
