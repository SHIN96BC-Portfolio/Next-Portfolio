/**
 * FSD 폴더 구조 린트 — 규칙은 아래 RULES 오브젝트에 정의.
 * RULES만 수정하면 정책 변경 가능. check* 헬퍼는 안정적으로 유지.
 *
 * 사용법:
 *   node scripts/lint-fsd-folder-structure.mjs
 *   node scripts/lint-fsd-folder-structure.mjs --dry-run   # 리포트만, exit 0
 *   pnpm lint:fsd
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DRY_RUN = process.argv.includes('--dry-run');

// ---------------------------------------------------------------------------
// RULES — 이 오브젝트를 수정해서 정책을 변경한다.
// ---------------------------------------------------------------------------
const RULES = {
  /** src/fsd를 포함하는 앱 루트 */
  appsRoot: 'apps',
  appKinds: ['user', 'admin'],

  /** src/fsd 아래 FSD 레이어 목록 */
  layers: ['app', 'pages', 'widgets', 'features', 'entities', 'shared'],

  /**
   * Slice → Segment 구조를 강제하는 레이어.
   * app / pages / shared는 형태가 달라서 점진적으로 추가.
   */
  structuredLayers: ['widgets', 'features', 'entities'],

  /** slice root에서 허용하는 세그먼트 폴더명 */
  segments: ['ui', 'model', 'api', 'lib', 'config', 'hooks'],

  /** 소스 파일로 취급하는 확장자 (allowFiles / 형제 카운트용) */
  sourceExt: /\.(tsx|ts|jsx|js)$/,

  /** walk 시 무조건 건너뛸 디렉토리명 */
  ignoreDirNames: new Set(['node_modules', '.next', 'dist', 'build', 'coverage', 'auto-gen']),

  /** 아예 무시할 경로 (repo-relative, posix) */
  ignorePathPrefixes: [
    // i18n locales / generated 등 — 필요 시 추가
  ],

  /**
   * 레이어별 구조 규칙.
   * depthFromLayer: 레이어 폴더 기준 하위 폴더 깊이.
   *   widgets/header/ui/Foo.tsx                       → depth 2 (header, ui)
   *   widgets/portfolio/career/ui/Foo.tsx             → depth 3
   *   widgets/header/ui/Public/_parts/a.tsx           → depth 4
   *   widgets/header/ui/Public/_parts/drawers/a.tsx   → depth 5
   */
  byLayer: {
    widgets: {
      /** 레이어 루트 (widgets/) — 폴더(슬라이스 또는 그룹)만 허용 */
      layerRoot: {
        allowFiles: false,
      },
      /**
       * 슬라이스 루트 = 바로 아래에 세그먼트(ui, model, api…)가 있는 폴더.
       * 그룹 = 세그먼트 없이 하위 폴더만 있는 폴더 (예: widgets/portfolio/).
       */
      sliceRoot: {
        allowFiles: false, // ui/ 옆에 Foo.ts 금지
        allowIndex: false, // slice/index.ts 아직 허용 안 함
      },
      groupRoot: {
        allowFiles: false, // widgets/portfolio/*.ts 금지
      },
      ui: {
        /** 한 폴더 안 형제 .tsx 최대 개수 (index.ts 제외). 이 수 초과 시 분할 강제 */
        maxSiblingTsx: 7,
        /** 레이어 기준 최대 폴더 깊이 */
        maxDepthFromLayer: 5,
        /** _parts는 widgets에서만 허용; component-root 아래에만 위치 */
        parts: {
          enabled: true,
          allowAtUiRoot: false, // ui/_parts 공용 통 금지 (레거시 예외만)
          roleFolders: ['drawers', 'sheets', 'nav'],
          forbidNestedParts: true, // _parts/_parts 금지
        },
      },
    },
    features: {
      layerRoot: { allowFiles: false },
      sliceRoot: { allowFiles: false, allowIndex: false },
      groupRoot: { allowFiles: false },
      ui: {
        maxSiblingTsx: 7,
        maxDepthFromLayer: 3, // features/<slice>/ui/<Public>/file
        parts: { enabled: false }, // features에 _parts 금지
      },
    },
    entities: {
      layerRoot: { allowFiles: false },
      sliceRoot: { allowFiles: false, allowIndex: true }, // entities는 index.ts 허용 (theme/index.ts 등)
      groupRoot: { allowFiles: false },
      ui: {
        maxSiblingTsx: 7,
        maxDepthFromLayer: 3,
        parts: { enabled: false }, // entities에 _parts 금지
      },
    },
  },

  /** 새 규칙을 위반하지만 마이그레이션 전까지 허용하는 레거시 경로 (posix) */
  legacyAllow: {
    /** ui/_parts 공용 통 — component-root로 이전 대상 */
    uiRootParts: new Set(['apps/user/portfolio/src/fsd/widgets/header/ui/_parts']),
  },
};

// ---------------------------------------------------------------------------
// 헬퍼
// ---------------------------------------------------------------------------

const errors = [];
const warnings = [];

function rel(p) {
  return path.relative(ROOT, p).replace(/\\/g, '/');
}

