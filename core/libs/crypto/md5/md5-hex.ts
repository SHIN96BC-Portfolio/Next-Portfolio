import { MD5Input } from '@Libs/crypto/crypto.type';
import isMd5Hex from '@Libs/crypto/utils/isMd5Hex';
import Hex from 'crypto-js/enc-hex';
import MD5 from 'crypto-js/md5';

/**
 * MD5 해시(hex) (클라이언트용)
 */
export function toMD5HashClient(value: MD5Input): string {
  if (value == null || value.length === 0) return '';
  return MD5(value).toString(Hex); // 소문자 16진수
}

/**
 * MD5 해시 비교 (클라이언트용)
 * - 빈 입력/빈 해시는 즉시 false
 * - expectedHash가 유효한 md5 hex가 아니면 false
 * - 비교 시 소문자로 정규화
 */
export function compareMD5HashClient(value: MD5Input, expectedHash: string): boolean {
  if (!value) return false;
  if (!expectedHash || !isMd5Hex(expectedHash)) return false;

  const actual = toMD5HashClient(value);

  return actual !== '' && actual.toLowerCase() === expectedHash.toLowerCase();
}
