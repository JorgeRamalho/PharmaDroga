import { products as localProducts } from '@/data/products';
import type { Product } from '@/types';

const API_URL = '/api/products.json';

interface ProductsApiResponse {
  updatedAt: string;
  products: Product[];
}

/** Busca produtos da API estática (substituível por endpoint real em produção). */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = (await response.json()) as ProductsApiResponse;

    if (!Array.isArray(data.products) || data.products.length === 0) {
      throw new Error('Invalid products payload');
    }

    return data.products;
  } catch {
    return localProducts;
  }
}
