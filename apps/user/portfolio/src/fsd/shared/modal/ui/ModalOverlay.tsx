'use client';

import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import useClickOutside from '../hooks/useClickOutside';

/* -----------------------------------------------------
   🔹 인터페이스
----------------------------------------------------- */
export interface OverlayOptions {
  open: boolean;
  usePortal?: boolean;
  fixedPosition?: boolean;
  lockScroll?: boolean;
  className?: string;
  zIndex?: number;
  closeOnEsc?: boolean;
}

export interface OverlayHandlers {
  onClose: () => void;
}

export interface ModalOverlayProps {
  children: React.ReactNode;
  options: OverlayOptions;
  handlers: OverlayHandlers;
}

/* -----------------------------------------------------
   🔹 스크롤 잠금 유틸
----------------------------------------------------- */
const BodyScroll = (() => {
  let prevOverflow = '';
  let prevMaxWidth = '';
  let locked = false;

  const disable = () => {
    if (typeof window === 'undefined' || locked) return;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    prevOverflow = document.body.style.overflow;
    prevMaxWidth = document.body.style.maxWidth;
    document.body.style.maxWidth = `calc(100vw - ${scrollbar}px)`;
    document.body.style.overflow = 'hidden';
    locked = true;
  };

  const enable = () => {
    if (typeof window === 'undefined' || !locked) return;
    document.body.style.maxWidth = prevMaxWidth || '';
    document.body.style.overflow = prevOverflow || '';
    locked = false;
  };

  return { disable, enable };
})();

/* -----------------------------------------------------
   🔹 컴포넌트
----------------------------------------------------- */
const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, options, handlers }) => {
  const {
    open,
    className,
    fixedPosition = true,
    lockScroll = false,
    usePortal = false,
    zIndex = 10,
    closeOnEsc = true,
  } = options;

  const { onClose } = handlers;
  const [isClient, setIsClient] = useState(false);
  const overlayRef = useRef<HTMLElement>(null);

  useEffect(() => setIsClient(true), []);

  useClickOutside(open ? overlayRef : { current: null }, onClose);

  useEffect(() => {
    if (!lockScroll) return;
    if (open) BodyScroll.disable();
    else BodyScroll.enable();
    return () => BodyScroll.enable();
  }, [lockScroll, open]);

  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeOnEsc, onClose]);

  const overlay = (
    <section
      ref={overlayRef as React.RefObject<HTMLElement>}
      aria-hidden={!open}
      tabIndex={-1}
      role="presentation"
      style={{ zIndex }}
      className={clsx(fixedPosition ? 'fixed' : 'absolute', open ? 'block' : 'hidden', className)}
    >
      {children}
    </section>
  );

  return usePortal && isClient ? ReactDOM.createPortal(overlay, document.body) : overlay;
};

export default ModalOverlay;
