# 05 — site/content glob rule

- Status: `open`
- STRENGTHEN: C-3 glob
- Type: docs
- Loop: 사람
- 8.x: 필수
- Depends: 07과 같이 또는 직후
- GitHub: —

## GitHub 본문 (복사)

제목: `portfolio site·content 슬라이스 glob rule만 추가한다`

Type: docs  
라벨: 없음

```markdown
## ☄️ 이슈 설명
1. `entities/site`, `entities/content`를 열 때만 인덱스·README 포인터가 로드되도록 `.cursor/rules` glob을 둔다
   - 본문은 링크만. FSD·REST 규칙을 여기 복붙하지 않는다
2. AGENTS.md 본문을 이 이슈에서 늘리거나 줄이지 않는다
3. 07 슬라이스 인덱스와 경로가 맞아야 한다. 07이 먼저면 그 파일 경로를 glob에 넣는다
```

## 로그

- 2026-10-22: 티켓 초안
