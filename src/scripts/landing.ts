import { infoModalContent, type InfoModalKey } from '@/data/info-modals';
import { productIcons } from '@/data/products';
import { t } from '@/i18n';
import { fetchProducts } from '@/services/products-api';
import { initBrandPdfExport } from '@/scripts/brand-pdf';
import { initI18n } from '@/scripts/i18n-dom';
import { initStoreFinder } from '@/scripts/store-finder';
import type { Product } from '@/types';
import { formatInstallment, formatPrice } from '@/utils/format';

function renderProductCards(products: Product[]): void {
  const grid = document.getElementById('offersGrid');
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (product) => `
      <article class="offer-card reveal visible" data-product-id="${product.id}">
        <div class="offer-card__image">
          <span class="offer-card__tag">${product.discount}</span>
          ${productIcons[product.icon] ?? productIcons.pill}
        </div>
        <div class="offer-card__body">
          <h3 class="offer-card__name">${product.name}</h3>
          <div class="offer-card__prices">
            <span class="offer-card__price-old">${formatPrice(product.priceOld)}</span>
            <span class="offer-card__price">${formatPrice(product.price)}</span>
          </div>
          <span class="offer-card__installment">${formatInstallment(product.price)}</span>
          <button type="button" class="btn btn--primary btn--block offer-card__cta" data-product-name="${product.name}">
            ${t('offers.cta')}
          </button>
        </div>
      </article>
    `
    )
    .join('');
}

async function loadProductsFromApi(): Promise<void> {
  const grid = document.getElementById('offersGrid');
  if (!grid) return;

  grid.innerHTML = `<p class="offers__loading" role="status">${t('offers.loading')}</p>`;

  const products = await fetchProducts();
  renderProductCards(products);
}

function initHeader(): void {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? t('header.menuClose') : t('header.menuOpen'));
  });

  document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      nav?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', t('header.menuOpen'));
    });
  });
}

function initScrollReveal(): void {
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

function initActiveNav(): void {
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

function formatCounterDisplay(current: number, target: number): string {
  if (target === 520) return `${current}+`;
  if (target === 27) return `${current}`;
  if (target === 15000) return `${current.toLocaleString('pt-BR')}+`;
  if (target === 8) return `${current}M+`;
  return String(current);
}

function animateCounter(element: HTMLElement, target: number, duration = 2000): void {
  const start = performance.now();

  function update(currentTime: number): void {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    element.textContent = formatCounterDisplay(current, target);

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters(): void {
  const stats = document.querySelectorAll('.stat__number[data-count]');
  let triggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          stats.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-count') ?? '0', 10);
            animateCounter(stat as HTMLElement, target);
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

function initSmoothScroll(): void {
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

function initInfoModals(): void {
  const modalEl = document.getElementById('infoModal');
  const titleEl = document.getElementById('infoModalTitle');
  const bodyEl = document.getElementById('infoModalBody');
  const closeBtn = document.getElementById('infoModalClose');
  if (!modalEl || !titleEl || !bodyEl || !closeBtn) return;

  const modal = modalEl;
  const modalTitle = titleEl;
  const modalBody = bodyEl;
  const modalClose = closeBtn;
  let lastFocused: Element | null = null;

  function closeModal(): void {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  }

  function openModal(key: InfoModalKey): void {
    const content = infoModalContent[key];
    if (!content) return;

    lastFocused = document.activeElement;
    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  document.querySelectorAll('[data-info-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-info-modal') as InfoModalKey | null;
      if (key) openModal(key);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.querySelector('[data-close-modal]')?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
  });

  modalBody.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const link = target.closest('a[href^="#"]');
    if (!link) return;
    closeModal();
  });
}

let toastTimer: ReturnType<typeof setTimeout> | undefined;

function showToast(message: string): void {
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

function initOfferCards(): void {
  const grid = document.getElementById('offersGrid');
  if (!grid) return;

  grid.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const button = target.closest('.offer-card__cta');
    if (!button) return;

    const name = button.getAttribute('data-product-name') ?? 'Produto';
    showToast(`${name} ${t('toast.product')}`);
  });
}

export function initLanding(): void {
  document.documentElement.removeAttribute('data-theme');
  try {
    localStorage.removeItem('pharmadroga-theme');
  } catch {
    /* ignore */
  }

  initI18n();
  initHeader();
  initScrollReveal();
  initActiveNav();
  initCounters();
  initSmoothScroll();
  initInfoModals();
  initOfferCards();
  initStoreFinder();
  initBrandPdfExport();
  void loadProductsFromApi();
}
