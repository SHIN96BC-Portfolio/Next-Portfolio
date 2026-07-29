import { MD5Input } from '@Libs/crypto/crypto.type';
import isMd5Hex from '@Libs/crypto/utils/isMd5Hex';
import { createHash } from 'crypto';

/**
 * MD5 해시(hex) (서버용)
 */
export function toMD5HashServer(value: MD5Input): string {
  if (value == null || value.length === 0) return '';
  return createHash('md5').update(value, 'utf8').digest('hex'); // 소문자 16진수
}

/**
 * MD5 해시 비교 (서버용)
 * - 빈 입력/빈 해시는 즉시 false
 * - expectedHash가 유효한 md5 hex가 아니면 false
 * - 비교 시 소문자로 정규화
 */
export function compareMD5HashServer(value: MD5Input, expectedHash: string): boolean {
  if (!value) return false; // '' / null / undefined → false
  if (!expectedHash || !isMd5Hex(expectedHash)) return false;

  const actual = toMD5HashServer(value);

  return actual !== '' && actual.toLowerCase() === expectedHash.toLowerCase();
}
