# 13 — e2e skip 가드 우회 제거 + 8.x 보드 정리

- Status: `open`
- STRENGTHEN: H-5
- Type: Chore
- Loop: 사람 (denylist 스크립트 + 문서 삭제)
- 8.x: 선 위. **시퀀스 마지막**
- Depends: 01~12 merge 후. 삭제 diff는 **이 이슈 PR에 포함** (머지 후 따로 지우는 게 아님)
- GitHub: —

## GitHub 본문 (복사)

제목: `guard e2e-skip 우회 제거 + 8.x 초안 보드 파일 삭제`

Type: Chore  
라벨: 없음 (`ai-task` 금지)

```markdown
## ☄️ 이슈 설명
1. `HARNESS_E2E_SKIP`과 STATE.md `e2e-skip:`이 guard:tests의 스펙 강제만 건너뛰는 구멍을 닫는다
   - `scripts/verify-app.mjs` / `scripts/ai-loop.sh` 시작에서 `HARNESS_E2E_SKIP` unset
   - `hasE2eSkipReason()`이 `docs/loop/STATE.md`를 읽지 않는다. skip 출처는 이슈·커밋·`.ai/issue.md`만
   - Playwright 본실행을 끄는 변경이 아니다
   - 스크립트는 denylist. 사람만 수정
2. 같은 브랜치·같은 PR에 초안 파일 삭제를 넣는다. 푸시 전에 지운 상태가 커밋에 있어야 한다. 13을 머지한 다음 따로 지우는 커밋을 만들지 않는다
   - 삭제: `docs/loop/STRENGTHEN-REBUTTAL.md` (1차 측정 오차. 재평가는 STRENGTHEN에 있음)
   - 삭제: `docs/loop/strengthen-issues/` 폴더 전체 (로컬 보드 초안. GitHub 이슈가 기록)
   - 링크 제거: `docs/loop/STRENGTHEN.md` 헤더의 이슈 보드 줄, `docs/loop/README.md`의 `8.x 이슈 보드` 행
   - 유지: `docs/loop/STRENGTHEN.md` (빈칸 SoT. 닫힌 칸은 이 PR에서 표만 갱신)
   - 유지: DESIGN / ROADMAP의 STRENGTHEN 링크
3. 01~12가 master에 있기 전에는 이 이슈를 시작하지 않는다. 보드를 먼저 지우면 02~12 작업 중 초안이 사라진다
```

## AC

- [ ] env만으로 guard:tests e2e 스펙 강제를 건너뛸 수 없음
- [ ] STATE `e2e-skip:`이 전 실행 skip이 아님
- [ ] 사람 승인 후 스크립트 변경
- [ ] 이 PR diff에 REBUTTAL·`strengthen-issues/` 삭제가 있다 (푸시 시점)
- [ ] STRENGTHEN·loop README에서 보드 링크가 이 PR에서 빠진다
- [ ] STRENGTHEN.md는 같은 PR에 남아 있고 빈칸 표가 현재와 맞음

## 하지 말 것

- verify Playwright를 끔
- `ai-task`로 가드 스크립트 수정
- STRENGTHEN.md 삭제
- 13 PR 밖에 삭제만 있는 후속 커밋
- 01~12 끝나기 전 보드 폴더 삭제

## 로그

- 2026-10-22: 마지막 이슈에 초안 파일 삭제 요구를 넣음