function isSourceFile(name) {
  return RULES.sourceExt.test(name);
}

function isIndexFile(name) {
  return /^index\.(tsx?|jsx?)$/.test(name);
}

function isTsx(name) {
  return /\.tsx$/.test(name);
}

function shouldIgnoreDir(name) {
  return RULES.ignoreDirNames.has(name);
}

function isIgnoredPath(absPath) {
  const r = rel(absPath);
  return RULES.ignorePathPrefixes.some((prefix) => r === prefix || r.startsWith(`${prefix}/`));
}

function listDir(dir) {
  if (!fs.existsSync(dir)) return { dirs: [], files: [] };
  const dirs = [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!shouldIgnoreDir(entry.name)) dirs.push(entry.name);
    } else if (entry.isFile()) {
      files.push(entry.name);
    }
  }
  return { dirs, files };
}

function hasSegmentChild(dir) {
  const { dirs } = listDir(dir);
  return dirs.some((d) => RULES.segments.includes(d));
}

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function reportFileBan(dir, files, ruleLabel) {
  const codeFiles = files.filter(isSourceFile);
  if (codeFiles.length === 0) return;
  fail(`${rel(dir)}: ${ruleLabel} — 소스 파일 금지. 발견: ${codeFiles.join(', ')}`);
}

// ---------------------------------------------------------------------------
// FSD 루트 탐색
// ---------------------------------------------------------------------------

function findFsdRoots() {
  const roots = [];
  const appsDir = path.join(ROOT, RULES.appsRoot);
  if (!fs.existsSync(appsDir)) return roots;

  for (const app of fs.readdirSync(appsDir, { withFileTypes: true })) {
    if (!app.isDirectory()) continue;
    for (const kind of RULES.appKinds) {
      const kindDir = path.join(appsDir, app.name, kind);
      if (!fs.existsSync(kindDir)) continue;
      for (const service of fs.readdirSync(kindDir, { withFileTypes: true })) {
        if (!service.isDirectory()) continue;
        const fsd = path.join(kindDir, service.name, 'src', 'fsd');
        if (fs.existsSync(fsd)) roots.push(fsd);
      }
    }
  }
  return roots;
}

// ---------------------------------------------------------------------------
// RULES 기반 검사
// ---------------------------------------------------------------------------

/** 레이어 루트에 파일이 직접 있는지 검사 */
function checkLayerRoot(layerDir, layerRule) {
  if (!layerRule?.layerRoot) return;
  const { files } = listDir(layerDir);
  if (layerRule.layerRoot.allowFiles === false) {
    reportFileBan(layerDir, files, `${path.basename(layerDir)}/ (레이어 루트)에는 폴더만 허용`);
  }
}

/** 슬라이스 루트 또는 그룹 루트 판별 + 파일 존재 검사 */
function checkGroupOrSliceRoot(dir, layerRule) {
  const { dirs, files } = listDir(dir);
  const isSlice = hasSegmentChild(dir);

  if (isSlice) {
    const { allowFiles, allowIndex } = layerRule.sliceRoot ?? {};
    const banned = files.filter((f) => {
      if (!isSourceFile(f)) return false;
      if (allowIndex && isIndexFile(f)) return false;
      return allowFiles === false;
    });
    if (banned.length) {
      fail(
        `${rel(dir)}: 슬라이스 루트에는 세그먼트 폴더(${RULES.segments.join('|')})만. 파일 금지: ${banned.join(', ')}`
      );
    }
    for (const d of dirs) {
      if (!RULES.segments.includes(d) && !/^[a-z][a-z0-9-]*$/.test(d)) {
        warn(`${rel(dir)}/${d}: 슬라이스 루트 하위는 세그먼트명이 일반적입니다 (${RULES.segments.join(', ')})`);
      }
    }
    return 'slice';
  }

  // 그룹 폴더
  if (layerRule.groupRoot?.allowFiles === false) {
    reportFileBan(dir, files, '그룹 폴더(세그먼트 없음)에는 하위 폴더만 허용');
  }
  return 'group';
}

/** 레이어 기준 폴더 깊이 계산 */
function depthFromLayer(layerDir, targetDir) {
  const layerRel = path.relative(layerDir, targetDir).replace(/\\/g, '/');
  if (!layerRel || layerRel.startsWith('..')) return 0;
  return layerRel.split('/').filter(Boolean).length;
}

/** ui/ 세그먼트 진입점 */
function checkUiFolder(uiDir, layerDir, layerName, layerRule) {
  const uiRule = layerRule.ui;
  if (!uiRule) return;

  walkUi(uiDir, layerDir, layerName, layerRule, uiDir);
}

