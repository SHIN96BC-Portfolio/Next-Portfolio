export interface GnbGetRes {
  id: number;
  name: string;
  path: string;
  icon?: string;
  children?: GnbGetRes[];
}
