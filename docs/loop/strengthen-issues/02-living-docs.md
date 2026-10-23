# 02 — DESIGN / STATE / ROADMAP 정합 + B-003 DONE

- Status: `doing`
- STRENGTHEN: C-1, L-2 위생
- Type: docs
- Loop: 사람 (`ai-task` 없음)
- 8.x: 일부. 컨텍스트 8.x는 07
- Depends: 01 merge (STRENGTHEN이 master에 있는 뒤)
- GitHub: #51

## GitHub 본문 (복사)

제목: `DESIGN·STATE living doc을 런타임과 맞추고 B-003을 DONE으로 옮긴다`

Type: docs  
라벨: 없음

```markdown
## ☄️ 이슈 설명
1. `docs/loop/DESIGN.md` L38 `기본 loop: paused`를 지운다. kill switch는 STATE.md만 가리킨다 (`running` | `paused`)
   - 현황 표는 STATE로 복제하지 않는다
2. `docs/loop/STATE.md` Waiting on Human에서 이미 끝난 줄을 지운다
   - 삭제: ruleset에 harness-owner-gate 추가 (2026-10-21 완료)
   - 삭제: Secrets / ai-task / run:local / 브랜치 보호를 통째 미완으로 둔 줄
   - 유지: B-002
   - 유지 또는 01 잔여: 6.2 PAT (01이 끝났으면 이 줄도 삭제)
   - run:local은 공개 레포라 대기 목록에 넣지 않는다
3. `docs/loop/ROADMAP.md` Actions 스모크 칸을 클라우드 1회 완료로 체크한다 (issue-39 / PR #44)
4. B-003을 `docs/loop/BACKLOG-DONE.md`로 옮긴다. issue-39가 파이프라인을 증명했다
   - 제품 B-004는 이 이슈에서 만들지 않는다 (09)
5. `docs/loop/LOOP.md`는 수정하지 않는다
```

## 로그

- 2026-10-22: 티켓 초안
- 2026-10-23: GitHub #51. DESIGN L38, STATE Waiting, ROADMAP 스모크, B-003 DONE
