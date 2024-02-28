import path from 'path';
import url from 'url';

import { defineConfig } from 'tsup';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    path.resolve(__dirname, 'src/index.ts'),
    path.resolve(__dirname, 'src/components/index.ts'),
    path.resolve(__dirname, 'src/hooks/index.ts'),
    path.resolve(__dirname, 'src/legacy/index.ts')
  ],
  format: 'esm',
  outDir: path.resolve(__dirname, 'dist'),
  platform: 'browser',
  sourcemap: true,
  splitting: true,
  target: 'esnext'
});
