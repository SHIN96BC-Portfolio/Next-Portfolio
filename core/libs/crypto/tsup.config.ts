import { defineLibConfig } from '../tsup.shared';

export default defineLibConfig({
  index: 'index.ts',
  'index.node': 'index.node.ts',
});
