'use client';

import { ReactNode, useEffect, useState } from 'react';

const isMockingMode = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

export default function MockServerInit({ children }: { children: ReactNode }) {
  const [hasWorkerStarted, setWorkerStarted] = useState(false);

  useEffect(() => {
    const handleStopMockWorker = async () => {
      if (typeof window !== 'undefined') {
        const { mockWorker } = await import('@FsdShared/libs/mocks/mock-browser.setup');
        mockWorker.stop();
        setWorkerStarted(false);
      }
    };

    const handleStartMockWorker = async () => {
      /**
       * 반드시 await로 기다려주지 않으면 msw 라이브러리에서 런타임 오류 발생(ex: 새탭 열기 할 때 등)
       * - Uncaught TypeError: Cannot read properties of undefined (reading 'url')
       */
      if (typeof window !== 'undefined') {
        const { mockWorker } = await import('@FsdShared/libs/mocks/mock-browser.setup');
        await mockWorker.start({ onUnhandledRequest: 'warn' });
        console.info('mockWorker.start()');
        setWorkerStarted(true);
      }
    };

    // msw test browser server start
    if (isMockingMode) {
      handleStartMockWorker();
    } else {
      setWorkerStarted(true);
    }
  }, []);

  // return hasWorkerStarted ? children : null;
  return hasWorkerStarted ? children : null;
}
