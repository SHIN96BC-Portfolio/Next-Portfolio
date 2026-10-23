# 04 — 공개 레포 skip-permissions 축소

- Status: `done`
- GitHub: #54
- STRENGTHEN: L-4
- Type: Chore
- Loop: 사람 (denylist)
- 8.x: 필수
- Depends: 01 권장

## GitHub 본문 (복사)

제목: `공개 레포에서 AI 루프 Claude 기본 skip-permissions를 뺀다`

Type: Chore  
라벨: 없음 (`ai-task` 금지)  
브랜치: `chore/sbc/harness/#{이슈번호}`

```markdown
## ☄️ 이슈 설명
1. 공개 레포인데 AI 루프 Claude가 기본으로 권한을 건너뛴다
   - 레포 visibility는 이미 `public`이다
   - `scripts/ai-loop.sh` 기본값이 `AI_LOOP_CLAUDE_FLAGS=--dangerously-skip-permissions`이다
   - 익명 이슈만으로는 루프가 안 뜬다 (`author_association` OWNER|MEMBER|COLLABORATOR)
   - 그래도 신뢰된 이슈 본문 = 프롬프트인 공개 러너에서 skip-permissions가 기본인 것은 L-4 빈칸이다 (`docs/loop/STRENGTHEN.md`)
2. 방향: A — 기본 플래그에서 `--dangerously-skip-permissions`를 뺀다. `ai-task` 라벨 트리거는 유지한다
   - B(트리거를 `workflow_dispatch`만)는 하지 않는다. 06~08 제품·테스트 루프가 라벨로 돌아야 한다
   - GitHub-hosted에서 Plan이 `.ai/plan.md`를 쓰려면 `ensure_claude_unattended`(settings.json `skipDangerousModePermissionPrompt`)는 유지한다
   - 로컬에서 다시 넓히려면 env `AI_LOOP_CLAUDE_FLAGS`로만 덮어쓴다. 기본값을 되돌리지 않는다
   - 공개 레포에서 `run:local` 셀프 호스티드는 켜지 않는다
3. 고칠 파일은 denylist다. 사람만 수정한다. `ai-task` 금지
   - `scripts/ai-loop.sh` 기본 플래그
   - 문서가 기본값을 말하면 `docs/loop/ACTIONS-SETUP.md` §6b도 맞춘다
   - `.github/workflows/ai-loop.yml` 트리거(`issues.labeled`)는 이 이슈에서 바꾸지 않는다
4. 이 이슈에서 하지 말 것
   - 머지해 / APPROVE해 문구
   - 06~13 본작업, B-002, PAT 재설정
   - Playwright e2e를 끄거나 `HARNESS_E2E_SKIP`을 쓰는 것
```

## 로그

- 2026-10-22: 티켓 초안
- 2026-10-23: GitHub #54. 방향 A 구현 (기본 플래그 제거, unattended settings 유지)
- 2026-10-23: 후속 #57. 본 이슈는 done #54
