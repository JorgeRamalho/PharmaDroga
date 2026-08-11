import { findStoresByCep, isValidCep, normalizeCep, type StoreLocation } from '@/data/stores';
import { t } from '@/i18n';

function formatCep(value: string): string {
  const digits = normalizeCep(value);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function renderStoreResults(stores: StoreLocation[], container: HTMLElement): void {
  if (stores.length === 0) {
    container.innerHTML = `<p class="store-finder__message" role="status">${t('stores.noResults')}</p>`;
    return;
  }

  container.innerHTML = `
    <h3 class="store-finder__results-title">${t('stores.resultsTitle')}</h3>
    <ul class="store-finder__list">
      ${stores
        .map(
          (store) => `
        <li class="store-card">
          <div class="store-card__header">
            <strong class="store-card__name">${store.name}</strong>
            <span class="store-card__distance">${store.distanceKm.toFixed(1)} km</span>
          </div>
          <p class="store-card__address">${store.address} — ${store.city}/${store.state}</p>
          <p class="store-card__meta">CEP ${store.cep} · ${store.hours} · ${store.phone}</p>
          <a class="store-card__map btn btn--outline btn--sm" href="${store.mapsUrl}" target="_blank" rel="noopener noreferrer">
            ${t('stores.openMap')}
          </a>
        </li>
      `
        )
        .join('')}
    </ul>
  `;
}

export function initStoreFinder(): void {
  const form = document.getElementById('storeFinderForm');
  const input = document.getElementById('storeCepInput') as HTMLInputElement | null;
  const results = document.getElementById('storeFinderResults');
  const submitBtn = document.getElementById('storeFinderSubmit') as HTMLButtonElement | null;

  if (!form || !input || !results || !submitBtn) return;

  input.addEventListener('input', () => {
    input.value = formatCep(input.value);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cep = normalizeCep(input.value);
    if (!isValidCep(cep)) {
      results.innerHTML = `<p class="store-finder__message store-finder__message--error" role="alert">${t('stores.invalidCep')}</p>`;
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = t('stores.searching');
    results.innerHTML = `<p class="store-finder__message" role="status">${t('stores.searching')}</p>`;

    window.setTimeout(() => {
      const stores = findStoresByCep(cep);
      renderStoreResults(stores, results);
      submitBtn.disabled = false;
      submitBtn.textContent = t('stores.search');
    }, 600);
  });

  window.addEventListener('pharmadroga:locale-change', () => {
    const cep = normalizeCep(input.value);
    if (isValidCep(cep) && results.querySelector('.store-finder__list')) {
      renderStoreResults(findStoresByCep(cep), results);
    }
    submitBtn.textContent = t('stores.search');
  });
}
