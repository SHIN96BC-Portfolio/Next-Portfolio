# 09 — 제품 루프 1

- Status: `blocked`
- STRENGTHEN: L-2
- Type: Feature
- Loop: `ai-task`
- 8.x: 필수
- Depends: 사람 주제. 02의 B-003과 별개
- GitHub: —

## GitHub 본문 (복사)

제목: `[ai] B-004 <주제 — 열 때 채움>`

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
무엇을: (주제)
왜: L-2. 루프에 제품 먹이.
어디: (경로)
하지 말 것: denylist, 타 앱, 주제 밖 리팩터.

AC:
- [ ] Behavior: (주제)
- [ ] Unit: 로직 변경 시 *.test.ts
- [ ] E2E: 페이지·위젯이면 스펙 또는 e2e-skip: 사유
- [ ] Gate: pnpm verify:portfolio
- [ ] denylist 미변경
```

## 로그

- 2026-10-22: 티켓 초안, `blocked` (주제 없음)
