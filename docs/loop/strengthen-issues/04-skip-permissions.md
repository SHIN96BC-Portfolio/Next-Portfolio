# 04 — 공개 레포 skip-permissions 축소

- Status: `open`
- STRENGTHEN: L-4
- Type: Chore
- Loop: 사람 (denylist)
- 8.x: 필수
- Depends: 01 권장
- GitHub: —

## GitHub 본문 (복사)

제목: `공개 레포에서 AI_LOOP_CLAUDE_FLAGS 기본 skip-permissions를 줄인다`

Type: Chore  
라벨: 없음 (`ai-task` 금지)

```markdown
## ☄️ 이슈 설명
1. 레포는 이미 public이다. `scripts/ai-loop.sh` 기본값 `--dangerously-skip-permissions`를 줄이거나, `ai-loop.yml` 트리거를 workflow_dispatch만으로 좁힌다
   - 사람 결정을 본문에 한 줄로 적고 그 방향으로만 고친다
   - 익명 이슈는 이미 author_association이 막는다
2. 해당 파일은 denylist. 사람만 수정한다
3. 이슈 본문에 머지해 / APPROVE해를 쓰지 않는 정책은 유지한다
4. 공개 레포에서 run:local 셀프 호스티드는 켜지 않는다
```

## 로그

- 2026-10-22: 티켓 초안
