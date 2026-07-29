'use client';

import { useRouter } from 'next/navigation';
import { ComponentRef, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  maxWidth?: number | string;
  maxHeight?: number | string;
  children: ReactNode;
}

export default function InterceptionModal({ maxWidth, maxHeight, children }: Props) {
  const router = useRouter();
  const dialogRef = useRef<ComponentRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onClose() {
    router.back();
  }

  return createPortal(
    <div className="absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 z-[1000]">
      <dialog
        ref={dialogRef}
        className={`relative flex justify-center items-center w-4/5 ${maxWidth ? `max-w-[${typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth}]` : 'max-w-[500px]'} ${maxHeight ? `max-h-[${typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight}]` : 'max-h-[500px]'} h-auto rounded-[12px] bg-white p-[20px] m-auto`}
        onClose={onClose}
      >
        {children}
        <button
          type="button"
          onClick={onClose}
          className="absolute flex justify-center items-center text-[24px] font-semibold top-[10px] right-[10px] w-12 h-12 bg-transparent rounded-[15px] cursor-pointer hover:bg-[#EEE] after:content-['x'] after:text-black"
        />
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}
