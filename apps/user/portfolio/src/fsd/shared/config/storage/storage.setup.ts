import { EncryptedStorage, StorageLike } from '@core/storage';

const storageKey = process.env.NEXT_PUBLIC_STORAGE_CRYPTO_SECRET_KEY ?? '';

export const customLocalStorage = new EncryptedStorage(
  storageKey,
  typeof window !== 'undefined' ? window.localStorage : ({} as StorageLike)
);

export const customSessionStorage = new EncryptedStorage(
  storageKey,
  typeof window !== 'undefined' ? window.sessionStorage : ({} as StorageLike)
);
