'use client';

import { makeStore } from '@FsdApp/store/config/store';
import { AppStore } from '@FsdApp/store/model';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { Persistor, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

/**
 * Redux Store Provider
 * @param {React.ReactNode} children
 * @returns {JSX.Element}
 * @constructor
 */
export default function StoreProvider({ children }: { children: ReactNode }) {
  /*
   redux 공식문서에서 next.js의 app router에서 redux store를 useRef를 통해 관리하도록 권장하고 있습니다.
   그 이유는 아래와 같습니다.
   1. 컴포넌트가 다시 렌더링되더라도 동일한 Redux store 인스턴스를 유지하여 상태가 온전히 보존되도록 합니다.
   2. 컴포넌트가 다시 마운트될 때마다 새로운 store 인스턴스를 생성하지 않도록 합니다.
   3. 불필요한 리렌더링을 방지하여 성능을 최적화합니다.
 */

  const storeRef = useRef<AppStore | null>(null);
  const persistorRef = useRef<Persistor | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  if (!persistorRef.current) {
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
