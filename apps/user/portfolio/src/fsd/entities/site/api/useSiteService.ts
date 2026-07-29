import queryOptions from '@FsdEntities/site/api/queries';
import { useQuery } from '@tanstack/react-query';

/**
 * Find Gnb
 * @param lazy
 */
export const useFindGnbQuery = (lazy?: boolean) =>
  useQuery({
    ...queryOptions.findGnb(),
    enabled: !lazy,
  });
