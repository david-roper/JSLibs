// @ts-check

import fs from 'fs/promises';
import path from 'path';
import process from 'process';

import esbuild from 'esbuild';

const watch = process.argv.includes('--watch');

const BUILD_DIR = path.resolve(import.meta.dir, 'dist');

await fs.rm(BUILD_DIR, { force: true, recursive: true });
await fs.mkdir(BUILD_DIR);

/** @type {import('esbuild').BuildOptions} */
const options = {
  bundle: true,
  entryPoints: [path.resolve(import.meta.dir, 'src', 'index.ts')],
  format: 'esm',
  outdir: BUILD_DIR,
  packages: 'external',
  platform: 'browser',
  sourcemap: 'external'
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log('Watching...');
} else {
  await esbuild.build(options);
  console.log('Done!');
}
