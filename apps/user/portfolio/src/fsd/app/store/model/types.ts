// Infer the type of makeStore
import { makeStore } from '@FsdApp/store/config/store';

export type AppStore = ReturnType<typeof makeStore>;
