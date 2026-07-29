import { CookieOptions } from '@Libs/cookie/cookie.types';
import CookieBaseJar from '@Libs/cookie/jar/abstract/CookieBaseJar';
import hmacSha256 from '@Libs/crypto/hmacSha256/hmac-sha-256.node';

/** 서명 쿠키 jar 개발 중 */
export default abstract class SignedPublicCookieJar extends CookieBaseJar {
  // 서버 전용 HMAC secret
  protected readonly signSecret: string;
  // 난독화용 AES 키
  private readonly obfuscationKey?: string;

  constructor(signSecret: string, obfuscationKey?: string) {
    super(obfuscationKey);
    this.signSecret = signSecret;
  }

  protected sign(value: string) {
    return hmacSha256(value, this.signSecret);
  }

  protected verify(enc: string, sig: string) {
    return this.sign(enc) === sig;
  }

  /** 서명 포함해서 쓰기 */
  setSigned(name: string, payload: string, options?: CookieOptions) {
    const enc = this.encrypt(payload); // 암호화/난독화 (옵션)
    const sig = this.sign(enc); // HMAC 서명
    this.set(name, `${enc}.${sig}`, options); // 여기서 this.set은 하위 클래스가 구현
  }

  /** 서명 검증 후 payload 복원 */
  getSigned(name: string): string | undefined {
    const raw = this.get(name); // 하위 클래스 get
    if (!raw) return undefined;

    const [enc, sig] = raw.split('.');
    if (!enc || !sig) return undefined;

    if (!this.verify(enc, sig)) {
      return undefined; // 위조된 쿠키
    }

    return this.decrypt(enc);
  }
}
