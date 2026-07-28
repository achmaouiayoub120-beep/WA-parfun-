import { MEN_PRODUCTS } from '@/data/products/men';
import { WOMEN_PRODUCTS } from '@/data/products/women';
import { Product } from '@/data/products/men';

export function getProductById(id: string): Product | undefined {
  const allProducts = [...MEN_PRODUCTS, ...WOMEN_PRODUCTS];
  return allProducts.find((p) => p.id === id);
}

export function getAllProductIds(): string[] {
  const allProducts = [...MEN_PRODUCTS, ...WOMEN_PRODUCTS];
  return allProducts.map((p) => p.id);
}
