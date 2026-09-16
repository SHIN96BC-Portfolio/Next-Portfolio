import { checkMinLength, isLowercaseChar, isNumber, isSpecialChar, isUppercaseChar } from './password-validation';

describe('password-validation helpers', () => {
  it('detects character classes', () => {
    expect(isNumber('abc1')).toBe(true);
    expect(isNumber('abc')).toBe(false);
    expect(isLowercaseChar('Ab')).toBe(true);
    expect(isLowercaseChar('AB')).toBe(false);
    expect(isUppercaseChar('aB')).toBe(true);
    expect(isUppercaseChar('ab')).toBe(false);
    expect(isSpecialChar('a!')).toBe(true);
    expect(isSpecialChar('ab')).toBe(false);
  });

  it('checkMinLength is exclusive greater-than', () => {
    expect(checkMinLength('12345', 4)).toBe(true);
    expect(checkMinLength('1234', 4)).toBe(false);
  });
});
