/**
 * scripts/guard-tests.test.mjs
 * =============================================================================
 * guard:tests 의 “같은 diff” 판정 고정 (`pnpm test:harness`)
 * =============================================================================
 *
 * 왜 있는가:
 *   로직 파일을 고치고 예전에 만들어 둔 *.test.ts 는 그대로 두면,
 *   테스트가 디스크에 있다는 이유만으로 가드가 통과했다.
 *   그 판정이 다시 디스크 존재 검사로 느슨해지면 이 테스트가 실패한다.
 *   git 이나 실제 앱 파일은 쓰지 않는다.
 *
 * 이 파일도 DENYLIST 에 있다. 단언을 지워 검사를 비우는 변경은 human gate 다.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { missingUnitTestsInDiff } from './guard-tests.mjs';

const mapper = 'apps/user/portfolio/src/fsd/entities/site/model/mapper/map-home.ts';
const mapperTest = 'apps/user/portfolio/src/fsd/entities/site/model/mapper/map-home.test.ts';

test('a logic edit fails when the paired test is not in the same diff', () => {
  const missing = missingUnitTestsInDiff([mapper]);
  assert.deepEqual(missing, [{ file: mapper, expected: mapperTest }]);
  assert.deepEqual(missingUnitTestsInDiff([mapper.replaceAll('/', '\\')]), [{ file: mapper, expected: mapperTest }]);
});

test('the paired test or spec in the same diff passes', () => {
  assert.deepEqual(missingUnitTestsInDiff([mapper, mapperTest]), []);
  const spec = 'apps/user/portfolio/src/fsd/entities/site/model/mapper/map-home.spec.tsx';
  assert.deepEqual(missingUnitTestsInDiff([mapper, spec]), []);
});

test('editing only the test file does not demand another test', () => {
  assert.deepEqual(missingUnitTestsInDiff([mapperTest]), []);
});

test('excluded paths and files outside the app are not unit targets', () => {
  assert.deepEqual(
    missingUnitTestsInDiff([
      'apps/user/portfolio/src/fsd/shared/utils/index.ts',
      'apps/user/portfolio/src/fsd/entities/site/model/types/home.ts',
      'apps/user/portfolio/src/fsd/entities/site/model/status.enum.ts',
      'apps/user/commerce/src/fsd/shared/utils/format.ts',
      'apps/user/portfolio/src/fsd/pages/home/ui/Home.tsx',
    ]),
    []
  );
});

test('hook and validation edits need their own test in the diff', () => {
  const hook = 'apps/user/portfolio/src/fsd/features/login/hooks/useLogin.ts';
  const validation = 'apps/user/portfolio/src/fsd/shared/validations/login-schema.ts';
  assert.deepEqual(
    missingUnitTestsInDiff([hook, validation]).map((item) => item.expected),
    [
      'apps/user/portfolio/src/fsd/features/login/hooks/useLogin.test.ts',
      'apps/user/portfolio/src/fsd/shared/validations/login-schema.test.ts',
    ]
  );
  assert.deepEqual(
    missingUnitTestsInDiff([
      hook,
      'apps/user/portfolio/src/fsd/features/login/hooks/useLogin.test.ts',
      validation,
      'apps/user/portfolio/src/fsd/shared/validations/login-schema.test.ts',
    ]),
    []
  );
});
