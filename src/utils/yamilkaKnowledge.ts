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

  // 1. Existing partner check
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
      reply: "Si ya eres socio de HGW, lo mejor es que contactes directamente a tu asesor o patrocinador para recibir orientación sobre tu cuenta y pedidos. ¡Te deseo mucho éxito! 😊"
    };
  }

  // 2. Direct talk with Yamilka / WhatsApp / Email request
  if (
    text.includes("hablar con yamilka") || 
    text.includes("hablar contigo") || 
    text.includes("tu whatsapp") || 
    text.includes("whatsapp") || 
    text.includes("numero") || 
    text.includes("telefono") || 
    text.includes("correo") ||
    text.includes("email") ||
    text.includes("contacto directo")
  ) {
    return {
      reply: "¡Claro que sí! 😊 Puedes escribirme directamente a mi correo info.yamilka@gmail.com o a mi WhatsApp (+507 6778-8375) y con gusto te atiendo de forma personalizada.",
      suggestedAction: 'whatsapp',
      actionUrl: `https://wa.me/50767788375?text=${encodeURIComponent('Hola Yamilka, te escribo desde la tienda web. Me gustaría recibir asesoría personalizada.')}`,
      actionLabel: "💬 Escribirme por WhatsApp"
    };
  }

  // 3. Ambiguous / Too general questions -> Short clarification question
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
      reply: "¡Claro con gusto! 😊 ¿Qué estás buscando mejorar exactamente? ¿Tu digestión, más energía, la piel, o conocer nuestros cafés?",
      suggestedAction: 'catalog',
      actionLabel: "🛍️ Ver catálogo"
    };
  }

  // 4. Wants to join as partner / distributor / business
  if (
    text.includes("quiero ser socio") || 
    text.includes("quiero ser socia") || 
    text.includes("quiero afiliarme") || 
    text.includes("como ser socio") || 
    text.includes("quiero emprender") || 
    text.includes("quiero vender") || 
    text.includes("membresia") || 
    text.includes("plan de compensacion") || 
    text.includes("cuanto cuesta afiliarse") ||
    text.includes("ganar dinero")
  ) {
    return {
      reply: "¡Excelente decisión! 😊 Puedes comenzar desde 50 BV (~B/. 90.00) con 30% de descuento permanente, o con membresía Master para un 60% de descuento en recompras. Si quieres comenzar conmigo, puedes registrarte aquí:",
      suggestedAction: 'register',
      actionUrl: SPONSOR_INFO.registrationUrl,
      actionLabel: "🤝 Registrarme con Yamilka"
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
      reply: "¡Hola! 😊 Soy Yamilka Batista. Cuéntame, ¿qué estás buscando o en qué te puedo orientar hoy?"
    };
  }

  // 6. Questions about what products exist / catalog
  if (
    text.includes("que productos tienen") || 
    text.includes("que vendes") || 
    text.includes("que opciones tienen") || 
    text.includes("catalogo") || 
    text.includes("mostrar productos") || 
    text.includes("ver productos")
  ) {
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 3);
    return {
      reply: "Manejo productos oficiales HGW: cafés funcionales, arándanos, limpiadores de colon, colágeno y línea de turmalina. ¿Buscas algo en específico para tu bienestar? 😊",
      suggestedProducts: featured
    };
  }

  // 7. Digestion / Belly / Colon
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
    text.includes("inflamacion") || 
    text.includes("hinchada") ||
    text.includes("hinchado") ||
    text.includes("gases") ||
    text.includes("limpieza")
  ) {
    const colonProducts = PRODUCTS.filter(p => 
      p.name.includes("Chang JingJing") || 
      p.name.includes("Pro Shaping Tea")
    );
    return {
      reply: "Para la digestión y colon te recomiendo **Fresh Drink Chang JingJing** (B/. 13.00 público / B/. 9.00 socio) y el **Pro Shaping Tea** (B/. 23.00 público / B/. 16.00 socio). ¿Sientes pesadez o buscas una limpieza suave? 😊",
      suggestedProducts: colonProducts
    };
  }

  // 8. Coffee & Ganoderma / Cordyceps
  if (
    text.includes("cafe") || 
    text.includes("café") || 
    text.includes("ganoderma") || 
    text.includes("ganoderna") || 
    text.includes("cordyceps") || 
    text.includes("berry gano")
  ) {
    const coffeeProducts = PRODUCTS.filter(p => p.category === 'serie-cafes').slice(0, 3);
    return {
      reply: "Nuestros cafés funcionales más pedidos son el **Ganoderma Soluble Coffee** (B/. 23.00) y el **Cordyceps Coffee Cream** (B/. 23.00). ¿Buscas defensas y digestión o energía y vitalidad? ☕",
      suggestedProducts: coffeeProducts
    };
  }

  // 9. Vision / Eyes / Lutein
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
      p.name.includes("Luteína")
    ).slice(0, 2);
    return {
      reply: "Para la vista cansada y protección de ojos por pantallas, los **Blueberry Candy** son ideales (B/. 5.80 público / B/. 4.00 socio). ¿Sientes fatiga visual frente al celular o computadora? 🫐",
      suggestedProducts: eyeProducts
    };
  }

  // 10. Collagen / Skin / Joints
  if (
    text.includes("colageno") || 
    text.includes("colágeno") || 
    text.includes("piel") || 
    text.includes("articulaciones") || 
    text.includes("rodilla") ||
    text.includes("arrugas")
  ) {
    const collagen = PRODUCTS.filter(p => p.name.includes("Colágeno") || p.name.includes("Collagen"));
    return {
      reply: "Te recomiendo el **Blueberry Collagen Peptide** (B/. 29.00 público / B/. 20.00 socio). Ayuda a la firmeza de la piel, cabello y articulaciones. ¿Quieres que te explique cómo se toma? 😊",
      suggestedProducts: collagen
    };
  }

  // 11. Tourmaline / Pads / Hygiene
  if (
    text.includes("turmalina") || 
    text.includes("toalla") || 
    text.includes("toallas") || 
    text.includes("sanitaria") || 
    text.includes("pasta dental") || 
    text.includes("termo")
  ) {
    const tourmalineProducts = PRODUCTS.filter(p => p.category === 'cuidado-personal' || p.category === 'accesorios').slice(0, 3);
    return {
      reply: "Tenemos las **Toallas Sanitarias de Turmalina** (Día B/. 5.00, Noche B/. 4.00, Protectores B/. 5.00) y la **Pasta Dental con Turmalina** (B/. 8.00). ¿Cuál de ellos te interesa conocer? ✨",
      suggestedProducts: tourmalineProducts
    };
  }

  // 12. Prices / How much does it cost?
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
      reply: "Todos los productos tienen precio público y precio con 30% de descuento como socio. ¿De qué producto en específico te gustaría saber el precio exacto? 😊"
    };
  }

  // 13. Direct / Semantic product search
  const { directMatches } = findMatchingProducts(userQuery, previousUserMessages);
  if (directMatches.length > 0) {
    const prod = directMatches[0];
    const otherProds = directMatches.slice(0, 2);
    
    return {
      reply: `Sí 😊 El precio de **${prod.name}** (${prod.presentation}) es de **B/. ${prod.pricePublic.toFixed(2)}** (Precio de socio: **B/. ${prod.pricePartner.toFixed(2)}**). ¿Quieres que te explique cómo se utiliza?`,
      suggestedProducts: otherProds
    };
  }

  // 14. Unconfirmed / Needs verification
  return {
    reply: "Ese producto no aparece entre las opciones que manejo actualmente. Si me dices qué estás buscando o necesitas asesoría personalizada, puedes escribirme a info.yamilka@gmail.com o a mi WhatsApp (+507 6778-8375) 😊.",
    suggestedAction: 'whatsapp',
    actionUrl: `https://wa.me/50767788375?text=${encodeURIComponent(`Hola Yamilka, te consulto sobre: "${userQuery}"`)}`,
    actionLabel: "💬 Escribirme por WhatsApp"
  };
}
