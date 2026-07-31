'use client';

import { showCommonAlert } from '@Src/shared/alert/model/common-alert-slice';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSession();

  const handleAlertOkBtn = () => {
    router.push('/login');
  };

  const handleAlertCancelBtn = () => {
    router.back();
  };

  useEffect(() => {
    if (!session || !session.data) {
      dispatch(
        showCommonAlert({
          messageHTML: `로그인이 필요한 서비스입니다. <br/> 로그인하시겠습니까?`,
          okBtnName: '로그인',
          okBtnColor: 'primary',
          okBtnCallback: handleAlertOkBtn,
          cancelBtnName: '취소',
          cancelBtnCallback: handleAlertCancelBtn,
        })
      );
    }
  }, [session, dispatch, router]);

  if (session && session.data) {
    return children;
  }

  return null;
}
