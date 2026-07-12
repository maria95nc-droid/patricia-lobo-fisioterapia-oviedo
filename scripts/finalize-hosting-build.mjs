import { copyFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await mkdir(resolve(root, 'dist', '.openai'), { recursive: true });
await copyFile(resolve(root, '.openai', 'hosting.json'), resolve(root, 'dist', '.openai', 'hosting.json'));
