/**
 * Pharmadroga â JavaScript vanilla (Live Server / HTML estÃ¡tico)
 * InteraÃ§Ãµes da landing: navegaÃ§Ã£o, ofertas, tema, lojas, modais e calculadora.
 */

const products = [
  {
    id: 1,
    name: 'Vitamina D3 2000UI â 60 cÃ¡psulas',
    priceOld: 45.9,
    price: 29.9,
    discount: '-35%',
    icon: 'vitamin',
  },
  {
    id: 2,
    name: 'Protetor Solar FPS 50 â 120ml',
    priceOld: 89.9,
    price: 59.9,
    discount: '-33%',
    icon: 'sun',
  },
  {
    id: 3,
    name: 'Omeprazol 20mg â 28 comprimidos',
    priceOld: 32.5,
    price: 18.9,
    discount: '-42%',
    icon: 'pill',
  },
  {
    id: 4,
    name: 'Shampoo Anticaspa â 400ml',
    priceOld: 38.9,
    price: 24.9,
    discount: '-36%',
    icon: 'bottle',
  },
  {
    id: 5,
    name: 'TermÃ´metro Digital Infravermelho',
    priceOld: 129.9,
    price: 79.9,
    discount: '-38%',
    icon: 'thermo',
  },
  {
    id: 6,
    name: 'Whey Protein 900g â Chocolate',
    priceOld: 159.9,
    price: 99.9,
    discount: '-38%',
    icon: 'protein',
  },
];

const productIcons = {
  vitamin:
    '<svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="20" fill="rgba(255,255,255,0.3)"/><text x="32" y="38" text-anchor="middle" fill="white" font-size="20" font-weight="bold">D</text></svg>',
  sun: '<svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="14" fill="rgba(255,255,255,0.9)"/><g stroke="rgba(255,255,255,0.7)" stroke-width="3"><line x1="32" y1="8" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="56"/><line x1="8" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="56" y2="32"/></g></svg>',
  pill: '<svg viewBox="0 0 64 64" width="64" height="64"><rect x="16" y="24" width="32" height="16" rx="8" fill="rgba(255,255,255,0.9)"/><line x1="32" y1="24" x2="32" y2="40" stroke="rgba(10,92,92,0.3)" stroke-width="2"/></svg>',
  bottle:
    '<svg viewBox="0 0 64 64" width="64" height="64"><rect x="24" y="16" width="16" height="8" rx="2" fill="rgba(255,255,255,0.7)"/><rect x="20" y="24" width="24" height="28" rx="4" fill="rgba(255,255,255,0.9)"/></svg>',
  thermo:
    '<svg viewBox="0 0 64 64" width="64" height="64"><rect x="28" y="12" width="8" height="36" rx="4" fill="rgba(255,255,255,0.9)"/><circle cx="32" cy="52" r="8" fill="rgba(255,255,255,0.7)"/></svg>',
  protein:
    '<svg viewBox="0 0 64 64" width="64" height="64"><rect x="22" y="16" width="20" height="36" rx="3" fill="rgba(255,255,255,0.9)"/><rect x="26" y="10" width="12" height="8" rx="2" fill="rgba(255,255,255,0.7)"/></svg>',
};

const paymentMethods = [
  { id: 'visa', name: 'Visa', installments: 6 },
  { id: 'master', name: 'Mastercard', installments: 6 },
  { id: 'elo', name: 'Elo', installments: 6 },
  { id: 'amex', name: 'American Express', installments: 6 },
  { id: 'hiper', name: 'Hipercard', installments: 6 },
  { id: 'pix', name: 'PIX', installments: 1 },
];

