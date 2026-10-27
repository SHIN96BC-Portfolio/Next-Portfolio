# loop-run-log

> 루프 시도·결과 이력. 최신이 위. Report/Build/Verify 스킬이 append한다.

## Schema

```markdown
### YYYY-MM-DDTHH:mm — <mode> — <item-id|none>
- result: ok | fail | skipped_paused | skipped_lock | reject | pass_to_human
- summary: …
- verify: pass | fail | n/a
- notes: …
```

---

## Log

### 2026-10-27T04:48 — build — B-006
- result: ok
- summary: #87 로그인 페이지·인터셉션 모달 제목·이메일·비밀번호·제출을 common 로케일 사전으로 이전. smoke e2e를 ko/en/ja 카피로 갱신. B-006 → BACKLOG-DONE.
- verify: pass
- notes: `.ai/review.md` 없음. 락은 ai-loop.sh 보유. HARNESS_DENYLIST_HITS=0. Claude loop-verify 인계.

### 2026-10-23 — verify — issue-70
- result: pass_to_human
- summary: #70 AC 충족. DataTable 셸(caption·th·td·empty 슬롯), table subpath exports/tsup, facade re-export만. verify:portfolio 통과 (guard:harness HITS=0, guard:tests OK).

### 2026-10-23T09:01 — build — B-005
- result: ok
- summary: #70 DataTable 셸을 @core/bc-ui/table에 추가. portfolio shared/table/ui facade re-export. BACKLOG B-005, 보드 09 done #68 / 10 doing #70. B-004 → BACKLOG-DONE.
- verify: pass
- notes: `.ai/review.md` 없음. 락은 ai-loop.sh 보유. HARNESS_DENYLIST_HITS=0. e2e-skip: bc-ui 프리미티브와 facade만, 라우트 동작 동일. ConfirmDialog 미변경. Claude loop-verify 인계.

### 2026-10-23 — verify — issue-68
- result: pass_to_human
- summary: #68 AC 충족. ConfirmDialog가 CenterDialog를 조립하고 tone은 정적 클래스 맵. verify:portfolio 통과 (e2e 6, jest 50, guard:harness HITS=0, guard:tests OK).
- notes: STATE.md WIP 블록 뒤 빈 줄 누락(`## Waiting on Human` 앞) — 비차단, 정리 권장.

### 2026-10-23T08:13 — build — B-004
- result: ok
- summary: #68 ConfirmDialog를 CenterDialog 조립으로 추가. portfolio sheet facade re-export. BACKLOG B-004, 보드 08 done #66 / 09 doing #68 / 10 blocked.
- verify: pass
- notes: `.ai/review.md` 없음. 락은 ai-loop.sh 보유. HARNESS_DENYLIST_HITS=0. e2e-skip: bc-ui 프리미티브와 facade만, 라우트 동작 동일. Claude loop-verify 인계.

### 2026-10-23T07:00 — verify — issue-66
- result: pass_to_human
- summary: #66 AC 충족. smoke e2e 4개 추가, 보드 02·04·05·06·07 done, 08 doing #66. verify:portfolio 통과 (e2e 6, jest 50, guard:harness HITS=0, guard:tests OK).

### 2026-10-23T06:53 — build — issue-66
- result: ok
- summary: #66 smoke e2e에 login·interception·print 경로 추가. 8.x 보드 02·04·05·06·07 done, 08 doing #66. 제품 코드 미변경.
- verify: pass
- notes: `.ai/review.md` 없음. 락은 ai-loop.sh 보유. HARNESS_DENYLIST_HITS=0. Claude loop-verify 인계.

### 2026-10-23T06:05 — verify — issue-62
- result: pass_to_human
- summary: #62 AC 충족. 테스트 2개만 추가, 구현·denylist 미변경. verify:portfolio 통과 (unit 50, guard:harness HITS=0, guard:tests OK).
- notes: e2e-skip: 페이지·위젯 미변경, 단위 테스트만 추가.

