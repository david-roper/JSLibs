import fs from 'node:fs';

export function readJSON<T = unknown>(filepath: string) {
  const content = fs.readFileSync(filepath, { encoding: 'utf-8' });
  return JSON.parse(content) as T;
}
