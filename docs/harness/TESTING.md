# Testing harness — 단위(Jest) · E2E(Playwright) 강제

새 로직·순수 함수·mapper·hook·validation이 생기면 **Jest 단위 테스트**,  
사용자 경로가 바뀌면 **Playwright E2E**를 갱신하도록 게이트로 강제한다.

구현: [`scripts/guard-tests.mjs`](../../scripts/guard-tests.mjs)  
호출: `pnpm guard:tests` · full `verify:portfolio` 안에 포함.

## 정책

### Unit (필수 — diff 기준)

다음 경로의 **추가/수정** `.ts`/`.tsx` 는 같은 슬라이스에 대응 `*.test.ts` 또는 `*.spec.ts`가 **존재**해야 한다 (이번 diff에 없어도, 디스크에 있으면 OK).

| 대상 (예시) | 비대상 |
|-------------|--------|
| `**/model/mapper/**` | `*.test.ts` / `*.spec.ts` 자체 |
| `**/utils/**` | `index.ts`, `*.d.ts`, `*.enum.ts` |
| `**/validations/**` | `**/types/**`, `**/constants/**` |
| `**/hooks/**`, `use*.ts(x)` | `page.tsx` / `layout.tsx` / 순수 presentational UI |
| `entities/**/model/**` (위 제외 규칙 적용 후) | stories, mock fixtures |

신규 파일이면 테스트 파일이 없거나 비어 있으면 **fail**.

### E2E (조건부)

다음이 diff에 있으면 `apps/<app>/e2e/**/*.spec.ts` (또는 `*.test.ts`) 중 **하나 이상도 같이 변경**하거나, 이슈/커밋 메시지에 `e2e-skip:` 사유가 있어야 한다.

- `**/pages/**/*.tsx`
- `src/app/**/page.tsx`
- `**/widgets/**/*.tsx` (헤더·내비 등 셸)

`e2e-skip:` 예: 커밋 메시지 또는 `.ai/issue.md` / PR body에  
`e2e-skip: 스타일 토큰만 변경, 라우트 동작 동일`

### 성숙도

| maturity | guard:tests |
|----------|-------------|
| **full** (portfolio) | verify 안에서 **필수** (secret/denylist 다음) |
| **lite** | 기본 스킵. `HARNESS_REQUIRE_TESTS=1` 이면 실행 |

## 로컬

```bash
pnpm guard:tests
HARNESS_BASE_REF=origin/master pnpm guard:tests
# 경고만 (도입 초기에 soft):
HARNESS_TESTS_SOFT=1 pnpm guard:tests
```

## 에이전트·이슈 AC

이슈 Goal/AC에 반드시:

```markdown
- [ ] Unit: 새/변경 로직에 `*.test.ts` 추가
- [ ] E2E: 라우트·셸 변경 시 e2e 스펙 갱신 (아니면 e2e-skip 사유)
```

스킬: `plan-change` · `loop-build` · `loop-verify` 가 동일 규칙을 본다.  
이슈 AC·프롬프트: [`../loop/AI-TASK-PROMPT.md`](../loop/AI-TASK-PROMPT.md)  
운영 env: [`../loop/ISSUE-GUIDE.md`](../loop/ISSUE-GUIDE.md)

## Jest / Playwright 위치 (portfolio)

- Unit: 소스 옆 `foo.test.ts` (기존 관례)
- E2E: `apps/user/portfolio/e2e/*.spec.ts`
- 실행: `pnpm --filter @apps/user-portfolio run test` / `test:e2e`
