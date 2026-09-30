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

## 3. 브랜치 보호 — AI가 merge 못하게 (필수)

프롬프트만으로는 에이전트가 `gh pr merge`를 칠 수 있다.  
**default branch Ruleset으로 머지 주체를 사람만** 둔다.

### 3.1 Ruleset 만들기 (권장)

1. GitHub 레포 → **Settings** → **Rules** → **Rulesets** → **New branch ruleset**
2. Ruleset Name 예: `protect-default-no-ai-merge`
3. Enforcement status: **Active**
4. Target branches → **Include** → **Default branch** (`master` / `main`)
5. Rules에서 켤 것:

| 규칙 | 설정 |
|------|------|
| Restrict deletions | On |
| Block force pushes | On |
| Require a pull request before merging | On |
| Required approvals | **0** 가능 (혼자 + 잔디/자기승인 이슈 피하려면 0) |
| Require status checks to pass | On → `verify:portfolio` (이름 CI에 맞게) |
| **Restrict who can push** (또는 merge 제한) | On → **본인(사람)만** 허용. AI 봇·`github-actions`는 넣지 않음 |
| Bypass list | 비우거나 **본인만**. AI 계정 bypass 금지 |
| Allow auto-merge | **Off** (레포 Settings → General에서도 끄기) |

UI 문구는 GitHub 버전에 따라 **“Restrict who can push to matching branches”** / **“Restrict updates”** / merge 관련 restrict로 보일 수 있다.  
핵심은 **default에 코드를 넣는 행위(직푸시·merge)를 사람 계정만** 하게 하는 것이다.

### 3.2 Approve를 쓸 때 (선택)

- Required approvals ≥ 1  
- PR 작성자가 **나**이면 내 Approve가 required로 안 잡히는 경우가 많음  
- 그때는 봇 계정으로 PR을 올리거나, Approve 대신 **§3.1 머지 주체 제한**만 써도 충분  

### 3.3 AI 토큰

`AI_BOT_TOKEN`(Fine-grained PAT) 최소:

- Contents: Read and write (기능 브랜치 push)
- Pull requests: Read and write (PR 생성·코멘트)
- Issues: Read and write  

**토큰에 “master merge만 끄기” 스위치는 없다.**  
merge 차단은 §3.1 Ruleset이 한다. 봇 유저를 merge/bypass 목록에 넣지 말 것.

### 3.4 스모크

1. 사람 계정으로 작은 PR → Merge 가능해야 함  
2. AI/봇 토큰으로 `gh pr merge <n>` → **거절**되어야 함  
3. Actions AI loop는 `gh pr create`까지만 (merge 스텝 없음) — [`GITHUB-ACTIONS.md`](./GITHUB-ACTIONS.md)

---

## 4. Cursor on-demand

대시보드에서 추가 과금 한도 0.

## 5. (선택) Cursor Build 모델 분리

Claude Pre-PR과 Build 모델을 나누려면:

1. 이슈 Loop config: `cursor_build_model: <id>` ([`AI-TASK-PROMPT.md`](./AI-TASK-PROMPT.md))
2. 또는 Variables → `CURSOR_BUILD_MODEL` (전 실행 기본)

`agent --help`로 모델 id 확인. 비우면 계정 기본.

## 6. 보호 파일 잠금 — 사람이 직접 하는 설정

레포의 보호 경로를 로컬 `pnpm guard:harness` 가 실패로 막지는 않는다.  
그 가드는 PR 브랜치의 스크립트를 실행하므로, 로컬 실패는 에이전트가 가드를 같이 고치면 사라진다.  
봇 PR 을 막는 GitHub 검사 이름은 **`harness-owner-gate`** 다.  
워크플로는 `pull_request_target` 이라 **default 브랜치에 있는 파일**만 실행한다.  
이 변경을 default 에 머지하기 전에는 체크가 생기지 않는다.

소유자 로그인는 `.github/CODEOWNERS` 의 `@SHIN96BC` 다.  
`@mousecjf-ui` 도 본인 계정이면 CODEOWNERS 각 줄에 추가한 뒤, 그 수정까지 포함해 머지한다.

### 6.1 이 잠금을 default 에 넣기

