import { MembershipPlan, SponsorInfo } from '../types';

export const SPONSOR_INFO: SponsorInfo = {
  name: 'Yamilka Batista',
  role: 'Networker Digital & Distribuidora Independiente HGW',
  code: 'Yamilka507',
  country: 'Panamá',
  email: 'info@negociohgw.com',
  phone: '+507 6778-8375',
  whatsapp: '+50767788375',
  image: 'https://lh3.googleusercontent.com/d/1KeOPcyuhctKp1qJsNsfw-nlUuXzyU_hf',
  registrationUrl: 'https://www.healthgreenworld.com/?userName=Yamilka507',
  videoTutorialUrl: 'https://www.youtube.com/watch?v=cR-aHkU9N4A&t=5s',
  youtubeEmbedId: 'cR-aHkU9N4A'
};

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'prejunior',
    name: 'Membresía Prejunior (50 BV)',
    bvRequired: 50,
    approxInvestment: 'USD $89 – $100',
    regularPrice: 138.0,
    partnerPrice: 90.0,
    discountActivation: '30% de descuento',
    discountRecompra: '30% en recompras',
    bonuses: {
      ventaDirecta: '30% en compras de clientes hasta 100 BV',
      inicioRapido: '20% hasta 2 niveles (Ganancia Mutua 50/50)',
      desarrollo: 'USD $0.20 hasta 10 niveles de profundidad',
      equipo: '5% sobre BV menor acumulado (Niveles infinitos)',
      topeDiario: 'USD $50 diarios (Máx $1,500/mes)',
      recompra: '5% hasta 10 niveles en matriz 2x2 (Reconsumo min 10 BV / ~$20)',
      gananciaMutua: '50% para ti y 50% para tu patrocinador',
      rangoHonor: 'Acceso a calificar desde Rango Plata hasta Diamante'
    },
    highlights: [
      'Inicia con solo 50 BV en productos de tu libre elección',
      'Descuento permanente del 30% en todas tus recompras',
      'Ganas de la red de tu patrocinador que se posicione después de ti',
      'Ascenso acumulativo a rangos superiores hasta en 180 días',
      'Acceso a la Academia Digital HGW (academiahgw.online) 24/7'
    ],
    recommendedFor: 'Ideal para personas que desean probar los productos y generar sus primeros ingresos extra con mínima inversión.',
    popular: false,
    image: 'https://hgwpanama.com/wp-content/uploads/2026/08/rango-plata-hgw.webp'
  },
  {
    id: 'junior',
    name: 'Membresía Junior (100 BV)',
    bvRequired: 100,
    approxInvestment: 'USD $180 – $200',
    regularPrice: 241.0,
    partnerPrice: 180.0,
    discountActivation: '30% de descuento',
    discountRecompra: '30% en recompras',
    bonuses: {
      ventaDirecta: '30% por cada cliente registrado',
      inicioRapido: '20% hasta 2 niveles (Ganancia Mutua)',
      desarrollo: 'USD $0.50 hasta 10 niveles de profundidad',
      equipo: '7% sobre BV menor de equipo (Niveles infinitos)',
      topeDiario: 'USD $120 diarios (Máx $3,600/mes)',
      recompra: '5% hasta 10 niveles en matriz 2x2',
      gananciaMutua: '50% compartido patrocinador y patrocinado',
      rangoHonor: 'Calificación rápida a Rangos de Honor'
    },
    highlights: [
      'Activación en 1 sola compra de 100 BV o 2 compras de 50 BV',
      'Incremento del Bono de Equipo al 7% (Tope $120/día)',
      'Bono de Desarrollo sube a USD $0.50 por cada ingreso',
      'Acceso a comisiones de hasta 10 niveles de profundidad',
      'Plazo de 180 días para acumular hacia Master'
    ],
    recommendedFor: 'Recomendada para quienes buscan construir una red activa y comercializar productos con mayor margen.',
    popular: true,
    image: 'https://hgwpanama.com/wp-content/uploads/2026/08/rango-oro-hgw.webp'
  },
  {
    id: 'senior',
    name: 'Membresía Senior (300 BV)',
    bvRequired: 300,
    approxInvestment: 'USD $540 – $600',
    regularPrice: 728.0,
    partnerPrice: 540.0,
    discountActivation: '30% de descuento',
    discountRecompra: '30% en recompras',
    bonuses: {
      ventaDirecta: '30% en ventas al público',
      inicioRapido: '20% hasta 2 niveles',
      desarrollo: 'USD $1.50 hasta 10 niveles',
      equipo: '8% sobre BV acumulado (Niveles infinitos)',
      topeDiario: 'USD $360 diarios (Máx $10,800/mes)',
      recompra: '5% en matriz 2x2 hasta 10 niveles',
      elite: '4% Bono Élite hasta 3 generaciones de liderazgo',
      gananciaMutua: '50/50 en todos los bonos aplicables',
      rangoHonor: 'Plata, Oro, Platino, Diamante y superiores'
    },
    highlights: [
      'Desbloquea el codiciado BONO ÉLITE (4% hasta 3 generaciones)',
      'Bono de Equipo sube al 8% con tope diario de $360 USD',
      'Bono de Desarrollo triplicado a USD $1.50 por persona',
      'Activación con 300 BV únicos, o compras fraccionadas',
      'Posicionamiento acelerado en la estructura de liderazgo'
    ],
    recommendedFor: 'Para constructores de equipos y líderes que buscan ingresos significativos de mediano y largo plazo.',
    popular: false,
    image: 'https://hgwpanama.com/wp-content/uploads/2026/08/rango-platino-hgw.webp'
  },
  {
    id: 'master',
    name: 'Membresía Master (600 BV)',
    bvRequired: 600,
    approxInvestment: 'USD $980 – $1,100',
    regularPrice: 1100.0,
    partnerPrice: 980.0,
    discountActivation: '30% de descuento',
    discountRecompra: '60% en todas las recompras',
    bonuses: {
      ventaDirecta: 'Hasta 60% de utilidad en ventas',
      inicioRapido: '20% hasta 2 niveles con frontalidad ilimitada',
      desarrollo: 'USD $3.00 hasta 10 niveles',
      equipo: '10% sobre BV acumulado (Niveles infinitos)',
      topeDiario: 'USD $720 diarios (Máx $21,600/mes)',
      recompra: '5% en matriz 2x2 (Reconsumo de solo 10 BV / ~$20)',
      elite: '4% Bono Élite hasta 6 generaciones completas',
      gananciaMutua: 'Ganancia Mutua 50/50 ilimitada',
      rangoHonor: 'Premios de Auto, Casa, Cruceros y Club Millonario'
    },
    highlights: [
      '👑 Membresía de MÁXIMO NIVEL de HGW con todos los bonos al 100%',
      '🔥 60% DE DESCUENTO en todas tus recompras de por vida',
      'Bono de Equipo al 10% con el tope más alto: $720 USD al día',
      'Bono de Desarrollo máximo: USD $3.00 por afiliado en 10 niveles',
      'Bono Élite extendido a 6 generaciones completas',
      'Califica a viajes internacionales, cruceros, Bono Auto y Casa'
    ],
    recommendedFor: 'Diseñada para emprendedores y visionarios que desean el máximo rendimiento, 60% en recompras y construir libertad financiera.',
    popular: true,
    image: 'https://hgwpanama.com/wp-content/uploads/2026/08/Rango-Diamante-300x300-1.webp'
  }
];

