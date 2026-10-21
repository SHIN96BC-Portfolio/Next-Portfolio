# AI loop runners — cloud VM vs local self-hosted

> 원본 개념: `sbc/ai-loop-runner-selection.md`  
> 워크플로: [`.github/workflows/ai-loop.yml`](../../.github/workflows/ai-loop.yml)  
> Secrets/라벨: [`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md)

## 개념

AI 모델 성능은 어디서 돌리든 같다. 차이는 **실행 환경**(사양, 로컬 DB/MCP, 캐시, 시간 제한).

| 선택 | 조건 | 실행 위치 |
|------|------|-----------|
| 클라우드 | `ai-task` 만 | GitHub 호스팅 `ubuntu-latest` |
| 로컬 | `run:local` + `ai-task` | 셀프 호스티드 (`self-hosted`, `ai-local`) |
| 수동 | Actions → Run workflow | `cloud` / `local` 드롭다운 |

### 작업별 추천

| 로컬 | GitHub VM |
|------|-----------|
| 무거운 빌드/테스트 | 문서·가벼운 픽스 |
| 로컬 DB, MCP 필요 | 간단한 기능 |
| 긴 리팩터 | PC 꺼도 되는 작업 |

## 셀프 호스티드 러너 (사람)

1. 레포 → Settings → Actions → Runners → **New self-hosted runner**
2. OS별 안내대로 설치
3. 라벨 `ai-local` 추가  
   `./config.sh --url … --token … --labels ai-local`
4. 서비스 등록 (`svc.sh install/start`) — PC 재부팅 후에도 수신
5. 로컬에 미리: Node 22+, pnpm, Claude Code CLI, Cursor CLI(`agent`), Playwright(chromium), `pnpm install`
6. 레포에 GitHub 라벨 **`run:local`** 생성

**비공개 레포에서만** 셀프 호스티드 사용. 공개 레포는 외부 이슈로 내 PC가 실행될 수 있음.

## 라벨 순서

워크플로는 **`ai-task`가 붙는 순간** 실행된다.  
로컬로 돌리려면 **`run:local`을 먼저** 붙이거나, 이슈 생성 시 두 라벨을 한 번에 지정.

## concurrency

`ai-loop-local` / `ai-loop-cloud` 로 분리 — 한쪽이 다른 쪽을 막지 않음.  
둘 다 돌리면 Claude/Cursor **구독 한도는 공유**.  
레포 워킹트리의 `pnpm loop:lock` / `LOOP.md` `max_concurrent_loops` 와는 **별층** (클라우드 VM과 로컬 PC는 lock 파일을 공유하지 않음).

## 설치 단계

| 단계 | github-hosted | self-hosted |
|------|---------------|-------------|
| setup pnpm/node | ✅ | 스킵 (로컬 설치 가정) |
| AI CLI 설치 | ✅ | 스킵 |
| Playwright 브라우저 | ✅ | 스킵 (로컬 설치 가정) |
| `pnpm install` | ✅ | ✅ (브랜치마다) |
| `.ai/` 정리 | ✅ | ✅ (잔여 스크래치 방지) |

## workflow_dispatch

Actions 탭 → **AI Loop** → Run workflow  
- issue number  
- target: `cloud` | `local`

## 주의

| 항목 | 내용 |
|------|------|
| PC 꺼짐 | 로컬 잡은 **대기** (최대 ~24h) |
| 권한 | 로컬은 일회용 VM이 아님. 가능하면 Docker/`AI_LOOP_CLAUDE_FLAGS`로 제한 ([`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md)) |
| 한도 | 로컬+클라우드 동시 → 구독 한도 같이 소모 |

## 체크리스트

- [ ] 셀프 호스티드 + `ai-local` + 서비스
- [ ] 로컬 CLI/의존성/Playwright
- [ ] 라벨 `run:local` (+ 기존 `ai-task`)
- [ ] 클라우드/로컬 스모크 각 1회
