import { ContentLang } from '@FsdEntities/content/model/types';
import { GnbGetRes } from '@FsdEntities/site/model/server';
import { PortfolioGetRes } from '@FsdEntities/site/model/server/portfolio';
import { CommonRes } from '@core/service-container';

export default interface SiteService {
  getGnb(lang?: ContentLang): Promise<CommonRes<GnbGetRes[]>>;
  getPortfolio(): Promise<CommonRes<PortfolioGetRes[]>>;
}
