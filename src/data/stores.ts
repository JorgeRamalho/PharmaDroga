export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  hours: string;
  phone: string;
  distanceKm: number;
  mapsUrl: string;
}

/** Regiões por prefixo de CEP (primeiros 2 dígitos) — dados demonstrativos */
const storesByPrefix: Record<string, StoreLocation[]> = {
  '01': [
    {
      id: 'sp-centro',
      name: 'Pharmadroga Paulista',
      address: 'Av. Paulista, 1200',
      city: 'São Paulo',
      state: 'SP',
      cep: '01310-100',
      hours: 'Seg–Sáb 8h–22h',
      phone: '(11) 3000-1000',
      distanceKm: 0.8,
      mapsUrl: 'https://maps.google.com/?q=Av+Paulista+1200+Sao+Paulo',
    },
    {
      id: 'sp-consolacao',
      name: 'Pharmadroga Consolação',
      address: 'Rua da Consolação, 890',
      city: 'São Paulo',
      state: 'SP',
      cep: '01302-000',
      hours: 'Seg–Dom 7h–23h',
      phone: '(11) 3000-1001',
      distanceKm: 1.4,
      mapsUrl: 'https://maps.google.com/?q=Rua+da+Consolacao+890+Sao+Paulo',
    },
  ],
  '20': [
    {
      id: 'rj-copa',
      name: 'Pharmadroga Copacabana',
      address: 'Av. Nossa Sra. de Copacabana, 450',
      city: 'Rio de Janeiro',
      state: 'RJ',
      cep: '22020-001',
      hours: 'Seg–Sáb 8h–22h',
      phone: '(21) 3000-2000',
      distanceKm: 1.1,
      mapsUrl: 'https://maps.google.com/?q=Av+Nossa+Sra+de+Copacabana+450',
    },
  ],
  '30': [
    {
      id: 'bh-savassi',
      name: 'Pharmadroga Savassi',
      address: 'Rua Pernambuco, 1200',
      city: 'Belo Horizonte',
      state: 'MG',
      cep: '30130-150',
      hours: 'Seg–Sáb 8h–21h',
      phone: '(31) 3000-3000',
      distanceKm: 2.0,
      mapsUrl: 'https://maps.google.com/?q=Rua+Pernambuco+1200+Belo+Horizonte',
    },
  ],
  '80': [
    {
      id: 'cwb-centro',
      name: 'Pharmadroga Batel',
      address: 'Av. Batel, 800',
      city: 'Curitiba',
      state: 'PR',
      cep: '80420-090',
      hours: 'Seg–Sáb 8h–22h',
      phone: '(41) 3000-4000',
      distanceKm: 1.6,
      mapsUrl: 'https://maps.google.com/?q=Av+Batel+800+Curitiba',
    },
  ],
};

const fallbackStores: StoreLocation[] = [
  {
    id: 'demo-1',
    name: 'Pharmadroga Express',
    address: 'Rua das Flores, 100',
    city: 'Sua região',
    state: 'BR',
    cep: '00000-000',
    hours: 'Seg–Sáb 8h–20h',
    phone: '0800 123 4567',
    distanceKm: 3.5,
    mapsUrl: 'https://maps.google.com/?q=farmacia',
  },
  {
    id: 'demo-2',
    name: 'Pharmadroga Plus',
    address: 'Av. Central, 250',
    city: 'Sua região',
    state: 'BR',
    cep: '00000-001',
    hours: 'Seg–Dom 7h–22h',
    phone: '0800 123 4568',
    distanceKm: 5.2,
    mapsUrl: 'https://maps.google.com/?q=farmacia',
  },
];

export function normalizeCep(value: string): string {
  return value.replace(/\D/g, '').slice(0, 8);
}

export function isValidCep(cep: string): boolean {
  return cep.length === 8;
}

export function findStoresByCep(cepInput: string): StoreLocation[] {
  const cep = normalizeCep(cepInput);
  if (!isValidCep(cep)) return [];

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
