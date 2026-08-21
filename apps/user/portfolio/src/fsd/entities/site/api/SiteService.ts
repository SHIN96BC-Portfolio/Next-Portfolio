import { CommonRes } from '@core/service-container';
import { GnbGetReq, GnbGetRes } from '../model/server';
import { PortfolioGetRes } from '../model/server/portfolio';

export default interface SiteService {
  getGnb(params?: GnbGetReq): Promise<CommonRes<GnbGetRes[]>>;
  getPortfolio(): Promise<CommonRes<PortfolioGetRes[]>>;
}
