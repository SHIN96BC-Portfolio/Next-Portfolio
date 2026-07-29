import { GnbGetRes } from '@FsdEntities/site/model/server';
import { PortfolioGetRes } from '@FsdEntities/site/model/server/portfolio';
import { CommonRes } from '@Libs/service-container';

export default interface SiteService {
  getGnb(): Promise<CommonRes<GnbGetRes[]>>;
  getPortfolio(): Promise<CommonRes<PortfolioGetRes[]>>;
}