const infoModalContent = {
  sobre: {
    title: 'Sobre a Pharmadroga',
    body: '<p>A Pharmadroga Ã© uma rede de drogarias presente em todo o Brasil, unindo cuidado farmacÃªutico de excelÃªncia a preÃ§os acessÃ­veis.</p><p>Com mais de 500 lojas, oferecemos atendimento humanizado, produtos de qualidade e as melhores condiÃ§Ãµes de pagamento do mercado.</p><p><em>ConteÃºdo demonstrativo â projeto portfÃ³lio.</em></p>',
  },
  carreiras: {
    title: 'Trabalhe conosco',
    body: '<p>FaÃ§a parte de uma equipe que cuida da saÃºde de milhÃµes de brasileiros.</p><ul><li>Vagas em lojas e centros de distribuiÃ§Ã£o</li><li>Plano de carreira e capacitaÃ§Ã£o contÃ­nua</li><li>Ambiente inclusivo e colaborativo</li></ul><p>Envie seu currÃ­culo para <strong>carreiras@pharmadroga.com.br</strong> (demonstrativo).</p>',
  },
  sustentabilidade: {
    title: 'Sustentabilidade',
    body: '<p>Comprometidos com o meio ambiente e a comunidade, a Pharmadroga investe em descarte correto de medicamentos, reduÃ§Ã£o de plÃ¡sticos e eficiÃªncia energÃ©tica nas lojas.</p>',
  },
  ajuda: {
    title: 'Central de ajuda',
    body: '<p>Encontre respostas sobre pedidos, entregas, receitas e programas de fidelidade.</p><ul><li>Como rastrear meu pedido</li><li>PolÃ­tica de medicamentos controlados</li><li>Clube Pharmadroga e cupons</li></ul>',
  },
  trocas: {
    title: 'Trocas e devoluÃ§Ãµes',
    body: '<p>VocÃª pode trocar ou devolver produtos em atÃ© 7 dias, conforme o CÃ³digo de Defesa do Consumidor, apresentando nota fiscal e embalagem original.</p>',
  },
  contato: {
    title: 'Fale conosco',
    body: '<p><strong>SAC:</strong> 0800 000 0000 (demonstrativo)</p><p><strong>E-mail:</strong> atendimento@pharmadroga.com.br</p><p>HorÃ¡rio: SegâSÃ¡b 8hâ22h</p>',
  },
};

const storesByPrefix = {
  '01': [
    {
      name: 'Pharmadroga Paulista',
      address: 'Av. Paulista, 1200',
      city: 'SÃ£o Paulo',
      state: 'SP',
      cep: '01310-100',
      hours: 'SegâSÃ¡b 8hâ22h',
      phone: '(11) 3000-1000',
      distanceKm: 0.8,
      mapsUrl: 'https://maps.google.com/?q=Av+Paulista+1200+Sao+Paulo',
    },
    {
      name: 'Pharmadroga ConsolaÃ§Ã£o',
      address: 'Rua da ConsolaÃ§Ã£o, 890',
      city: 'SÃ£o Paulo',
      state: 'SP',
      cep: '01302-000',
      hours: 'SegâDom 7hâ23h',
      phone: '(11) 3000-1001',
      distanceKm: 1.4,
      mapsUrl: 'https://maps.google.com/?q=Rua+da+Consolacao+890+Sao+Paulo',
    },
  ],
  20: [
    {
      name: 'Pharmadroga Copacabana',
      address: 'Av. Nossa Sra. de Copacabana, 450',
      city: 'Rio de Janeiro',
      state: 'RJ',
      cep: '22020-001',
      hours: 'SegâSÃ¡b 8hâ22h',
      phone: '(21) 3000-2000',
      distanceKm: 1.1,
      mapsUrl: 'https://maps.google.com/?q=Av+Nossa+Sra+de+Copacabana+450',
    },
  ],
  30: [
    {
      name: 'Pharmadroga Savassi',
      address: 'Rua Pernambuco, 1200',
      city: 'Belo Horizonte',
      state: 'MG',
      cep: '30130-150',
      hours: 'SegâSÃ¡b 8hâ21h',
      phone: '(31) 3000-3000',
      distanceKm: 2.0,
      mapsUrl: 'https://maps.google.com/?q=Rua+Pernambuco+1200+Belo+Horizonte',
    },
  ],
  80: [
    {
      name: 'Pharmadroga Batel',
      address: 'Av. Batel, 800',
      city: 'Curitiba',
      state: 'PR',
      cep: '80420-090',
      hours: 'SegâSÃ¡b 8hâ22h',
      phone: '(41) 3000-4000',
      distanceKm: 1.6,
      mapsUrl: 'https://maps.google.com/?q=Av+Batel+800+Curitiba',
    },
  ],
};

const fallbackStores = [
  {
    name: 'Pharmadroga Express',
    address: 'Rua das Flores, 100',
    city: 'Sua regiÃ£o',
    state: 'BR',
    cep: '00000-000',
    hours: 'SegâSÃ¡b 8hâ20h',
    phone: '0800 123 4567',
    distanceKm: 3.5,
    mapsUrl: 'https://maps.google.com/?q=farmacia',
  },
  {
    name: 'Pharmadroga Plus',
    address: 'Av. Central, 250',
    city: 'Sua regiÃ£o',
    state: 'BR',
    cep: '00000-001',
    hours: 'SegâDom 7hâ22h',
    phone: '0800 123 4568',
    distanceKm: 5.2,
    mapsUrl: 'https://maps.google.com/?q=farmacia',
  },
];

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatInstallment(price) {
  const installment = (price / 6).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return `6x de ${installment} sem juros`;
}

function normalizeCep(value) {
  return String(value).replace(/\D/g, '').slice(0, 8);
}