/** ui/ 하위 재귀 walk — 형제 tsx 상한, depth 상한, _parts 규칙 */
function walkUi(dir, layerDir, layerName, layerRule, uiRoot) {
  if (isIgnoredPath(dir)) return;

  const uiRule = layerRule.ui;
  const { dirs, files } = listDir(dir);
  const depth = depthFromLayer(layerDir, dir);

  // depth 상한 검사
  if (typeof uiRule.maxDepthFromLayer === 'number' && depth > uiRule.maxDepthFromLayer) {
    const under = path.relative(layerDir, dir).replace(/\\/g, '/');
    fail(`${rel(dir)}: ${layerName}/ 기준 depth ${depth} > max ${uiRule.maxDepthFromLayer} (${layerName}/${under})`);
  }

  // 형제 .tsx 개수 검사 (index 제외)
  const siblingTsx = files.filter((f) => isTsx(f) && !isIndexFile(f));
  if (typeof uiRule.maxSiblingTsx === 'number' && siblingTsx.length > uiRule.maxSiblingTsx) {
    fail(
      `${rel(dir)}: 형제 .tsx ${siblingTsx.length}개 > ${uiRule.maxSiblingTsx}. PascalCase component-folder(또는 widgets면 + _parts)로 분할하세요. [${siblingTsx.join(', ')}]`
    );
  }

  // _parts 규칙 검사
  const partsRule = uiRule.parts;
  for (const name of dirs) {
    const child = path.join(dir, name);

    if (name === '_parts') {
      if (!partsRule?.enabled) {
        fail(`${rel(child)}: ${layerName} 레이어에서는 _parts 금지`);
        continue;
      }

      // ui/ 직하위 _parts 공용 통 검사
      const isUiRootParts = path.resolve(child) === path.resolve(path.join(uiRoot, '_parts'));
      if (isUiRootParts && partsRule.allowAtUiRoot === false) {
        if (!RULES.legacyAllow.uiRootParts.has(rel(child))) {
          fail(`${rel(child)}: ui/_parts/ 공용 통 금지. ui/<PublicComponent>/_parts/ 사용`);
        }
      }

      checkPartsDir(child, partsRule);
    }

    // _ 로 시작하는 임의 폴더명 금지 (_parts만 허용)
    if (name.startsWith('_') && name !== '_parts' && partsRule?.enabled) {
      fail(`${rel(child)}: private 폴더명은 _parts만 허용`);
      continue;
    }

    walkUi(child, layerDir, layerName, layerRule, uiRoot);
  }
}

/** _parts 내부 구조 검사 (중첩 금지, 역할 폴더만) */
function checkPartsDir(partsDir, partsRule) {
  const { dirs } = listDir(partsDir);
  for (const name of dirs) {
    if (name === '_parts' && partsRule.forbidNestedParts) {
      fail(`${rel(partsDir)}/${name}: _parts/_parts 금지 → drawers|sheets|nav 사용`);
      continue;
    }
    const roles = partsRule.roleFolders ?? [];
    if (roles.length && !roles.includes(name) && !/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
      warn(`${rel(partsDir)}/${name}: _parts 안 분할은 ${roles.join('|')} 역할 폴더 권장`);
    }
  }
}

/** 슬라이스/그룹 트리 walk */
function walkLayerTree(dir, layerDir, layerName, layerRule) {
  if (isIgnoredPath(dir)) return;

  const kind = checkGroupOrSliceRoot(dir, layerRule);
  const { dirs } = listDir(dir);

  if (kind === 'slice') {
    for (const seg of dirs) {
      if (!RULES.segments.includes(seg)) {
        // 슬라이스 아래 비표준 폴더 — 그래도 walk는 계속
        walkLayerTree(path.join(dir, seg), layerDir, layerName, layerRule);
        continue;
      }
      const segDir = path.join(dir, seg);
      if (seg === 'ui') {
        checkUiFolder(segDir, layerDir, layerName, layerRule);
      }
      // model/api depth 규칙 — 추후 RULES에 추가
    }
    return;
  }

  // 그룹: 자식 폴더 재귀
  for (const name of dirs) {
    walkLayerTree(path.join(dir, name), layerDir, layerName, layerRule);
  }
}

/** FSD 루트 1개에 대해 구조 검사 실행 */
function lintFsdRoot(fsdRoot) {
  for (const layerName of RULES.structuredLayers) {
    const layerDir = path.join(fsdRoot, layerName);
    if (!fs.existsSync(layerDir)) continue;

    const layerRule = RULES.byLayer[layerName];
    if (!layerRule) continue;

    checkLayerRoot(layerDir, layerRule);

    const { dirs } = listDir(layerDir);
    for (const name of dirs) {
      walkLayerTree(path.join(layerDir, name), layerDir, layerName, layerRule);
    }
  }
}

// ---------------------------------------------------------------------------
// 실행
// ---------------------------------------------------------------------------

for (const fsd of findFsdRoots()) {
  lintFsdRoot(fsd);
}

const header = DRY_RUN ? '[dry-run] FSD folder-structure' : 'FSD folder-structure';

if (warnings.length) {
  console.info(`\n${header} warnings (${warnings.length}):\n`);
  for (const w of warnings) console.info(`  · ${w}`);
}

if (errors.length) {
  console.error(`\n${header} failed (${errors.length}):\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  if (DRY_RUN) {
    console.info('\n(dry-run: exit 0 — --dry-run 제거 시 강제)\n');
    process.exit(0);
  }
  process.exit(1);
}

console.info(`${header} passed.`);