export const HGW_RANKS = [
  {
    name: 'Rango Plata',
    accumulated: 'USD $500 Acumulados',
    badgeImage: 'https://hgwpanama.com/wp-content/uploads/2026/08/rango-plata-hgw.webp',
    description: 'Primer gran escalón de liderazgo. Logrado con 8 paquetes Master y 2 Junior, o 16 Senior y 2 Junior.'
  },
  {
    name: 'Rango Oro',
    accumulated: 'USD $1,500 Acumulados',
    badgeImage: 'https://hgwpanama.com/wp-content/uploads/2026/08/rango-oro-hgw.webp',
    description: 'Consolidación de equipo activo y duplicación en profundidad.'
  },
  {
    name: 'Rango Platino',
    accumulated: 'USD $3,000 Acumulados',
    badgeImage: 'https://hgwpanama.com/wp-content/uploads/2026/08/rango-platino-hgw.webp',
    description: 'Liderazgo intermedio con acceso a bonos de calificación y eventos exclusivos.'
  },
  {
    name: 'Rango Diamante',
    accumulated: 'USD $5,000 Acumulados',
    badgeImage: 'https://hgwpanama.com/wp-content/uploads/2026/08/Rango-Diamante-300x300-1.webp',
    description: 'Rango insignia de HGW. Abre las puertas al Club de Diamantes y viajes internacionales.'
  },
  {
    name: 'Diamantes 1 a 7 Estrellas',
    accumulated: 'Desde 1 hasta 7 Diamantes Directos',
    badgeImage: 'https://hgwpanama.com/wp-content/uploads/2026/08/Rango-Diamante-300x300-1.webp',
    description: 'Máximas categorías de honor en HGW con incentivos de Bono Auto, Bono Casa y Club Millonario.'
  }
];