function findStoresByCep(cepInput) {
  const cep = normalizeCep(cepInput);
  if (cep.length !== 8) return [];

  const prefix = cep.slice(0, 2);
  const regional = storesByPrefix[prefix];

  if (regional) {
    return regional.map((store) => ({
      ...store,
      distanceKm: store.distanceKm + (parseInt(cep.slice(2, 5), 10) % 10) * 0.1,
    }));
  }

  return fallbackStores;
}

function renderProducts() {
  const grid = document.getElementById('offersGrid');
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (product) => `
      <article class="offer-card reveal visible" data-product-id="${product.id}">
        <div class="offer-card__image">
          <span class="offer-card__tag">${product.discount}</span>
          ${productIcons[product.icon] || productIcons.pill}
        </div>
        <div class="offer-card__body">
          <h3 class="offer-card__name">${product.name}</h3>
          <div class="offer-card__prices">
            <span class="offer-card__price-old">${formatPrice(product.priceOld)}</span>
            <span class="offer-card__price">${formatPrice(product.price)}</span>
          </div>
          <span class="offer-card__installment">${formatInstallment(product.price)}</span>
          <button type="button" class="btn btn--primary btn--block offer-card__cta" data-product-name="${product.name}">
            Ver produto
          </button>
        </div>
      </article>
    `
    )
    .join('');
}

function initHeader() {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      nav?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

function formatCounterDisplay(current, target) {
  if (target === 520) return `${current}+`;
  if (target === 27) return `${current}`;
  if (target === 15000) return `${current.toLocaleString('pt-BR')}+`;
  if (target === 8) return `${current}M+`;
  return String(current);
}

function animateCounter(element, target, duration = 2000) {
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    element.textContent = formatCounterDisplay(current, target);

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const stats = document.querySelectorAll('.stat__number[data-count]');
  let triggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          stats.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-count') || '0', 10);
            animateCounter(stat, target);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const storesSection = document.getElementById('lojas');
  if (storesSection) observer.observe(storesSection);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || anchor.hasAttribute('data-info-modal')) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initInfoModals() {
  const modal = document.getElementById('infoModal');
  const titleEl = document.getElementById('infoModalTitle');
  const bodyEl = document.getElementById('infoModalBody');
  const closeBtn = document.getElementById('infoModalClose');
  if (!modal || !titleEl || !bodyEl || !closeBtn) return;

  let lastFocused = null;

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  }

  function openModal(key) {
    const content = infoModalContent[key];
    if (!content) return;

    lastFocused = document.activeElement;
    titleEl.textContent = content.title;
    bodyEl.innerHTML = content.body;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  document.querySelectorAll('[data-info-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-info-modal');
      if (key) openModal(key);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.querySelector('[data-close-modal]')?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (!modal.hidden && e.key === 'Escape') closeModal();
  });
}

let toastTimer;

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add('visible');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
    toast.classList.remove('visible');
  }, 3200);
}

function initOfferCards() {
  const grid = document.getElementById('offersGrid');
  if (!grid) return;

  grid.addEventListener('click', (e) => {
    const button = e.target.closest?.('.offer-card__cta');
    if (!button) return;
    const name = button.getAttribute('data-product-name') || 'Produto';
    showToast(`${name} adicionado Ã  lista (demonstraÃ§Ã£o)`);
  });
}

function initLangToggle() {
  const button = document.getElementById('langToggle');
  if (!button) return;

  button.addEventListener('click', () => {
    const isEn = document.documentElement.lang.startsWith('en');
    document.documentElement.lang = isEn ? 'pt-BR' : 'en';
    button.textContent = isEn ? 'EN' : 'PT';
    button.setAttribute(
      'aria-label',
      isEn ? 'Alternar idioma para inglÃªs' : 'Switch language to Portuguese'
    );
    showToast(isEn ? 'Idioma: PortuguÃªs (textos principais no HTML)' : 'Language: English (demo toggle)');
  });
}

