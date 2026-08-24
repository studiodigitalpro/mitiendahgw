export type ProductCategory =
  | 'todos'
  | 'alimentos'
  | 'serie-cafes'
  | 'serie-candy'
  | 'cuidado-personal'
  | 'accesorios'
  | 'equipo'
  | 'suplementos'
  | 'licores'
  | 'membresias';

export interface Product {
  id: string | number;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  pricePublic: number;
  pricePartner: number; // 30% discount
  bv: number; // Business Volume points
  image: string;
  fallbackImage?: string;
  gallery?: string[];
  presentation: string;
  benefits?: string[];
  ingredients?: string[];
  usage?: string;
  warnings?: string;
  featured?: boolean;
  badge?: string;
  healthFocus?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  bvRequired: number;
  approxInvestment: string;
  regularPrice: number;
  partnerPrice: number;
  discountActivation: string;
  discountRecompra: string;
  bonuses: {
    ventaDirecta: string;
    inicioRapido: string;
    desarrollo: string;
    equipo: string;
    topeDiario: string;
    recompra: string;
    elite?: string;
    gananciaMutua: string;
    rangoHonor: string;
  };
  highlights: string[];
  recommendedFor: string;
  popular?: boolean;
  image: string;
}

export interface SponsorInfo {
  name: string;
  role: string;
  code: string;
  country: string;
  email: string;
  phone: string;
  whatsapp: string;
  image?: string;
  registrationUrl: string;
  videoTutorialUrl: string;
  youtubeEmbedId: string;
}