### 2026-10-23T05:58 — build — issue-62
- result: ok
- summary: #62 `login-schema.test.ts`·`password-strength.test.ts` 추가. 구현 ts 미변경.
- verify: pass
- notes: `.ai/review.md` 없음. 락은 ai-loop.sh 보유. e2e-skip: 페이지·위젯 미변경, 단위 테스트만 추가. Claude loop-verify 인계.

### 2026-10-23T05:14 — build — issue-56
- result: ok
- summary: #56 `entities/site`·`entities/content` 슬라이스 README 2장 추가. ts/tsx 미변경.
- verify: pass
- notes: `.ai/review.md` 없음. 락은 ai-loop.sh 보유. Claude loop-verify 인계.

### 2026-10-21 — verify — issue-39
- result: pass_to_human
- summary: AC 5건 충족. diff 는 테스트 1건 + 루프 문서. verify:portfolio 통과, HARNESS_DENYLIST_HITS=0.

### 2026-10-21T08:24 — build — issue-39
- result: ok
- summary: #39 removeMarkdownHeader undefined 단위 테스트 1건 추가. 구현 ts 미변경.
- verify: pass
- notes: `.ai/review.md` 없음. 락은 ai-loop.sh 보유. Claude loop-verify 인계.

### 2026-09-21 — docs — cleanup
- result: ok
- summary: #31/#32 md 폐기; DESIGN→docs/loop; dual runner (cloud/local); RUNNERS.md
- verify: n/a
- notes: ai-loop.yml runs-on + workflow_dispatch

### 2026-10-21T08:25 — actions — issue-39
- result: PASS_TO_HUMAN
- summary: issue #39 after loop (max 3)
- verify: `pnpm verify:portfolio` (log in artifact)
- notes: app=@apps/user-portfolio; issue=#39; backlog=none

### 2026-10-23 — verify — issue-56
- result: pass_to_human
- summary: AC 4건 충족. 신규 README 2장(site·content), 경로·export 이름 실제 파일과 일치. ts/tsx·AGENTS.md 미변경. verify:portfolio 통과, HARNESS_DENYLIST_HITS=0.

### 2026-10-23T05:15 — actions — issue-56
- result: PASS_TO_HUMAN
- summary: issue #56 after loop (max 3)
- verify: `pnpm verify:portfolio` (log in artifact)
- notes: app=@apps/user-portfolio; issue=#56; backlog=none

### 2026-10-23T06:00 — actions — issue-62
- result: PASS_TO_HUMAN
- summary: issue #62 after loop (max 3)
- verify: `pnpm verify:portfolio` (log in artifact)
- notes: app=@apps/user-portfolio; issue=#62; backlog=none

### 2026-10-23T06:54 — actions — issue-66
- result: PASS_TO_HUMAN
- summary: issue #66 after loop (max 3)
- verify: `pnpm verify:portfolio` (log in artifact)
- notes: app=@apps/user-portfolio; issue=#66; backlog=none

### 2026-10-23T08:15 — actions — B-004
- result: PASS_TO_HUMAN
- summary: issue #68 after loop (max 3)
- verify: `pnpm verify:portfolio` (log in artifact)
- notes: app=@apps/user-portfolio; issue=#68; backlog=B-004

### 2026-10-23T09:03 — actions — B-005
- result: PASS_TO_HUMAN
- summary: issue #70 after loop (max 3)
- verify: `pnpm verify:portfolio` (log in artifact)
- notes: app=@apps/user-portfolio; issue=#70; backlog=B-005

### 2026-10-27 — pre-pr — B-006
- result: pass_to_human
- summary: issue #87 login locale copy; AC met, gate green, HARNESS_DENYLIST_HITS=0
- verify: `pnpm verify:portfolio`
- notes: app=@apps/user-portfolio; backlog=B-006

### 2026-10-27T04:49 — actions — B-006
- result: PASS_TO_HUMAN
- summary: issue #87 after loop (max 3)
- verify: `pnpm verify:portfolio` (log in artifact)
- notes: app=@apps/user-portfolio; issue=#87; backlog=B-006
