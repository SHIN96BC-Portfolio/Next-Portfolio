type QueryParamValue = string | number | boolean;

export interface QueryParamObject {
  [key: string]:
    | QueryParamValue
    | QueryParamValue[]
    | QueryParamValue[][]
    | QueryParamObject
    | QueryParamObject[]
    | QueryParamObject[][];
}

/**
 * 객체를 url query string으로 변환하는 함수
 * @param {unknown} data
 * @returns {string}
 * @example
 * ```js
 * // 사용 예시
 * const data: QueryParamObject = {
 *   name: 'Alice',
 *   age: 30,
 *   isActive: true,
 *   tags: ['developer', 'typescript'],
 *   address: {
 *     city: 'San Francisco',
 *     zipCode: '94105',
 *   },
 *   projects: [
 *     { title: 'Project A', year: 2024 },
 *     { title: 'Project B', year: 2023 },
 *   ],
 *   history: [
 *     { year: 2021, events: ['event1', 'event2'] },
 *     { year: 2022, events: ['event3'] },
 *     {
 *       year: 2022,
 *       events: [
 *         ['event1', 'event2'],
 *         ['event1', 'event2'],
 *       ],
 *     },
 *   ],
 *   nestedArray: [[{ key1: 'value1' }, { key2: 'value2' }], [{ key3: 'value3' }]],
 * };
 *
 * const queryString = convertToQueryString(data);
 * ```
 */
export default function convertToQueryString<T extends QueryParamObject>(data: T): string {
  if (!data || typeof data !== 'object' || (typeof data === 'object' && Object.keys(data).length < 1)) {
    return '';
  }

  const params = new URLSearchParams();

  function appendParams(prefix: string, value: any) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (Array.isArray(item)) {
          // 배열의 배열인 경우
          item.forEach((subItem, subIndex) => {
            appendParams(`${prefix}[${index}][${subIndex}]`, subItem);
          });
        } else if (typeof item === 'object' && item !== null) {
          // 배열의 객체인 경우
          Object.entries(item as QueryParamObject).forEach(([key, nestedValue]) => {
            appendParams(`${prefix}[${index}][${key}]`, nestedValue);
          });
        } else {
          // 배열의 원시 값인 경우
          params.append(`${prefix}[${index}]`, String(item));
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      // 객체인 경우
      Object.entries(value as QueryParamObject).forEach(([key, nestedValue]) => {
        appendParams(`${prefix}[${key}]`, nestedValue);
      });
    } else {
      // 원시 값인 경우
      params.append(prefix, String(value));
    }
  }

  Object.entries(data).forEach(([key, value]) => {
    appendParams(key, value);
  });

  return params.toString();
}

// 출력 예시:
// name=Alice&age=30&isActive=true&tags%5B0%5D=developer&tags%5B1%5D=typescript&address%5Bcity%5D=San+Francisco&address%5BzipCode%5D=94105&projects%5B0%5D%5Btitle%5D=Project+A&projects%5B0%5D%5Byear%5D=2024&projects%5B1%5D%5Btitle%5D=Project+B&projects%5B1%5D%5Byear%5D=2023&history%5B0%5D%5Byear%5D=2021&history%5B0%5D%5Bevents%5D%5B0%5D=event1&history%5B0%5D%5Bevents%5D%5B1%5D=event2&history%5B1%5D%5Byear%5D=2022&history%5B1%5D%5Bevents%5D%5B0%5D=event3&history%5B2%5D%5Byear%5D=2022&history%5B2%5D%5Bevents%5D%5B0%5D%5B0%5D=event1&history%5B2%5D%5Bevents%5D%5B0%5D%5B1%5D=event2&history%5B2%5D%5Bevents%5D%5B1%5D%5B0%5D=event1&history%5B2%5D%5Bevents%5D%5B1%5D%5B1%5D=event2&nestedArray%5B0%5D%5B0%5D%5Bkey1%5D=value1&nestedArray%5B0%5D%5B1%5D%5Bkey2%5D=value2&nestedArray%5B1%5D%5B0%5D%5Bkey3%5D=value3
