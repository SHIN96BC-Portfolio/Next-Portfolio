import CryptoJS from 'crypto-js';

/**
 * 문자열 또는 객체를 문자열로 직렬화합니다.
 */
function toStringData(input: string | Record<string, unknown>): string {
  if (typeof input === 'string') return input;
  return JSON.stringify(input);
}

/**
 * AES 키를 파싱합니다.
 * @param key 암호화 키 문자열
 * @param encoding 'utf8' | 'base64'
 */
function parseKey(key: string, encoding: 'utf8' | 'base64') {
  return encoding === 'utf8' ? CryptoJS.enc.Utf8.parse(key) : CryptoJS.enc.Base64.parse(key);
}

/**
 * Base64(Base64URL 포함) → WordArray 디코딩
 */
function base64OrUrlToWordArray(data: string) {
  const fixed = data.replace(/-/g, '+').replace(/_/g, '/');
  return CryptoJS.enc.Base64.parse(fixed);
}

/**
 * WordArray → Base64 문자열
 */
function wordArrayToBase64(wa: CryptoJS.lib.WordArray) {
  return CryptoJS.enc.Base64.stringify(wa);
}

/**
 * SHA-256 해시(Base64)
 */
export function sha256Base64(data: string): string {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Base64);
}

/**
 * SHA-512 해시(Base64)
 */
export function sha512Base64(data: string): string {
  return CryptoJS.SHA512(data).toString(CryptoJS.enc.Base64);
}

export type AesEncryptOptions = {
  /**
   * 키 인코딩 방식. 기본값 'utf8'
   */
  keyEncoding?: 'utf8' | 'base64';
  /**
   * 출력 포맷. 기본값 'base64'
   */
  output?: 'base64' | 'hex';
  /**
   * IV를 직접 지정하려면 사용(16바이트). 미지정 시 랜덤 생성.
   * - string이면 base64로 간주
   */
  iv?: CryptoJS.lib.WordArray | string;
};

export type AesDecryptOptions = {
  keyEncoding?: 'utf8' | 'base64';
  /**
   * 입력 포맷. 기본값 'base64'
   * (암호문은 `IV + CIPHERTEXT`를 해당 포맷으로 인코딩한 문자열)
   */
  input?: 'base64' | 'hex';
};

/**
 * AES-CBC(PKCS7) 암호화
 * - 랜덤 IV(16바이트)를 생성하고, `IV + CIPHERTEXT`를 Base64/Hex로 반환
 * - 문자열/객체 입력 지원(객체는 JSON 문자열로 직렬화하여 암호화)
 *
 * @returns base64(기본) 또는 hex 문자열
 */
export function aesEncrypt(data: string | Record<string, unknown>, key: string, opts: AesEncryptOptions = {}): string {
  const { keyEncoding = 'utf8', output = 'base64', iv } = opts;

  const keyWA = parseKey(key, keyEncoding);
  const ivWA = typeof iv === 'string' ? base64OrUrlToWordArray(iv) : (iv ?? CryptoJS.lib.WordArray.random(16));

  const plainWA = CryptoJS.enc.Utf8.parse(toStringData(data));

  const encrypted = CryptoJS.AES.encrypt(plainWA, keyWA, {
    iv: ivWA,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).ciphertext; // WordArray (순수 암호문)

  // prefix: IV + CIPHERTEXT
  const combined = ivWA.clone().concat(encrypted);

  if (output === 'hex') {
    return CryptoJS.enc.Hex.stringify(combined);
  }
  return wordArrayToBase64(combined);
}

/**
 * AES-CBC(PKCS7) 복호화
 * - 입력은 `IV + CIPHERTEXT`가 Base64/Hex로 인코딩된 문자열
 * - 복호화 결과는 UTF-8 문자열(필요시 JSON.parse로 객체 변환)
 */
export function aesDecrypt(encrypted: string, key: string, opts: AesDecryptOptions = {}): string {
  const { keyEncoding = 'utf8', input = 'base64' } = opts;

  const keyWA = parseKey(key, keyEncoding);

  const combined = input === 'hex' ? CryptoJS.enc.Hex.parse(encrypted) : base64OrUrlToWordArray(encrypted);

  // IV는 첫 16바이트(= 4 Word) 고정
  const ivWA = CryptoJS.lib.WordArray.create(combined.words.slice(0, 4));
  const cipherWA = CryptoJS.lib.WordArray.create(combined.words.slice(4), combined.sigBytes - 16);

  const decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherWA } as any, keyWA, {
    iv: ivWA,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * URL-safe Base64로 인코딩
 */
export function toBase64Url(b64: string): string {
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

/**
 * URL-safe Base64 → 일반 Base64
 */
export function fromBase64Url(b64u: string): string {
  const b64 = b64u.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
  return b64 + pad;
}
