import { useEffect, useMemo, useState } from 'react';
import getDomainFlags from '../utils/getDomainFlags';

const useNowHost = () => {
  const [host, setHost] = useState<string>('');

  const domain = useMemo(() => {
    // 로컬 테스트용(로컬에선 도메인 전체 비교가 불가능하여 서브도메인으로만 비교)
    if (host.includes('localhost')) {
      return getDomainFlags(host, { matchType: 'startsWith', useSubdomain: true });
    }

    // 로컬이 아니면 도메인 전체 비교
    return getDomainFlags(host);
  }, [host]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHost(window.location.host);
    }
  }, []);

  return {
    host,
    isB2C: domain.flags.b2c,
    isBP: domain.flags.bp,
    isB2BHotel: domain.flags.b2bHotel,
    isXcrs: domain.flags.xcrs,
  };
};

export default useNowHost;
