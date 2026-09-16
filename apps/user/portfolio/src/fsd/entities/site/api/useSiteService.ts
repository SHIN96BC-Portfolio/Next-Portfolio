import { useQuery } from '@tanstack/react-query';
import queryOptions from './queries';

/**
 * Find Gnb
 * @param lazy
 */
export const useFindGnbQuery = (lazy?: boolean) =>
  useQuery({
    ...queryOptions.findGnb(),
    enabled: !lazy,
  });
