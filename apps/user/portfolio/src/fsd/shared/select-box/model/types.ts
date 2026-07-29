import type { ReactNode, RefObject, SelectHTMLAttributes } from 'react';

export type SelectOption<T extends string | number = string> = {
  label: ReactNode;
  value: T;
  disabled?: boolean;
};

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectBoxProps<T extends string | number = string>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange' | 'value' | 'defaultValue'> {
  options: Array<SelectOption<T>>;
  placeholder?: string;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;

  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;

  size?: SelectSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  /** React 19: forwardRef 없이 ref를 prop으로 직접 받습니다. */
  ref?: RefObject<HTMLElement | null>;
}
