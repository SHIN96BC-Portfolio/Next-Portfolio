export interface SiteGnb {
  id: number;
  name: string;
  path: string;
  icon?: string;
  children?: SiteGnb[];
}
