#!/usr/bin/env bash
# Vercel 프로젝트 최초 생성 (Git 연동 없음)
#
# 사용:
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

echo "== Vercel 프로젝트 초기 설정 =="
echo "App slug:        ${APP_SLUG}"
echo "App directory:   ${APP_DIR}"
echo "Project ID secret name: ${PROJECT_ID_SECRET}"
echo ""
echo "앱 폴더에서 vercel link 실행 후, 대시보드 Root Directory를 설정합니다."
echo ""
echo "vercel link 실행 시 안내:"
echo "  1) Set up and deploy?        → N"
echo "  2) Which scope?              → 본인 팀/계정"
echo "  3) Link to existing project? → N (새 프로젝트)"
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
echo "== GitHub Secrets 등록 =="
echo "Repository → Settings → Secrets and variables → Actions"
echo ""
echo "# 공통 (저장소당 1회, 이미 있으면 생략)"
echo "VERCEL_TOKEN=<Vercel Account Settings → Tokens>"
echo "VERCEL_ORG_ID=${ORG_ID}"
echo ""
echo "# 앱 전용 (${APP_SLUG})"
echo "${PROJECT_ID_SECRET}=${PROJECT_ID}"
echo ""
echo "== Vercel 대시보드 확인 =="
echo "  - Root Directory: ${APP_DIR}  (prebuilt 모노레포 필수)"
echo "  - Git Integration: 연결하지 않음"
echo ""
echo "GitHub Actions는 저장소 루트에서 vercel pull → vercel build → vercel deploy --prebuilt 합니다."
echo "Actions working-directory로 앱 폴더를 지정하면 경로가 중복됩니다 — 사용하지 마세요."
echo "워크플로에서 사용할 secret: secrets.${PROJECT_ID_SECRET}"
