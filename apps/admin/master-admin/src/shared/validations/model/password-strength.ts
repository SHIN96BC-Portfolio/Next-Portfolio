/**
 * Password validator for login pages
 */
import { NumbColorFunc, StringBoolFunc, StringNumFunc } from '@Src/shared/validations/model/password';

// has number
const hasNumber: StringBoolFunc = (number) => /[0-9]/.test(number);

// has mix of small and capitals
const hasMixed: StringBoolFunc = (number) => /[a-z]/.test(number) && /[A-Z]/.test(number);

// has special chars
const hasSpecial: StringBoolFunc = (number) => /[!#@$%^&*)(+=._-]/.test(number);

// set color based on password strength
export const strengthColor: NumbColorFunc = (count) => {
  if (count < 2) {
    return { label: 'Poor', color: 'errors.(main)' };
  }
  if (count < 3) {
    return { label: 'Weak', color: 'warning.(main)' };
  }
  if (count < 4) {
    return { label: 'Normal', color: 'warning.dark' };
  }
  if (count < 5) {
    return { label: 'Good', color: 'success.(main)' };
  }
  if (count < 6) {
    return { label: 'Strong', color: 'success.dark' };
  }
  return { label: 'Poor', color: 'errors.(main)' };
};

// password strength indicator
export const strengthIndicator: StringNumFunc = (number) => {
  let strengths = 0;
  if (number.length > 5) {
    strengths += 1;
  }
  if (number.length > 7) {
    strengths += 1;
  }
  if (hasNumber(number)) {
    strengths += 1;
  }
  if (hasSpecial(number)) {
    strengths += 1;
  }
  if (hasMixed(number)) {
    strengths += 1;
  }
  return strengths;
};
