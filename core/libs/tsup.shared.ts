import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Options } from 'tsup';

const libsRoot = path.dirname(fileURLToPath(import.meta.url));

export const workspaceExternals = [
  '@core/utils',
  '@core/crypto',
  '@core/crypto/index.node',
  '@core/cookie',
  '@core/storage',
  '@core/service-container',
  '@core/proxy-container',
  'next',
  'next/headers',
  'next/server',
  'crypto-js',
];

export function defineLibConfig(entry: Options['entry'], extraExternal: string[] = []) {
  return defineConfig({
    entry,
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    tsconfig: path.join(libsRoot, 'tsconfig.json'),
    external: [...workspaceExternals, ...extraExternal],
  });
}
