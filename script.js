
  // ========= Data =========
  const animes = [
    { title: "Lâminas do Crepúsculo", date: "July 30, 2025", author: "Admin", stars: 5, art: "art-1" },
    { title: "Guardiões da Tempestade", date: "July 28, 2025", author: "Haruki", stars: 4, art: "art-2" },
    { title: "Dragão Escarlate", date: "July 25, 2025", author: "Kenji", stars: 5, art: "art-3" },
    { title: "Cronos: O Despertar", date: "July 22, 2025", author: "Yuki", stars: 4, art: "art-4" },
    { title: "Feiticeiros do Vazio", date: "July 20, 2025", author: "Admin", stars: 5, art: "art-5" },
    { title: "Assassino Fantasma", date: "July 18, 2025", author: "Rei", stars: 4, art: "art-6" },
    { title: "Oceano de Estrelas", date: "July 15, 2025", author: "Admin", stars: 5, art: "art-7" },
    { title: "Senhores do Aço", date: "July 12, 2025", author: "Sora", stars: 5, art: "art-8" },
  ];

  const readMore = [
    { title: "A Ascensão do Herói Escudo", author: "Kenji", date: "July 30, 2025", art: "art-mini-1", play: true },
    { title: "Tokyo Neon Nights", author: "Haruki", date: "July 28, 2025", art: "art-mini-2", play: false },
    { title: "O Último Samurai Espacial", author: "Admin", date: "July 26, 2025", art: "art-mini-3", play: true },
    { title: "Reinos de Cristal", author: "Yuki", date: "July 24, 2025", art: "art-mini-1", play: false },
    { title: "Código das Sombras", author: "Rei", date: "July 22, 2025", art: "art-mini-2", play: true },
    { title: "A Canção do Vento", author: "Sora", date: "July 20, 2025", art: "art-mini-3", play: false },
  ];

  const popular = [
    { title: "Lâminas do Crepúsculo - Ep.12", date: "July 30, 2025", art: "art-mini-1" },
    { title: "Dragão Escarlate - Final", date: "July 25, 2025", art: "art-mini-3" },
    { title: "Guardiões da Tempestade", date: "July 22, 2025", art: "art-mini-2" },
  ];

  // ========= Build star icons =========
  function starsHTML(count) {
    let html = '';
    for (let i = 0; i < 5; i++) {
      html += `<i data-lucide="star" class="w-3.5 h-3.5 ${i < count ? 'star-yellow fill-current' : 'text-gray-500'}" ${i < count ? 'fill="currentColor"' : ''}></i>`;
    }
    return html;
  }

  // ========= Build Carousel =========
  function buildCarousel() {
    const track = document.getElementById('carousel-track');
    // Duplicate list for infinite loop
    const list = [...animes, ...animes];
    track.innerHTML = list.map((a, idx) => `
      <article class="anime-card art-decor ${a.art}" data-title="${a.title}" data-idx="${idx % animes.length}">
        <div class="overlay"></div>
        <span class="red-tag absolute top-3 left-0 z-10">Teste Menu 7</span>
        <div class="absolute top-4 right-4 flex gap-0.5 z-10 bg-black/50 px-2 py-1 rounded">
          ${starsHTML(a.stars)}
        </div>
        <div class="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 class="text-white font-spartan font-black text-2xl leading-tight text-shadow mb-2">${a.title}</h3>
          <div class="flex items-center gap-2 text-gray-200 text-xs text-shadow">
            <i data-lucide="clock" class="w-3.5 h-3.5"></i>
            <span>${a.date}</span>
            <span class="text-gray-400">·</span>
            <span>${a.author}</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  // ========= Build Read More Grid =========
  function buildReadMore() {
    const grid = document.getElementById('read-more-grid');
    grid.innerHTML = readMore.map(r => `
      <div class="group cursor-pointer" data-title="${r.title}">
        <div class="relative ${r.art} aspect-square overflow-hidden art-decor">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          ${r.play ? `
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-12 h-12 rounded-full bg-black/70 border-2 border-white flex items-center justify-center group-hover:bg-[#d91f26] transition">
                <i data-lucide="play" class="w-5 h-5 text-white fill-current ml-0.5"></i>
              </div>
            </div>
          ` : ''}
        </div>
        <h4 class="font-spartan font-bold text-sm mt-2 group-hover:text-[#d91f26] transition line-clamp-2">${r.title}</h4>
        <p class="muted-text text-xs mt-1">${r.author} · ${r.date}</p>
      </div>
    `).join('');
  }

  // ========= Build Popular Posts =========
  function buildPopular() {
    const el = document.getElementById('popular-posts');
    el.innerHTML = popular.map(p => `
      <a href="#" class="flex gap-3 group">
        <div class="${p.art} w-16 h-16 flex-shrink-0 art-decor relative"></div>
        <div class="flex-1 min-w-0">
          <h4 class="font-spartan font-semibold text-sm leading-tight group-hover:text-[#d91f26] transition line-clamp-2">${p.title}</h4>
          <p class="muted-text text-xs mt-1 flex items-center gap-1">
            <i data-lucide="clock" class="w-3 h-3"></i> ${p.date}
          </p>
        </div>
      </a>
    `).join('');
  }

  // ========= Carousel drag logic =========
  function initCarouselDrag() {
    const track = document.getElementById('carousel-track');
    const wrapper = document.getElementById('carousel-wrapper');
    let isDown = false;
    let startX = 0;
    let currentTranslate = 0;
    let dragTranslate = 0;
    let didDrag = false;
    let animationPaused = false;

    // Convert animation to manual control once user interacts
    function pauseAutoScroll() {
      if (animationPaused) return;
      const computedTransform = window.getComputedStyle(track).transform;
      if (computedTransform && computedTransform !== 'none') {
        const matrix = new DOMMatrixReadOnly(computedTransform);
        currentTranslate = matrix.m41;
      }
      track.classList.remove('auto-scroll');
      track.style.transform = `translateX(${currentTranslate}px)`;
      animationPaused = true;
    }

    function resumeAutoScroll() {
      // Wait a bit before resuming
      setTimeout(() => {
        if (!isDown) {
          track.style.transform = '';
          track.classList.add('auto-scroll');
          animationPaused = false;
        }
      }, 2500);
    }

    const onDown = (e) => {
      isDown = true;
      didDrag = false;
      pauseAutoScroll();
      track.classList.add('dragging');
      startX = (e.touches ? e.touches[0].clientX : e.clientX);
      dragTranslate = currentTranslate;
      e.preventDefault?.();
    };

    const onMove = (e) => {
      if (!isDown) return;
      const x = (e.touches ? e.touches[0].clientX : e.clientX);
      const delta = x - startX;
      if (Math.abs(delta) > 5) didDrag = true;
      currentTranslate = dragTranslate + delta;

      // Loop bounds - track is 2x the list
      const trackWidth = track.scrollWidth / 2;
      if (currentTranslate > 0) currentTranslate -= trackWidth;
      if (currentTranslate < -trackWidth) currentTranslate += trackWidth;

      track.style.transform = `translateX(${currentTranslate}px)`;
    };

    const onUp = () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('dragging');
      resumeAutoScroll();
    };

    wrapper.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    wrapper.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    // Hover pause
    wrapper.addEventListener('mouseenter', () => {
      if (!animationPaused) track.classList.add('paused');
    });
    wrapper.addEventListener('mouseleave', () => {
      track.classList.remove('paused');
    });

    // Click on card
    track.addEventListener('click', (e) => {
      if (didDrag) { e.preventDefault(); e.stopPropagation(); return; }
      const card = e.target.closest('.anime-card');
      if (card) {
        showToast(`Abrindo: ${card.dataset.title}`);
      }
    });
  }

  // ========= Toast =========
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._timeout);
    t._timeout = setTimeout(() => t.style.opacity = '0', 2200);
  }

  // ========= Theme toggle =========
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = document.getElementById('theme-icon');

    // Load saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(savedTheme);
    updateThemeUI(savedTheme === 'dark-theme');

    toggle.addEventListener('click', () => {
      const isDark = body.classList.contains('dark-theme');
      body.classList.toggle('dark-theme', !isDark);
      body.classList.toggle('light-theme', isDark);
      const newTheme = !isDark ? 'dark-theme' : 'light-theme';
      localStorage.setItem('theme', newTheme);
      updateThemeUI(!isDark);
      showToast(!isDark ? 'Modo escuro ativado' : 'Modo claro ativado');
    });

    function updateThemeUI(isDark) {
      toggle.style.background = isDark ? '#d91f26' : '#d1d5db';
      icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
      lucide.createIcons();
    }
  }

  // ========= Nav click =========
  function initNav() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast(`Navegando: ${btn.dataset.nav}`);
      });
    });

    document.getElementById('signup-btn').addEventListener('click', () => {
      showToast('Abrindo cadastro...');
    });

    document.getElementById('read-more-grid').addEventListener('click', (e) => {
      const card = e.target.closest('[data-title]');
      if (card) showToast(`Lendo: ${card.dataset.title}`);
    });
  }

  // ========= Element SDK =========
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig: {
        site_title: "ANIME",
        primary_color: "#d91f26",
        background_color: "#f3f4f6",
        surface_color: "#ffffff",
        text_color: "#111827",
        accent_color: "#ec4899",
        font_family: "Anton",
        font_size: 15
      },
      onConfigChange: async (config) => {
        document.getElementById('site-title').textContent = config.site_title || "ANIME";
      },
      mapToCapabilities: (config) => ({
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      }),
      mapToEditPanelValues: (config) => new Map([
        ["site_title", config.site_title || "ANIME"]
      ])
    });
  }

  // ========= Cookie Management =========
  function initCookies() {
    const banner = document.getElementById('cookie-banner');
    const modal = document.getElementById('cookie-modal');
    const acceptBtn = document.getElementById('accept-cookies-btn');
    const manageBtn = document.getElementById('manage-cookies-btn');
    const saveBtn = document.getElementById('save-cookies-btn');
    const rejectBtn = document.getElementById('reject-all-btn');
    const analyticsCb = document.getElementById('analytics-cookies');
    const marketingCb = document.getElementById('marketing-cookies');

    // Check if cookies were already accepted
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
      // Show banner after 1 second
      setTimeout(() => {
        banner.style.opacity = '1';
        banner.style.pointerEvents = 'auto';
      }, 1000);
    }

    // Accept all cookies
    acceptBtn.addEventListener('click', () => {
      const consent = {
        essential: true,
        analytics: true,
        marketing: true,
        date: new Date().toISOString()
      };
      localStorage.setItem('cookieConsent', JSON.stringify(consent));
      banner.style.opacity = '0';
      banner.style.pointerEvents = 'none';
      showToast('✓ Cookies aceitos e configurações salvas');
    });

    // Open manage modal
    manageBtn.addEventListener('click', () => {
      // Load saved preferences if they exist
      if (cookieConsent) {
        const consent = JSON.parse(cookieConsent);
        analyticsCb.checked = consent.analytics || false;
        marketingCb.checked = consent.marketing || false;
      }
      modal.style.opacity = '1';
      modal.style.pointerEvents = 'auto';
    });

    // Save cookie preferences
    saveBtn.addEventListener('click', () => {
      const consent = {
        essential: true,
        analytics: analyticsCb.checked,
        marketing: marketingCb.checked,
        date: new Date().toISOString()
      };
      localStorage.setItem('cookieConsent', JSON.stringify(consent));
      modal.style.opacity = '0';
      modal.style.pointerEvents = 'none';
      banner.style.opacity = '0';
      banner.style.pointerEvents = 'none';
      showToast('✓ Preferências de cookies salvas');
    });

    // Reject all non-essential
    rejectBtn.addEventListener('click', () => {
      const consent = {
        essential: true,
        analytics: false,
        marketing: false,
        date: new Date().toISOString()
      };
      localStorage.setItem('cookieConsent', JSON.stringify(consent));
      modal.style.opacity = '0';
      modal.style.pointerEvents = 'none';
      banner.style.opacity = '0';
      banner.style.pointerEvents = 'none';
      showToast('✓ Cookies rejeitados (apenas essenciais mantidos)');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
      }
    });
  }

  // ========= Supporters Data =========
  const supporters = [
    // Add supporters with image placeholder and name
    // Format: { name: "Name/Nickname", image: "gradient-class" }
  ];

  function buildSupportersGrid() {
    const grid = document.getElementById('supporters-grid');
    const noSupporters = document.getElementById('no-supporters');
    
    if (supporters.length === 0) {
      grid.innerHTML = '';
      noSupporters.classList.remove('hidden');
      return;
    }

    noSupporters.classList.add('hidden');
    grid.innerHTML = supporters.map((supporter, idx) => `
      <div class="group text-center">
        <div class="relative w-full aspect-square mb-3 rounded-sm overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
          <div class="w-full h-full flex items-center justify-center text-gray-400">
            <i data-lucide="user" class="w-16 h-16"></i>
          </div>
          <div class="absolute inset-0 bg-black/40 group-hover:bg-[#d91f26]/20 transition"></div>
        </div>
        <h3 class="font-spartan font-bold text-white group-hover:text-[#d91f26] transition">${supporter.name}</h3>
        <p class="text-xs text-gray-400 mt-1">❤️ Apoiador</p>
      </div>
    `).join('');
    lucide.createIcons();
  }

  // ========= Supporters Page Navigation =========
  function initSupportersPage() {
    const supportersPage = document.getElementById('supporters-page');
    const mainContent = document.querySelector('main');
    const supportersNavBtn = document.getElementById('supporters-nav-btn');
    const backBtn = document.getElementById('back-to-home-btn');
    const copyPixBtn = document.getElementById('copy-pix-btn');
    const qrScanBtn = document.getElementById('qr-scan-btn');
    const qrModal = document.getElementById('qr-modal');
    const closeQrBtn = document.getElementById('close-qr-btn');

    // Show supporters page
    supportersNavBtn.addEventListener('click', () => {
      mainContent.style.display = 'none';
      document.querySelector('footer').style.display = 'none';
      supportersPage.classList.remove('hidden');
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      supportersNavBtn.classList.add('active');
      window.scrollTo(0, 0);
      lucide.createIcons();
    });

    // Back to home
    backBtn.addEventListener('click', () => {
      supportersPage.classList.add('hidden');
      mainContent.style.display = 'block';
      document.querySelector('footer').style.display = 'block';
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.nav-btn[data-nav="Início"]').classList.add('active');
      window.scrollTo(0, 0);
    });

    // Copy PIX key
    copyPixBtn.addEventListener('click', () => {
      const pixKey = '12345678901234567890@email.com';
      navigator.clipboard.writeText(pixKey).then(() => {
        showToast('✓ Chave PIX copiada!');
        copyPixBtn.textContent = '✓ Copiado';
        setTimeout(() => {
          copyPixBtn.innerHTML = '<i data-lucide="copy" class="w-4 h-4 inline mr-2"></i>Copiar';
          lucide.createIcons();
        }, 2000);
      });
    });

    // Show QR Code modal
    qrScanBtn.addEventListener('click', () => {
      qrModal.classList.remove('hidden');
    });

    // Close QR modal
    closeQrBtn.addEventListener('click', () => {
      qrModal.classList.add('hidden');
    });

    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        qrModal.classList.add('hidden');
      }
    });
  }

  // Build supporters grid
  buildSupportersGrid();

  // ========= Init =========
  buildCarousel();
  buildReadMore();
  buildPopular();
  lucide.createIcons();
  initCarouselDrag();
  initTheme();
  initNav();
  initCookies();
  initSupportersPage();


(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9fdb0033761dd868',t:'MTc3OTEwODc2NC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();