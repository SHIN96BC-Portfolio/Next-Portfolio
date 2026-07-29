// 유틸: md5 hex 유효성 (32자리, 0-9a-f)
export default function isMd5Hex(str: string): boolean {
  return /^[a-f0-9]{32}$/i.test(str);
}
