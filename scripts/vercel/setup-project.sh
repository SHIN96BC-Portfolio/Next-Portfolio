#!/usr/bin/env bash
# Vercel 프로젝트 최초 생성 (Git 연동 없음) + Root Directory API 자동 설정
#
# 사용:
#   export VERCEL_TOKEN=<Account Settings → Tokens>
#   ./scripts/vercel/setup-project.sh <app-slug> <app-dir>
#
# 예:
#   ./scripts/vercel/setup-project.sh user-portfolio apps/user/portfolio
#   ./scripts/vercel/setup-project.sh admin-master-admin apps/admin/master-admin
#
# app-slug: package.json name 에서 @apps/ 제거한 값 (user-portfolio)
set -euo pipefail

APP_SLUG="${1:-}"
APP_DIR="${2:-}"

if [[ -z "$APP_SLUG" || -z "$APP_DIR" ]]; then
  echo "사용법: $0 <app-slug> <app-dir>"
  echo "예:     $0 user-portfolio apps/user/portfolio"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
SECRET_SUFFIX="$(echo "$APP_SLUG" | tr '[:lower:]' '[:upper:]' | tr '-' '_')"
PROJECT_ID_SECRET="VERCEL_PROJECT_ID_${SECRET_SUFFIX}"

if ! command -v vercel >/dev/null 2>&1; then
  echo "Vercel CLI가 없습니다. 설치: npm install -g vercel"
  exit 1
fi

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "VERCEL_TOKEN이 필요합니다 (Root Directory API 설정 + GitHub Secret 등록용)."
  echo "발급: https://vercel.com/account/tokens"
  echo ""
  echo "  export VERCEL_TOKEN=<your-token>"
  exit 1
fi

echo "== Vercel 프로젝트 초기 설정 =="
echo "App slug:        ${APP_SLUG}"
echo "App directory:   ${APP_DIR}"
echo "Project ID secret name: ${PROJECT_ID_SECRET}"
echo ""
echo "1) vercel link (앱 폴더)"
echo "2) Vercel API로 Root Directory = ${APP_DIR} 자동 설정"
echo ""
echo "vercel link 실행 시 안내:"
echo "  1) Set up and deploy?        → N"
echo "  2) Which scope?              → 본인 팀/계정"
echo "  3) Link to existing project? → N (새 프로젝트) / Y (기존)"
echo "  4) Project name              → 예: ${APP_SLUG}"
echo "  5) Code directory            → .  (현재 앱 폴더 = ${APP_DIR})"
echo ""

cd "$ROOT_DIR/$APP_DIR"
vercel link

if [[ ! -f .vercel/project.json ]]; then
  echo "오류: ${APP_DIR}/.vercel/project.json 이 생성되지 않았습니다."
  exit 1
fi

ORG_ID="$(node -pe "JSON.parse(require('fs').readFileSync('.vercel/project.json','utf8')).orgId")"
PROJECT_ID="$(node -pe "JSON.parse(require('fs').readFileSync('.vercel/project.json','utf8')).projectId")"

echo ""
echo "== Root Directory API 설정 =="

PATCH_BODY="$(node -pe "JSON.stringify({ rootDirectory: process.argv[1], framework: 'nextjs' })" "$APP_DIR")"
API_URL="https://api.vercel.com/v9/projects/${PROJECT_ID}"

if [[ "$ORG_ID" == team_* ]]; then
  API_URL="${API_URL}?teamId=${ORG_ID}"
fi

PATCH_RESPONSE_FILE="$(mktemp)"
HTTP_CODE="$(
  curl -sS -o "$PATCH_RESPONSE_FILE" -w "%{http_code}" \
    -X PATCH "$API_URL" \
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "$PATCH_BODY"
)"

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "오류: Root Directory API 설정 실패 (HTTP ${HTTP_CODE})"
  cat "$PATCH_RESPONSE_FILE"
  rm -f "$PATCH_RESPONSE_FILE"
  exit 1
fi

ROOT_DIR_SET="$(node -pe "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8')).rootDirectory || ''" "$PATCH_RESPONSE_FILE")"
rm -f "$PATCH_RESPONSE_FILE"

echo "Root Directory 설정 완료: ${ROOT_DIR_SET:-$APP_DIR}"

echo ""
echo "== GitHub Secrets 등록 =="
echo "Repository → Settings → Secrets and variables → Actions"
echo ""
echo "# 공통 (저장소당 1회, 이미 있으면 생략)"
echo "VERCEL_TOKEN=<위에서 사용한 토큰>"
echo "VERCEL_ORG_ID=${ORG_ID}"
echo ""
echo "# 앱 전용 (${APP_SLUG})"
echo "${PROJECT_ID_SECRET}=${PROJECT_ID}"
echo ""
echo "== 확인 사항 =="
echo "  - Git Integration: 연결하지 않음"
echo "  - GitHub Actions: 저장소 루트에서 vercel pull → build → deploy --prebuilt"
echo "  - Actions working-directory로 앱 폴더 지정 금지 (경로 중복)"
echo ""
echo "워크플로에서 사용할 secret: secrets.${PROJECT_ID_SECRET}"
