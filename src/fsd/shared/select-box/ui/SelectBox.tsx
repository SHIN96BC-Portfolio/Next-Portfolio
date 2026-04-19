'use client';

import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { SelectBoxProps } from '../model/types';

function sizeClasses(size: NonNullable<SelectBoxProps['size']>) {
  switch (size) {
    case 'sm':
      return 'h-9 text-sm px-3';
    case 'lg':
      return 'h-12 text-base px-4';
    case 'md':
    default:
      return 'h-10 text-sm px-3.5';
  }
}

function paddings(size: NonNullable<SelectBoxProps['size']>, hasLeft: boolean) {
  const base = sizeClasses(size);
  return base + (hasLeft ? ' pl-10' : '') + ' pr-10';
}

export default function SelectBox<T extends string | number = string>({
  options,
  value,
  placeholder = '선택하세요',
  defaultValue,
  onChange,
  label,
  helperText,
  errorText,
  size = 'md',
  fullWidth = true,
  leftIcon,
  rightIcon,
  className,
  id,
  required,
  disabled,
  ref, // React 19: ref를 prop으로 직접 받음(버튼에 연결)
}: SelectBoxProps<T>) {
  const autoId = useId();
  const baseId = id ?? `sel-${autoId}`;
  const btnId = `${baseId}-button`;
  const listId = `${baseId}-listbox`;
  const descId = helperText ? `${baseId}-desc` : undefined;
  const errId = errorText ? `${baseId}-err` : undefined;
  const describedBy = [descId, errId].filter(Boolean).join(' ') || undefined;
  const isError = !!errorText;

  // 제어형/비제어형 지원
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<T | undefined>(defaultValue);
  const selectedValue = (isControlled ? value : inner) as T | undefined;

  // 펼침 상태 + 포커스 관리
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // 외부에서 전달된 ref를 버튼에 연결
  useEffect(() => {
    if (!ref) return;
    if (ref.current) ref.current = buttonRef.current;
  }, [ref]);

  const enabledOptions = useMemo(() => options.filter((o) => !o.disabled), [options]);
  const selectedIndex = useMemo(() => {
    if (selectedValue === undefined) return -1;
    return options.findIndex((o) => o.value === selectedValue);
  }, [options, selectedValue]);

  const [activeIndex, setActiveIndex] = useState<number>(() =>
    selectedIndex >= 0 ? selectedIndex : options.findIndex((o) => !o.disabled)
  );

  // open될 때 활성 항목 동기화
  useEffect(() => {
    if (open) {
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : options.findIndex((o) => !o.disabled));
    }
  }, [open, selectedIndex, options]);

  // 바깥 클릭 닫기
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (buttonRef.current?.contains(t)) return;
      if (listRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const commit = (next: T) => {
    if (!isControlled) setInner(next);
    onChange?.(next);
    setOpen(false);
    // 선택 후 버튼 포커스 복원
    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  const moveActive = (delta: number) => {
    if (!options.length) return;
    let i = activeIndex;
    for (let step = 0; step < options.length; step++) {
      i = (i + delta + options.length) % options.length;
      if (!options[i].disabled) {
        setActiveIndex(i);
        break;
      }
    }
  };

  const selected = options.find((o) => o.value === selectedValue);

  return (
    <div className={mergeClassNames(fullWidth ? 'w-full' : 'inline-block', 'space-y-1.5')}>
      {label && (
        <label
          htmlFor={btnId}
          className={mergeClassNames(
            'block text-sm font-medium text-foreground',
            required && 'after:ml-0.5 after:text-red-600 after:content-["*"]'
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <button
          id={btnId}
          ref={buttonRef}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-describedby={describedBy}
          aria-invalid={isError || undefined}
          onClick={() => !disabled && setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (disabled) return;
            switch (e.key) {
              case 'ArrowDown':
                e.preventDefault();
                if (!open) setOpen(true);
                else moveActive(+1);
                break;
              case 'ArrowUp':
                e.preventDefault();
                if (!open) setOpen(true);
                else moveActive(-1);
                break;
              case 'Enter':
              case ' ':
                e.preventDefault();
                if (!open) setOpen(true);
                else if (activeIndex >= 0 && !options[activeIndex]?.disabled) {
                  commit(options[activeIndex].value as T);
                }
                break;
              case 'Escape':
                if (open) {
                  e.preventDefault();
                  setOpen(false);
                }
                break;
              default:
            }
          }}
          className={mergeClassNames(
            'relative flex w-full items-center rounded-xl border bg-background text-left outline-none transition',
            'focus:border-primary focus:ring-4 focus:ring-primary/20',
            'disabled:cursor-not-allowed disabled:opacity-60',
            'cursor-pointer',
            isError ? 'border-red-500 focus:border-red-600 focus:ring-red-500/20' : 'border-border',
            paddings(size, !!leftIcon),
            className
          )}
        >
          <span className={mergeClassNames('truncate', selected ? 'text-foreground' : 'text-muted-foreground')}>
            {selected ? selected.label : placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
            {rightIcon ?? (
              <svg
                className={mergeClassNames('h-4 w-4 transition-transform', open && 'rotate-180')}
                viewBox="0 0 20 20"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 7l5 6 5-6" />
              </svg>
            )}
          </span>
        </button>

        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {leftIcon}
          </span>
        )}

        {open && (
          <div
            id={listId}
            ref={listRef}
            role="listbox"
            aria-labelledby={btnId}
            className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-border bg-background shadow-lg"
          >
            {options.map((opt, i) => {
              const selected = opt.value === selectedValue;
              const active = i === activeIndex;
              const optionId = `${listId}-opt-${i}`;
              return (
                <div
                  key={String(opt.value)}
                  id={optionId}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => !opt.disabled && setActiveIndex(i)}
                  onClick={() => !opt.disabled && commit(opt.value as T)}
                  className={mergeClassNames(
                    'px-4 py-2 text-sm cursor-pointer text-foreground',
                    selected && 'bg-muted',
                    active && 'bg-muted/70',
                    opt.disabled && 'opacity-50 cursor-not-allowed',
                    !opt.disabled && 'hover:bg-muted'
                  )}
                >
                  {opt.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {helperText && !isError && (
        <p id={descId} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}
      {isError && (
        <p id={errId} className="text-xs text-red-600">
          {errorText}
        </p>
      )}
    </div>
  );
}
