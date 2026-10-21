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

### 2026-09-21 — docs — cleanup
- result: ok
- summary: #31/#32 md 폐기; DESIGN→docs/loop; dual runner (cloud/local); RUNNERS.md
- verify: n/a
- notes: ai-loop.yml runs-on + workflow_dispatch
