import { JSX } from 'react';

export interface RadialMenuType {
  key: number;
  value: string;
  colors: string;
  icon: string;
  content: string | JSX.Element;
  link?: string;
  iframeUrl?: string;
}
