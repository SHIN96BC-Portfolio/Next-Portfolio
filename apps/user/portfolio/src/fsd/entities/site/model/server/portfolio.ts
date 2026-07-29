export interface PortfolioGetRes {
  id: number;
  title: string;
  summary: string;
  content: string; // markdown
  thumbnailUrl?: string;
  tags: string[];
  startDate: string;
  endDate?: string;
  links?: PortfolioLinkRes[];
}

export interface PortfolioLinkRes {
  type: 'github' | 'demo' | 'blog' | 'other';
  url: string;
  label?: string;
}