브랜치 훅은 `{type}/{name}/#{이슈번호}` 만 허용한다. 예: `chore/sbc/#0`  
커밋 메시지는 `[chore/sbc] 보호 파일 잠금` 형식이다.

로컬 커밋을 풀어 주는 환경변수는 없다. 보호 파일 커밋도 보통의 `git commit` 으로 한다.  
봇이 그 파일을 넣은 PR 을 막는 검사는 머지 뒤에 켜지는 `harness-owner-gate` 다.  
머지는 **본인 계정**으로 한다. 봇 토큰으로 default 에 넣지 않는다.

### 6.2 AI 봇 계정을 소유자와 분리

Settings → Secrets and variables → Actions → `AI_BOT_TOKEN`

이 토큰의 GitHub 사용자는 `@SHIN96BC` 이면 안 된다.  
owner gate 는 PR 작성자가 CODEOWNERS 소유자면 그 보호 파일을 통과시킨다.  
봇이 소유자 계정이면 봇이 연 PR 도 통과한다.

Fine-grained PAT 권한은 기존과 같다. Contents RW, Pull requests RW, Issues RW.  
봇 사용자를 아래 bypass 목록에 넣지 않는다.

### 6.3 Ruleset

1. 레포 페이지 → **Settings** → 왼쪽 **Rules** → **Rulesets**
2. 이미 default 를 보호하는 ruleset 이 있으면 그것을 연다. 없으면 **New ruleset** → **New branch ruleset**
3. Ruleset Name 예: `protect-default-no-ai-merge`
4. Enforcement status: **Active**
5. Bypass list: 비운다. 여기 있는 계정은 필수 체크와 코드 오너 리뷰를 건너뛴다. AI 봇·`github-actions` 는 넣지 않는다
6. Target branches → **Add target** → **Include default branch**
7. Rules 에서 켠다
   - **Restrict deletions**
   - **Block force pushes**
   - **Require a pull request before merging**
     - Required approvals: 혼자 개발이면 **0** 이어도 된다. 보호 파일은 아래 코드 오너와 status check 가 맡는다
     - Allow specified actors to bypass 는 켜지 않는다
   - **Require review from Code Owners**
   - **Require status checks to pass**
     - 검색해서 추가: `harness-owner-gate`
     - 이미 쓰던 체크: `verify:portfolio`
     - 워크플로가 default 에 머지된 뒤 한 번 PR 을 열어야 체크 이름이 목록에 나타난다. 그 전에 이름이 없으면 머지 후 첫 PR 에서 다시 이 화면으로 와 추가한다
   - **Require conversation resolution** 은 선택
8. 레포 **Settings → General → Pull Requests** 에서 **Allow auto-merge** 를 끈다

GitHub 는 PR 작성자가 자기 PR 을 Approve 하지 못한다.  
그래서 “Require review from Code Owners” 만으로는 소유자 본인이 연 보호 파일 PR 이 영원히 승인 대기일 수 있다.  
`harness-owner-gate` 는 작성자가 `@SHIN96BC` 이면 그 파일에 대해 통과시키고, 봇이 연 PR 만 Approve 를 요구한다.  
필수 체크는 `harness-owner-gate` 를 넣으면 된다. Code Owners 리뷰 필수는 봇 PR 에 리뷰 요청이 뜨게 하는 보강이다. 본인 PR 이 그 규칙 때문에 머지 버튼이 막히면, Required approvals 를 0으로 둔 상태에서 Code Owners 필수가 작성자 본인까지 막는지 확인하고, 막히면 Code Owners 필수 대신 status check 만 필수로 둔다.

### 6.4 켜진 뒤 확인

1. 제품 코드만 바꾼 PR → `harness-owner-gate` 는 보호 경로가 없으면 성공해야 한다
2. `biome.json` 한 줄을 봇 계정으로 연 PR → 체크는 실패해야 한다. `@SHIN96BC` 로 Approve 한 뒤 워크플로가 다시 돌면 성공해야 한다
3. 봇 토큰으로 `gh pr merge` → ruleset 이 거절해야 한다

### 6.5 넣지 말 것

`harness-owner-gate` 를 끄는 Actions Variable 은 없다.  
로컬 가드에 보호 경로 실패를 풀어 주는 환경변수도 없다.

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
