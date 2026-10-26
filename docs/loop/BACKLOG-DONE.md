# BACKLOG-DONE

> 완료된 백로그 요약. `BACKLOG.md`에서 옮긴다.

## Done

### B-005 — bc-ui DataTable
- 완료: 2026-10-23 (#70). 보드 반영: 2026-10-26 (#76)
- 변경: DataTable 셸을 `@core/bc-ui/table`에 추가. portfolio `shared/table/ui` facade re-export
- Gate: `pnpm verify:portfolio` 통과

### B-004 — bc-ui ConfirmDialog
- 완료: 2026-10-23 (#68)
- 변경: `ConfirmDialog`를 CenterDialog 조립으로 추가. portfolio `shared/sheet/ui` facade re-export
- Gate: `pnpm verify:portfolio` 통과

### B-003 — Loop dry-run (Report → 문서만)
- 완료: 2026-10-21 (issue-39 → PR #44). 보드 반영: 2026-10-23 (#51)
- 변경: 클라우드 루프 1회 `PASS_TO_HUMAN`. 문서-only dry-run 항목은 파이프라인이 증명함
- Gate: `pnpm verify:portfolio` 통과

### B-001 — Layout header public API import
- 완료: 2026-09-21
- 변경: `LandingPageLayout` / `DocumentPageLayout` → `@FsdWidgets/header/ui` public import
- Gate: `pnpm verify:portfolio` 통과
