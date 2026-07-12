import indexHtml from '../../index.html?raw';
import legalHtml from '../../aviso-legal.html?raw';
import privacyHtml from '../../politica-privacidad.html?raw';
import cookiesHtml from '../../politica-cookies.html?raw';

const pages = new Map([
  ['/', indexHtml],
  ['/index.html', indexHtml],
  ['/aviso-legal.html', legalHtml],
  ['/politica-privacidad.html', privacyHtml],
  ['/politica-cookies.html', cookiesHtml]
]);

export function GET(request) {
  const pathname = new URL(request.url).pathname;
  const html = pages.get(pathname);
  if (!html) return new Response('No encontrado', { status: 404 });
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'strict-origin-when-cross-origin'
    }
  });
}
