import { cp, mkdir, rm, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(root, 'public');

await rm(publicDir, { recursive: true, force: true });
await mkdir(publicDir, { recursive: true });
await cp(resolve(root, 'assets'), resolve(publicDir, 'assets'), { recursive: true });
await Promise.all(['robots.txt', '_headers'].map((file) => copyFile(resolve(root, file), resolve(publicDir, file))));
