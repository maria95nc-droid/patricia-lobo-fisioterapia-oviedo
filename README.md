# Patricia Lobo Granado · Fisioterapia a domicilio

Landing estática preparada para abrirse localmente y publicarse. Está construida con HTML, CSS y JavaScript nativos. La compilación estática con Vite se mantiene separada del adaptador usado por el alojamiento temporal.

## Abrir en Visual Studio Code

1. Descomprime el ZIP y abre la carpeta que contiene `index.html`.
2. Puedes abrir `index.html` directamente con el navegador.
3. Para trabajar con recarga automática, instala la extensión **Live Server** en Visual Studio Code, pulsa con el botón derecho sobre `index.html` y elige **Open with Live Server**.

También puedes usar el entorno de desarrollo incluido:

```bash
npm install
npm run dev
```

## Comprobación local

Con Node.js instalado, desde la carpeta del proyecto ejecuta:

```bash
npm run check
npm run build:static
```

La comprobación revisa recursos locales, enlaces internos, teléfono, WhatsApp, imágenes y datos básicos de cada HTML.

## Publicar en Cloudflare Pages

### Opción directa

1. En Cloudflare, abre **Workers & Pages**.
2. Elige **Create** → **Pages** → **Upload assets**.
3. Sube la carpeta completa o el ZIP final.
4. Para un despliegue estático convencional, usa `npm run build:static` y el directorio `dist`.
5. Publica y prueba la URL temporal.

### Opción conectada a GitHub

1. Crea un repositorio y sube el contenido de esta carpeta a la raíz.
2. En Cloudflare Pages, conecta ese repositorio.
3. Rama de producción: `main`.
4. Framework preset: `Vite`.
5. Build command: `npm run build:static`.
6. Build output directory: `dist`.

## Publicar en Netlify o Vercel

- **Netlify:** arrastra la carpeta `dist` después de ejecutar `npm run build:static`, o conecta el repositorio con ese comando y el directorio de publicación `dist`.
- **Vercel:** importa el repositorio, usa el comando `npm run build:static` y `dist` como directorio de salida.

## Conectar el dominio definitivo

Cuando el dominio esté comprado, añádelo desde el panel de la plataforma elegida y sigue los registros DNS que indique. Después comprueba HTTPS, la versión con y sin `www`, WhatsApp, teléfono y las tres páginas legales.

Los enlaces canonical y las imágenes sociales apuntan actualmente a la URL pública temporal. Cuando se conecte el dominio definitivo, sustituye en los cuatro HTML todas las apariciones de `patricia-lobo-fisioterapia-oviedo.davidmariaajnc.chatgpt.site` por el dominio final y vuelve a publicar.

## Datos que debe facilitar la propietaria antes del dominio definitivo

- Dominio final.
- DNI/NIF de Patricia Lobo Granado.
- Domicilio profesional o fiscal que legalmente deba figurar.
- Número de colegiada y colegio profesional.
- Confirmación de la duración habitual de la sesión.
- Formas de pago aceptadas.
- Criterio exacto de zona habitual y suplementos por desplazamiento o urgencia.

No se ha publicado ningún correo, red social, horario, número colegial ni dato fiscal no confirmado.

## Estructura

```text
index.html
aviso-legal.html
politica-privacidad.html
politica-cookies.html
assets/
  css/styles.css
  fonts/
  images/
  js/main.js
scripts/check-site.mjs
package.json
vite.static.config.js
README.md
robots.txt
_headers
```
