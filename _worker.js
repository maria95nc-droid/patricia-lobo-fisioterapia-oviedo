export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    return new HTMLRewriter()
      .on("head", {
        element(element) {
          element.append(`
            <style>
              #inicio img[alt*="Patricia Lobo Granado"] {
                display: block !important;
                width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                max-height: none !important;
                aspect-ratio: 3 / 4 !important;
                object-fit: contain !important;
                object-position: center top !important;
                background: #d4d4d4 !important;
              }

              #inicio div:has(> img[alt*="Patricia Lobo Granado"]) {
                width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                max-height: none !important;
                aspect-ratio: 3 / 4 !important;
                overflow: hidden !important;
                background: #d4d4d4 !important;
              }

              @media (min-width: 768px) {
                #inicio div:has(> img[alt*="Patricia Lobo Granado"]) {
                  max-width: 520px !important;
                  margin-left: auto !important;
                  margin-right: auto !important;
                }
              }
            </style>
          `, { html: true });
        }
      })
      .on("body", {
        element(element) {
          element.append(
            '<script src="/assets/patricia-ajustes-aprobados.js" defer></script>',
            { html: true }
          );
        }
      })
      .transform(response);
  }
};
