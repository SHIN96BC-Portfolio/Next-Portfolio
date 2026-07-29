import Binding from '@Libs//service-container/binding/Binding';
import { BINDING_SCOPE, BindingScopeType } from '@Libs//service-container/service-constants';
import { Constructor } from '@Libs/service-container/service.type';

import getBindingId from './get-binding-id';
/**
 * Container Biding Class
 * 컨테이너 등록에 사용되는 클래스
 */
export default class BindingImpl<T> implements Binding<T> {
  /**
   * Container ID
   * 컨테이너 번호
   * @type {number}
   */
  public id: number;

  /**
   * Binding Name
   * 등록 이름
   * @type {symbol}
   */
  public readonly name: symbol;

  /**
   * Base Name
   * 사용할 베이스 이름
   * @type {symbol | undefined}
   */
  public baseName: symbol | undefined;

  /**
   * Instance Scope
   * @type {BindingScopeType}
   */
  public scope: BindingScopeType;

  /**
   * Build Flag
   * 빌드 여부
   * @type {boolean}
   * @private
   */
  private ready: boolean = false;

  /**
   * Use Instance Class
   * 사용할 클래스
   * @type {Constructor<T> | null}
   * @private
   */
  private Target: Constructor<T> | null = null;

  // private base: unknown;

  /**
   * Singleton Target Instance
   * 싱글톤 타겟 인스턴스
   * @type {T | null}
   * @private
   */
  private instance: T | null = null;

  constructor(name: symbol) {
    this.id = getBindingId();
    this.name = name;
    this.scope = BINDING_SCOPE.TRANSIENT;
    // this.Target = target;
  }

  /**
   * Get New Target Instance
   * 새로운 타겟 인스턴스 생성
   * @param base
   * @returns {T}
   * @private
   */
  private getNewInstance(base?: unknown): T {
    if (!this.ready) {
      throw new Error(`Binding is not build`);
    }

    if (this.Target) {
      if (base) {
        return new this.Target(base);
      }

      return new this.Target();
    }

    throw new Error(`Target ${this.name.toString()} not found`);
  }

  /**
   * Get Target Instance
   * 타겟 인스턴스 가져오기
   * @param base
   * @returns {T}
   */
  public getInstance(base?: unknown): T {
    if (this.scope === BINDING_SCOPE.SINGLETON) {
      if (!this.instance) {
        this.instance = this.getNewInstance(base);
      }

      return this.instance;
    }

    if (this.instance) {
      this.instance = null;
    }

    return this.getNewInstance(base);
  }

  /**
   * Set Instance Scope is Transient
   * @returns {this}
   */
  public inTransientScope(): this {
    this.scope = BINDING_SCOPE.TRANSIENT;

    return this;
  }

  /**
   * Set Instance Scope is Singleton
   * @returns {this}
   */
  public inSingletonScope(): this {
    this.scope = BINDING_SCOPE.SINGLETON;

    return this;
  }

  /**
   * Set Instance Scope is Request
   * @returns {this}
   */
  public inRequestScope(): this {
    this.scope = BINDING_SCOPE.REQUEST;

    return this;
  }

  /**
   * Set Target Class
   * 타겟 클래스 설정
   * @param {Constructor<T>} target
   * @returns {this}
   */
  public to(target: Constructor<T>): this {
    this.Target = target;

    return this;
  }

  /**
   * Set Target Class use Base Name
   * 타켓 클래스에 사용할 베이스 이름 설정
   * @param {symbol} name
   * @returns {this}
   */
  public base(name: symbol): this {
    this.baseName = name;

    return this;
  }

  /**
   * Binding Object Build
   * 바인딩 객체 빌드
   */
  public build(): void {
    this.ready = true;
    // if (this.Target) {
    //   this.instance = this.getNewInstance();
    // switch (this.scope) {
    //   case BINDING_SCOPE.SINGLETON:
    //     if (!this.instance) {
    //       this.instance = this.getNewInstance();
    //     }
    //     break;
    //   default:
    //     this.instance = this.getNewInstance();
    // }
    // }
  }
}
