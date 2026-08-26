import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1. Blueberry Candy
  {
    id: 1001,
    name: 'Blueberry Candy',
    category: 'serie-candy',
    categoryLabel: 'Serie Candy HGW',
    shortDescription: 'Caramelos duros enriquecidos con extracto concentrado de arándanos y antocianinas bioactivas.',
    description: 'Los caramelos Blueberry Candy de HGW son una deliciosa y práctica manera de consumir antioxidantes naturales a base de arándanos canadienses. Ayudan a proteger la salud visual, combaten el daño de radicales libres y refrescan el aliento de forma natural.',
    pricePublic: 5.80,
    pricePartner: 4.00,
    bv: 2.00,
    image: 'https://lh3.googleusercontent.com/d/1eTFs4b9a7wEIsAkODOfnbDNoVFtQctAD',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1RnzqoZ3FUGrRYH5X5Yo_WxGDL7opwwfE',
    presentation: 'Frasco con 60 caramelos (30 g)',
    benefits: [
      'Aporte continuo de antocianinas protectoras de la retina y mácula',
      'Poder antioxidante contra el envejecimiento celular prematuro',
      'Agradable sabor a arándanos silvestres sin sensación empalagosa',
      'Ideal para llevar en el bolso, vehículo, estudio y oficina'
    ],
    ingredients: ['Polvo de arándanos concentrado (Vaccinium corymbosum)', 'Sorbitol', 'Ácido cítrico', 'Extractos botánicos'],
    usage: 'Disolver lentamente en la boca 1 o más caramelos al día según se desee un toque antioxidante.',
    featured: true,
    badge: 'Más Vendido 🫐',
    healthFocus: ['Cuidado de la Visión', 'Antioxidante']
  },

  // 2. Blueberry Fruit Tea (Jam)
  {
    id: 1002,
    name: 'Blueberry Fruit Tea (Mermelada de Arándanos)',
    category: 'alimentos',
    categoryLabel: 'Alimentos y Bebidas',
    shortDescription: 'Mermelada y concentrado para té de frutas con arándanos enteros seleccionados ricos en antocianinas.',
    description: 'Blueberry Fruit Tea es una preparación gourmet a base de pulpa y arándanos enteros. Puede disfrutarse como una deliciosa mermelada untable sobre tostadas o diluirse en agua tibia o fría para obtener un reconfortante té frutal cargado de flavonoides.',
    pricePublic: 12.00,
    pricePartner: 8.00,
    bv: 4.00,
    image: 'https://lh3.googleusercontent.com/d/1_5DlGwk1pxeaVa0aBnv_hdN7gRNcsLSB',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1_5DlGwk1pxeaVa0aBnv_hdN7gRNcsLSB',
    presentation: 'Frasco de vidrio de 200 gramos',
    benefits: [
      'Rico en pectina natural y pulpa de arándano de alta concentración',
      'Versatilidad dual: infusión de té frutal o mermelada untable',
      'Protege los capilares sanguíneos y la salud ocular',
      'Sin colorantes artificiales'
    ],
    ingredients: ['Arándanos enteros y pulpa seleccionada', 'Fructosa natural', 'Pectina de frutas', 'Ácido cítrico'],
    usage: 'Consuma directamente 1-2 cucharadas en desayunos o diluya 1 cucharada en una taza de agua tibia/fría.',
    featured: false,
    badge: '100% Fruta Natural',
    healthFocus: ['Cuidado de la Visión', 'Antioxidante', 'Nutrición Diaria']
  },

  // 3. Blueberry Collagen Peptide
  {
    id: 1003,
    name: 'Blueberry Collagen Peptide (Péptido de Colágeno)',
    category: 'suplementos',
    categoryLabel: 'Suplementos y Nutracéuticos',
    shortDescription: 'Péptidos bioactivos de colágeno hidrolizado combinados con arándanos para firmeza dérmica y articular.',
    description: 'Péptido de colágeno de bajo peso molecular de rápida absorción celular, enriquecido con el poder antioxidante del arándano. Estimula la síntesis endógena de colágeno, mejorando la elasticidad de la piel, la hidratación dérmica y la salud de cartílagos y articulaciones.',
    pricePublic: 29.00,
    pricePartner: 20.00,
    bv: 12.00,
    image: 'https://lh3.googleusercontent.com/d/1YO8lm6tWUdNmeZkFXrOfVCKu5YVG9_xI',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1YO8lm6tWUdNmeZkFXrOfVCKu5YVG9_xI',
    presentation: 'Caja con 12 sobres de 25 gramos c/u (300 g)',
    benefits: [
      'Péptidos hidrolizados de máxima biodisponibilidad y asimilación celular',
      'Aumenta la firmeza, hidratación y elasticidad de la piel',
      'Fortalece folículos capilares, uñas y articulaciones',
      'Sinergia antioxidante con arándano que frena la degradación del colágeno'
    ],
    ingredients: ['Péptidos de colágeno hidrolizado', 'Polvo de arándano', 'Vitamina C (ácido ascórbico)', 'Xilitol'],
    usage: 'Disuelva 1 sachet en 150-200 ml de agua fresca o tibia, preferentemente en ayunas o antes de acostarse.',
    featured: true,
    badge: 'Rejuvenecimiento Celular ✨',
    healthFocus: ['Antioxidante', 'Salud Articular', 'Nutrición Diaria']
  },

  // 4. Fresh Drink Chang JingJing
  {
    id: 1004,
    name: 'Fresh Drink Chang JingJing (Limpiador de Colon)',
    category: 'alimentos',
    categoryLabel: 'Alimentos y Bebidas',
    shortDescription: 'Selecta infusión herbal alcalinizante formulada para el bienestar y limpieza suave del tracto digestivo.',
    description: 'Bebida botánica refrescante con nutrientes naturales. Su exclusiva combinación de pasto de cebada, bayas de goji, Gan Cao (regaliz), diente de león y crisantemo apoya el sistema de desintoxicación natural del cuerpo, favorece la digestión y aporta antioxidantes celulares.',
    pricePublic: 13.00,
    pricePartner: 9.00,
    bv: 5.40,
    image: 'https://lh3.googleusercontent.com/d/1c3SMUWaUWIMsfVFywOPSaa0bQAJzdNnY',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1UFx0FZ6Inbru3b_gGpBgiIeNzxV8vu0C',
    presentation: 'Caja con 6 sobres de 3.5 gramos c/u (21 g)',
    benefits: [
      'Favorece el tránsito intestinal y la evacuación natural sin cólicos',
      'Desintoxicación profunda de colon, hígado y riñones',
      'Rico en clorofila natural que neutraliza la acidez metabólica',
      'Reduce la hinchazón abdominal y mejora la absorción de nutrientes'
    ],
    ingredients: ['Cebada verde tierna', 'Bayas de Goji', 'Raíz de Gan Cao (Regaliz)', 'Flor de Diente de León', 'Crisantemo'],
    usage: 'Vierta 1 sobre en 300-500 ml de agua tibia o al clima. Mezcle y beba en ayunas o 30 min después de cenar.',
    featured: true,
    badge: 'Protocolo Colon ⭐',
    healthFocus: ['Protocolo Limpieza de Colon', 'Salud Hepática y Renal', 'Desintoxicación']
  },

  // 5. Pro Shaping Tea
  {
    id: 1005,
    name: 'Pro Shaping Tea (Té Moldeador Profesional)',
    category: 'alimentos',
    categoryLabel: 'Alimentos y Bebidas',
    shortDescription: 'Té termogénico y botánico de alta pureza para el bienestar metabólico y nutrición activa.',
    description: 'Pro Shaping Tea HGW es una selecta infusión de hierbas botánicas orientales formulada para apoyar la nutrición diaria, estimular el metabolismo natural, facilitar la digestión y favorecer la eliminación de líquidos retenidos de manera 100% natural.',
    pricePublic: 23.00,
    pricePartner: 16.00,
    bv: 9.60,
    image: 'https://lh3.googleusercontent.com/d/10KQgXbUMA46qqEQV6AMueytWegZ8G4CK',
    fallbackImage: 'https://lh3.googleusercontent.com/d/11PunA1eraGhCqxkz4m4zwgTohgLhfj8b',
    presentation: 'Caja con 24 sobres de 3 gramos c/u (72 g)',
    benefits: [
      'Favorece la termogénesis y la quema de depósitos de grasa corporal',
      'Excelente efecto diurético que alivia la pesadez y edemas',
      'Optimiza la digestión pesada y previene la acumulación de toxinas',
      'Aroma suave y reconfortante sin laxantes químicos'
    ],
    ingredients: ['Hojas de loto', 'Té verde premium', 'Semillas de Cassia', 'Cáscara de mandarina deshidratada (Chen Pi)', 'Espino blanco'],
    usage: 'Coloque 1 sobre en una taza con 250 ml de agua hirviendo. Deje reposar 5 minutos y tome después del almuerzo o cena.',
    featured: true,
    badge: 'Control de Peso 🌿',
    healthFocus: ['Desintoxicación', 'Protocolo Limpieza de Colon', 'Energía y Enfoque']
  },

  // 6. Berry Juice HIGH VC
  {
    id: 1006,
    name: 'Berry Juice HIGH VC (Jugo de Arándanos Alto en Vitamina C)',
    category: 'alimentos',
    categoryLabel: 'Alimentos y Bebidas',
    shortDescription: 'Bebida en polvo superconcentrada de arándanos silvestres con megadosis natural de Vitamina C biodisponible.',
    description: 'Berry Juice HIGH VC aporta una concentración excepcional de antocianinas y vitamina C natural. Diseñado para reforzar las defensas inmunológicas, blindar el sistema vascular, acelerar la síntesis de colágeno y mantener la vitalidad celular durante todo el año.',
    pricePublic: 25.00,
    pricePartner: 17.00,
    bv: 8.50,
    image: 'https://lh3.googleusercontent.com/d/1soRruTg-3cQ5NccJZrza5fzfM4Hrl9gA',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1soRruTg-3cQ5NccJZrza5fzfM4Hrl9gA',
    presentation: 'Caja con 30 sobres de 6 gramos c/u (180 g)',
    benefits: [
      'Megadosis de Vitamina C y bioflavonoides de arándano',
      'Refuerzo inmunológico de choque frente a virus y resfriados',
      'Mejora la agudeza visual nocturna y disminuye la fatiga ocular',
      'Refrescante sabor frutal para toda la familia'
    ],
    ingredients: ['Concentrado de arándanos (Blueberry)', 'Vitamina C pura', 'Extracto de acerola', 'Fructooligosacáridos'],
    usage: 'Disuelva 1 sobre en 200 ml de agua fría o fresca. Consuma 1 a 2 veces al día.',
    featured: true,
    badge: 'Mega Vitamina C 🍊',
    healthFocus: ['Sistema Inmunológico', 'Cuidado de la Visión', 'Antioxidante']
  },

  // 7. Blueberry Wine
  {
    id: 1007,
    name: 'Blueberry Wine (Vino de Arándanos)',
    category: 'licores',
    categoryLabel: 'Licores y Vinos',
    shortDescription: 'Vino artesanal premium elaborado 100% con fermentación pura de arándanos canadienses selectos.',
    description: 'El Vino de Arándanos HGW es una joya enológica obtenida a partir de bayas de arándano fermentadas con técnicas tradicionales y biotecnología avanzada. Preserva los polifenoles, el resveratrol y las antocianinas de la fruta, brindando una experiencia sensorial refinada y cardiosaludable.',
    pricePublic: 36.00,
    pricePartner: 26.00,
    bv: 5.20,
    image: 'https://lh3.googleusercontent.com/d/1XdBwlYSMfgEZe6jlzc2xh0tHCM1TSVxA',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1XdBwlYSMfgEZe6jlzc2xh0tHCM1TSVxA',
    presentation: 'Botella de vidrio de 750 ml',
    benefits: [
      'Fermentación pura de arándanos sin mezclas de uva común',
      'Alto contenido de resveratrol, taninos nobles y antocianinas',
      'Apoya la salud cardiovascular y la microcirculación capilar',
      'Bouquet elegante con notas frutales intensas y final aterciopelado'
    ],
    ingredients: ['Mosto fermentado de arándanos puros (Vaccinium corymbosum)', 'Levaduras enológicas seleccionadas'],
    usage: 'Servir a temperatura entre 12°C y 16°C. Ideal como aperitivo o para maridar con carnes y postres finos.',
    featured: false,
    badge: 'Edición Gourmet 🍷',
    healthFocus: ['Antioxidante', 'Salud Cardiovascular']
  },

  // 8. Trébol Coffee
  {
    id: 1008,
    name: 'Trébol Coffee (Café Trébol Funcional)',
    category: 'serie-cafes',
    categoryLabel: 'Serie Cafés Saludables',
    shortDescription: 'Café gourmet enriquecido con extractos de trébol y fitonutrientes naturales para vitalidad y equilibrio general.',
    description: 'Trébol Coffee integra selectos granos de café arábica con fitoestrógenos naturales e isoflavonas de trébol rojo. Ayuda a regular el balance hormonal femenino y masculino, promueve la salud ósea y aporta vitalidad limpia y sostenida.',
    pricePublic: 23.00,
    pricePartner: 16.00,
    bv: 8.00,
    image: 'https://lh3.googleusercontent.com/d/1Ko69VZDes855GTD4ROi8MQC8O6NwzyPH',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1d3kM-6Gqm0DcSwS2cfuuYkZ10036b8Br',
    presentation: 'Caja con 12 sobres de 15 gramos c/u (180 g)',
    benefits: [
      'Rico en isoflavonas naturales que apoyan el bienestar hormonal',
      'Contribuye al mantenimiento de la densidad ósea y salud articular',
      'Energía natural libre de taquicardia o irritación gástrica',
      'Textura cremosa y aroma envolvente'
    ],
    ingredients: ['Café soluble arábica', 'Extracto botánico de trébol rojo', 'Crema no láctea de origen vegetal'],
    usage: 'Disolver 1 sobre en una taza con 150 ml de agua caliente, revolver y degustar.',
    featured: false,
    badge: 'Bienestar Hormonal 🍀',
    healthFocus: ['Nutrición Diaria', 'Energía y Enfoque']
  },

  // 9. Cordyceps Coffee Cream
  {
    id: 1009,
    name: 'Cordyceps Coffee Cream (Café Cordyceps con Crema)',
    category: 'serie-cafes',
    categoryLabel: 'Serie Cafés Saludables',
    shortDescription: 'Bebida funcional energizante fortificada con micelio de Cordyceps Sinensis y crema vegetal suave.',
    description: 'Cordyceps Coffee Cream HGW es ideal para deportistas, profesionales y personas activas. El hongo Cordyceps es un adaptógeno milenario reconocido en la nutrición celular por su aporte de bioactivos que apoyan la vitalidad celular (ATP), la energía física y el bienestar respiratorio.',
    pricePublic: 23.00,
    pricePartner: 16.00,
    bv: 9.60,
    image: 'https://lh3.googleusercontent.com/d/1qyyUVAmR4z45gMHXfzdc6gjYYaauk2ob',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1GjEut1ue2NkzQjnH2jc8JRpHc4ZkeqY3',
    presentation: 'Caja con 12 sobres de 15 gramos c/u (180 g)',
    benefits: [
      'Incrementa la oxigenación celular, resistencia física y energía mitocondrial (ATP)',
      'Soporte natural para pulmones, vías respiratorias y función renal',
      'Tonificante del sistema inmunológico y revitalizante del vigor',
      'Deliciosa crema vegetal suave y aromática'
    ],
    ingredients: ['Café arábica soluble', 'Micelio de Cordyceps Sinensis en polvo', 'Crema no láctea vegetal', 'Extracto de arándano'],
    usage: 'Disolver 1 sachet en 150 ml de agua caliente. Tomar por las mañanas o antes de entrenar.',
    featured: true,
    badge: 'Rendimiento Extremo ⚡',
    healthFocus: ['Salud Hepática y Renal', 'Energía y Enfoque', 'Sistema Inmunológico']
  },

  // 10. BlackTea Coffee
  {
    id: 1010,
    name: 'BlackTea Coffee (Café Té Negro Sin Azúcar)',
    category: 'serie-cafes',
    categoryLabel: 'Serie Cafés Saludables',
    shortDescription: 'Sinergia aromática de granos de café y té negro fermentado sin azúcar para máxima lucidez y digestión.',
    description: 'BlackTea Coffee combina las mejores propiedades del café puro tostado con hojas de té negro fermentado de alta montaña. Estimula el pensamiento ágil, mejora el enfoque, favorece la digestión tras comidas copiosas y posee un suave efecto diurético sin calorías añadidas.',
    pricePublic: 20.00,
    pricePartner: 14.00,
    bv: 7.00,
    image: 'https://lh3.googleusercontent.com/d/1YHCsgPxdILXLPyzlU2_-9tFWfh98MhVZ',
    fallbackImage: 'https://lh3.googleusercontent.com/d/17YD4LnY_THurfVpCOA1uX1ThnT6ilvec',
    presentation: 'Caja con 12 sobres de 3.5 gramos c/u (42 g)',
    benefits: [
      '100% libre de azúcares añadidos: ideal para dietas keto y control glucémico',
      'Favorece la concentración mental rápida y la agilidad cognitiva',
      'Efecto diurético suave que ayuda a combatir la retención de líquidos',
      'Facilita la asimilación digestiva tras los alimentos'
    ],
    ingredients: ['Café soluble puro', 'Extracto seco de Té Negro (Camellia sinensis)'],
    usage: 'Disolver 1 sachet en 150 ml de agua caliente y disfrutar solo o con endulzante al gusto.',
    featured: false,
    badge: 'Sin Azúcar 0% ☕',
    healthFocus: ['Energía y Enfoque', 'Desintoxicación']
  },

  // 11. Coffee Ceps
  {
    id: 1011,
    name: 'Coffee Ceps (Café Cordyceps Sin Azúcar)',
    category: 'serie-cafes',
    categoryLabel: 'Serie Cafés Saludables',
    shortDescription: 'Café negro puro sin azúcar con micelio concentrado de Cordyceps Sinensis para energía pura.',
    description: 'Coffee Ceps HGW es la versión pura en café negro sin azúcares ni cremas añadidas, enriquecida con micelio concentrado de Cordyceps Sinensis. Ideal para diabéticos, deportistas y personas que buscan máxima oxigenación y vigor sin añadir calorías a su día.',
    pricePublic: 20.00,
    pricePartner: 14.00,
    bv: 7.00,
    image: 'https://lh3.googleusercontent.com/d/1XxOvaE4NGKKMyGTzrgdfZJgGfeOk3xae',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1N3un1TV1b14yE0Me8Ufy9xb1VPYxVngr',
    presentation: 'Caja con 12 sobres de 3.5 gramos c/u (42 g)',
    benefits: [
      'Sin azúcar ni grasas saturadas: pura esencia energizante de café y Cordyceps',
      'Mejora el rendimiento atlético y la recuperación pulmonar',
      'Estimula la función depurativa renal y la microcirculación',
      'Prácticos sobres individuales de rápida disolución'
    ],
    ingredients: ['Café instantáneo premium', 'Micelio purificado de Cordyceps Sinensis'],
    usage: 'Disuelva 1 sachet en 150 ml de agua caliente, mezcle y disfrute.',
    featured: false,
    badge: 'Cordyceps Puro 0% Azúcar',
    healthFocus: ['Salud Hepática y Renal', 'Energía y Enfoque']
  },

  // 12. Blueberry Coffee
  {
    id: 1012,
    name: 'Blueberry Coffee (Café de Arándanos)',
    category: 'serie-cafes',
    categoryLabel: 'Serie Cafés Saludables',
    shortDescription: 'Café soluble funcional con superalimento de arándanos canadienses ricos en antocianinas y antioxidantes.',
    description: 'El producto insignia de HGW a nivel mundial: Blueberry Coffee combina café soluble seleccionado con arándanos canadienses de alto poder antioxidante. Aporta bioflavonoides que protegen la visión, energizan el cuerpo sin acidez y fortalecen el sistema inmunitario.',
    pricePublic: 23.00,
    pricePartner: 16.00,
    bv: 9.60,
    image: 'https://lh3.googleusercontent.com/d/1BL58MS4C_t1yzzh-iFoKB8VUhlIQLrcY',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1b2KTKEMfvEnWG_iG9_Zv9FuYGo07R-bW',
    presentation: 'Caja con 12 sobres de 15 gramos c/u (180 g)',
    benefits: [
      'Poder antioxidante superior con antocianinas puras de arándano canadiense',
      'Protege y optimiza la salud visual, reduciendo el cansancio de pantallas',
      'Fortalece las defensas y apoya el metabolismo general',
      'Energía natural limpia sin provocar gastritis ni palpitaciones'
    ],
    ingredients: ['Café instantáneo en polvo', 'Crema no láctea de alta calidad', 'Polvo concentrado de arándanos (Vaccinium corymbosum L.)'],
    usage: 'Vierta 1 sobre en 150 ml de agua caliente. Mezcle bien y disfrute de su inigualable aroma frutal.',
    featured: true,
    badge: 'Producto Estrella ⭐',
    healthFocus: ['Cuidado de la Visión', 'Sistema Inmunológico', 'Energía y Enfoque']
  },

  // 13. Lactiberry
  {
    id: 1013,
    name: 'Lactiberry (Té Negro Cremoso con Arándanos)',
    category: 'alimentos',
    categoryLabel: 'Alimentos y Bebidas',
    shortDescription: 'Bebida cremosa tipo Milk Tea que fusiona té negro aromático con arándanos y leche ligera.',
    description: 'Lactiberry es una exquisita bebida de confort inspirada en el té con leche tradicional oriental, elevada con el poder de los arándanos silvestres. Brinda una experiencia suave y sedosa al paladar mientras nutre el organismo con antioxidantes y flavonoides protectores.',
    pricePublic: 26.00,
    pricePartner: 18.00,
    bv: 9.00,
    image: 'https://lh3.googleusercontent.com/d/1LPWR1rp6l6bNZfF6dVqn59hoUp4IO7vB',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1LPWR1rp6l6bNZfF6dVqn59hoUp4IO7vB',
    presentation: 'Caja con 10 sobres de 30 gramos c/u (300 g)',
    benefits: [
      'Deliciosa fusión de té negro aromático, leche ligera y arándanos antioxidantes',
      'Proporciona energía suave y una sensación reconfortante de saciedad',
      'Coadyuvante en la relajación mental y reducción del estrés diario',
      'Ideal para disfrutar frío o caliente a cualquier hora del día'
    ],
    ingredients: ['Té negro en polvo', 'Leche desnatada en polvo', 'Extracto de arándano', 'Crema no láctea'],
    usage: 'Disuelva 1 sachet en 180 ml de agua caliente o con hielo para una versión frappé.',
    featured: false,
    badge: 'Delicia Milk Tea 🧋',
    healthFocus: ['Nutrición Diaria', 'Antioxidante', 'Energía y Enfoque']
  },

  // 14. Ashwaganda Coffee
  {
    id: 1014,
    name: 'Ashwagandha Coffee (Café de Ashwagandha)',
    category: 'serie-cafes',
    categoryLabel: 'Serie Cafés Saludables',
    shortDescription: 'Café adaptógeno de vanguardia con extracto puro de raíz de Ashwagandha para calma activa y antiestrés.',
    description: 'Ashwagandha Coffee HGW combina los efectos revitalizantes del café arábica con la raíz adaptógena de Ashwagandha (Withania somnifera). Ayuda a reducir los picos de cortisol, combate la ansiedad y el agotamiento mental, manteniendo una concentración serena durante jornadas intensas.',
    pricePublic: 23.00,
    pricePartner: 16.00,
    bv: 8.00,
    image: 'https://lh3.googleusercontent.com/d/1_qaxS2jw74lFbjMHsOmhkxmhFW2koh0V',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1-J5Hhsv4TSrY7nKAbwS2jwxDE1EoBPMw',
    presentation: 'Caja con 12 sobres de 15 gramos c/u (180 g)',
    benefits: [
      'Reduce significativamente el cortisol y los síntomas de estrés y ansiedad',
      'Proporciona energía estable sin generar agitación nerviosa ni insomnio',
      'Favorece la relajación muscular y un descanso nocturno reparador',
      'Propiedades antiinflamatorias y neuroprotectoras comprobadas'
    ],
    ingredients: ['Café soluble premium', 'Extracto estandarizado de raíz de Ashwagandha', 'Crema vegetal no láctea'],
    usage: 'Disuelva 1 sobre en 150 ml de agua caliente por la mañana o media tarde.',
    featured: true,
    badge: 'Anti-Estrés & Calma 🧘',
    healthFocus: ['Energía y Enfoque', 'Sistema Inmunológico', 'Nutrición Diaria']
  },

  // 15. Ganoderma Soluble Coffee
  {
    id: 1015,
    name: 'Ganoderma Soluble Coffee (Café Soluble de Ganoderma)',
    category: 'serie-cafes',
    categoryLabel: 'Serie Cafés Saludables',
    shortDescription: 'Café premium fortificado con el hongo milenario Ganoderma Lucidum (Reishi) para inmunidad y longevidad.',
    description: 'HGW combina el mejor grano de café soluble con el milenario superalimento Ganoderma Lucidum. Diseñado para ofrecer una experiencia aromática inigualable, protegiendo las células contra el estrés oxidativo, desinflamando el organismo y equilibrando las defensas naturales.',
    pricePublic: 23.00,
    pricePartner: 16.00,
    bv: 9.60,
    image: 'https://lh3.googleusercontent.com/d/10OxyVm5niPw-3OqGfmLEDjcxxKNHtuww',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1N1VLXoYFPxS4Jur4xzYBduxwenHUwm8s',
    presentation: 'Caja con 12 sobres de 15 gramos c/u (180 g)',
    benefits: [
      'Contiene beta-glucanos y triterpenos que modulan y potencian el sistema inmunitario',
      'Poderosa acción antiinflamatoria y hepatoprotectora',
      'Mejora la vitalidad cardiovascular y la resistencia al cansancio crónico',
      'Textura suave y baja acidez que respeta la mucosa estomacal'
    ],
    ingredients: ['Café instantáneo arábica', 'Extracto puro de Ganoderma Lucidum (Reishi)', 'Crema no láctea'],
    usage: 'Vierta 1 sobre en 150 ml de agua caliente, mezcle bien y disfrute.',
    featured: true,
    badge: 'Ganoderma Reishi 🍄',
    healthFocus: ['Sistema Inmunológico', 'Salud Hepática y Renal', 'Energía y Enfoque']
  },

  // 16. Blueberry Soy Protein Powder
  {
    id: 1016,
    name: 'Blueberry Soy Protein Powder (Proteína de Soja con Arándanos)',
    category: 'suplementos',
    categoryLabel: 'Suplementos y Nutracéuticos',
    shortDescription: 'Proteína aislada de soja vegetal combinada con arándano para nutrición muscular y recuperación.',
    description: 'Proteína aislada de soja no transgénica de alto valor biológico enriquecida con polvo concentrado de arándanos. Ideal para deportistas, personas mayores o en convalecencia que necesitan mantener su masa muscular magra, con excelente digestibilidad y cero colesterol.',
    pricePublic: 36.00,
    pricePartner: 25.00,
    bv: 15.00,
    image: 'https://lh3.googleusercontent.com/d/1sXrkO5cC8ETS71nPmX00rWo7SY2BX4k6',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1gC9WMwtRCjx3L0XKn1UuNGYY3QCLURZg',
    presentation: 'Caja con 10 sobres de 30 gramos c/u (300 g)',
    benefits: [
      'Aporte completo de aminoácidos esenciales de origen 100% vegetal',
      'Favorece la tonificación muscular y previene la sarcopenia',
      'Libre de colesterol, lactosa y grasas trans',
      'Enriquecida con antioxidantes de arándano canadiense'
    ],
    ingredients: ['Aislado de proteína de soja no transgénica', 'Polvo de arándanos', 'Lecitina de soja', 'Extracto de stevia'],
    usage: 'Disolver 1 sobre en 250 ml de agua, bebida vegetal o en batidos de frutas. Consumir tras el ejercicio o en el desayuno.',
    featured: true,
    badge: 'Proteína Pura Vegetal 💪',
    healthFocus: ['Nutrición Diaria', 'Antioxidante', 'Energía y Enfoque']
  },

  // 17. Ganoderma Candy
  {
    id: 1017,
    name: 'Ganoderma Candy (Caramelos de Ganoderma)',
    category: 'serie-candy',
    categoryLabel: 'Serie Candy HGW',
    shortDescription: 'Caramelos duros enriquecidos con extracto de Ganoderma Lucidum para defensas e inmunidad diaria.',
    description: 'Una forma práctica y deliciosa de consumir Ganoderma Lucidum en cualquier momento del día. Fortalecen la garganta, refrescan las vías respiratorias y aportan los micronutrientes inmunomoduladores del Reishi.',
    pricePublic: 8.30,
    pricePartner: 5.80,
    bv: 2.90,
    image: 'https://lh3.googleusercontent.com/d/1HQHBV5uwqiP9c9Vm4zCsdZoPymiy5q09',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1HQHBV5uwqiP9c9Vm4zCsdZoPymiy5q09',
    presentation: 'Frasco con 60 caramelos',
    benefits: [
      'Aporte diario de triterpenos y polisacáridos de Ganoderma Lucidum',
      'Alivia la irritación de garganta y refresca la voz',
      'Refuerzo inmunológico en un formato fácil de llevar',
      'Sabor equilibrado y agradable'
    ],
    ingredients: ['Extracto de Ganoderma Lucidum', 'Sorbitol', 'Extracto de menta', 'Ácido cítrico'],
    usage: 'Disolver 1 caramelo lentamente en la boca tantas veces al día como se desee.',
    featured: false,
    badge: 'Ganoderma Práctico 🍄',
    healthFocus: ['Sistema Inmunológico', 'Antioxidante']
  },

  // 18. Coffee Candy
  {
    id: 1018,
    name: 'Coffee Candy (Caramelo de Café)',
    category: 'serie-candy',
    categoryLabel: 'Serie Candy HGW',
    shortDescription: 'Caramelos con auténtico extracto de café arábica tostado para energía instantánea y aliento fresco.',
    description: 'Los caramelos Coffee Candy de HGW capturan el sabor intenso y el aroma estimulante del mejor café arábica. Ideales para disipar la somnolencia en el trabajo, mientras conduces o en jornadas de estudio prolongadas.',
    pricePublic: 5.80,
    pricePartner: 4.00,
    bv: 2.00,
    image: 'https://lh3.googleusercontent.com/d/11s3bTucHLGU1SnORVRSj62KWk4_9q5UH',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1Kan7CVIAsQyZPzmNNJPOqyuNGPtP6DDe',
    presentation: 'Frasco con 60 caramelos',
    benefits: [
      'Estimulación suave e inmediata que ayuda a combatir la fatiga',
      'Sabor gourmet a café tostado sin acidez',
      'Práctico envase de bolsillo para llevar a todas partes',
      'Bajo en calorías y sin azúcares refinados perjudiciales'
    ],
    ingredients: ['Extracto puro de Café Arábica', 'Sorbitol', 'Saborizantes naturales de café'],
    usage: 'Disfrutar 1 caramelo cuando se requiera reactivar la atención y concentración.',
    featured: false,
    badge: 'Energía Express ☕',
    healthFocus: ['Energía y Enfoque']
  },

  // 19. Biolacti Candy
  {
    id: 1019,
    name: 'Biolacti Candy (Caramelo Biolacti con Probióticos)',
    category: 'serie-candy',
    categoryLabel: 'Serie Candy HGW',
    shortDescription: 'Caramelos enriquecidos con cepas probióticas activas para balancear la flora bucal e intestinal.',
    description: 'Biolacti Candy HGW combina microorganismos probióticos beneficiosos con prebióticos en un caramelo refrescante. Ayuda a inhibir bacterias patógenas en la cavidad oral, mejora el aliento y apoya la salud de la microbiota digestiva.',
    pricePublic: 5.80,
    pricePartner: 4.00,
    bv: 2.00,
    image: 'https://lh3.googleusercontent.com/d/1zUg42gcrv42BM_MCHkS9wTCBzWge3PsC',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1rwI9Shy4hp1oHAAHsmcGYrdgkKsC41MS',
    presentation: 'Frasco con 60 caramelos',
    benefits: [
      'Aporta cepas probióticas que colonizan y protegen la mucosa oral',
      'Combate el mal aliento desde el origen bacteriano bucal',
      'Favorece el equilibrio de la microbiota digestiva',
      'Sabor lácteo-frutal sumamente agradable para niños y adultos'
    ],
    ingredients: ['Cepas probióticas microencapsuladas (Lactobacillus)', 'FOS prebióticos', 'Sorbitol', 'Esencia de yogur natural'],
    usage: 'Consumir 1 a 2 caramelos después de las comidas principales.',
    featured: false,
    badge: 'Probióticos Activos 🦠',
    healthFocus: ['Protocolo Limpieza de Colon', 'Nutrición Diaria']
  },

  // 20. Gestifruit Candy
  {
    id: 1020,
    name: 'Gestifruit Candy (Caramelo Gestifruta)',
    category: 'serie-candy',
    categoryLabel: 'Serie Candy HGW',
    shortDescription: 'Caramelos digestivos formulados con enzimas frutales y extractos botánicos para alivio estomacal.',
    description: 'Gestifruit Candy HGW integra enzimas de frutas (papaya y piña) con extractos herbales digestivos. Ideal para consumir tras comidas copiosas, previniendo la pesadez, reflujo, gases y sensación de llenura excesiva.',
    pricePublic: 5.80,
    pricePartner: 4.00,
    bv: 2.00,
    image: 'https://lh3.googleusercontent.com/d/1kNbj0DzhZj2xecPgte9lgONmTbd2q9Kd',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1goszEagtDMq7K1G9A7u9IXcDVU7IDqAO',
    presentation: 'Frasco con 60 caramelos',
    benefits: [
      'Enzimas naturales que aceleran el desdoblamiento de alimentos pesados',
      'Alivia rápidamente la hinchazón y los gases posprandiales',
      'Sabor frutal cítrico muy refrescante',
      'Formato discreto para llevar a almuerzos de negocios o eventos'
    ],
    ingredients: ['Extractos enzimáticos de frutas', 'Mix herbal digestivo (menta, hinojo)', 'Sorbitol', 'Ácido málico'],
    usage: 'Chupar 1 caramelo inmediatamente después de comidas abundantes.',
    featured: false,
    badge: 'Digestión Ligera 🍍',
    healthFocus: ['Protocolo Limpieza de Colon', 'Nutrición Diaria']
  },

  // 21. Peptipro Candy
  {
    id: 1021,
    name: 'Peptipro Candy (Caramelo Peptipro con Colágeno)',
    category: 'serie-candy',
    categoryLabel: 'Serie Candy HGW',
    shortDescription: 'Caramelos enriquecidos con péptidos de colágeno hidrolizado para nutrición celular continua.',
    description: 'Peptipro Candy es una innovadora forma de incorporar péptidos de colágeno bioactivos a tu rutina diaria. Ayudan a nutrir la matriz dérmica, mantener la hidratación cutánea y proteger las articulaciones.',
    pricePublic: 5.80,
    pricePartner: 4.00,
    bv: 2.00,
    image: 'https://lh3.googleusercontent.com/d/1gHxY-UX5puIPcxK6R135h2MX3bEBGska',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1gHxY-UX5puIPcxK6R135h2MX3bEBGska',
    presentation: 'Frasco con 60 caramelos',
    benefits: [
      'Péptidos de colágeno bioactivos de fácil absorción',
      'Aporte continuo para la nutrición de piel y encías',
      'Sabor delicioso sin azúcar refinada añadida',
      'Complemento ideal a los Péptidos de Colágeno en polvo'
    ],
    ingredients: ['Péptidos de colágeno hidrolizado', 'Sorbitol', 'Extractos frutales', 'Vitamina C'],
    usage: 'Consumir de 1 a 3 caramelos al día entre horas.',
    featured: false,
    badge: 'Belleza Diaria ✨',
    healthFocus: ['Antioxidante', 'Salud Articular']
  },

  // 22. Herbal Fresh Candy
  {
    id: 1022,
    name: 'Herbal Fresh Candy (Caramelo Fresco Herbal)',
    category: 'serie-candy',
    categoryLabel: 'Serie Candy HGW',
    shortDescription: 'Caramelos balsámicos con extractos botánicos y herbales para brindar frescura en la garganta y vías respiratorias.',
    description: 'Herbal Fresh Candy contiene una mezcla tradicional de menta piperita, eucalipto, regaliz y hierbas orientales. Despeja instantáneamente la congestión nasal, calma la carraspera y proporciona un aliento glacial duradero.',
    pricePublic: 5.80,
    pricePartner: 4.00,
    bv: 2.00,
    image: 'https://lh3.googleusercontent.com/d/1og_3IQNAgPXBsql5AO_ImYNRqoAblMkV',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1Ocrmo8B5Ghx0gbiminuU22TYkMUOaiLu',
    presentation: 'Frasco con 60 caramelos',
    benefits: [
      'Efecto balsámico inmediato que descongestiona nariz y garganta',
      'Alivia la irritación por aire acondicionado o cambios de clima',
      'Frescura intensa y duradera contra el mal aliento',
      'Sin azúcar con agradable toque herbal mentolado'
    ],
    ingredients: ['Extracto de mentol natural', 'Aceite esencial de eucalipto', 'Regaliz', 'Sorbitol'],
    usage: 'Disolver en la boca ante cualquier molestia en la garganta o necesidad de frescura.',
    featured: false,
    badge: 'Frescura Glacial 🌿',
    healthFocus: ['Nutrición Diaria']
  },

  // 23. Moruva Candy
  {
    id: 1023,
    name: 'Moruva Candy (Dulces Moruva)',
    category: 'serie-candy',
    categoryLabel: 'Serie Candy HGW',
    shortDescription: 'Caramelos elaborados con extractos de mora silvestre y uva rica en polifenoles y resveratrol.',
    description: 'Moruva Candy reúne los poderosos antioxidantes de la mora silvestre y la uva roja (resveratrol y proantocianidinas). Cuida la microcirculación vascular, frena los radicales libres y deleita el paladar con su auténtico sabor a bayas rojas.',
    pricePublic: 5.80,
    pricePartner: 4.00,
    bv: 2.00,
    image: 'https://lh3.googleusercontent.com/d/1gbrmhS136n1Pej_K26zLQalBM_dDS_4V',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1gbrmhS136n1Pej_K26zLQalBM_dDS_4V',
    presentation: 'Frasco con 60 caramelos',
    benefits: [
      'Rico en polifenoles de mora y resveratrol de uva roja',
      'Protección antioxidante para el sistema cardiovascular',
      'Delicioso sabor natural a frutos del bosque',
      'Apto para personas que evitan el azúcar común'
    ],
    ingredients: ['Extracto de mora (Morus)', 'Extracto de piel de uva (Resveratrol)', 'Sorbitol', 'Ácido cítrico'],
    usage: 'Consumir 1 a 2 unidades diarias como dulce saludable.',
    featured: false,
    badge: 'Resveratrol Puro 🍇',
    healthFocus: ['Antioxidante', 'Salud Cardiovascular']
  },

  // 24. Choco Blue
  {
    id: 1024,
    name: 'Choco Blue (Chocolate con Arándanos)',
    category: 'alimentos',
    categoryLabel: 'Alimentos y Bebidas',
    shortDescription: 'Exquisita bebida en polvo que fusiona cacao natural gourmet, leche descremada y arándanos antioxidantes.',
    description: 'La mezcla perfecta de cacao natural gourmet, leche descremada de alta pureza y arándanos canadienses. Una bebida reconfortante y energizante que cuida el sistema cardiovascular, aporta antioxidantes en cada taza y enamora a niños y adultos por igual.',
    pricePublic: 40.00,
    pricePartner: 28.00,
    bv: 11.20,
    image: 'https://lh3.googleusercontent.com/d/1bz46PTKOarDxdQbT9un0bz5nP7NK5CTy',
    fallbackImage: 'https://lh3.googleusercontent.com/d/15u-upP9Ikr5wT3NaXBhuqxYnu5i6V6aI',
    presentation: 'Caja con 20 sobres de 33 gramos c/u (660 g)',
    benefits: [
      'Cacao premium fuente de flavonoides protectores celulares y cerebrales',
      'Leche descremada rica en calcio y proteína con muy bajo perfil graso',
      'Arándano con alto contenido de antocianinas regeneradoras',
      'Ideal para desayunos familiares, meriendas energizantes o noches frías'
    ],
    ingredients: ['Cacao natural en polvo', 'Leche descremada en polvo', 'Polvo concentrado de arándanos', 'Saborizantes naturales'],
    usage: 'Disuelva 1 sobre en 180-200 ml de agua caliente o leche tibia. Mezcle y disfrute.',
    featured: true,
    badge: 'Nutrición Premium 🍫',
    healthFocus: ['Sistema Inmunológico', 'Energía y Enfoque', 'Cuidado de la Visión']
  },

  // 25. Choco Gano
  {
    id: 1025,
    name: 'Choco Gano (Chocolate con Ganoderma Lucidum)',
    category: 'alimentos',
    categoryLabel: 'Alimentos y Bebidas',
    shortDescription: 'Bebida instantánea de cacao gourmet, leche ligera y el legendario hongo adaptógeno Ganoderma Lucidum.',
    description: 'Choco Gano combina el reconfortante sabor del chocolate suizo artesanal con las reconocidas virtudes inmunomoduladoras del hongo Ganoderma Lucidum (Reishi). Aporta vitalidad limpia, calma el sistema nervioso y eleva las defensas sin acidez.',
    pricePublic: 40.00,
    pricePartner: 28.00,
    bv: 11.20,
    image: 'https://lh3.googleusercontent.com/d/1U9wWgRhWaGPs27VaNXD00SILOIs2RoT-',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1IJxApdBbMM3PVAGtPLjQMxQdwbeEwYlQ',
    presentation: 'Caja con 20 sobres de 33 gramos c/u (660 g)',
    benefits: [
      'Ganoderma lucidum que modula las defensas naturales del organismo',
      'Reduce la fatiga física y el estrés oxidativo acumulado',
      'Exquisito sabor a chocolate gourmet con leche descremada suave',
      'Fácil preparación en agua caliente o fría'
    ],
    ingredients: ['Cacao puro en polvo', 'Extracto de Ganoderma Lucidum', 'Leche desnatada', 'Maltodextrina de maíz'],
    usage: 'Vierta 1 sachet en 180 ml de agua o leche caliente, bata bien y disfrute en familia.',
    featured: true,
    badge: 'Inmunidad & Sabor 🍄',
    healthFocus: ['Sistema Inmunológico', 'Energía y Enfoque', 'Salud Hepática y Renal']
  },

  // 26. Spirulina Plus Capsule
  {
    id: 1026,
    name: 'Spirulina Plus Capsule (Spirulina en Cápsulas)',
    category: 'suplementos',
    categoryLabel: 'Suplementos y Nutracéuticos',
    shortDescription: 'Superalimento celular concentrado con microalga Spirulina Platensis pura, vitaminas y minerales.',
    description: 'Spirulina Plus HGW es la fuente nutricional más densa de la naturaleza, con más del 65% de proteínas de alta digestibilidad, clorofila, ficocianina, hierro y vitaminas del complejo B. Apoya a personas con anemia, fatiga crónica o dietas deficitarias.',
    pricePublic: 25.00,
    pricePartner: 17.00,
    bv: 8.50,
    image: 'https://lh3.googleusercontent.com/d/1SADmRbxl3z9_CEBgDHuLc2O7nQR79rJR',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1SADmRbxl3z9_CEBgDHuLc2O7nQR79rJR',
    presentation: 'Frasco con 60 cápsulas de 500 mg c/u',
    benefits: [
      'Rico en hierro biodisponible, ficocianina y clorofila purificante',
      'Excelente soporte contra la anemia, cansancio y desnutrición',
      'Potente acción desintoxicante de metales pesados y toxinas',
      'Aporte proteico completo y vitaminas del grupo B'
    ],
    ingredients: ['Polvo puro de Spirulina Platensis orgánica (500 mg por cápsula)', 'Cápsula vegetal'],
    usage: 'Tomar 2 cápsulas al día con abundante agua, 30 minutos antes de los alimentos.',
    featured: true,
    badge: 'Superalimento Completo 🌿',
    healthFocus: ['Nutrición Diaria', 'Desintoxicación', 'Sistema Inmunológico']
  },

  // 27. Tourmaline Healthcare Insoles
  {
    id: 1027,
    name: 'Tourmaline Healthcare Insoles (Plantillas de Turmalina)',
    category: 'accesorios',
    categoryLabel: 'Accesorios y Bienestar',
    shortDescription: 'Plantillas ergonómicas con micropuntos de turmalina bioactiva que emiten infrarrojo lejano e iones negativos.',
    description: 'Diseñadas bajo los principios de la reflexología podal y la terapia cuántica con turmalina. Emiten iones negativos y radiación infrarroja lejana al contacto con la temperatura corporal, estimulando los puntos de acupuntura en la planta del pie, mejorando la circulación de retorno y reduciendo la fatiga.',
    pricePublic: 9.00,
    pricePartner: 6.00,
    bv: 3.00,
    image: 'https://lh3.googleusercontent.com/d/1YEQ5pfuudlaMJjjvow20fN6wrtNgUi6E',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1nhF-NyKBXeXUxqOOaZPE9-XWpqs5C9y_',
    presentation: '1 par de plantillas recortables (Talla universal ajustable)',
    benefits: [
      'Estimula los puntos de reflexología podal y el retorno venoso',
      'Disminuye la pesadez, dolor y ardor de pies tras largas jornadas',
      'Acción antibacteriana y desodorizante gracias a los iones negativos de turmalina',
      'Recortable para adaptarse a cualquier tipo de calzado'
    ],
    ingredients: ['Fibra textil técnica transpirable', 'Puntos cerámicos con nanopolvo de turmalina negra'],
    usage: 'Recorte la plantilla siguiendo la guía de su talla de calzado y colóquela en sus zapatos diarios.',
    featured: true,
    badge: 'Reflexología Podal 🦶',
    healthFocus: ['Terapia con Turmalina', 'Salud Articular']
  },

  // 28. Tourmaline Self-Heating Knee Protector
  {
    id: 1028,
    name: 'Tourmaline Knee Protector (Rodillera Autocalentable de Turmalina)',
    category: 'accesorios',
    categoryLabel: 'Accesorios y Bienestar',
    shortDescription: 'Rodillera térmica ergonómica con matriz de turmalina e imanes biomagnéticos para confort y soporte articular.',
    description: 'La Rodillera con Turmalina HGW utiliza calor natural por emisión de infrarrojo lejano generado en contacto con la turmalina y campos biomagnéticos pasivos. Brinda soporte ergonómico, sensación de alivio y relajación en articulaciones y tendones.',
    pricePublic: 55.00,
    pricePartner: 39.00,
    bv: 15.60,
    image: 'https://lh3.googleusercontent.com/d/1mmdH5ouNcl7Oy4qwA-xmez1Fy6whE66g',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1iMY7Z8V6G72SF3e4IjL0d9Ge-D0dPEoJ',
    presentation: '1 unidad (Diseño ergonómico con correas ajustables de velcro)',
    benefits: [
      'Emisión de calor infrarrojo lejano profundo sin necesidad de cables ni baterías',
      'Alivio eficaz de dolor por artritis, artrosis, esguinces y sobrecarga física',
      'Mejora la microcirculación sinovial y reduce la inflamación articular',
      'Diseño elástico de neopreno transpirable de alta fijación'
    ],
    ingredients: ['Neopreno transpirable', 'Puntos de turmalina autocalentable', 'Imanes biomagnéticos'],
    usage: 'Humedezca ligeramente la zona interna de puntos y colóquela sobre la rodilla durante 20-40 minutos diarios.',
    featured: true,
    badge: 'Terapia Térmica Articular 🔥',
    healthFocus: ['Terapia con Turmalina', 'Salud Articular']
  },

  // 29. Tourmaline Waist Protector
  {
    id: 1029,
    name: 'Tourmaline Waist Protector (Faja / Cinturón de Turmalina)',
    category: 'accesorios',
    categoryLabel: 'Accesorios y Bienestar',
    shortDescription: 'Faja lumbar biomagnética con turmalina autocalentable para alivio de lumbalgia y soporte postural.',
    description: 'El Protector de Cintura con Turmalina HGW ofrece soporte lumbar firme con doble banda elástica combinado con terapia térmica de infrarrojo lejano e imanes biomagnéticos. Alivia contracturas, ciática, lumbalgias agudas y fatiga en la columna vertebral.',
    pricePublic: 69.00,
    pricePartner: 48.00,
    bv: 19.20,
    image: 'https://lh3.googleusercontent.com/d/1PwJi9q9lCwzCFFh_EF590VwNkxOboDgi',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1r3aUhi5333obLfnW20I8_VQGch-joevd',
    presentation: '1 unidad (Tallas ajustables con triple cierre de velcro)',
    benefits: [
      'Terapia térmica profunda que desinflama músculos lumbares y nervio ciático',
      'Soporte lumbar ergonómico que mejora la postura al trabajar o conducir',
      'Estimula la microcirculación en la zona pélvica y renal',
      'Acelera la recuperación muscular y alivia la rigidez matutina'
    ],
    ingredients: ['Tejido elástico de alta compresión', 'Placa de turmalina autocalentable', 'Imanes biomagnéticos'],
    usage: 'Humedecer la tela térmica interior con agua tibia y ajustar a la cintura durante 30 a 60 minutos al día.',
    featured: true,
    badge: 'Alivio Lumbar Total 🛡️',
    healthFocus: ['Terapia con Turmalina', 'Salud Articular']
  },

  // 30. Tourmaline Self-Heating Neck Protector
  {
    id: 1030,
    name: 'Tourmaline Neck Protector (Protector de Cuello / Cuellera de Turmalina)',
    category: 'accesorios',
    categoryLabel: 'Accesorios y Bienestar',
    shortDescription: 'Cuellera cervical autocalentable con turmalina e imanes para contracturas y estrés cervical.',
    description: 'La Cuellera con Turmalina HGW está específicamente diseñada para el área cervical. Alivia rápidamente contracturas por estrés, tortícolis, cefaleas tensionales y dolor de cuello derivado del uso prolongado de computadoras y teléfonos.',
    pricePublic: 16.00,
    pricePartner: 11.00,
    bv: 4.40,
    image: 'https://lh3.googleusercontent.com/d/1bhhZCig3sZYn_9qdLUHO0NXW8QN-M5VD',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1gtwL3ulyWc8iWeu_0H0NAei-JZxQOk1T',
    presentation: '1 unidad (Ajuste ergonómico de velcro)',
    benefits: [
      'Genera calor reconfortante focalizado en vértebras cervicales en 15 minutos',
      'Alivia contracturas del trapecio, dolor de cuello y rigidez postural',
      'Mejora el flujo sanguíneo hacia la cabeza reduciendo migrañas tensionales',
      'Ligero, portátil y reutilizable de por vida'
    ],
    ingredients: ['Neopreno elástico suave', 'Puntos cerámicos con nanopolvo de turmalina', 'Imanes biomagnéticos'],
    usage: 'Humedecer ligeramente con agua y colocar ceñido al cuello por 15-30 minutos hasta sentir el calor reconfortante.',
    featured: true,
    badge: 'Alivio Cervical Express 💆',
    healthFocus: ['Terapia con Turmalina', 'Salud Articular', 'Energía y Enfoque']
  },

  // 31. Toalla Sanitaria Noche
  {
    id: 1031,
    name: 'Toalla Sanitaria Noche (con Turmalina y Aniones)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal y Belleza',
    shortDescription: 'Toallas sanitarias ultra absorbentes con banda de turmalina y aniones para protección nocturna total.',
    description: 'Las toallas higiénicas HGW de uso noche integran una revolucionaria tira de turmalina emisora de aniones (iones negativos) e infrarrojo lejano. Inhiben la proliferación de bacterias, neutralizan olores, alivian cólicos menstruales y garantizan máxima absorción sin fugas nocturnas.',
    pricePublic: 4.40,
    pricePartner: 3.52,
    bv: 1.76,
    image: 'https://lh3.googleusercontent.com/d/1vmPomxc2GqLY-TlcYHaZhsg9TVo_2t9T',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1vmPomxc2GqLY-TlcYHaZhsg9TVo_2t9T',
    presentation: 'Paquete con 8 unidades (Diseño extra largo con alas dobles)',
    benefits: [
      'Banda verde de turmalina con emisión continua de aniones antibacterianos',
      'Previene infecciones vaginales, hongos y neutraliza olores de forma biológica',
      'Alivia cólicos menstruales mediante emisión de calor infrarrojo lejano',
      'Algodón 100% hipoalergénico y polímero súper absorbente libre de fugas'
    ],
    ingredients: ['Algodón orgánico no tejido', 'Tira bioactiva de aniones y turmalina', 'Polímero súper absorbente (SAP)', 'Película transpirable libre de cloro'],
    usage: 'Uso durante la noche o días de flujo abundante. Empaque individual hermético esterilizado.',
    featured: true,
    badge: 'Banda Aniónica 🌙',
    healthFocus: ['Cuidado Femenino', 'Terapia con Turmalina']
  },

  // 32. Protector Diario
  {
    id: 1032,
    name: 'Protector Íntimo Diario (con Turmalina y Aniones)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal y Belleza',
    shortDescription: 'Protectores íntimos de uso diario con chip de turmalina para frescura, higiene y equilibrio de pH.',
    description: 'Los Protectores Diarios HGW están fabricados con algodón suave hipoalergénico y banda de aniones con nanopolvo de turmalina. Diseñados para brindar protección, frescura y prevención de irritaciones o infecciones todos los días del mes.',
    pricePublic: 5.50,
    pricePartner: 3.85,
    bv: 1.87,
    image: 'https://lh3.googleusercontent.com/d/1BG5WNt0-W9QqvtKGE8P6EvwicZbAlcGA',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1BG5WNt0-W9QqvtKGE8P6EvwicZbAlcGA',
    presentation: 'Paquete con 30 unidades',
    benefits: [
      'Banda aniónica que mantiene el equilibrio del pH íntimo y combate bacterias',
      'Transpirable para evitar la humedad y prevenir hongos e infecciones urinarias',
      'Ultra fino y flexible, completamente imperceptible bajo la ropa',
      'Sensación de frescura y limpieza durante las 24 horas del día'
    ],
    ingredients: ['Capa de algodón suave transpirable', 'Chip central con nanotecnología de turmalina y aniones', 'Adhesivo hipoalergénico de alta fijación'],
    usage: 'Uso diario. Cambiar según necesidad para mantener máxima higiene.',
    featured: false,
    badge: 'Protección Diaria 30 uds',
    healthFocus: ['Cuidado Femenino', 'Terapia con Turmalina']
  },

  // 33. Toalla Sanitaria Día
  {
    id: 1033,
    name: 'Toalla Sanitaria Día (con Turmalina y Aniones)',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal y Belleza',
    shortDescription: 'Toallas sanitarias de uso diurno con banda de aniones y turmalina para máxima comodidad y frescura.',
    description: 'Toalla higiénica para el día con diseño anatómico y núcleo ultra absorbente. La banda central de turmalina emite aniones e infrarrojo que regulan la microcirculación pélvica, calman la tensión menstrual y previenen la reproducción microbiana.',
    pricePublic: 5.50,
    pricePartner: 3.85,
    bv: 1.87,
    image: 'https://lh3.googleusercontent.com/d/1xQZJzQQGP7Xf1HdcIZsbaoHMEdgteXm8',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1xQZJzQQGP7Xf1HdcIZsbaoHMEdgteXm8',
    presentation: 'Paquete con 10 unidades con alas',
    benefits: [
      'Absorción inmediata que mantiene la superficie seca y fresca al tacto',
      'Chip de turmalina que ayuda a disminuir dolores pélvicos e inflamación',
      'Materiales 100% libres de cloro, fragancias químicas y reciclados tóxicos',
      'Alas ergonómicas de sujeción segura que se adaptan al movimiento'
    ],
    ingredients: ['Superficie de algodón no tejido hipoalergénico', 'Banda de aniones de turmalina', 'Gel SAP absorbente', 'Capa inferior transpirable'],
    usage: 'Uso durante el día en el ciclo menstrual.',
    featured: false,
    badge: 'Confort Diurno ☀️',
    healthFocus: ['Cuidado Femenino', 'Terapia con Turmalina']
  },

  // 34. Press On Nails
  {
    id: 1034,
    name: 'Press On Nails (Uñas Acrílicas Postizas Reutilizables)',
    category: 'accesorios',
    categoryLabel: 'Accesorios y Belleza',
    shortDescription: 'Set de uñas acrílicas decoradas de fácil aplicación profesional en minutos sin dañar la uña natural.',
    description: 'Set de uñas postizas Press On Nails con acabados elegantes y modernos. Fáciles de colocar en minutos mediante adhesivos de alta resistencia, no dañan la cutícula ni la lámina ungueal y son reutilizables.',
    pricePublic: 8.58,
    pricePartner: 6.00,
    bv: 1.20,
    image: 'https://lh3.googleusercontent.com/d/1OrnKTe8u3eFqkYJ7ucQ6C3BcNiBHVRm6',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1OrnKTe8u3eFqkYJ7ucQ6C3BcNiBHVRm6',
    presentation: 'Caja con 24 unidades en variados tamaños + adhesivos',
    benefits: [
      'Manicura perfecta de salón en menos de 5 minutos en casa',
      'No requiere lámparas UV ni químicos agresivos de remoción',
      'Material acrílico flexible, duradero y reutilizable',
      'Variedad de tamaños para un ajuste anatómico perfecto'
    ],
    ingredients: ['Polímero acrílico de alta resistencia', 'Láminas adhesivas gel grado cosmético'],
    usage: 'Limpie la uña con alcohol, seleccione el tamaño adecuado, retire el protector adhesivo y presione firmemente durante 20 segundos.',
    featured: false,
    badge: 'Manicura Express 💅',
    healthFocus: ['Belleza y Estilo']
  },

  // 35. Pulsera de Tourmalina Versión Limitada (Códigos 51 al 57)
  {
    id: 1035,
    name: 'Pulsera de Turmalina Versión Limitada (Cód. 51-57)',
    category: 'accesorios',
    categoryLabel: 'Accesorios y Bienestar',
    shortDescription: 'Elegante pulsera bioenergética de edición limitada con cuentas de turmalina natural seleccionadas.',
    description: 'Pulsera artesanal con cuentas pulidas de turmalina de alta pureza. Combina sofisticación estética con los beneficios bioenergéticos de la piedra: absorbe radiaciones electromagnéticas de dispositivos móviles, promueve el equilibrio del campo áurico y calma la tensión nerviosa.',
    pricePublic: 22.00,
    pricePartner: 15.00,
    bv: 9.00,
    image: 'https://lh3.googleusercontent.com/d/1pd6CAgYuRKp6xDSPcJEoHyCbHnGJOMV7',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1WxbDGgZ24YVUPpLXNIesw3sLbRV666KV',
    presentation: '1 unidad en estuche de presentación',
    benefits: [
      'Edición limitada exclusiva con cuentas de turmalina noble',
      'Neutraliza frecuencias electromagnéticas (EMF) de celulares y Wi-Fi',
      'Emisión continua de iones negativos que reducen la ansiedad y el estrés',
      'Diseño unisex elegante compatible con cualquier estilo'
    ],
    ingredients: ['Cuentas de turmalina mineral natural', 'Hilo elástico de alta resistencia'],
    usage: 'Llevar en la muñeca diariamente para mantener la protección energética y el bienestar bioeléctrico.',
    featured: true,
    badge: 'Edición Limitada 💎',
    healthFocus: ['Terapia con Turmalina', 'Energía y Enfoque']
  },

  // 36. Colgante Piedra Energética
  {
    id: 1036,
    name: 'Colgante Piedra Energética Cuántica (Turmalina Escalar)',
    category: 'accesorios',
    categoryLabel: 'Accesorios y Bienestar',
    shortDescription: 'Medallón cuántico de turmalina y minerales volcánicos que emite energía escalar e infrarrojo.',
    description: 'El Colgante de Piedra Energética HGW está fabricado mediante la fusión de minerales volcánicos enriquecidos con turmalina. Emite más de 2000 iones negativos por segundo y energía escalar que armoniza el biocampo corporal, mejora el equilibrio, la fuerza física y reduce el cansancio frente a pantallas.',
    pricePublic: 50.00,
    pricePartner: 35.00,
    bv: 21.00,
    image: 'https://lh3.googleusercontent.com/d/1HAB5j8wJlW3qAg2p99Ukhkxwl4yJtonJ',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1HAB5j8wJlW3qAg2p99Ukhkxwl4yJtonJ',
    presentation: '1 unidad con cordón ajustable y tarjeta de autenticidad',
    benefits: [
      'Potente escudo contra la radiación de ondas electromagnéticas 4G/5G y routers',
      'Incrementa la vitalidad, resistencia y equilibrio neuromuscular',
      'Estimula la microcirculación sanguínea y la oxigenación celular',
      'Favorece un estado de serenidad y concentración mental profunda'
    ],
    ingredients: ['Matriz mineral de turmalina y roca volcánica bioactiva', 'Cordón textil hipoalergénico'],
    usage: 'Llevar colgado al pecho a la altura del timo o colocarlo bajo la almohada para dormir.',
    featured: true,
    badge: 'Energía Cuántica ⚡',
    healthFocus: ['Terapia con Turmalina', 'Energía y Enfoque']
  },

  // 37. Collar de Tourmalina Versión Limitada (del 51 al 57)
  {
    id: 1037,
    name: 'Collar de Turmalina Versión Limitada (Cód. 51-57)',
    category: 'accesorios',
    categoryLabel: 'Accesorios y Bienestar',
    shortDescription: 'Collar bioenergético exclusivo de cuentas de turmalina noble para protección integral de cuello y pecho.',
    description: 'Collar de alta joyería bioenergética elaborado con gemas seleccionadas de turmalina. Diseñado para ofrecer una cobertura energética continua sobre la glándula tiroides, el timo y la columna cervical superior.',
    pricePublic: 43.00,
    pricePartner: 30.00,
    bv: 18.00,
    image: 'https://lh3.googleusercontent.com/d/1wdDMN4XlpJN2sGED96RH7ZT0kaTr8E6v',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1uSwUjCcNSCyMHAz0x5mvdNlexv_bB-qf',
    presentation: '1 unidad en estuche de lujo',
    benefits: [
      'Protección bioenergética continua para la zona tiroidea y chakra del timo',
      'Emisión natural de aniones que despejan la pesadez mental y el estrés',
      'Joyería elegante con diseño exclusivo de colección limitada',
      'Cierre de seguridad hipoalergénico'
    ],
    ingredients: ['Gemas de turmalina mineral pulida', 'Alma de hilo resistente', 'Broche metálico hipoalergénico'],
    usage: 'Usar como accesorio diario en cuello para beneficio holístico y estilístico.',
    featured: false,
    badge: 'Colección Exclusiva 🌟',
    healthFocus: ['Terapia con Turmalina', 'Energía y Enfoque']
  },

  // 38. Collar de Tourmalina Clásico
  {
    id: 1038,
    name: 'Collar de Turmalina Clásico',
    category: 'accesorios',
    categoryLabel: 'Accesorios y Bienestar',
    shortDescription: 'Collar continuo de cuentas de turmalina negra para armonización energética y alivio cervical.',
    description: 'El clásico collar de turmalina HGW es el favorito por su pureza mineral y efectividad. Ayuda a liberar la tensión acumulada en la nuca y hombros, a la vez que actúa como un polo a tierra contra las sobrecargas electromagnéticas de la vida moderna.',
    pricePublic: 40.00,
    pricePartner: 28.00,
    bv: 16.80,
    image: 'https://lh3.googleusercontent.com/d/1CZ53tY_uYxJjb8Pw6nbCF5YGqIWQgPq3',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1m-oJwyYh2s_UYxHSSSg4NFK2AzddhMtw',
    presentation: '1 unidad',
    benefits: [
      'Ayuda a reducir contracturas y molestias en trapecios y cervicales',
      'Absorbe el estrés bioeléctrico y la estática corporal',
      'Elegante diseño minimalista en negro brillante natural',
      'Excelente durabilidad y resistencia al uso continuo'
    ],
    ingredients: ['Cuentas esféricas de turmalina negra mineral'],
    usage: 'Llevar puesto durante el día o en jornadas de trabajo frente a pantallas.',
    featured: false,
    badge: 'Clásico HGW 🖤',
    healthFocus: ['Terapia con Turmalina', 'Salud Articular']
  },

  // 39. Pulsera de Tourmalina Clásica
  {
    id: 1039,
    name: 'Pulsera de Turmalina Clásica',
    category: 'accesorios',
    categoryLabel: 'Accesorios y Bienestar',
    shortDescription: 'Brazalete con cuentas esféricas de turmalina negra para drenaje de estática y bienestar en muñeca.',
    description: 'Pulsera elástica con esferas de turmalina negra natural pulida. Ayuda a personas que trabajan intensamente con teclado y ratón, aliviando la fatiga en tendones del túnel carpiano y neutralizando las cargas estáticas del entorno.',
    pricePublic: 20.00,
    pricePartner: 14.00,
    bv: 8.40,
    image: 'https://lh3.googleusercontent.com/d/1Gmvn2ELPTl3Kwwf4I0E1isvjMEu_Co3o',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1WxbDGgZ24YVUPpLXNIesw3sLbRV666KV',
    presentation: '1 unidad (Elástica autoajustable)',
    benefits: [
      'Alivia la tensión del túnel carpiano y la fatiga en muñeca y antebrazo',
      'Genera iones negativos continuos que disminuyen el estrés acumulado',
      'Ideal para conductores, oficinistas, deportistas y estudiantes',
      'Diseño sobrio y elegante para hombres y mujeres'
    ],
    ingredients: ['Esferas de turmalina negra de 8-10 mm', 'Banda elástica de alta memoria'],
    usage: 'Colocar en la muñeca izquierda para recepción bioenergética o derecha para descarga de tensiones.',
    featured: false,
    badge: 'Bienestar Diario ✨',
    healthFocus: ['Terapia con Turmalina', 'Salud Articular']
  },

  // 40. Tourmaline Thermo (WATERSON)
  {
    id: 1040,
    name: 'Tourmaline Thermo WATERSON (Termo Alcalinizante de Turmalina)',
    category: 'equipo',
    categoryLabel: 'Equipos y Hogar Saludable',
    shortDescription: 'Termo de acero inoxidable con filtro catalítico de turmalina que transforma agua común en agua alcalina antioxidante.',
    description: 'El Termo Waterson de HGW es una tecnología portátil de activación cuántica del agua. Su cartucho mineral con bolas de turmalina, maifanshi y minerales bioactivos incrementa el pH del agua a niveles alcalinos saludables (8.5 - 9.5), reduce el potencial de óxido-reducción (ORP negativo) y microestructura las moléculas de agua para una hidratación celular instantánea.',
    pricePublic: 95.00,
    pricePartner: 65.00,
    bv: 32.50,
    image: 'https://lh3.googleusercontent.com/d/18UGgBcYt4YgxAqspXR-VljEwsUD3j6_H',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1l7wJQ4JAWdbXk_w6ja4MwHZlDaYU7kzs',
    presentation: 'Termo térmico de doble pared de acero grado alimenticio de 500 ml',
    benefits: [
      'Alcaliniza el agua común elevando el pH y neutralizando la acidez corporal',
      'Agua microestructurada que penetra más rápido en células y tejidos',
      'Genera ORP negativo: potente poder antioxidante en cada trago de agua',
      'Conserva la temperatura fría o caliente por más de 12 horas'
    ],
    ingredients: ['Cuerpo de acero inoxidable 304/316 grado quirúrgico', 'Núcleo catalítico con esferas de turmalina, magnesio y roca volcánica'],
    usage: 'Llene con agua purificada, espere de 3 a 5 minutos para que actúe el cartucho de turmalina y beba a lo largo del día.',
    featured: true,
    badge: 'Tecnología Waterson 💧',
    healthFocus: ['Terapia con Turmalina', 'Desintoxicación', 'Protocolo Limpieza de Colon']
  },

  // 41. Coffee Cup
  {
    id: 1041,
    name: 'Coffee Cup (Taza Térmica para Café HGW)',
    category: 'equipo',
    categoryLabel: 'Equipos y Hogar Saludable',
    shortDescription: 'Taza térmica ergonómica de acero inoxidable de doble pared aislante con tapa hermética antifugas.',
    description: 'Taza térmica de diseño prémium pensada para disfrutar tus cafés funcionales HGW con la temperatura y aroma óptimos durante horas. Su interior de acero inoxidable libre de BPA no altera sabores ni aromas.',
    pricePublic: 26.00,
    pricePartner: 18.00,
    bv: 7.20,
    image: 'https://lh3.googleusercontent.com/d/13XUtP3lzi8O_XbPqj7w3xdA2777aEaDB',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1-IIhkesEGnujzpgAtpahGO3seu0iLIPK',
    presentation: '1 unidad con tapa antiderrame',
    benefits: [
      'Aislamiento al vacío de doble pared que mantiene tus bebidas calientes o frías',
      'Tapa ergonómica hermética con boquilla segura para viajes y oficina',
      'Acero inoxidable higiénico 100% libre de toxinas BPA',
      'Diseño vanguardista con agarre seguro antideslizante'
    ],
    ingredients: ['Acero inoxidable grado alimenticio', 'Silicona de grado alimenticio libre de BPA'],
    usage: 'Ideal para preparar y transportar tu Café de Arándanos, Ganoderma, Cordyceps o Choco Blue.',
    featured: false,
    badge: 'Accesorio Oficial ☕',
    healthFocus: ['Nutrición Diaria']
  },

  // 42. Hervidor Eléctrico
  {
    id: 1042,
    name: 'Hervidor Eléctrico de Acero Inoxidable HGW',
    category: 'equipo',
    categoryLabel: 'Equipos y Hogar Saludable',
    shortDescription: 'Hervidor eléctrico de ebullición ultra rápida con corte automático y cuerpo higiénico de acero.',
    description: 'Hervidor eléctrico de alto rendimiento y gran capacidad (1.8 L). Diseñado con base giratoria 360°, cuerpo completo de acero inoxidable y sistema de apagado automático de seguridad al hervir o por falta de agua.',
    pricePublic: 60.00,
    pricePartner: 42.00,
    bv: 8.40,
    image: 'https://lh3.googleusercontent.com/d/1-vuN0OfqCUQQO3TubNXP6YCOqGLvrBA6',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1-YT5Gg-QCyHoSn25_7KCSuWwXrbQ5l_S',
    presentation: '1 unidad con capacidad de 1.8 Litros (110V / 60Hz)',
    benefits: [
      'Hierve agua en menos de 4 minutos con bajo consumo energético',
      'Cuerpo interior y tapa en acero inoxidable que garantiza agua pura sin olor a plástico',
      'Doble sistema de protección con apagado automático y sensor antiseco',
      'Base desmontable inalámbrica 360° para servir cómodamente'
    ],
    ingredients: ['Acero inoxidable 304', 'Componentes eléctricos certificados con protección térmica'],
    usage: 'Llenar de agua hasta la marca máxima, presionar el interruptor y en minutos tendrá agua lista para infusiones y cafés.',
    featured: false,
    badge: 'Hogar Saludable ⚡',
    healthFocus: ['Nutrición Diaria']
  },

  // 43. Vaso Térmico
  {
    id: 1043,
    name: 'Vaso Térmico Inoxidable HGW',
    category: 'equipo',
    categoryLabel: 'Equipos y Hogar Saludable',
    shortDescription: 'Vaso térmico portátil con aislamiento de doble pared para bebidas frías o calientes en movimiento.',
    description: 'Vaso térmico ligero y estilizado con acabado mate de alta durabilidad. Mantiene bebidas frías heladas hasta por 18 horas y calientes hasta por 8 horas, perfecto para batidos de proteína, té moldeador o Berry Juice.',
    pricePublic: 31.50,
    pricePartner: 22.00,
    bv: 8.80,
    image: 'https://lh3.googleusercontent.com/d/1LwTIe6Qc6lilWXTPdhk_9MVfVkgujnlW',
    fallbackImage: 'https://lh3.googleusercontent.com/d/17F-ngbKdmnHNGbQEYqgkmupnjc37F8VD',
    presentation: '1 unidad',
    benefits: [
      'Conserva la temperatura exacta de bebidas frías o calientes todo el día',
      'No suda por fuera ni transmite calor a las manos',
      'Compatible con portavasos estándar de autos',
      'Fácil de limpiar y resistente a golpes'
    ],
    ingredients: ['Acero inoxidable de grado quirúrgico', 'Tapa de tritán libre de BPA'],
    usage: 'Usar a diario para llevar hidratación saludable a todas partes.',
    featured: false,
    badge: 'Estilo & Hidratación 🥤',
    healthFocus: ['Nutrición Diaria']
  },

  // 44. Tourmaline Magnet Pillow
  {
    id: 1044,
    name: 'Tourmaline Magnet Pillow (Almohada Magnética de Turmalina)',
    category: 'equipo',
    categoryLabel: 'Equipos y Hogar Saludable',
    shortDescription: 'Almohada ortopédica ergonómica con matriz de turmalina e imanes magnéticos para un sueño reparador profundo.',
    description: 'La Almohada de Turmalina HGW integra espuma viscoelástica con memoria anatómica cervical y una capa de microperlas de turmalina e imanes biomagnéticos. Promueve la alineación de la columna cervical, estimula la microcirculación cerebral y elimina la tensión, facilitando conciliar el sueño profundo rápidamente.',
    pricePublic: 89.00,
    pricePartner: 62.00,
    bv: 18.60,
    image: 'https://lh3.googleusercontent.com/d/1fpUgxErX0MQhzbjJ2u2U-wdeZYXpJmhr',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1fpUgxErX0MQhzbjJ2u2U-wdeZYXpJmhr',
    presentation: '1 unidad con funda hipoalergénica lavable',
    benefits: [
      'Soporte ergonómico cervical que previene dolores de cuello y tortícolis',
      'La turmalina emite iones negativos que inducen un descanso neuromuscular profundo',
      'Los imanes biomagnéticos mejoran el flujo sanguíneo craneal y calman el insomnio',
      'Tejido hipoalergénico, antiácaros y transpirable'
    ],
    ingredients: ['Espuma viscoelástica memory foam', 'Núcleo de turmalina y aniones', 'Imanes biomagnéticos de confort'],
    usage: 'Dormir diariamente sobre ella en posición supina o lateral.',
    featured: true,
    badge: 'Sueño Reparador 🌙',
    healthFocus: ['Terapia con Turmalina', 'Salud Articular', 'Energía y Enfoque']
  },

  // 45. Pen Gel
  {
    id: 1045,
    name: 'Pen Gel (Bolígrafo Punta Gel Oficial HGW)',
    category: 'equipo',
    categoryLabel: 'Equipos y Hogar Saludable',
    shortDescription: 'Bolígrafo corporativo de trazo suave con tinta gel premium para distribuidores y oficina.',
    description: 'Bolígrafo oficial de la marca HGW con tinta gel de secado ultra rápido y punta de precisión de 0.5 mm. Ideal para la firma de contratos, registros de nuevos socios y eventos de liderazgo.',
    pricePublic: 1.43,
    pricePartner: 1.00,
    bv: 0.30,
    image: 'https://lh3.googleusercontent.com/d/1erQ4yMHlxpIgMwmp5cHUmQM3nbKgxaEp',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1erQ4yMHlxpIgMwmp5cHUmQM3nbKgxaEp',
    presentation: '1 unidad (Tinta negra / azul de alta duración)',
    benefits: [
      'Escritura fluida continua sin manchas ni saltos de tinta',
      'Secado rápido en papel que evita borrones al firmar',
      'Cuerpo ergonómico ligero y elegante con el logo de HGW',
      'Excelente accesorio para eventos y presentaciones de negocio'
    ],
    ingredients: ['Cuerpo plástico reforzado', 'Punta de carburo de tungsteno', 'Tinta gel de alta densidad'],
    usage: 'Para escritura diaria y material de apoyo en presentaciones corporativas.',
    featured: false,
    badge: 'Oficina HGW 🖊️',
    healthFocus: ['Herramientas de Negocio']
  },

  // 46. Pasta dental con turmalina Negra
  {
    id: 1046,
    name: 'Pasta Dental con Turmalina Negra HGW',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal y Belleza',
    shortDescription: 'Dentífrico natural con nanopolvo de turmalina negra para blanqueamiento, desintoxicación y encías fuertes.',
    description: 'Dentífrico de avanzada que aprovecha las propiedades purificantes y adsorbentes de la turmalina negra. Elimina manchas superficiales de café, té y tabaco sin desgastar el esmalte, reduce la sensibilidad dental, neutraliza bacterias del mal aliento y protege la encía contra el sangrado y la gingivitis.',
    pricePublic: 8.00,
    pricePartner: 5.00,
    bv: 3.00,
    image: 'https://lh3.googleusercontent.com/d/1a4DGuy5n0IxYv3Qz6d5GbuCqfvVDrQaq',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1y-4nNnYCpibPY445jWvimVl0KSv5N9L6',
    presentation: 'Tubo de 120 gramos',
    benefits: [
      'Nanopolvo de turmalina negra con acción blanqueadora y remineralizante suave',
      'Inhibe la placa bacteriana y previene la formación de sarro',
      'Efecto antibacteriano y desodorizante prolongado para un aliento fresco',
      'Fórmula libre de flúor sintético agresivo y libre de parabenos'
    ],
    ingredients: ['Micropartículas de turmalina negra', 'Sorbito de calcio vegetal', 'Extracto de menta silvestre', 'Xilitol'],
    usage: 'Cepillar los dientes después de cada comida durante al menos 2 minutos.',
    featured: true,
    badge: 'Blanqueamiento Natural 🪥',
    healthFocus: ['Terapia con Turmalina', 'Cuidado Bucal']
  },

  // 47. Pasta dental con turmalina Blanca
  {
    id: 1047,
    name: 'Pasta Dental con Turmalina Blanca HGW',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal y Belleza',
    shortDescription: 'Crema dental bioactiva con turmalina blanca para el cuidado del esmalte sensible y brillo natural.',
    description: 'Formulada especialmente para encías sensibles y esmaltes delicados. La turmalina blanca aporta minerales y aniones que fortalecen la barrera dental, sellan los túbulos dentinarios previniendo la molestia con frío/calor y restauran el brillo perlado de los dientes.',
    pricePublic: 8.00,
    pricePartner: 5.00,
    bv: 3.00,
    image: 'https://lh3.googleusercontent.com/d/18Hc8CNusf3omof2f8XG0LwbWcMVE4Hz5',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1yUYF947AKl6sHQzr3r1J0osTaKhwLFVg',
    presentation: 'Tubo de 120 gramos',
    benefits: [
      'Calma y protege eficazmente los dientes con hipersensibilidad',
      'Refuerza el esmalte dental con microcristales minerales de turmalina blanca',
      'Protección duradera de las encías contra inflamaciones y retracción',
      'Sabor mentolado suave y refrescante'
    ],
    ingredients: ['Polvo micronizado de turmalina blanca', 'Sílice hidratada suave', 'Extractos botánicos', 'Menta piperita'],
    usage: 'Usar 3 veces al día en el cepillado dental regular.',
    featured: true,
    badge: 'Dientes Sensibles 🦷',
    healthFocus: ['Terapia con Turmalina', 'Cuidado Bucal']
  },

  // 48. Pasta dental con probiótico
  {
    id: 1048,
    name: 'Pasta Dental con Probióticos HGW',
    category: 'cuidado-personal',
    categoryLabel: 'Cuidado Personal y Belleza',
    shortDescription: 'Crema dental biológica con cepas probióticas activas para balancear la microbiota bucal y eliminar el mal aliento.',
    description: 'Dentífrico biotecnológico enriquecido con cepas probióticas patentadas (Lactobacillus). Restaura el equilibrio ecológico de la cavidad bucal eliminando las bacterias anaerobias causantes del mal aliento, la periodontitis y las caries sin destruir la flora protectora natural.',
    pricePublic: 8.00,
    pricePartner: 5.00,
    bv: 2.50,
    image: 'https://lh3.googleusercontent.com/d/1anfcSThO1ZWfpsVPTCUDuaEqepcb0K6h',
    fallbackImage: 'https://lh3.googleusercontent.com/d/1TGMwLpJczROw8WB3T2SVdCiELpEni6QB',
    presentation: 'Tubo de 120 gramos',
    benefits: [
      'Millones de probióticos activos que neutralizan las bacterias causantes del mal aliento',
      'Protege la salud periodontal y previene la inflamación de encías',
      'Fortalece la defensa biológica natural de la boca frente a infecciones',
      'Libre de abrasivos duros y agentes químicos irritantes'
    ],
    ingredients: ['Fermentos probióticos activos (Lactobacillus)', 'Fosfato dicálcico dihidratado', 'Xilitol protector anticaries', 'Menta refrescante'],
    usage: 'Cepillar minuciosamente encías y dientes durante 2 a 3 minutos tras cada comida.',
    featured: true,
    badge: 'Microbiota Bucal 🦠',
    healthFocus: ['Cuidado Bucal', 'Nutrición Diaria']
  }
];
