# BACKLOG

> 한 Build 실행 = **아래 미체크 항목 하나**. AC는 기계/에이전트가 검증 가능해야 한다.  
> 완료 시 항목을 [`BACKLOG-DONE.md`](./BACKLOG-DONE.md)로 옮기고 체크한다.

## 템플릿

```markdown
### B-XXX — 짧은 제목
- Scope: `@apps/user-portfolio` (경로 힌트)
- [ ] Behavior: …
- [ ] Test: `pnpm --filter @apps/user-portfolio run test` (또는 named spec)
- [ ] UI (해당 시): route + `pnpm --filter @apps/user-portfolio run test:e2e` / 또는 `pnpm snap -- <route>`
- [ ] Gate: `pnpm verify:portfolio` 통과
- [ ] denylist 경로 미변경 (또는 사람 승인 메모)
```

---

## Open

### B-006 — Login 화면 로케일 카피
- Scope: `@apps/user-portfolio` — `features/login`, `pages/login`, `pages/interception-modal/login`, i18n locales, `e2e/smoke.spec.ts`
- [ ] Behavior: `/ko/login`과 인터셉션 로그인에 한글 제목·이메일·비밀번호·제출 버튼이 보인다. `/en/login`·`/ja/login`은 각 로케일 카피
- [ ] Test: 새 mapper/utils가 생기면 같은 디렉터리 `*.test.ts`. 카피만이면 JSON + `pnpm run gen:i18n`. `pnpm guard:tests`
- [ ] UI: `apps/user/portfolio/e2e/smoke.spec.ts` 로그인 단언을 로케일 카피로. `Login Page` 하드코딩 제거
- [ ] Gate: `pnpm verify:portfolio` 통과
- [ ] denylist 경로 미변경 (`next-auth.ts`·cookie·게스트 기본값·signIn 로직 금지)
- 구현은 이 레일 이슈(#83)와 같은 diff에 넣지 않는다. 후속 AI Task / Build 한 사이클.

### B-002 — SECURITY Phase1 (human gate)
- Scope: `NEXT_PUBLIC_*SECRET*` 제거·로테이션 — [`docs/security/NOTES.md`](../security/NOTES.md)
- [ ] Behavior: 클라이언트 번들에 OAuth/crypto secret 미노출 (서버 env로 이전)
- [ ] Test: `pnpm guard:harness` allowlist 축소 가능
- [ ] UI: N/A
- [ ] Gate: `pnpm verify:portfolio` 통과
- [ ] denylist: auth/cookie/crypto 경로는 **사람 승인 후에만** 수정
- **Blocked:** human gate — Build 루프가 단독으로 착수하지 말 것
