# 11 — master-admin next-auth denylist

- Status: `open`
- STRENGTHEN: H-3
- Type: Chore
- Loop: 사람
- 8.x: 선 위
- Depends: 8.x 이후. 01이 있어야 봇 PR 판정이 의미 있음
- GitHub: —

## GitHub 본문 (복사)

제목: `master-admin next-auth.ts를 DENYLIST와 CODEOWNERS에 넣는다`

Type: Chore  
라벨: 없음 (`ai-task` 금지)

```markdown
## ☄️ 이슈 설명
1. `apps/admin/master-admin`의 next-auth.ts를 denylist 앱 절과 CODEOWNERS에 추가한다
   - `.env*`·deploy는 이미 있다. auth 소스만 구멍이다
2. 그 파일 diff가 있는 봇 PR은 harness-owner-gate 대상이 되어야 한다 (01 이후)
3. next-auth 로직 리라이트는 03이다. 이 이슈는 경로만
```

## 로그

- 2026-10-22: 티켓 초안
