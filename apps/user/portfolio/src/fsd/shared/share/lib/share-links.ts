export function getSharePageUrl(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.href;
}

export function buildFacebookShareUrl(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export function buildTwitterShareUrl(url: string, text: string): string {
  const params = new URLSearchParams({
    url,
    text,
  });

  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function buildLinkedInShareUrl(url: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

export function canUseNativeShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

export async function shareNative(payload: { title: string; text: string; url: string }): Promise<boolean> {
  if (!canUseNativeShare()) {
    return false;
  }

  try {
    await navigator.share(payload);
    return true;
  } catch {
    return false;
  }
}

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

const KAKAO_SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js';

let kakaoScriptPromise: Promise<void> | null = null;

function loadKakaoSdk(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.Kakao) {
    return Promise.resolve();
  }

  if (!kakaoScriptPromise) {
    kakaoScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = KAKAO_SDK_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Kakao SDK'));
      document.head.appendChild(script);
    });
  }

  return kakaoScriptPromise;
}

export function getKakaoJavascriptKey(): string | undefined {
  return process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
}

export async function shareKakao(payload: { title: string; description: string; url: string }): Promise<boolean> {
  const key = getKakaoJavascriptKey();

  if (!key) {
    return false;
  }

  await loadKakaoSdk();

  if (!window.Kakao) {
    return false;
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(key);
  }

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: payload.title,
      description: payload.description,
      link: {
        mobileWebUrl: payload.url,
        webUrl: payload.url,
      },
    },
    buttons: [
      {
        title: '웹에서 보기',
        link: {
          mobileWebUrl: payload.url,
          webUrl: payload.url,
        },
      },
    ],
  });

  return true;
}
