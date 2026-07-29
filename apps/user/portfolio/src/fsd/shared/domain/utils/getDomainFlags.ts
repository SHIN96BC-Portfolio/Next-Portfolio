/** 도메인 타입 정의 */
export type DomainType = 'b2c' | 'bp' | 'b2bHotel' | 'xcrs' | 'unknown';

/**
 * 비교 방식 타입 정의
 *  'exact': 완전히 일치해야 매칭(default)
 *  'endsWith': 끝 부분이 일치하면 매칭
 *  'startsWith': 시작 부분이 일치하면 매칭
 *  'includes': 포함되면 매칭
 *  ❗includes는 너무 느슨해서 잘 쓰진 않지만, 유연한 대응 필요할 땐 유용함
 */
export type MatchType = 'exact' | 'endsWith' | 'startsWith' | 'includes';

/** env key 값 매핑 */
export const DOMAIN_ENV_VALUES = {
  b2c: [process.env.NEXT_PUBLIC_FE_URL, process.env.NEXT_PUBLIC_PC_FE_URL, process.env.NEXT_PUBLIC_MO_FE_URL],
  bp: [process.env.NEXT_PUBLIC_BP_PC_FE_URL, process.env.NEXT_PUBLIC_BP_MO_FE_URL],
};

/** 도메인에 https 가 붙는 경우를 위한 https 제거 함수 */
function normalizeDomain(input: string): string {
  if (!input) return '';

  let hostname = input.trim().toLowerCase();

  // 프로토콜 없으면 강제로 붙여서 URL로 처리
  if (!hostname.startsWith('http://') && !hostname.startsWith('https://')) {
    hostname = 'http://' + hostname;
  }

  try {
    const url = new URL(hostname);
    return url.hostname; // 여기서 포트, path 제거되고 순수 host 만 남음
  } catch {
    // fallback: 그냥 프로토콜 제거하고 ':' 기준 포트도 제거
    return hostname.replace(/^https?:\/\//, '').split(':')[0];
  }
}

/** sub domain 추출 함수 */
function extractSubdomain(host: string): string {
  if (!host) return '';

  const hostname = host.toLowerCase().trim();
  const parts = hostname.split('.');

  // localhost일 경우: '.'이 하나 이상이면 앞을 subdomain 으로 인정
  if (hostname.endsWith('localhost')) {
    return parts.length > 1 ? parts.slice(0, -1).join('.') : '';
  }

  // 일반 도메인: 마지막 2개 제외한 앞부분이 subdomain
  return parts.length > 2 ? parts.slice(0, -2).join('.') : '';
}

/** domain 비교 함수를 생성하는 함수 */
function createMatchFn(type: MatchType): (current: string, target: string) => boolean {
  return (current, target) => {
    if (!current || !target) return false;
    switch (type) {
      case 'exact':
        return target === current;
      case 'endsWith':
        return target.endsWith(current);
      case 'startsWith':
        return target.startsWith(current);
      case 'includes':
        return target.includes(current);
      default:
        return false;
    }
  };
}

/** 서브도메인의 www. 와 m. 제거 함수 */
function cleanSubdomainSuffix(subdomain: string): string {
  if (!subdomain) return '';
  if (subdomain === 'www' || subdomain === 'm') return '';

  // 정규식으로 -www, .www, -m, .m 같은 접미사 제거 (단어 안의 m은 제거하지 않음)
  return subdomain.replace(/([-.])(www|m)$/i, '').trim();
}

/** 함수 반환 타입 정의 */
export interface DomainFlags {
  type: DomainType;
  host: string;
  flags: {
    [key in DomainType]: boolean;
  };
}

/** 함수 옵션 타입 정의 */
interface GetDomainFlagsOptions {
  /** 매칭 방식 */
  matchType?: MatchType;
  /** sub domain 만 잘라서 비교할지 여부 */
  useSubdomain?: boolean;
}

/**
 * env에 설정된 도메인과 비교해 어떤 타입인지 판별하는 함수
 * - 도메인별로 env key: NEXT_PUBLIC_DOMAIN_<타입명 대문자> 형태로 설정
 * ex:
 *   const domain = getDomainFlags('m.modetour.com');
 *   console.log(domain.type); // 'b2c', 'b2b', 'admin', or 'unknown'
 *   console.log(domain.flags.b2c); // true or false
 */
export default function getDomainFlags(rawHost: string, options?: GetDomainFlagsOptions): DomainFlags {
  // rawHost가 없을 때
  if (!rawHost) {
    const flags = Object.fromEntries(Object.keys(DOMAIN_ENV_VALUES).map((key) => [key, false])) as DomainFlags['flags'];

    return {
      type: 'unknown',
      host: rawHost,
      flags: {
        ...flags,
        unknown: true,
      },
    };
  }

  // 비교 옵션
  const matchType = options?.matchType ?? 'exact'; // (default: exact)
  const useSubdomain = options?.useSubdomain ?? false;

  // 필요한 domain 추출
  const normalizedHost = normalizeDomain(rawHost).toLowerCase();

  const subdomain = extractSubdomain(normalizedHost);

  const currentDomain = useSubdomain ? cleanSubdomainSuffix(subdomain) : normalizedHost;

  // 서브도메인이 없고 useSubdomain 이면 무조건 b2c 처리
  if (useSubdomain && !currentDomain) {
    const flags = Object.fromEntries(
      Object.keys(DOMAIN_ENV_VALUES).map((key) => [key, key === 'b2c'])
    ) as DomainFlags['flags'];

    return {
      type: 'b2c',
      host: rawHost,
      flags: {
        ...flags,
        unknown: false,
      },
    };
  }

  // 비교 함수
  const matchFn = createMatchFn(matchType);

  // 전체 ENV 도메인 목록 추출
  const envDomainList: { type: DomainType; domain: string }[] = [];

  for (const [type, envValues] of Object.entries(DOMAIN_ENV_VALUES) as [DomainType, (string | undefined)[]][]) {
    for (const value of envValues) {
      if (value) {
        const domains = value
          .split(',')
          .map((item) => normalizeDomain(item.trim()))
          .filter(Boolean);

        for (const domain of domains) {
          envDomainList.push({ type, domain });
        }
      }
    }
  }

  // 매칭된 도메인 찾기
  const matched = envDomainList.find((item) => matchFn(currentDomain, item.domain));

  const type: DomainType = matched?.type ?? 'unknown';

  const flags: DomainFlags['flags'] = Object.keys(DOMAIN_ENV_VALUES).reduce(
    (acc, key) => {
      const t = key as DomainType;
      acc[t] = envDomainList.some((item) => item.type === t && matchFn(currentDomain, item.domain));
      return acc;
    },
    {} as DomainFlags['flags']
  );

  // unknown 처리 추가
  flags.unknown = type === 'unknown';

  return {
    type,
    host: rawHost,
    flags,
  };
}
