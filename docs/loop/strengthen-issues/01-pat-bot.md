# 01 — 8.x 보드 문서 + 루프 PAT 분리

- Status: `doing`
- STRENGTHEN: 6.2 + 보드 커밋 (워킹트리)
- Type: Chore
- Loop: 사람 (`ai-task` 금지)
- 8.x: 필수
- Depends: 없음
- GitHub: #49

이 PR에 지금 untracked/modified 문서를 같이 올린다. PAT는 같은 이슈의 GitHub Settings 작업이다.

## GitHub 본문 (복사)

제목: `8.x 강화 보드 문서 커밋 + 루프 PAT를 소유자와 분리`

Type: Chore  
라벨: 없음 (`ai-task` 금지)

```markdown
## ☄️ 이슈 설명
1. 컨텍스트·하네스·루프 8.x 목표 문서와 로컬 이슈 보드를 master에 올린다
   - 포함 파일: `docs/loop/STRENGTHEN.md`, `docs/loop/STRENGTHEN-REBUTTAL.md`, `docs/loop/strengthen-issues/**`
   - 인덱스만: `docs/loop/DESIGN.md` 현황 footer, `docs/loop/README.md`, `docs/loop/ROADMAP.md` 상단 STRENGTHEN 링크
   - STATE.md, BACKLOG.md, BACKLOG-DONE.md, DESIGN L38(`loop: paused`)은 이 PR에서 고치지 않는다 (02)
2. 루프 `AI_BOT_TOKEN` GitHub 유저를 `@SHIN96BC`가 아닌 봇 계정으로 바꾼다
   - 절차: `docs/loop/ACTIONS-SETUP.md` §6.2
   - Fine-grained PAT: Contents RW, Pull requests RW, Issues RW
   - ruleset Bypass에 봇·github-actions를 넣지 않는다
   - 봇 PAT를 넣기 전에 Variables를 먼저 둔다
     - `LOOP_GIT_AUTHOR_NAME` = `SHIN96BC`
     - `LOOP_GIT_AUTHOR_EMAIL` = `87517304+SHIN96BC@users.noreply.github.com`
3. 이 이슈에서 02~13 본작업을 하지 않는다
4. 보드 초안·반박 파일은 13번 이슈 PR에 삭제 diff로 같이 올라간다. 13 머지 후 따로 지우지 않는다
```

## AC

- [ ] 위 문서가 default 브랜치에 있다
- [ ] STATE / BACKLOG / DESIGN L38은 이 PR에서 안 바뀐다
- [ ] Variables: NAME=`SHIN96BC`, EMAIL=`87517304+SHIN96BC@users.noreply.github.com` (봇 PAT보다 먼저)
- [ ] `AI_BOT_TOKEN` 유저 ≠ `@SHIN96BC`. Bypass 비움
- [ ] 다음 루프 PR 작성자 = 봇 (02 이후에서 확인해도 됨)
- [ ] 봇 `biome.json` PR → `harness-owner-gate` 실패, 소유자 Approve 후 통과
- [ ] 봇 `gh pr merge` → ruleset 거절

## 하지 말 것

- `ai-task`
- 02 living doc (STATE Waiting, B-003 DONE)
- ruleset Bypass에 봇 추가

## 로그

- 2026-10-22: 티켓 초안. 워킹트리 문서를 이 이슈 PR에 포함
