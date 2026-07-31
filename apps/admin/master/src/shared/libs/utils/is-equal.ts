/**
 * 객체가 동일한지 체크하는 함수
 * @param value
 * @param other
 * @returns {boolean}
 */
const isEqual = (value: unknown, other: unknown): boolean => {
  if (value === other) {
    return true;
  }

  if (typeof value !== typeof other) {
    return false;
  }

  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }

    for (let i = 0; i < value.length; i++) {
      if (!isEqual(value[i], other[i])) {
        return false;
      }
    }

    return true;
  }

  if (typeof value === 'object' && typeof other === 'object' && value && other) {
    const valueObj = value as Record<string, unknown>;
    const otherObj = value as Record<string, unknown>;
    const valueKeys = Object.keys(valueObj);
    const otherKeys = Object.keys(otherObj);

    if (valueKeys.length !== otherKeys.length) {
      return false;
    }

    return valueKeys.every(
      (key) => Object.prototype.hasOwnProperty.call(otherObj, key) && isEqual(valueObj[key], otherObj[key])
    );
  }

  return value === other;
};

export default isEqual;
