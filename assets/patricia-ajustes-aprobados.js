(() => {
  const aboutTitle = 'Atención fisioterapéutica cercana, personalizada y en tu hogar';
  const aboutParagraphs = [
    'Patricia Lobo se desplaza a tu domicilio con todo el material necesario para el tratamiento, para ofrecerte una atención cómoda, cercana y totalmente adaptada a ti.',
    'Cuenta con formación en traumatología, neurología, rehabilitación y fisioterapia geriátrica, además de especialización en ejercicio terapéutico y adaptación funcional. Ofrece una atención individualizada, trato cercano y tratamientos basados en la evidencia científica, con un seguimiento continuo de tu evolución. También dispone de electroterapia y presoterapia cuando el tratamiento lo requiere.'
  ];
  const aboutItems = [
    'Formación en traumatología y neurología',
    'Rehabilitación y fisioterapia geriátrica',
    'Ejercicio terapéutico y adaptación funcional',
    'Atención individualizada y trato cercano',
    'Electroterapia y presoterapia disponibles',
    'Tratamientos basados en la evidencia científica',
    'Todo el material necesario para el tratamiento'
  ];

  const checkIcon = '<span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-3.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg></span>';

  let applying = false;
  let scheduled = false;

  const setText = (element, value) => {
    if (element && element.textContent !== value) element.textContent = value;
  };

  function applyApprovedChanges() {
    if (applying) return;
    applying = true;

    const hero = document.querySelector('#inicio');
    if (hero) {
      const materialParagraph = Array.from(hero.querySelectorAll('p')).find((paragraph) =>
        paragraph.textContent.includes('Me desplazo con todo el material necesario')
      );
      setText(materialParagraph, 'Me desplazo con todo el material necesario para el tratamiento y trabajo con tratamientos basados en la evidencia científica.');
    }

    const about = document.querySelector('#sobre-mi');
    if (about) {
      const heading = about.querySelector('h2');
      setText(heading, aboutTitle);

      const copy = heading?.parentElement;
      const paragraphs = copy ? Array.from(copy.children).filter((node) => node.tagName === 'P') : [];
      aboutParagraphs.forEach((value, index) => {
        const paragraph = paragraphs[index];
        if (!paragraph) return;
        setText(paragraph, value);
        paragraph.style.textAlign = 'justify';
        paragraph.style.textJustify = 'inter-word';
      });

      const list = copy?.querySelector('ul');
      if (list) {
        const currentItems = Array.from(list.querySelectorAll(':scope > li')).map((item) => item.textContent.trim());
        if (currentItems.join('|') !== aboutItems.join('|')) {
          list.innerHTML = aboutItems
            .map((item) => `<li class="flex items-start gap-2.5 text-sm text-foreground">${checkIcon}${item}</li>`)
            .join('');
        }
      }
    }

    const contactSection = document.querySelector('#zonas');
    if (contactSection) {
      const heading = contactSection.querySelector('h2');
      setText(heading, 'Contacto');

      const intro = heading?.parentElement?.querySelector('p');
      setText(intro, 'Pide tu cita o consulta cualquier duda directamente por WhatsApp o teléfono.');

      const layout = Array.from(contactSection.querySelectorAll('div')).find((element) =>
        element.className.includes('mt-10') && element.querySelector('#contacto')
      );

      if (layout) {
        const zonesCard = Array.from(layout.children).find((element) => element.textContent.includes('Zonas habituales'));
        if (zonesCard) zonesCard.remove();
        const approvedClass = 'mt-10 mx-auto max-w-xl';
        if (layout.className !== approvedClass) layout.className = approvedClass;
      }
    }

    const footer = document.querySelector('footer');
    if (footer) {
      footer.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
        const row = link.closest('li');
        if (row) row.remove();
      });
    }

    applying = false;
  }

  const scheduleApply = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyApprovedChanges();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyApprovedChanges, { once: true });
  } else {
    applyApprovedChanges();
  }

  [0, 100, 400, 1200].forEach((delay) => setTimeout(applyApprovedChanges, delay));
  new MutationObserver(scheduleApply).observe(document.documentElement, { childList: true, subtree: true });
})();
