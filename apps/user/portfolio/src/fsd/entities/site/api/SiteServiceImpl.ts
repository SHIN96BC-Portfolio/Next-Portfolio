import SiteService from '@FsdEntities/site/api/SiteService';
import { GnbGetRes } from '@FsdEntities/site/model/server';
import { PortfolioGetRes } from '@FsdEntities/site/model/server/portfolio';
import { CommonRes, CommonServiceBase } from '@Libs/service-container';

class SiteServiceImpl implements SiteService {
  /**
   * API Service 객체(DIP 원칙에 따라 구현체가 아닌 Interface(CommonServiceBase)에만 의존
   * @type {CommonServiceBase}
   * @private
   */
  private readonly base: CommonServiceBase;

  /**
   * 생성자 주입 방식 사용
   * @param {CommonServiceBase} base
   */
  constructor(base: CommonServiceBase) {
    this.base = base;
  }

  /**
   * GNB 조회
   * @returns {Promise<CommonRes<GnbGetRes>>}
   */
  getGnb(): Promise<CommonRes<GnbGetRes[]>> {
    return this.base.http.get<CommonRes<GnbGetRes[]>>('/site/gnb');
  }

  /**
   * 포트폴리오 컨텐츠 조회
   * @returns {Promise<CommonRes<PortfolioGetRes>>}
   */
  getPortfolio(): Promise<CommonRes<PortfolioGetRes[]>> {
    return this.base.http.get<CommonRes<PortfolioGetRes[]>>('/site/portfolio');
  }
}

export default SiteServiceImpl;
