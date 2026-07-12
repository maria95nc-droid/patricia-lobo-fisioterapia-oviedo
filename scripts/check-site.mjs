import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlFiles = (await readdir(root)).filter((name) => name.endsWith('.html'));
const errors = [];

const exists = async (path) => {
  try { return (await stat(path)).isFile(); } catch { return false; }
};

for (const file of htmlFiles) {
  const html = await readFile(resolve(root, file), 'utf8');
  if (!/<!doctype html>/i.test(html)) errors.push(`${file}: falta doctype`);
  if (!/<html[^>]+lang="es"/i.test(html)) errors.push(`${file}: falta lang=es`);
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${file}: falta title`);
  if (!/<meta[^>]+name="description"/i.test(html)) errors.push(`${file}: falta meta description`);
  if (/href="#"/i.test(html)) errors.push(`${file}: contiene href="#"`);
  if (/data:image\//i.test(html)) errors.push(`${file}: contiene una imagen base64`);

  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/gi)) {
    const ref = match[1];
    if (/^(?:https?:|tel:|mailto:|#|\/)/i.test(ref)) continue;
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (!(await exists(resolve(root, clean)))) errors.push(`${file}: recurso inexistente ${ref}`);
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\balt="[^"]*"/i.test(tag)) errors.push(`${file}: imagen sin alt`);
    if (!/\bwidth="\d+"/i.test(tag) || !/\bheight="\d+"/i.test(tag)) errors.push(`${file}: imagen sin width/height`);
  }
}

const index = await readFile(resolve(root, 'index.html'), 'utf8');
const whatsappLinks = [...index.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)].map((m) => m[1]);
if (!whatsappLinks.length || whatsappLinks.some((url) => url !== 'https://wa.me/34680288442')) errors.push('index.html: enlace de WhatsApp incorrecto');
const telLinks = [...index.matchAll(/href="(tel:[^"]+)"/g)].map((m) => m[1]);
if (!telLinks.length || telLinks.some((url) => url !== 'tel:+34680288442')) errors.push('index.html: enlace telefónico incorrecto');
if ((index.match(/<h1\b/gi) || []).length !== 1) errors.push('index.html: debe existir exactamente un H1');

if (errors.length) {
  console.error(`Comprobación fallida (${errors.length}):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Comprobación correcta: ${htmlFiles.length} HTML, recursos locales, imágenes y enlaces principales verificados.`);
