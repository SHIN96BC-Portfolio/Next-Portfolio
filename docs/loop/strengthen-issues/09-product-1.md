# 09 — 제품 루프 1 (ConfirmDialog)

- Status: `doing`
- STRENGTHEN: L-2
- Type: Feature
- Loop: `ai-task`
- App: `@apps/user-portfolio`
- 8.x: 필수
- Depends: 사람 주제. 02의 B-003과 별개
- GitHub: #68

## GitHub 본문 (복사)

제목: `[ai] B-004 bc-ui ConfirmDialog`

Type: Feature  
라벨: `ai-task`  
템플릿: AI Task

```yaml
app: @apps/user-portfolio
verify: pnpm verify:portfolio
backlog: B-004
cursor_build_model:
```

```markdown
## ☄️ 이슈 설명
1. 제품 항목 하나를 루프가 끝낸다. issue-39 스모크와 다른 제품 diff다
2. 열기 전에 주제를 이 절에 채운다. 빈 주제로 ai-task를 붙이지 않는다
   - 무엇을 / 왜 / 어디 / 하지 말 것
3. `docs/loop/BACKLOG.md`에 B-004를 템플릿(Behavior / Unit / E2E / Gate)으로 넣는다
4. 01이 끝났으면 이 PR 작성자가 봇인지 확인한다
5. 이슈에 머지해 / APPROVE해를 쓰지 않는다

Goal:
무엇을: @core/bc-ui sheet에 ConfirmDialog. 기존 CenterDialog 조립. 확인/취소, tone default|danger.
왜: L-2. 루프에 제품 먹이.
어디: core/bc-ui/src/sheet, portfolio shared/sheet/ui re-export.
하지 말 것: CommonAlert 교체, AuthGuard, next-auth, HTML 주입, DataTable, PageHeader, admin, 타 앱, 10번.

AC:
- [ ] Behavior: @core/bc-ui/sheet에서 ConfirmDialog와 props 타입이 나간다. open일 때 title·description(또는 children)·confirm·cancel이 보인다. confirm은 onConfirm, cancel/X/backdrop은 CenterDialog onClose. tone=danger는 클래스만 다르게 (문자열 보간 클래스 금지)
- [ ] Unit: 프리젠테이션만이면 새 *.test.ts 없음. 훅·유틸을 빼면 같은 디렉터리 *.test.ts
- [ ] E2E: e2e-skip: bc-ui 프리미티브와 facade만, 라우트 동작 동일
- [ ] Gate: pnpm verify:portfolio
- [ ] denylist 미변경
```

## 로그

- 2026-10-22: 티켓 초안, `blocked` (주제 없음)
- 2026-10-23: GitHub #68. 주제 ConfirmDialog. Status `doing`
