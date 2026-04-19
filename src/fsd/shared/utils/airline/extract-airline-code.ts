type ParsedFlight = {
  system: 'IATA' | 'ICAO';
  airlineCode: string; // EK, B6, LH, KAL ...
  number: string; // 323, 1234 ...
  suffix?: string; // A 같은 접미 (있으면)
};

// 항공사 code parser
function parseFlightDesignator(designator: string): ParsedFlight | null {
  if (!designator) return null;
  const raw = designator.toUpperCase().trim();

  // 첫 번째 연속된 영숫자 토큰만 대상으로 (codeshare 슬래시, 괄호 등 제거)
  const token = (raw.match(/[A-Z0-9]+/g) || [])[0] || '';
  if (!token) return null;

  // 1) ICAO: 3글자(알파벳) + 1~4숫자 + (선택)알파벳
  let m = token.match(/^([A-Z]{3})(\d{1,4})([A-Z]?)$/);
  if (m) {
    const [, airlineCode, number, suffix] = m;
    return { system: 'ICAO', airlineCode, number, suffix: suffix || undefined };
  }

  // 2) IATA: 2문자(알파벳/숫자 가능, 최소 1개는 알파벳) + 1~4숫자 + (선택)알파벳
  m = token.match(/^([A-Z0-9]{2})(\d{1,4})([A-Z]?)$/);
  if (m && /[A-Z]/.test(m[1])) {
    const [, airlineCode, number, suffix] = m;
    return { system: 'IATA', airlineCode, number, suffix: suffix || undefined };
  }

  return null;
}

// 편명에서 항공사 코드만 뽑기
export function extractAirlineCode(designator: string): string | null {
  const p = parseFlightDesignator(designator);
  return p?.airlineCode ?? null;
}
