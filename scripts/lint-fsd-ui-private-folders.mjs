// FSD widgets _parts 폴더 가드 (component-root 전용).
// - _parts는 widgets/**/ui 에만 허용
// - ui/<PublicComponent>/_parts/ 위치만 허용 (ui/_parts 공용 통 금지)
// - _parts 안 역할 폴더: drawers, sheets, nav — _parts/_parts 중첩 금지
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const APP_GLOB = 'apps';

/** 레거시 ui/_parts 공용 통 — 마이그레이션 전까지 허용 (신규 추가 금지) */
const LEGACY_UI_ROOT_PARTS = new Set(['apps/user/portfolio/src/fsd/widgets/header/ui/_parts']);

/** _parts 존재가 금지된 레이어 */
const FORBIDDEN_PARTS_LAYERS = ['features', 'entities', 'pages', 'app', 'shared'];

/** _parts 안에서 허용되는 역할 폴더 */
const PRIVATE_ROLE_FOLDERS = new Set(['drawers', 'sheets', 'nav']);
const PASCAL_CASE = /^[A-Z][a-zA-Z0-9]*$/;
const SOURCE_EXT = /\.(tsx|ts)$/;

const errors = [];

function normalizeRel(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

/** apps 하위 모든 fsd 루트를 찾아 콜백 실행 */
function walkApps(callback) {
  const appsDir = path.join(ROOT, APP_GLOB);
  if (!fs.existsSync(appsDir)) return;

  for (const appEntry of fs.readdirSync(appsDir, { withFileTypes: true })) {
    if (!appEntry.isDirectory()) continue;
    const appPath = path.join(appsDir, appEntry.name);

    for (const userOrAdmin of ['user', 'admin']) {
      const base = path.join(appPath, userOrAdmin);
      if (!fs.existsSync(base)) continue;

      for (const service of fs.readdirSync(base, { withFileTypes: true })) {
        if (!service.isDirectory()) continue;
        const fsdRoot = path.join(base, service.name, 'src', 'fsd');
        if (fs.existsSync(fsdRoot)) callback(fsdRoot);
      }
    }
  }
}

/** 특정 디렉토리 하위에서 _parts 폴더를 모두 찾기 */
function findPartsDirs(dir, found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name === '_parts') found.push(full);
    findPartsDirs(full, found);
  }
  return found;
}

/** widgets 이외 레이어에 _parts가 있으면 에러 */
function scanForbiddenPartsOutsideWidgets(fsdRoot) {
  for (const layer of FORBIDDEN_PARTS_LAYERS) {
    const layerDir = path.join(fsdRoot, layer);
    if (!fs.existsSync(layerDir)) continue;

    for (const partsDir of findPartsDirs(layerDir)) {
      errors.push(
        `${normalizeRel(partsDir)}: _parts는 widgets/**/ui 에만 둘 수 있습니다. features/entities/shared 등에는 _parts 금지.`
      );
    }
  }
}

function hasSourceFile(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).some((e) => e.isFile() && SOURCE_EXT.test(e.name));
}

/** ui/ 하위에서 허용되는 폴더명인지 판별 */
function isAllowedUiSubfolder(name) {
  if (name === '_parts') return true;
  if (PRIVATE_ROLE_FOLDERS.has(name)) return true;
  if (PASCAL_CASE.test(name)) return true;
  return false;
}

/** widgets ui 트리를 재귀 탐색하며 폴더명 규칙 검사 */
function scanWidgetUiTree(uiDir, sliceUiRoot) {
  for (const entry of fs.readdirSync(uiDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const folderPath = path.join(uiDir, entry.name);
    const rel = normalizeRel(folderPath);

    // ui/ 직하위 _parts (공용 통) 검사
    if (entry.name === '_parts' && folderPath === path.join(sliceUiRoot, '_parts')) {
      if (!LEGACY_UI_ROOT_PARTS.has(rel)) {
        errors.push(`${rel}: ui/_parts/ 공용 통 금지. component-root \`ui/<PublicComponent>/_parts/\` 를 사용하세요.`);
      }
      scanPartsRoleTree(folderPath);
      continue;
    }

    // _ 로 시작하는 임의 폴더명 금지 (_parts만 허용)
    if (entry.name.startsWith('_') && entry.name !== '_parts') {
      errors.push(`${rel}: private 폴더명은 \`_parts\`만 (widgets 전용).`);
      continue;
    }

    // 허용되지 않는 폴더명 검사
    if (!isAllowedUiSubfolder(entry.name)) {
      if (hasSourceFile(folderPath)) {
        errors.push(
          `${rel}: widgets ui/ 하위는 \`_parts\`, \`drawers|sheets|nav\`, PascalCase component-folder만 허용.`
        );
      }
      continue;
    }

    // component-root 아래 _parts 검사
    if (entry.name === '_parts') {
      scanPartsRoleTree(folderPath);
    }

    scanWidgetUiTree(folderPath, sliceUiRoot);
  }
}

/** _parts 내부: 중첩 금지 + 역할 폴더만 허용 */
function scanPartsRoleTree(partsDir) {
  const rel = normalizeRel(partsDir);

  for (const entry of fs.readdirSync(partsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    if (entry.name === '_parts') {
      errors.push(`${rel}/${entry.name}: _parts/_parts 중첩 금지. drawers|sheets|nav 역할 폴더를 사용하세요.`);
      continue;
    }

    if (
      !PRIVATE_ROLE_FOLDERS.has(entry.name) &&
      !PASCAL_CASE.test(entry.name) &&
      hasSourceFile(path.join(partsDir, entry.name))
    ) {
      errors.push(`${rel}/${entry.name}: _parts/ 안 분할은 drawers|sheets|nav (역할) 또는 flat .tsx만 허용.`);
    }
  }
}

// ---------------------------------------------------------------------------
// 실행
// ---------------------------------------------------------------------------

walkApps((fsdRoot) => {
  scanForbiddenPartsOutsideWidgets(fsdRoot);

  const widgetsDir = path.join(fsdRoot, 'widgets');
  if (!fs.existsSync(widgetsDir)) return;

  for (const slice of fs.readdirSync(widgetsDir, { withFileTypes: true })) {
    if (!slice.isDirectory()) continue;
    const uiDir = path.join(widgetsDir, slice.name, 'ui');
    if (fs.existsSync(uiDir)) scanWidgetUiTree(uiDir, uiDir);
  }
});

if (errors.length > 0) {
  console.error('FSD widgets _parts 린트 실패:\n');
  for (const message of errors) console.error(`  - ${message}`);
  process.exit(1);
}

console.info('FSD widgets _parts 린트 통과.');
