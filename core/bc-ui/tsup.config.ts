import { defineConfig } from 'tsup';

const shared = {
  format: ['esm', 'cjs'] as ('esm' | 'cjs')[],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'next', 'next/navigation', 'clsx'],
  treeshake: true,
};

export default defineConfig([
  {
    ...shared,
    entry: {
      index: 'src/index.ts',
      'accordion/index': 'src/accordion/index.ts',
      'modal/index': 'src/modal/index.ts',
      'print/index': 'src/print/index.ts',
      'sheet/index': 'src/sheet/index.ts',
    },
  },
  {
    ...shared,
    entry: {
      'utils/index': 'src/utils/index.ts',
    },
  },
]);
