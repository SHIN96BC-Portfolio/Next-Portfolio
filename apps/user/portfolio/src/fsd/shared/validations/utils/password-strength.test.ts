import { strengthColor, strengthIndicator } from './password-strength';

describe('strengthIndicator', () => {
  it('returns 0 for an empty string', () => {
    expect(strengthIndicator('')).toBe(0);
  });

  it('adds one at length 6 and another at length 8', () => {
    expect(strengthIndicator('aaaaa')).toBe(0);
    expect(strengthIndicator('aaaaaa')).toBe(1);
    expect(strengthIndicator('aaaaaaa')).toBe(1);
    expect(strengthIndicator('aaaaaaaa')).toBe(2);
  });

  it('adds one when the password contains a number', () => {
    expect(strengthIndicator('aaaaaa')).toBe(1);
    expect(strengthIndicator('aaaaa1')).toBe(2);
  });

  it('adds one when the password contains a special character', () => {
    expect(strengthIndicator('aaaaaaa')).toBe(1);
    expect(strengthIndicator('aaaaaa!')).toBe(2);
  });

  it('adds one only when lowercase and uppercase are mixed', () => {
    expect(strengthIndicator('aaaaaaaa')).toBe(2);
    expect(strengthIndicator('AAAAAAAA')).toBe(2);
    expect(strengthIndicator('Aaaaaaaa')).toBe(3);
  });

  it('returns 5 when all criteria are met', () => {
    expect(strengthIndicator('Abcdef1!')).toBe(5);
  });
});

describe('strengthColor', () => {
  it('maps count to the current label and color values', () => {
    expect(strengthColor(0)).toEqual({ label: 'Poor', color: 'errors.(main)' });
    expect(strengthColor(1)).toEqual({ label: 'Poor', color: 'errors.(main)' });
    expect(strengthColor(2)).toEqual({ label: 'Weak', color: 'warning.(main)' });
    expect(strengthColor(3)).toEqual({ label: 'Normal', color: 'warning.dark' });
    expect(strengthColor(4)).toEqual({ label: 'Good', color: 'success.(main)' });
    expect(strengthColor(5)).toEqual({ label: 'Strong', color: 'success.dark' });
  });

  it('falls back to Poor for counts of 6 or more', () => {
    expect(strengthColor(6)).toEqual({ label: 'Poor', color: 'errors.(main)' });
    expect(strengthColor(7)).toEqual({ label: 'Poor', color: 'errors.(main)' });
  });
});
