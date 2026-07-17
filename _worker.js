export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    return new HTMLRewriter()
      .on("body", {
        element(element) {
          element.append(
            '<script src="/assets/patricia-ajustes-aprobados.js" defer></script>',
            { html: true }
          );
          element.append(
            `<script>
              (() => {
                const removeEmail = () => {
                  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
                    const item = link.closest('li');
                    if (item) item.remove();
                  });

                  document.querySelectorAll('#contacto li').forEach((item) => {
                    const text = (item.textContent || '').trim().toLowerCase();
                    if (text.includes('correo electrónico') || text.startsWith('email:')) {
                      item.remove();
                    }
                  });
                };

                removeEmail();
                document.addEventListener('DOMContentLoaded', removeEmail, { once: true });
                new MutationObserver(removeEmail).observe(document.documentElement, {
                  childList: true,
                  subtree: true
                });
              })();
            </script>`,
            { html: true }
          );
        },
      })
      .transform(response);
  },
};
