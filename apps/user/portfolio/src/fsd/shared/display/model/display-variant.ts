export type DisplayVariant = 'screen' | 'print';

export function isPrintVariant(variant: DisplayVariant): boolean {
  return variant === 'print';
}
