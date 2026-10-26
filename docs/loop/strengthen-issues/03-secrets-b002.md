# 03 — 클라이언트 시크릿 제거 (B-002)

- Status: `blocked`
- STRENGTHEN: H-2
- Type: Chore
- Loop: 사람 (`ai-task` 금지)
- 8.x: 선 위 P0
- Depends: [`docs/security/NOTES.md`](../../security/NOTES.md)
- GitHub: —

## GitHub 본문 (복사)

제목: `NEXT_PUBLIC 시크릿을 서버 env로 옮기고 allowlist를 줄인다`

Type: Chore  
라벨: 없음 (`ai-task` 금지)

```markdown
## ☄️ 이슈 설명
1. 클라이언트 번들에서 OAuth client secret·쿠키/스토리지 키를 제거한다
   - 기존 항목: `docs/loop/BACKLOG.md` B-002
   - 상세: [`docs/security/NOTES.md`](../../security/NOTES.md)
   - 코드 이전 전에 `SECRET_ALLOWLIST`만 지우면 게이트만 깨진다. 순서는 이전 후 축소
2. `pnpm guard:harness`가 해당 이름에 fail해야 한다
3. auth / cookie / crypto 경로는 사람만 수정한다. 루프 Build가 단독 착수하지 않는다
4. `pnpm verify:portfolio` 통과
```

## 로그

- 2026-10-22: 티켓 초안, `blocked`
