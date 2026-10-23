# 06 — login-schema · password-strength Jest

- Status: `done`
- STRENGTHEN: H-4 Jest
- Type: test
- Loop: `ai-task`
- App: `@apps/user-portfolio`
- 8.x: 필수
- Depends: 없음
- GitHub: #62

## GitHub 본문 (복사)

제목: `[ai] login-schema·password-strength 단위 테스트 추가`

Type: test  
라벨: `ai-task`  
템플릿: AI Task

Loop config:

```yaml
app: @apps/user-portfolio
verify: pnpm verify:portfolio
backlog:
cursor_build_model:
```

```markdown
## ☄️ 이슈 설명
1. 기존 구멍에 Jest만 보탠다. 스키마·유틸 동작은 바꾸지 않는다
   - `apps/user/portfolio/src/fsd/features/login/model/login-schema.ts`
   - `apps/user/portfolio/src/fsd/shared/validations/utils/password-strength.ts`
   - 각 옆 `*.test.ts`
2. `guard-tests.mjs` include를 확장하지 않는다. validations는 이미 범위다
3. ServiceImpl·e2e·UI는 이 이슈 밖이다 (08)

Goal:
무엇을: 위 두 모듈의 단위 테스트 추가.
왜: H-4. 로그인 검증 구멍이 guard:tests 이번 diff에만 안 잡힘.
어디: 해당 두 파일 + colocated test.
하지 말 것: 구현 변경, denylist, 타 앱, e2e.

AC:
- [ ] Behavior: 기존 login 검증 동작 동일
- [ ] Unit: login-schema.test.ts, password-strength.test.ts 추가·통과
- [ ] e2e-skip: 페이지·위젯 미변경
- [ ] Gate: pnpm verify:portfolio
- [ ] denylist 미변경
```

## 로그

- 2026-10-22: 티켓 초안
- 2026-10-23: GitHub #62. login-schema·password-strength Jest 머지. done
