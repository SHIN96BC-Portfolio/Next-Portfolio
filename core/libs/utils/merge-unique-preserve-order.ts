/**
 * 여러 배열을 순서를 유지하면서 중복 없이 병합합니다.
 *
 * 특징:
 * - 최초 순서를 그대로 유지합니다.
 * - 중복은 참조(===) 기준으로 제거됩니다.
 * - 어떤 타입(T)이든 사용 가능합니다 (함수, 객체, 문자열, 등등)
 *
 * @template T 병합할 아이템의 타입
 * @param lists 병합할 배열들의 배열
 * @returns 중복이 제거되고 최초 등장 순서가 유지된 배열
 */
export function mergeUniquePreserveOrder<T>(lists: T[][]): T[] {
  const seen = new Set<T>();
  const merged: T[] = [];

  for (const list of lists) {
    for (const item of list) {
      if (!seen.has(item)) {
        seen.add(item);
        merged.push(item);
      }
    }
  }

  return merged;
}
