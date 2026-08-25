import { PRODUCTS } from '../data/products';
import { MEMBERSHIP_PLANS, SPONSOR_INFO } from '../data/memberships';
import { Product } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'yamilka';
  text: string;
  timestamp: Date;
  suggestedProducts?: Product[];
  suggestedAction?: 'whatsapp' | 'register' | 'catalog' | 'memberships';
  actionUrl?: string;
  actionLabel?: string;
}

// Enhanced Semantic Search and Multi-Factor Intent Parser
export function findMatchingProducts(query: string, previousContext?: string): {
  directMatches: Product[];
  relatedCategory?: string;
  identifiedIntent?: string;
} {
  const fullText = `${previousContext || ''} ${query}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Semantic keyword clusters mapping to health goals & synonyms
  const semanticGroups: { [key: string]: string[] } = {
    digestivo: [
      "digestion", "digestivo", "estomago", "barriga", "panza", "vientre", "colon", "transito", 
      "estrenimiento", "estreñimiento", "evacuar", "ir al bano", "inflamacion", "hinchada", "hinchado", 
      "gases", "pesadez", "desintoxicar", "limpieza", "chang jingjing", "te", "pro shaping", "metabolismo"
    ],
    cafe_hongos: [
      "cafe", "cafes", "ganoderma", "ganoderna", "cordyceps", "cordicep", "ginseng", "berry gano", 
      "energia", "vitalidad", "cansancio", "defensas", "inmunidad", "antioxidante", "desayuno", "bebida"
    ],
    visual_ojos: [
      "ojos", "ojo", "vista", "vision", "luteina", "luteína", "arandanos", "arandano", "blueberry", 
      "candy", "caramelo", "caramelos", "pantalla", "celular", "cansancio visual", "ojeras", "mascara"
    ],
    colageno_belleza: [
      "colageno", "colágeno", "peptido", "peptidos", "piel", "arrugas", "lineas de expresion", 
      "flacidez", "elasticidad", "articulaciones", "rodillas", "dolor articular", "cabello", "pelo", 
      "caida de cabello", "unas", "uñas", "rejuvenecer"
    ],
    turmalina_femenino: [
      "toalla", "toallas", "sanitaria", "sanitarias", "protectores", "anion", "aniones", "periodo", 
      "menstruacion", "menstruación", "colicos", "cólicos", "infeccion", "infecciones", "olor", "higiene intima",
      "turmalina", "jabon", "oliva", "pasta dental", "dientes", "encias", "sarro", "termo", "agua alcalina",
      "faja", "rodillera", "cinturon", "collar"
    ]
  };

  let matchedCategoryKey = '';
  for (const [key, keywords] of Object.entries(semanticGroups)) {
    if (keywords.some(kw => fullText.includes(kw))) {
      matchedCategoryKey = key;
      break;
    }
  }

  // Exact & partial product filtering
  const directMatches = PRODUCTS.filter(product => {
    const pName = product.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const pShort = product.shortDescription.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const pCat = product.categoryLabel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const pBenefits = product.benefits?.map(b => b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")).join(" ") || "";
    const pHealth = product.healthFocus?.map(h => h.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")).join(" ") || "";
    const pIng = product.ingredients?.map(i => i.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")).join(" ") || "";

    const queryTokens = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/\s+/).filter(t => t.length > 2);
    
    const tokenMatch = queryTokens.some(token => 
      pName.includes(token) || 
      pShort.includes(token) || 
      pBenefits.includes(token) || 
      pHealth.includes(token) || 
      pIng.includes(token)
    );

    return tokenMatch || (matchedCategoryKey === 'digestivo' && (product.category === 'alimentos' || product.category === 'suplementos' || product.name.includes('Chang') || product.name.includes('Shaping')))
      || (matchedCategoryKey === 'cafe_hongos' && product.category === 'serie-cafes')
      || (matchedCategoryKey === 'visual_ojos' && (product.name.includes('Candy') || product.name.includes('Luteína') || product.name.includes('Máscara')))
      || (matchedCategoryKey === 'colageno_belleza' && (product.name.includes('Colágeno') || product.name.includes('Collagen')))
      || (matchedCategoryKey === 'turmalina_femenino' && (product.category === 'cuidado-personal' || product.category === 'accesorios'));
  });

  return {
    directMatches,
    relatedCategory: matchedCategoryKey,
    identifiedIntent: matchedCategoryKey
  };
}

// Function to find matching products based on text queries
export function searchProducts(query: string): Product[] {
  const { directMatches } = findMatchingProducts(query);
  return directMatches;
}

// Intelligent first-person conversational engine for Yamilka Batista
export function generateYamilkaResponse(userQuery: string, history: ChatMessage[]): {
  reply: string;
  suggestedProducts?: Product[];
  suggestedAction?: 'whatsapp' | 'register' | 'catalog' | 'memberships';
  actionUrl?: string;
  actionLabel?: string;
} {
  const text = userQuery.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Extract previous conversational context (last user queries & yamilka answers)
  const previousUserMessages = history.filter(h => h.sender === 'user').map(h => h.text).join(" ");

  // 1. Existing partner check (RULE 17)
  if (
    text.includes("ya soy socio") || 
    text.includes("ya soy socia") || 
    text.includes("ya estoy afiliad") || 
    text.includes("tengo patrocinador") || 
    text.includes("ya pertenezco a hgw") ||
    text.includes("ya estoy inscrita") ||
    text.includes("ya estoy inscrito") ||
    text.includes("ya me afilie")
  ) {
    return {
      reply: "¡Hola! Si ya eres socio de HGW, lo recomendable es que contactes directamente a tu patrocinador para recibir orientación sobre tu cuenta, pedidos y seguimiento. ¡Te deseo el mayor de los éxitos en tu negocio! 🙌"
    };
  }

  // 2. Direct talk with Yamilka / WhatsApp request (RULE 15 & 32)
  if (
    text.includes("hablar con yamilka") || 
    text.includes("hablar contigo") || 
    text.includes("tu whatsapp") || 
    text.includes("whatsapp") || 
    text.includes("numero") || 
    text.includes("telefono") || 
    text.includes("contacto directo")
  ) {
    return {
      reply: "¡Claro que sí! 😊 Puedes escribirme directamente a mi WhatsApp (+507 6778-8375). Con mucho gusto te atenderé y responderé todas tus dudas de forma personalizada.",
      suggestedAction: 'whatsapp',
      actionUrl: `https://wa.me/50767788375?text=${encodeURIComponent('Hola Yamilka, te escribo desde la tienda web hgwpanama.com. Me gustaría recibir asesoría personalizada.')}`,
      actionLabel: "💬 Chatear con Yamilka por WhatsApp"
    };
  }

  // 3. Ambiguous / Too general questions -> Clarification follow-up (RULE 4, 9, 10)
  if (
    text === "quiero algo bueno" || 
    text === "que me recomiendas" || 
    text === "que me recomiendas?" || 
    text === "necesito ayuda" || 
    text === "tienes algo para eso" ||
    text === "ayuda" ||
    text === "recomiendame algo"
  ) {
    return {
      reply: "¡Claro con mucho gusto! 😊 Para orientarte como te mereces, cuéntame un poquito más: ¿estás buscando mejorar tu digestión y colon, tener más energía, cuidar tu piel y articulaciones, o te interesa conocer nuestros cafés funcionales y cuidado personal?",
      suggestedAction: 'catalog',
      actionLabel: "🛍️ Ver catálogo"
    };
  }

  // 4. Wants to join as partner / distributor / business (RULE 16 & 18)
  if (
    text.includes("quiero ser socio") || 
    text.includes("quiero ser socia") || 
    text.includes("quiero afiliarme") || 
    text.includes("como ser socio") || 
    text.includes("quiero emprender") || 
    text.includes("quiero vender") || 
    text.includes("membresia") || 
    text.includes("plan de compensacion") || 
    text.includes("ganancia mutua") ||
    text.includes("cuanto cuesta afiliarse") ||
    text.includes("ganar dinero")
  ) {
    return {
      reply: "¡Qué excelente decisión! 🌟 En HGW puedes iniciar con 4 niveles de membresía oficiales según tu proyección:\n\n" +
        "• **Prejunior (50 BV / ~$89–$100)**: 30% de descuento permanente en recompras.\n" +
        "• **Junior (100 BV / ~$180–$200)**: 30% de descuento y mayores bonos de equipo.\n" +
        "• **Senior (300 BV / ~$540–$600)**: 30% de descuento y desbloqueas el Bono Élite.\n" +
        "• **Master (600 BV / ~$980–$1,100)**: 👑 ¡La máxima membresía! Obtienes **60% DE DESCUENTO** en todas tus recompras de por vida y 100% de los bonos.\n\n" +
        "Además, nuestro Plan de Ganancia Mutua 50/50 te permite ganar desde el primer momento. Si deseas registrarte bajo mi patrocinio y contar con mi asesoría directa, puedes hacerlo aquí:",
      suggestedAction: 'register',
      actionUrl: SPONSOR_INFO.registrationUrl,
      actionLabel: "🤝 Quiero registrarme con Yamilka"
    };
  }

  // 5. Greetings
  if (
    text === "hola" || 
    text === "buenas" || 
    text === "buenos dias" || 
    text === "buenas tardes" || 
    text === "buenas noches" || 
    text === "hola yamilka" ||
    text === "hey" ||
    text === "saludos"
  ) {
    return {
      reply: "¡Hola! 😊 Qué gusto saludarte. Soy Yamilka Batista, distribuidora de HGW en Panamá. Cuéntame, ¿qué estás buscando o en qué te puedo orientar hoy? Puedo recomendarte productos según lo que necesites o explicarte cómo comprar con descuento."
    };
  }

  // 6. Questions about what products exist / catalog (RULE 11)
  if (
    text.includes("que productos tienen") || 
    text.includes("que vendes") || 
    text.includes("que opciones tienen") || 
    text.includes("catalogo") || 
    text.includes("mostrar productos") || 
    text.includes("ver productos")
  ) {
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
    return {
      reply: "Manejo la línea oficial completa de bienestar, nutrición y cuidado personal de HGW en Panamá:\n\n" +
        "🫐 **Línea de Arándanos**: Caramelos antioxidantes, Péptidos de Colágeno, Mermelada Frutal y Proteína Berry Meal.\n" +
        "☕ **Cafés Funcionales**: Berry Gano Coffee (con Ganoderma y Arándanos), Café con Cordyceps y Café con Ginseng.\n" +
        "🌿 **Salud Digestiva y Colon**: Fresh Drink Chang JingJing (limpiador de colon) y Pro Shaping Tea (té moldeador).\n" +
        "⚡ **Línea Turmalina y Cuidado Personal**: Toallas sanitarias con turmalina y aniones, pasta dental herbal con arándanos, jabón de oliva y termo alcalino.\n\n" +
        "¿Hay algún área de tu bienestar que te gustaría mejorar en particular?",
      suggestedProducts: featured
    };
  }

  // 7. Digestion / Belly / Stomach / Colon / Transit intestinal queries (Semantic understanding)
  if (
    text.includes("digestion") || 
    text.includes("digestivo") || 
    text.includes("colon") || 
    text.includes("estomago") || 
    text.includes("barriga") ||
    text.includes("panza") ||
    text.includes("vientre") ||
    text.includes("estreñimiento") || 
    text.includes("estrenimiento") || 
    text.includes("ir al bano") || 
    text.includes("transito intestinal") || 
    text.includes("inflamacion") || 
    text.includes("hinchada") ||
    text.includes("hinchado") ||
    text.includes("gases") ||
    text.includes("desintoxicar") ||
    text.includes("limpieza")
  ) {
    const colonProducts = PRODUCTS.filter(p => 
      p.name.includes("Chang JingJing") || 
      p.name.includes("Pro Shaping Tea") || 
      p.name.includes("Berry Gano")
    );
    return {
      reply: "Para el bienestar digestivo, estómago y colon tengo opciones maravillosas con resultados comprobados:\n\n" +
        "1. **Fresh Drink Chang JingJing**: Es nuestro limpiador botánico a base de cebada verde tierna, bayas de goji y diente de león. Regula el tránsito intestinal suavemente sin cólicos y ayuda a limpiar colon e hígado (**B/. 13.00** público / **B/. 9.00** socio).\n\n" +
        "2. **Pro Shaping Tea**: Té funcional termogénico que estimula la digestión ligera, reduce la retención de líquidos y apoya la reducción de medidas (**B/. 23.00** público / **B/. 16.00** socio).\n\n" +
        "3. **Berry Gano Coffee**: Café con Ganoderma y arándanos, excelente para activar tu digestión sin irritar la mucosa gástrica (**B/. 22.00** público / **B/. 15.00** socio).\n\n" +
        "¿Sientes principalmente pesadez/estreñimiento o te gustaría una desintoxicación completa?",
      suggestedProducts: colonProducts
    };
  }

  // 8. Coffee & Ganoderma / Cordyceps / Ginseng queries
  if (
    text.includes("cafe") || 
    text.includes("café") || 
    text.includes("ganoderma") || 
    text.includes("ganoderna") || 
    text.includes("cordyceps") || 
    text.includes("ginseng") || 
    text.includes("berry gano")
  ) {
    const coffeeProducts = PRODUCTS.filter(p => p.category === 'serie-cafes');
    return {
      reply: "Nuestros cafés funcionales son deliciosos y aportan grandes beneficios para la salud con precios oficiales:\n\n" +
        "• **Ganoderma Soluble Coffee (B/. 23.00 público / B/. 16.00 socio)**: Café con Ganoderma Lucidum, fortalece defensas, digestión y antioxidantes (12 sobres).\n" +
        "• **Cordyceps Coffee Cream (B/. 23.00 público / B/. 16.00 socio)**: Con hongo Cordyceps Sinensis y crema vegetal suave, excelente para vitalidad física, respiración y rendimiento (12 sobres).\n" +
        "• **Coffee Ceps sin azúcar (B/. 20.00 público / B/. 14.00 socio)**: Café negro puro con Cordyceps sin azúcar (12 sobres).\n" +
        "• **Café de Ashwagandha (B/. 23.00 público / B/. 16.00 socio)**: Para equilibrar el estrés y la vitalidad diaria (12 sobres).\n\n" +
        "¿Cuál de estas opciones te gustaría probar?",
      suggestedProducts: coffeeProducts
    };
  }

  // 9. Vision / Eyes / Lutein queries
  if (
    text.includes("ojos") || 
    text.includes("ojo") || 
    text.includes("vista") || 
    text.includes("vision") || 
    text.includes("luteina") || 
    text.includes("luteína") || 
    text.includes("arandanos") ||
    text.includes("blueberry")
  ) {
    const eyeProducts = PRODUCTS.filter(p => 
      p.name.includes("Candy") || 
      p.name.includes("Luteína") || 
      p.name.includes("Máscara") ||
      p.name.includes("Colágeno")
    ).slice(0, 3);
    return {
      reply: "Para el cuidado visual y fatiga ocular, el arándano canadiense de HGW es insuperable por sus antocianinas:\n\n" +
        "• **Blueberry Candy (B/. 5.80 / B/. 4.00 socio)**: Caramelos masticables ricos en antocianinas que alivian el ardor y vista cansada por pantallas.\n" +
        "• **Arándanos con Luteína**: Nutrición específica para la retina y mácula.\n" +
        "• **Máscara de Ojos de Turmalina (B/. 32.00 / B/. 22.00 socio)**: Emite aniones e infrarrojo lejano para relajar la tensión ocular y ojeras.\n\n" +
        "¿Sientes fatiga visual por uso frecuente de pantallas o celular?",
      suggestedProducts: eyeProducts
    };
  }

  // 10. Collagen / Skin / Joints queries
  if (
    text.includes("colageno") || 
    text.includes("colágeno") || 
    text.includes("piel") || 
    text.includes("articulaciones") || 
    text.includes("rodilla") ||
    text.includes("arrugas") || 
    text.includes("flacidez") || 
    text.includes("cabello") || 
    text.includes("pelo") ||
    text.includes("unas") ||
    text.includes("uñas")
  ) {
    const collagen = PRODUCTS.filter(p => p.name.includes("Colágeno") || p.name.includes("Collagen"));
    return {
      reply: "Te recomiendo muchísimo nuestro **Blueberry Collagen Peptide (Péptido de Colágeno con Arándanos)** (**B/. 29.00** público / **B/. 20.00** socio - Caja de 12 sobres).\n\n" +
        "Al ser micro-péptidos hidrolizados, tienen una absorción celular superior. Ayuda a devolver la firmeza y lozanía a la piel, fortalece folículos capilares, uñas y nutre cartílagos y articulaciones. Se toma 1 sobre disuelto en agua tibia o fresca diariamente.",
      suggestedProducts: collagen
    };
  }

  // 11. Tourmaline / Pads / Hygiene / Personal Care
  if (
    text.includes("turmalina") || 
    text.includes("toalla") || 
    text.includes("toallas") || 
    text.includes("sanitaria") || 
    text.includes("anion") || 
    text.includes("aniones") || 
    text.includes("jabon") || 
    text.includes("jabón") || 
    text.includes("pasta dental") || 
    text.includes("termo") ||
    text.includes("faja") ||
    text.includes("rodillera") ||
    text.includes("cuello")
  ) {
    const tourmalineProducts = PRODUCTS.filter(p => p.category === 'cuidado-personal' || p.category === 'accesorios').slice(0, 3);
    return {
      reply: "Nuestra tecnología de Turmalina con Emisión de Aniones es uno de los mayores beneficios de HGW con precios oficiales:\n\n" +
        "• **Toallas Sanitarias de Turmalina**: Con cinta verde de aniones que previene bacterias, neutraliza olores y alivia cólicos menstruales (**Toalla Día B/. 5.00** / Socio: **B/. 3.50**, **Toalla Noche B/. 4.00** / Socio: **B/. 3.20**, **Protectores Diarios B/. 5.00** / Socio: **B/. 3.50**).\n" +
        "• **Pastas Dentales de Turmalina / Probiótico (B/. 8.00 público / B/. 5.00 socio)**: Fortalece encías, previene sarro y alivia sensibilidad.\n" +
        "• **Tourmaline Thermo WATERSON (B/. 95.00 público / B/. 65.00 socio)**: Alcaliniza y microestructura el agua (500 ml).\n" +
        "• **Protectores Térmicos de Turmalina**: Cuello (**B/. 16.00** / Socio: **B/. 11.00**), Rodilleras (**B/. 55.00** / Socio: **B/. 39.00**), Cinturón/Faja (**B/. 69.00** / Socio: **B/. 48.00**).\n\n" +
        "¿Cuál de estos productos te interesa conocer en detalle?",
      suggestedProducts: tourmalineProducts
    };
  }

  // 12. Prices / How much does it cost? (RULE 1, 2, 10 & 15)
  if (
    text.includes("precio") || 
    text.includes("costo") || 
    text.includes("cuanto cuesta") || 
    text.includes("cuanto vale") || 
    text.includes("cuanto sale") || 
    text.includes("precio distribuidor") || 
    text.includes("precio publico")
  ) {
    return {
      reply: "En HGW manejamos dos listas de precios oficiales en Panamá:\n\n" +
        "1. **Precio al Público**: Para compras directas por unidad.\n" +
        "2. **Precio de Socio (30% de descuento)**: Al activarte con una membresía desde 50 BV (~B/. 89–100), todos tus productos quedan con 30% de descuento inmediato, y hasta 60% en recompras con membresía Master.\n\n" +
        "Ejemplos oficiales:\n" +
        "• Ganoderma Soluble Coffee: **B/. 23.00** (Socio: **B/. 16.00**)\n" +
        "• Chang JingJing Limpiador Colon: **B/. 13.00** (Socio: **B/. 9.00**)\n" +
        "• Péptido de Colágeno: **B/. 29.00** (Socio: **B/. 20.00**)\n" +
        "• Blueberry Candy: **B/. 5.80** (Socio: **B/. 4.00**)\n\n" +
        "¿De cuál de nuestros productos te gustaría conocer el precio exacto?",
      suggestedAction: 'whatsapp',
      actionUrl: 'https://wa.me/50767788375',
      actionLabel: "💬 Consultar precios por WhatsApp"
    };
  }

  // 13. Semantic / Contextual product search
  const { directMatches } = findMatchingProducts(userQuery, previousUserMessages);
  if (directMatches.length > 0) {
    const prod = directMatches[0];
    const otherProds = directMatches.slice(0, 3);
    
    let benefitsStr = "";
    if (prod.benefits && prod.benefits.length > 0) {
      benefitsStr = "\n\n**Beneficios principales:**\n" + prod.benefits.map(b => `• ${b}`).join("\n");
    }
    
    let ingredientsStr = "";
    if (prod.ingredients && prod.ingredients.length > 0) {
      ingredientsStr = `\n\n**Ingredientes:** ${prod.ingredients.join(', ')}.`;
    }

    let usageStr = "";
    if (prod.usage) {
      usageStr = `\n\n**Modo de uso recomendado:** ${prod.usage}`;
    }

    return {
      reply: `Sí 😊 El **${prod.name}** es un producto fantástico:\n\n` +
        `• **Presentación:** ${prod.presentation}\n` +
        `• **Precio al Público:** B/. ${prod.pricePublic.toFixed(2)}\n` +
        `• **Precio de Socio (30% dcto):** B/. ${prod.pricePartner.toFixed(2)} (${prod.bv} BV)\n` +
        `• **Descripción:** ${prod.shortDescription}` +
        benefitsStr +
        ingredientsStr +
        usageStr +
        `\n\n¿Te gustaría que te ayude a coordinar tu pedido o tienes alguna duda adicional?`,
      suggestedProducts: otherProds
    };
  }

  // 14. Unconfirmed / Not found in catalog -> Politely ask for clarification or offer WhatsApp (RULE 4 & 12)
  return {
    reply: "Cuéntame un poquito más sobre lo que estás buscando y así puedo orientarte mejor 😊. ¿Te refieres a alguna necesidad específica de salud o buscas algún producto en particular?",
    suggestedAction: 'whatsapp',
    actionUrl: `https://wa.me/50767788375?text=${encodeURIComponent(`Hola Yamilka, te consulto sobre: "${userQuery}"`)}`,
    actionLabel: "💬 Escribir a Yamilka por WhatsApp"
  };
}
