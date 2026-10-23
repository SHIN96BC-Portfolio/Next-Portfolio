# 08 — login / print / interception e2e

- Status: `doing`
- STRENGTHEN: H-4 e2e
- Type: test
- Loop: `ai-task`
- App: `@apps/user-portfolio`
- 8.x: 필수
- Depends: 없음
- GitHub: #66

## GitHub 본문 (복사)

제목: `[ai] portfolio smoke에 login·print·interception 경로를 넣는다`

Type: test  
라벨: `ai-task`  
템플릿: AI Task

```yaml
app: @apps/user-portfolio
verify: pnpm verify:portfolio
backlog:
cursor_build_model:
```

```markdown
## ☄️ 이슈 설명
1. `apps/user/portfolio/e2e/smoke.spec.ts`에 라우트 케이스를 보탠다
   - 지금: `/ko`, `/ko/resume`만
   - 추가: `/[lang]/login`, print, interception login
2. 제품 UI 동작은 바꾸지 않는다
3. HARNESS_E2E_SKIP으로 우회하지 않는다. snap을 CI 기본에 넣지 않는다

Goal:
무엇을: smoke e2e에 login / print / interception.
왜: H-4. full 게이트가 홈·이력서만 본다.
어디: e2e 스펙만.
하지 말 것: UI 리디자인, denylist, 타 앱.

AC:
- [ ] Behavior: 해당 라우트가 e2e에서 로드·주요 landmark가 보인다
- [ ] E2E: smoke.spec.ts (또는 같은 앱 e2e/) 갱신
- [ ] Gate: pnpm verify:portfolio
- [ ] denylist 미변경
```

## 로그

- 2026-10-22: 티켓 초안
- 2026-10-23: GitHub #66. smoke e2e에 login·print·interception 경로 추가
