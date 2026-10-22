# 10 — 제품 루프 2

- Status: `blocked`
- STRENGTHEN: L-2 반복
- Type: Feature
- Loop: `ai-task`
- 8.x: 필수
- Depends: 09 merge
- GitHub: —

## GitHub 본문 (복사)

제목: `[ai] B-005 <주제 — 09 다음>`

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
무엇을: (주제)
왜: L-2 반복.
어디: (경로)
하지 말 것: denylist, 09와 동시 라벨.

AC:
- [ ] Behavior: (주제)
- [ ] Unit: 로직 변경 시 *.test.ts
- [ ] E2E: 페이지·위젯이면 스펙 또는 e2e-skip: 사유
- [ ] Gate: pnpm verify:portfolio
- [ ] denylist 미변경
```

## 로그

- 2026-10-22: 티켓 초안, `blocked`
