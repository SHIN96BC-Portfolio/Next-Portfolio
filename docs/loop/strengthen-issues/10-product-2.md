# 10 — 제품 루프 2 (DataTable)

- Status: `doing`
- STRENGTHEN: L-2 반복
- Type: Feature
- Loop: `ai-task`
- App: `@apps/user-portfolio`
- 8.x: 필수
- Depends: 09 merge
- GitHub: #70

## GitHub 본문 (복사)

제목: `[ai] B-005 bc-ui DataTable`

Type: Feature  
라벨: `ai-task`  
템플릿: AI Task

```yaml
app: @apps/user-portfolio
verify: pnpm verify:portfolio
backlog: B-005
cursor_build_model:
```

```markdown
## ☄️ 이슈 설명
1. 두 번째 제품 PR이다. #39 스모크·09와 별개다. 루프 8.x는 제품 2회가 필요하다
2. 09가 merge된 뒤에 주제를 채우고 ai-task를 붙인다. 09와 동시에 돌리지 않는다
3. BACKLOG 다음 id (B-004가 09면 B-005)

Goal:
무엇을: @core/bc-ui/table에 DataTable 셸. columns/rows/caption + empty 슬롯. 정렬·필터·URL·tanstack 없음. 새 subpath(exports + tsup). portfolio shared/table/ui facade re-export만. admin 화면 없음. BACKLOG에 B-005, B-004는 DONE으로. 보드 09 done #68, 10 이 이슈 doing.
왜: L-2 반복.
어디: core/bc-ui/src/table, portfolio shared/table/ui re-export.
하지 말 것: ConfirmDialog, CommonAlert, AuthGuard, next-auth, admin 페이지, tanstack, 정렬/필터 엔진, PageHeader, 타 앱.

AC:
- [ ] Behavior: @core/bc-ui/table에서 DataTable과 column/row 타입이 나간다. caption·header·cell이 렌더되고 rows가 비면 empty 슬롯이 보인다
- [ ] Unit: 프리젠테이션만이면 새 *.test.ts 없음. 훅·유틸을 빼면 같은 디렉터리 *.test.ts
- [ ] E2E: e2e-skip: bc-ui 프리미티브와 facade만, 라우트 동작 동일
- [ ] Gate: pnpm verify:portfolio
- [ ] denylist 미변경
- [ ] BACKLOG.md에 B-005, B-004는 BACKLOG-DONE.md
- [ ] strengthen-issues: 09 done #68, 10 이 이슈 doing. ConfirmDialog 파일 미변경
```

## 로그

- 2026-10-22: 티켓 초안, `blocked`
- 2026-10-23: GitHub #70. 주제 DataTable. Status `doing`
