import cp from 'child_process';
import fs from 'fs/promises';
import path from 'path';

const contents = await fs.readFile(path.resolve(import.meta.dir, '..', 'package.json'), 'utf-8');
const packageJSON = JSON.parse(contents);

for (const [pkg, version] of Object.entries(packageJSON.peerDependencies)) {
  await cp.exec(`bun install --no-save ${pkg}@${version}`);
}
