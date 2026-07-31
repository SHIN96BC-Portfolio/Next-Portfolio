'use client';

import clsx from 'clsx';
import { type FC, type ReactNode, type RefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useClickOutside from './useClickOutside';

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
  children: ReactNode;
  options: OverlayOptions;
  handlers: OverlayHandlers;
}

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

const ModalOverlay: FC<ModalOverlayProps> = ({ children, options, handlers }) => {
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

  useClickOutside(open ? overlayRef : ({ current: null } as RefObject<HTMLElement | null>), onClose);

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
      ref={overlayRef as RefObject<HTMLElement>}
      aria-hidden={!open}
      tabIndex={-1}
      role="presentation"
      style={{ zIndex }}
      className={clsx(fixedPosition ? 'fixed' : 'absolute', open ? 'block' : 'hidden', className)}
    >
      {children}
    </section>
  );

  return usePortal && isClient ? createPortal(overlay, document.body) : overlay;
};

export default ModalOverlay;
