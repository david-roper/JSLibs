// @ts-check

import path from 'node:path';
import url from 'node:url';

import { createConfig } from '@douglasneuroinformatics/eslint-config';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseConfig = createConfig({
  ts: {
    project: path.resolve(__dirname, 'tsconfig.base.json')
  }
});

const uiConfig = createConfig({
  base: {
    env: 'browser',
    fileRoots: ['packages/ui/src']
  },
  jsx: true,
  ts: {
    project: path.resolve(__dirname, 'packages', 'ui', 'tsconfig.json')
  }
});

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['**/build/*', '**/dist/*', '**/node_modules/*', '**/*.d.ts']
  },
  ...baseConfig,
  ...uiConfig
];
