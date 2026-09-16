# Portfolio harness

에이전트·CI가 쓰는 **검증·안전 게이트** 현황입니다.  
자율 루프 메모리(`BACKLOG` / `STATE`)는 [`#32 루프엔지니어링 내용 정리.md`](../../#32%20루프엔지니어링%20내용%20정리.md) 트랙입니다.

## 게이트 명령

```bash
pnpm verify:portfolio   # typecheck + biome/fsd + unit + guard + e2e + build
pnpm guard:harness      # secret 스캔 + denylist diff 경고
```

Windows PowerShell에서는 루트 스크립트 안의 `&&`가 pnpm/cmd에서 동작합니다.  
로컬 e2e에서 Playwright Chromium 다운로드가 막히면:

```powershell
$env:PW_CHANNEL='chrome'; pnpm --filter @apps/user-portfolio run test:e2e
```

## 성숙도

| 단계 | 내용 | 상태 |
|------|------|------|
| H1 | lint / format / typecheck / 브랜치·커밋 훅 | 있음 |
| H2 | FSD Biome + `lint:fsd` / `AGENTS.md` | 있음 |
| H3 | `verify:portfolio` + Jest 씨앗 + PR CI | 있음 |
| H4 | Playwright smoke (MSW, locale 고정) | 있음 |
| H5 | denylist + `guard:harness` | 있음 |
| H6 | `.cursor/skills` (verify / plan-change / safe-edit) | 있음 |

## 관련 파일

- [`DENYLIST.md`](./DENYLIST.md) — human gate 경로
- [`scripts/guard-harness.mjs`](../../scripts/guard-harness.mjs)
- [`apps/user/portfolio/.env.example`](../../apps/user/portfolio/.env.example)
- [`.github/workflows/verify-portfolio.yml`](../../.github/workflows/verify-portfolio.yml)
- Cursor skills: `.cursor/skills/verify` · `plan-change` · `safe-edit`

## 규칙

- 변경 후 에이전트는 **`pnpm verify:portfolio`** 로 합격 여부를 말한다.
- denylist 경로·보안 민감 수정은 **사람 승인** 후에만 머지.
- 모노레포 전 앱을 한 verify에 묶지 않는다 (portfolio 스코프).
