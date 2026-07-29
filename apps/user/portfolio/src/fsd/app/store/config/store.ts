import { commonAlertSlice } from '@FsdShared/alert/model';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({
  // auth: authSlice,
  commonAlert: commonAlertSlice,
  // menus: menusSlice,
});

const persistConfig = {
  key: 'rootPersist',
  storage,
  whitelist: ['menus'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const makeStore = () => {
  return configureStore({
    // reducer: {
    //   auth: authSlice,
    //   tests: testSlice,
    //   commonAlert: commonAlertSlice,
    // },
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      // state에 function을 사용하기 위해 선언
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};
