# Loop roadmap

후순위·합의 대기 체크리스트. **운영 SoT는 여기가 아니라** harness / LOOP / ACTIONS-SETUP.

## maturity: lite vs full

`scripts/app-gates.mjs` / `verify-app.mjs`:

| maturity | 포함 | 현재 |
|----------|------|------|
| **full** | typecheck + biome + unit + guard(+tests) + **e2e** + build | `portfolio`만 |
| **lite** | typecheck + biome + guard + build (+ test 있으면) | commerce, fashion, social, admin-* |

**lite → full** = 해당 앱에 Playwright smoke 등 추가 후 `maturity: 'full'`. 필수가 아니라 품질 올릴 때.

## 타 앱

- [x] `verify:<short>` lite 전 앱
- [ ] 앱별 e2e → full 승격 (필요 시)
- [ ] `verify-<app>.yml` CI (필요 시)

## Actions / runners

- [x] cloud + local dual runner ([`RUNNERS.md`](./RUNNERS.md))
- [ ] Secrets·러너 등록·스모크 — 사람 ([`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md))

## 하네스 선택·품질

- [ ] `HARNESS_STRICT_DENYLIST=1` 를 PR 기본으로 켤지
- [ ] `snap`을 CI 기본 verify에 넣을지
- [ ] Jest 커버리지 확대 (mapper 외)
- [ ] SECURITY 코드 반영(B-002) 후 `guard-harness` allowlist 축소
- [ ] SECURITY-NOTES.tmp → `docs/` 정식화 후 AGENTS 링크