function initStoreFinder() {
  const form = document.getElementById('storeFinderForm');
  const input = document.getElementById('storeCepInput');
  const results = document.getElementById('storeFinderResults');
  const submitBtn = document.getElementById('storeFinderSubmit');
  if (!form || !input || !results || !submitBtn) return;

  input.addEventListener('input', () => {
    const digits = normalizeCep(input.value);
    input.value = digits.length <= 5 ? digits : `${digits.slice(0, 5)}-${digits.slice(5)}`;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cep = normalizeCep(input.value);

    if (cep.length !== 8) {
      results.innerHTML =
        '<p class="store-finder__message store-finder__message--error" role="alert">Informe um CEP vÃ¡lido com 8 dÃ­gitos.</p>';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Buscando...';
    results.innerHTML = '<p class="store-finder__message" role="status">Buscando lojas...</p>';

    window.setTimeout(() => {
      const stores = findStoresByCep(cep);
      results.innerHTML = `
        <h3 class="store-finder__results-title">Lojas prÃ³ximas</h3>
        <ul class="store-finder__list">
          ${stores
            .map(
              (store) => `
            <li class="store-card">
              <div class="store-card__header">
                <strong class="store-card__name">${store.name}</strong>
                <span class="store-card__distance">${store.distanceKm.toFixed(1)} km</span>
              </div>
              <p class="store-card__address">${store.address} â ${store.city}/${store.state}</p>
              <p class="store-card__meta">CEP ${store.cep} Â· ${store.hours} Â· ${store.phone}</p>
              <a class="store-card__map btn btn--outline btn--sm" href="${store.mapsUrl}" target="_blank" rel="noopener noreferrer">Abrir no mapa</a>
            </li>
          `
            )
            .join('')}
        </ul>
      `;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Buscar lojas';
    }, 600);
  });
}

function initBrandPdfExport() {
  const button = document.getElementById('exportBrandPdf');
  if (!button) return;

  button.addEventListener('click', () => {
    document.body.classList.add('print-brand');
    const cleanup = () => {
      document.body.classList.remove('print-brand');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
  });
}

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const input = document.getElementById('newsletterEmail');
  const feedback = document.getElementById('newsletterFeedback');
  if (!form || !input || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
      feedback.textContent = 'Informe um e-mail vÃ¡lido.';
      feedback.className = 'react-newsletter__feedback error';
      feedback.hidden = false;
      return;
    }

    feedback.textContent = 'InscriÃ§Ã£o realizada! Em breve vocÃª receberÃ¡ nossas ofertas.';
    feedback.className = 'react-newsletter__feedback success';
    feedback.hidden = false;
    input.value = '';
  });

  input.addEventListener('input', () => {
    feedback.hidden = true;
  });
}

function initPaymentCalculator() {
  const amountInput = document.getElementById('calcAmount');
  const amountLabel = document.getElementById('calcAmountLabel');
  const methodsEl = document.getElementById('calcMethods');
  const resultLabel = document.getElementById('calcResultLabel');
  const resultValue = document.getElementById('calcResultValue');
  const resultInstallment = document.getElementById('calcResultInstallment');
  if (!amountInput || !amountLabel || !methodsEl || !resultLabel || !resultValue || !resultInstallment) {
    return;
  }

  let amount = Number(amountInput.value) || 150;
  let selected = paymentMethods[0];

  function renderMethods() {
    methodsEl.innerHTML = paymentMethods
      .map(
        (method) => `
      <button
        type="button"
        class="react-payment-calc__method ${selected.id === method.id ? 'active' : ''}"
        data-method-id="${method.id}"
      >
        ${method.name}
      </button>
    `
      )
      .join('');
  }

  function updateResult() {
    const pixDiscount = 0.05;
    const finalAmount = selected.id === 'pix' ? amount * (1 - pixDiscount) : amount;
    const installmentValue = finalAmount / selected.installments;

    amountLabel.textContent = formatPrice(amount);

    if (selected.id === 'pix') {
      resultLabel.textContent = 'Valor com 5% de desconto no PIX';
      resultValue.textContent = formatPrice(finalAmount);
      resultInstallment.textContent = `Economia de ${formatPrice(amount - finalAmount)}`;
    } else {
      resultLabel.textContent = `${selected.installments}x sem juros â ${selected.name}`;
      resultValue.textContent = formatPrice(installmentValue);
      resultInstallment.textContent = `Total: ${formatPrice(finalAmount)}`;
    }
  }

  methodsEl.addEventListener('click', (e) => {
    const button = e.target.closest?.('[data-method-id]');
    if (!button) return;
    const id = button.getAttribute('data-method-id');
    selected = paymentMethods.find((method) => method.id === id) || paymentMethods[0];
    renderMethods();
    updateResult();
  });

  amountInput.addEventListener('input', () => {
    amount = Number(amountInput.value) || 0;
    updateResult();
  });

  renderMethods();
  updateResult();
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.removeAttribute('data-theme');
  try {
    localStorage.removeItem('pharmadroga-theme');
  } catch {
    /* ignore */
  }

  initLangToggle();
  renderProducts();
  initHeader();
  initScrollReveal();
  initActiveNav();
  initCounters();
  initSmoothScroll();
  initInfoModals();
  initOfferCards();
  initStoreFinder();
  initBrandPdfExport();
  initNewsletter();
  initPaymentCalculator();
});
