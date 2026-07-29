/** 쿠키 파싱 유틸 */
export default function parseCookieHeader(header: string | undefined) {
  const out: Record<string, string> = {};
  if (!header) return out;
  header.split(';').forEach((chunk) => {
    const [k, ...rest] = chunk.trim().split('=');
    if (!k) return;
    out[decodeURIComponent(k)] = decodeURIComponent(rest.join('=') || '');
  });
  return out;
}
