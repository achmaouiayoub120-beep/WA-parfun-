// ============================================================================
// WA PERFUMES — Collections Metadata
// ============================================================================

export interface Collection {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  taglineFr: string;
  description: string;
  descriptionFr: string;
  gender: 'homme' | 'femme';
  bannerImage: string;
  accentColor: string;
  accentColorLight: string;
  productPrefix: string;
  productCount: number;
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'signature',
    name: 'WA Signature',
    slug: 'homme',
    tagline: 'Dark & Bold',
    taglineFr: 'Sombre & Audacieux',
    description:
      'The WA Signature collection embodies the essence of modern masculinity. Each fragrance is a bold statement — crafted with rare woods, intense spices, and smoky accords that command attention and leave an indelible mark.',
    descriptionFr:
      'La collection WA Signature incarne l\'essence de la masculinité moderne. Chaque fragrance est une déclaration audacieuse — composée de bois rares, d\'épices intenses et d\'accords fumés qui imposent le respect.',
    gender: 'homme',
    bannerImage: '/images/collections/homme-banner.jpg',
    accentColor: '#D4AF37',
    accentColorLight: '#F0D96B',
    productPrefix: 'WA Signature',
    productCount: 13,
  },
  {
    id: 'elegance',
    name: 'WA Elegance',
    slug: 'femme',
    tagline: 'Soft & Elegant',
    taglineFr: 'Douce & Élégante',
    description:
      'The WA Elegance collection celebrates the art of feminine allure. From delicate florals to intoxicating gourmands, each creation is a whisper of sophistication — timeless, refined, and irresistibly captivating.',
    descriptionFr:
      'La collection WA Elegance célèbre l\'art de l\'allure féminine. Des floraux délicats aux gourmands enivrants, chaque création est un murmure de sophistication — intemporelle, raffinée et irrésistiblement captivante.',
    gender: 'femme',
    bannerImage: '/images/collections/femme-banner.jpg',
    accentColor: '#C97B84',
    accentColorLight: '#E8A5AE',
    productPrefix: 'WA Elegance',
    productCount: 9,
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find(c => c.slug === slug);
}

export function getCollectionById(id: string): Collection | undefined {
  return COLLECTIONS.find(c => c.id === id);
}
