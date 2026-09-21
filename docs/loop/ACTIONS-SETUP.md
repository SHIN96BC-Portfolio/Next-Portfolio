# Actions AI loop — 사람 셋업 체크리스트

레포에 워크플로·스크립트는 있어도 **Secrets·라벨·브랜치 보호**는 GitHub UI에서 켠다.

- 이슈 작성: [`AI-TASK-PROMPT.md`](./AI-TASK-PROMPT.md)  
- env / result / 트리거: [`ISSUE-GUIDE.md`](./ISSUE-GUIDE.md) (`ISSUE_*`·`ACTIVE_*`는 Secrets 아님)  
- 러너 선택·self-hosted 설치: [`RUNNERS.md`](./RUNNERS.md)

## 1. Repository Secrets

Settings → Secrets and variables → Actions

| Name | 용도 | 필수 |
|------|------|------|
| `CLAUDE_CODE_OAUTH_TOKEN` | Claude Code CLI (Plan·Pre-PR) | ✅ |
| `CURSOR_API_KEY` | Cursor CLI `agent` (Build) | ✅ |
| `AI_BOT_TOKEN` | Fine-grained PAT — push/PR/이슈 (CI 트리거용) | 권장 |

### Claude

```bash
claude setup-token
```

출력 토큰 → `CLAUDE_CODE_OAUTH_TOKEN`.

### Cursor

Cursor 대시보드 → Integrations → User API Keys → `CURSOR_API_KEY`  
on-demand 한도 **0** 권장 (플랜 초과 과금 방지).

### AI_BOT_TOKEN

Fine-grained PAT: Contents RW, Pull requests RW, Issues RW.  
없으면 `GITHUB_TOKEN`으로 동작하나, 그 PR은 다른 workflow를 안 띄울 수 있다.

기본 토큰만 쓸 때: Settings → Actions → General → **Allow GitHub Actions to create and approve pull requests**.

## 2. 라벨

| 라벨 | 용도 |
|------|------|
| `ai-task` | AI 루프 실행 (필수 트리거) |
| `run:local` | 셀프 호스티드 (`run:local` **먼저** 또는 이슈 생성 시 함께) |

설치·라벨 순서·concurrency: [`RUNNERS.md`](./RUNNERS.md)

## 3. 브랜치 보호 (사람 merge)

default branch (master/main):

- [ ] PR 필수
- [ ] **사람 승인(APPROVE) 필수** — AI bot은 APPROVE하지 않음
- [ ] 가능하면 required status: `verify:portfolio`
- [ ] auto-merge 끄기

## 4. Cursor on-demand

대시보드에서 추가 과금 한도 0.

## 5. (선택) Cursor Build 모델 분리

Claude Pre-PR과 Build 모델을 나누려면:

1. 이슈 Loop config: `cursor_build_model: <id>` ([`AI-TASK-PROMPT.md`](./AI-TASK-PROMPT.md))
2. 또는 Variables → `CURSOR_BUILD_MODEL` (전 실행 기본)

`agent --help`로 모델 id 확인. 비우면 계정 기본.

## 6. (선택) Strict denylist

Variables → Actions:

- Name: `HARNESS_STRICT_DENYLIST` · Value: `1`

→ `verify-portfolio` CI에서 denylist 경로 변경 시 fail.  
로컬: `pnpm guard:harness:strict` · 후순위 합의: [`ROADMAP.md`](./ROADMAP.md)

## 6b. (선택) 로컬 self-hosted Claude 플래그

`scripts/ai-loop.sh` 기본: `AI_LOOP_CLAUDE_FLAGS=--dangerously-skip-permissions`  
(비대화형 CI용). 로컬 러너에서 더 엄격히 하려면 job/환경에 예를 들어:

```bash
export AI_LOOP_CLAUDE_FLAGS=""   # 또는 Claude Code가 허용하는 더 좁은 플래그
```

가능하면 self-hosted를 Docker/`ai-local` 전용 유저로 격리하고, **공개 레포에서는 self-hosted를 쓰지 않는다** ([`RUNNERS.md`](./RUNNERS.md)).

## 7. 첫 실행 스모크

### 클라우드

1. `STATE.md` → `loop: running`
2. 이슈 + **`ai-task`만**
3. `PASS_TO_HUMAN` → 사람 APPROVE/merge
4. 평소 `loop: paused`

### 로컬

1. [`RUNNERS.md`](./RUNNERS.md) 체크리스트 (`ai-local`, CLI, Playwright)
2. **`run:local` 먼저** → `ai-task` (또는 동시)
3. 또는 Actions → AI Loop → Run workflow → target **local**

## 보안

- 외부 collaborator 이슈만으로는 실행 안 됨 (`author_association` — [`GITHUB-ACTIONS.md`](./GITHUB-ACTIONS.md))
- 이슈 본문 = 프롬프트 → 인젝션·시크릿 붙여넣기 금지 ([`AI-TASK-PROMPT.md`](./AI-TASK-PROMPT.md))
- denylist: 스킬 제약 + `pnpm guard:harness` 이중 점검
