# 07 — site · content 슬라이스 인덱스

- Status: `open`
- STRENGTHEN: C-3 인덱스
- Type: docs
- Loop: `ai-task`
- App: `@apps/user-portfolio`
- 8.x: 필수 (컨텍스트 8.x 본체)
- Depends: 없음. glob은 05
- GitHub: —

## GitHub 본문 (복사)

제목: `[ai] portfolio site·content 슬라이스 인덱스 한 장`

Type: docs  
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
1. portfolio `entities/site`, `entities/content` 인덱스를 만든다
   - 각 슬라이스: 폴더, public API, mapper, 건드리면 안 되는 것
   - REST / i18n / git 규칙은 README를 가리키기만 한다. 본문 복붙 없음
2. AGENTS.md 본문을 늘리지 않는다. Commands 축소는 이 이슈 밖이다
3. 애플리케이션 로직은 변경하지 않는다

Goal:
무엇을: site·content 인덱스 md.
왜: C-3. 매 턴 디렉터리 탐색 없이 슬라이스 지도.
어디: 해당 entities 슬라이스 아래 md. AGENTS 금지.
하지 말 것: AGENTS.md, 앱 로직, denylist.

AC:
- [ ] Behavior: site·content 각각(또는 한 장의 두 절) 인덱스가 있다
- [ ] e2e-skip: 페이지·위젯 미변경
- [ ] Gate: pnpm verify:portfolio
- [ ] denylist 미변경. AGENTS.md 미변경
```

## 로그

- 2026-10-22: 티켓 초안
