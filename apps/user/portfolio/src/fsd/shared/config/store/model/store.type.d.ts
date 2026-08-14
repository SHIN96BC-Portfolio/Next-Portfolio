import type { CommonAlertState } from '@FsdShared/alert/model/common-alert-slice';

/**
 * shared UI(CommonAlert 등)가 참조하는 최소 RootState.
 * 전체 store 추론(`AppStore`)은 app 레이어에 두고, shared → app 의존을 피한다.
 */
export type RootState = {
  commonAlert: CommonAlertState;
};
