import type { Product, ProductIcon } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Vitamina D3 2000UI — 60 cápsulas',
    priceOld: 45.9,
    price: 29.9,
    discount: '-35%',
    icon: 'vitamin',
  },
  {
    id: 2,
    name: 'Protetor Solar FPS 50 — 120ml',
    priceOld: 89.9,
    price: 59.9,
    discount: '-33%',
    icon: 'sun',
  },
  {
    id: 3,
    name: 'Omeprazol 20mg — 28 comprimidos',
    priceOld: 32.5,
    price: 18.9,
    discount: '-42%',
    icon: 'pill',
  },
  {
    id: 4,
    name: 'Shampoo Anticaspa — 400ml',
    priceOld: 38.9,
    price: 24.9,
    discount: '-36%',
    icon: 'bottle',
  },
  {
    id: 5,
    name: 'Termômetro Digital Infravermelho',
    priceOld: 129.9,
    price: 79.9,
    discount: '-38%',
    icon: 'thermo',
  },
  {
    id: 6,
    name: 'Whey Protein 900g — Chocolate',
    priceOld: 159.9,
    price: 99.9,
    discount: '-38%',
    icon: 'protein',
  },
];

export const productIcons: Record<ProductIcon, string> = {
  vitamin:
    '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="20" fill="rgba(255,255,255,0.3)"/><text x="32" y="38" text-anchor="middle" fill="white" font-size="20" font-weight="bold">D</text></svg>',
  sun: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="14" fill="rgba(255,255,255,0.9)"/><g stroke="rgba(255,255,255,0.7)" stroke-width="3"><line x1="32" y1="8" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="56"/><line x1="8" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="56" y2="32"/></g></svg>',
  pill: '<svg viewBox="0 0 64 64"><rect x="16" y="24" width="32" height="16" rx="8" fill="rgba(255,255,255,0.9)"/><line x1="32" y1="24" x2="32" y2="40" stroke="rgba(10,92,92,0.3)" stroke-width="2"/></svg>',
  bottle:
    '<svg viewBox="0 0 64 64"><rect x="24" y="16" width="16" height="8" rx="2" fill="rgba(255,255,255,0.7)"/><rect x="20" y="24" width="24" height="28" rx="4" fill="rgba(255,255,255,0.9)"/></svg>',
  thermo:
    '<svg viewBox="0 0 64 64"><rect x="28" y="12" width="8" height="36" rx="4" fill="rgba(255,255,255,0.9)"/><circle cx="32" cy="52" r="8" fill="rgba(255,255,255,0.7)"/></svg>',
  protein:
    '<svg viewBox="0 0 64 64"><rect x="22" y="16" width="20" height="36" rx="3" fill="rgba(255,255,255,0.9)"/><rect x="26" y="10" width="12" height="8" rx="2" fill="rgba(255,255,255,0.7)"/></svg>',
};
