export function isNumber(value: string): boolean {
  return /^(?=.*[0-9]).+$/.test(value);
}

export function isLowercaseChar(value: string): boolean {
  return /^(?=.*[a-z]).+$/.test(value);
}

export function isUppercaseChar(value: string): boolean {
  return /^(?=.*[A-Z]).+$/.test(value);
}

export function isSpecialChar(value: string): boolean {
  return /^(?=.*[-+_!@#$%^&*.,?]).+$/.test(value);
}

export function minLength(value: string): boolean {
  return value.length > 7;
}
