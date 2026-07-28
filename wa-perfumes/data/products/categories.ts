// ============================================================================
// WA PERFUMES — Categories, Filters, Seasons & Moods
// ============================================================================

export interface Season {
  id: string;
  name: string;
  nameFr: string;
  icon: string;
  months: string[];
}

export interface Occasion {
  id: string;
  name: string;
  nameFr: string;
  icon: string;
}

export interface Mood {
  id: string;
  name: string;
  nameFr: string;
  description: string;
  color: string;
}

export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface FragranceFamily {
  id: string;
  name: string;
  nameFr: string;
  description: string;
  color: string;
}

// ── SEASONS ─────────────────────────────────────────────────────
export const SEASONS: Season[] = [
  {
    id: 'spring',
    name: 'Spring',
    nameFr: 'Printemps',
    icon: '🌸',
    months: ['March', 'April', 'May'],
  },
  {
    id: 'summer',
    name: 'Summer',
    nameFr: 'Été',
    icon: '☀️',
    months: ['June', 'July', 'August'],
  },
  {
    id: 'autumn',
    name: 'Autumn',
    nameFr: 'Automne',
    icon: '🍂',
    months: ['September', 'October', 'November'],
  },
  {
    id: 'winter',
    name: 'Winter',
    nameFr: 'Hiver',
    icon: '❄️',
    months: ['December', 'January', 'February'],
  },
];

// ── OCCASIONS ───────────────────────────────────────────────────
export const OCCASIONS: Occasion[] = [
  { id: 'daily',    name: 'Daily Wear',      nameFr: 'Quotidien',       icon: '🌅' },
  { id: 'evening',  name: 'Evening Out',     nameFr: 'Soirée',          icon: '🌙' },
  { id: 'formal',   name: 'Formal Events',   nameFr: 'Événement Formel', icon: '🎩' },
  { id: 'romantic', name: 'Romantic',         nameFr: 'Romantique',      icon: '💕' },
  { id: 'casual',   name: 'Casual',           nameFr: 'Décontracté',     icon: '😎' },
  { id: 'office',   name: 'Office',           nameFr: 'Bureau',          icon: '💼' },
  { id: 'special',  name: 'Special Occasion', nameFr: 'Occasion Spéciale', icon: '✨' },
];

// ── MOODS ───────────────────────────────────────────────────────
export const MOODS: Mood[] = [
  {
    id: 'bold',
    name: 'Bold & Powerful',
    nameFr: 'Audacieux & Puissant',
    description: 'Commanding fragrances that leave a lasting impression',
    color: '#DC143C',
  },
  {
    id: 'mysterious',
    name: 'Mysterious & Dark',
    nameFr: 'Mystérieux & Sombre',
    description: 'Enigmatic scents that captivate and intrigue',
    color: '#2C1A4D',
  },
  {
    id: 'fresh',
    name: 'Fresh & Clean',
    nameFr: 'Frais & Propre',
    description: 'Crisp, invigorating fragrances for a clean aura',
    color: '#87CEEB',
  },
  {
    id: 'sensual',
    name: 'Sensual & Seductive',
    nameFr: 'Sensuel & Séduisant',
    description: 'Intimate scents designed to allure and enchant',
    color: '#8B0000',
  },
  {
    id: 'elegant',
    name: 'Elegant & Refined',
    nameFr: 'Élégant & Raffiné',
    description: 'Sophisticated compositions for the discerning nose',
    color: '#D4AF37',
  },
  {
    id: 'playful',
    name: 'Playful & Joyful',
    nameFr: 'Joueur & Joyeux',
    description: 'Light-hearted scents that radiate positivity',
    color: '#FF6B6B',
  },
  {
    id: 'warm',
    name: 'Warm & Cozy',
    nameFr: 'Chaud & Réconfortant',
    description: 'Comforting fragrances like a warm embrace',
    color: '#D2691E',
  },
];

// ── PRICE RANGES ────────────────────────────────────────────────
export const PRICE_RANGES: PriceRange[] = [
  { id: 'accessible', label: '500 - 800 DH',   min: 500,  max: 800 },
  { id: 'premium',    label: '800 - 1200 DH',  min: 800,  max: 1200 },
  { id: 'luxury',     label: '1200 - 1800 DH', min: 1200, max: 1800 },
  { id: 'exclusive',  label: '1800+ DH',       min: 1800, max: 99999 },
];

// ── FRAGRANCE FAMILIES ──────────────────────────────────────────
export const FRAGRANCE_FAMILIES: FragranceFamily[] = [
  {
    id: 'oriental',
    name: 'Oriental',
    nameFr: 'Oriental',
    description: 'Warm, sensual blends of amber, vanilla, and exotic spices',
    color: '#B8860B',
  },
  {
    id: 'woody',
    name: 'Woody',
    nameFr: 'Boisé',
    description: 'Earthy, warm compositions featuring cedar, sandalwood, and oud',
    color: '#8B6914',
  },
  {
    id: 'floral',
    name: 'Floral',
    nameFr: 'Floral',
    description: 'Elegant bouquets of rose, jasmine, and tuberose',
    color: '#C97B84',
  },
  {
    id: 'fresh',
    name: 'Fresh',
    nameFr: 'Frais',
    description: 'Invigorating citrus and aquatic accords',
    color: '#87CEEB',
  },
  {
    id: 'gourmand',
    name: 'Gourmand',
    nameFr: 'Gourmand',
    description: 'Delicious, edible notes of vanilla, caramel, and chocolate',
    color: '#D2691E',
  },
  {
    id: 'spicy',
    name: 'Spicy',
    nameFr: 'Épicé',
    description: 'Bold accords of cinnamon, cardamom, and pepper',
    color: '#CD5C5C',
  },
  {
    id: 'aromatic',
    name: 'Aromatic',
    nameFr: 'Aromatique',
    description: 'Herbal freshness with lavender, sage, and mint',
    color: '#6B8E23',
  },
  {
    id: 'aquatic',
    name: 'Aquatic',
    nameFr: 'Aquatique',
    description: 'Oceanic, marine, and watery freshness',
    color: '#4682B4',
  },
];

// ── GENDER ──────────────────────────────────────────────────────
export type Gender = 'homme' | 'femme' | 'unisex';

export const GENDERS: Record<Gender, { label: string; labelFr: string }> = {
  homme:  { label: 'For Him',  labelFr: 'Pour Homme' },
  femme:  { label: 'For Her',  labelFr: 'Pour Femme' },
  unisex: { label: 'Unisex',   labelFr: 'Unisexe' },
};

// ── LONGEVITY & PROJECTION SCALES ───────────────────────────────
export type Longevity = 'light' | 'moderate' | 'long' | 'very-long' | 'beast';
export type Projection = 'intimate' | 'moderate' | 'strong' | 'enormous';

export const LONGEVITY_LABELS: Record<Longevity, { label: string; hours: string }> = {
  'light':     { label: 'Light',     hours: '2-4h' },
  'moderate':  { label: 'Moderate',  hours: '4-6h' },
  'long':      { label: 'Long',      hours: '6-8h' },
  'very-long': { label: 'Very Long', hours: '8-12h' },
  'beast':     { label: 'Beast Mode', hours: '12h+' },
};

export const PROJECTION_LABELS: Record<Projection, { label: string; description: string }> = {
  'intimate':  { label: 'Intimate',  description: 'Close to skin' },
  'moderate':  { label: 'Moderate',  description: 'Arm\'s length' },
  'strong':    { label: 'Strong',    description: 'Fills a room' },
  'enormous':  { label: 'Enormous',  description: 'Announces your arrival' },
};
