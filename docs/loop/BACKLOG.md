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

### B-004 — bc-ui ConfirmDialog
- Scope: `@apps/user-portfolio` (`core/bc-ui/src/sheet`, `apps/user/portfolio/src/fsd/shared/sheet/ui`)
- [ ] Behavior: @core/bc-ui/sheet에서 ConfirmDialog와 props 타입이 나간다. open일 때 title·description(또는 children)·confirm·cancel이 보인다. confirm은 onConfirm, cancel/X/backdrop은 CenterDialog onClose. tone=danger는 클래스만 다르게 (문자열 보간 클래스 금지)
- [ ] Unit: 프리젠테이션만이면 새 *.test.ts 없음. 훅·유틸을 빼면 같은 디렉터리 *.test.ts
- [ ] E2E: e2e-skip: bc-ui 프리미티브와 facade만, 라우트 동작 동일
- [ ] Gate: `pnpm verify:portfolio` 통과
- [ ] denylist 경로 미변경

### B-002 — SECURITY Phase1 (human gate)
- Scope: `NEXT_PUBLIC_*SECRET*` 제거·로테이션 — [`SECURITY-NOTES.tmp.md`](../../SECURITY-NOTES.tmp.md)
- [ ] Behavior: 클라이언트 번들에 OAuth/crypto secret 미노출 (서버 env로 이전)
- [ ] Test: `pnpm guard:harness` allowlist 축소 가능
- [ ] UI: N/A
- [ ] Gate: `pnpm verify:portfolio` 통과
- [ ] denylist: auth/cookie/crypto 경로는 **사람 승인 후에만** 수정
- **Blocked:** human gate — Build 루프가 단독으로 착수하지 말 것
