(() => {
  const root = document.documentElement;
  root.classList.add('js');

  /* ---------- Tema claro/escuro ---------- */
  const themeButtons = document.querySelectorAll('[data-theme-toggle]');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  const applyTheme = (theme, persist) => {
    root.dataset.theme = theme;
    themeButtons.forEach((button) => {
      button.setAttribute('aria-label', theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
    });
    if (themeColor) themeColor.content = theme === 'dark' ? '#070809' : '#ffffff';
    if (persist) {
      try { localStorage.setItem('secc-theme', theme); } catch (e) { /* armazenamento indisponível */ }
    }
  };

  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark', false);
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
  });

  /* ---------- Cabeçalho ---------- */
  const header = document.querySelector('.site-header');
  const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 48);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  /* ---------- Menus suspensos (desktop) ---------- */
  const dropdowns = [...document.querySelectorAll('.has-menu')];
  const closeDropdowns = (except) => {
    dropdowns.forEach((item) => {
      if (item === except) return;
      item.classList.remove('is-open');
      item.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  };

  dropdowns.forEach((item) => {
    const trigger = item.querySelector('button');
    trigger.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      closeDropdowns(item);
      item.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.has-menu')) closeDropdowns();
  });

  /* ---------- Menu móvel ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  const setMobileMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', open);
    mobileMenu.hidden = !open;
    if (open) {
      // Ocupa do cabeçalho até o fim da tela, mesmo com a faixa SOS visível acima.
      mobileMenu.style.height = `${window.innerHeight - header.getBoundingClientRect().bottom}px`;
    }
  };

  menuToggle.addEventListener('click', () => setMobileMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  mobileMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMobileMenu(false);
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) setMobileMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openDropdown = dropdowns.find((item) => item.classList.contains('is-open'));
    if (openDropdown) {
      closeDropdowns();
      openDropdown.querySelector('button').focus();
    }
    if (menuToggle.getAttribute('aria-expanded') === 'true') {
      setMobileMenu(false);
      menuToggle.focus();
    }
  });

  /* ---------- Abas (fases e perfis) ---------- */
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

    const select = (index, focus) => {
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[i].hidden = !active;
      });
      if (focus) {
        tabs[index].focus();
        tabs[index].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(index, false));
      tab.addEventListener('keydown', (event) => {
        let target = null;
        if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
        else if (event.key === 'Home') target = 0;
        else if (event.key === 'End') target = tabs.length - 1;
        if (target === null) return;
        event.preventDefault();
        select(target, true);
      });
    });

    select(Math.max(0, tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true')), false);
  });

  /* ---------- Vídeo do hero: respeita movimento reduzido e economia de dados ---------- */
  const heroVideo = document.querySelector('.hero-media video');
  const saveData = navigator.connection && navigator.connection.saveData;
  if (heroVideo && (saveData || window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    heroVideo.removeAttribute('autoplay');
    heroVideo.pause();
  }
})();
