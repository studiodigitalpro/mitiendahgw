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

// Function to find matching products based on text queries
export function searchProducts(query: string): Product[] {
  const normalized = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  return PRODUCTS.filter(product => {
    const nameMatch = product.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalized);
    const descMatch = product.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalized);
    const shortDescMatch = product.shortDescription.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalized);
    const catMatch = product.categoryLabel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalized);
    const benefitsMatch = product.benefits?.some(b => b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalized));
    const healthFocusMatch = product.healthFocus?.some(h => h.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalized));
    const ingredientsMatch = product.ingredients?.some(i => i.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalized));
    
    return nameMatch || descMatch || shortDescMatch || catMatch || benefitsMatch || healthFocusMatch || ingredientsMatch;
  });
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
  
  // 1. Existing partner check (RULE 17)
  if (
    text.includes("ya soy socio") || 
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

  // 3. Wants to join as partner / distributor / business (RULE 16 & 18)
  if (
    text.includes("quiero ser socio") || 
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
      reply: "¡Qué excelente decisión! 🌟 En HGW puedes iniciar con 4 niveles de membresía según tu presupuesto y objetivos:\n\n" +
        "• **Prejunior (50 BV / ~$89–$100)**: 30% de descuento permanente en recompras y acceso al sistema.\n" +
        "• **Junior (100 BV / ~$180–$200)**: 30% de descuento y bonos de equipo mejorados.\n" +
        "• **Senior (300 BV / ~$540–$600)**: 30% de descuento y desbloqueas el Bono Élite.\n" +
        "• **Master (600 BV / ~$980–$1,100)**: 👑 ¡Membresía máxima! Obtienes **60% DE DESCUENTO** en todas tus recompras de por vida y todos los bonos al 100%.\n\n" +
        "Además, nuestro Plan de Ganancia Mutua 50/50 te permite ganar desde el primer día. Si deseas registrarte bajo mi equipo y contar con mi asesoría directa, puedes hacerlo en mi enlace oficial.",
      suggestedAction: 'register',
      actionUrl: SPONSOR_INFO.registrationUrl,
      actionLabel: "🤝 Quiero registrarme con Yamilka"
    };
  }

  // 4. Greetings
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

  // 5. Questions about what products exist / catalog (RULE 11)
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
      reply: "Manejo una línea completa de bienestar, nutrición y cuidado personal de HGW con tecnología de vanguardia. Te cuento las categorías principales:\n\n" +
        "🫐 **Línea de Arándanos**: Caramelos antioxidantes, Péptidos de Colágeno, Mermelada Frutal y Proteína Berry Meal.\n" +
        "☕ **Cafés Funcionales**: Berry Gano Coffee (con Ganoderma y Arándanos), Café con Cordyceps y Café con Ginseng.\n" +
        "🌿 **Salud Digestiva y Colon**: Fresh Drink Chang JingJing (limpieza de colon) y Pro Shaping Tea (té moldeador).\n" +
        "⚡ **Línea Turmalina y Cuidado Personal**: Toallas sanitarias con turmalina y aniones, pasta dental herbal con arándanos, jabón de oliva y termo alcalino.\n\n" +
        "¿Hay algún área de tu salud o bienestar que te gustaría mejorar en particular?",
      suggestedProducts: featured
    };
  }

  // 6. Digestion / Colon / Transit intestinal queries (RULE 9 & 10)
  if (
    text.includes("digestion") || 
    text.includes("colon") || 
    text.includes("estomago") || 
    text.includes("estreñimiento") || 
    text.includes("estrenimiento") || 
    text.includes("transito intestinal") || 
    text.includes("inflamacion") || 
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
      reply: "Para la salud digestiva y bienestar intestinal tengo opciones excelentes que dan resultados maravillosos:\n\n" +
        "1. **Fresh Drink Chang JingJing**: Es nuestro limpiador de colon botánico a base de cebada verde tierna, bayas de goji, regaliz y diente de león. Ayuda a regular el tránsito intestinal suavemente sin cólicos y desintoxica colon, hígado y riñones ($13.00 público / $9.00 socio).\n\n" +
        "2. **Pro Shaping Tea**: Delicioso té termogénico que estimula la digestión, disminuye la retención de líquidos y apoya el metabolismo ($23.00 público / $16.00 socio).\n\n" +
        "3. **Berry Gano Coffee**: Nuestro café con hongo Ganoderma Lucidum y arándanos, ideal para regular la digestión sin irritar la mucosa gástrica ($22.00 público / $15.00 socio).\n\n" +
        "¿Buscas principalmente apoyo para el tránsito intestinal diario o una desintoxicación más profunda?",
      suggestedProducts: colonProducts
    };
  }

  // 7. Coffee & Ganoderma / Cordyceps / Ginseng queries
  if (
    text.includes("cafe") || 
    text.includes("ganoderma") || 
    text.includes("cordyceps") || 
    text.includes("ginseng") || 
    text.includes("berry gano")
  ) {
    const coffeeProducts = PRODUCTS.filter(p => p.category === 'serie-cafes');
    return {
      reply: "Nuestros cafés funcionales son deliciosos y aportan increíbles beneficios terapéuticos:\n\n" +
        "• **Berry Gano Coffee ($22.00 / $15.00 socio)**: Café premium enriquecido con Ganoderma Lucidum y extracto de arándanos. Fortalece las defensas, regula la digestión y aporta gran cantidad de antioxidantes.\n" +
        "• **Cordyceps Coffee ($24.00 / $16.00 socio)**: Con hongo Cordyceps Sinensis, excelente para vitalidad pulmonar, oxigenación y energía celular.\n" +
        "• **Ginseng Coffee ($24.00 / $16.00 socio)**: Con raíz de Panax Ginseng para combatir el agotamiento físico y mental.\n\n" +
        "¿Cuál de estos beneficios te llama más la atención?",
      suggestedProducts: coffeeProducts
    };
  }

  // 8. Vision / Eyes / Lutein queries
  if (
    text.includes("ojos") || 
    text.includes("vista") || 
    text.includes("vision") || 
    text.includes("luteina") || 
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
      reply: "Para la salud visual y ocular, el arándano canadiense de HGW es insuperable por su alta concentración de antocianinas:\n\n" +
        "• **Blueberry Candy ($5.80 / $4.00 socio)**: Caramelos ricos en antocianinas que alivian la fatiga ocular por pantallas.\n" +
        "• **Arándanos con Luteína / Éster de Luteína**: Fórmulas específicas para proteger la mácula y la retina.\n" +
        "• **Máscara de Ojos de Turmalina ($32.00 / $22.00 socio)**: Libera aniones e infrarrojo lejano para relajar la vista cansada y ojeras.\n\n" +
        "¿Sientes vista cansada por uso prolongado de celular o computadora?",
      suggestedProducts: eyeProducts
    };
  }

  // 9. Collagen / Skin / Joints queries
  if (
    text.includes("colageno") || 
    text.includes("piel") || 
    text.includes("articulaciones") || 
    text.includes("arrugas") || 
    text.includes("flacidez") || 
    text.includes("cabello") || 
    text.includes("unas")
  ) {
    const collagen = PRODUCTS.filter(p => p.name.includes("Colágeno") || p.name.includes("Collagen"));
    return {
      reply: "Te recomiendo muchísimo nuestro **Blueberry Collagen Peptide (Péptido de Colágeno)** ($29.00 público / $20.00 socio). Viene en caja con 12 sobres.\n\n" +
        "Contiene péptidos de colágeno hidrolizado de rápida absorción celular combinados con arándanos y Vitamina C. Ayuda a devolver la elasticidad y firmeza a la piel, fortalece folículos capilares, uñas y protege articulaciones y cartílagos. Se toma disuelto en agua tibia o fresca en ayunas o antes de dormir.",
      suggestedProducts: collagen
    };
  }

  // 10. Tourmaline / Pads / Hygiene / Personal Care
  if (
    text.includes("turmalina") || 
    text.includes("toalla") || 
    text.includes("sanitaria") || 
    text.includes("anion") || 
    text.includes("jabon") || 
    text.includes("pasta dental") || 
    text.includes("termo") ||
    text.includes("faja") ||
    text.includes("rodillera")
  ) {
    const tourmalineProducts = PRODUCTS.filter(p => p.category === 'cuidado-personal' || p.category === 'accesorios').slice(0, 3);
    return {
      reply: "Nuestra tecnología de Turmalina con Emisión de Aniones e Infrarrojo Lejano es uno de los mayores orgullos de HGW:\n\n" +
        "• **Toallas Sanitarias de Turmalina**: Con cinta verde de aniones que previene bacterias, neutraliza olores y alivia cólicos menstruales (Día $5.50, Noche $6.00, Protectores $6.50).\n" +
        "• **Jabón de Turmalina y Oliva ($11.00 / $7.50 socio)**: Limpieza profunda, equilibra el pH y alivia afecciones cutáneas.\n" +
        "• **Pasta Dental Herbal con Arándanos ($10.00 / $7.00 socio)**: Fortalece encías, previene sarro y no contiene flúor tóxico.\n" +
        "• **Termo de Turmalina ($115.00 / $80.00 socio)**: Alcaliniza y microestructura el agua para máxima hidratación celular.",
      suggestedProducts: tourmalineProducts
    };
  }

  // 11. Prices / How much does it cost? (RULE 4 & 11)
  if (
    text.includes("precio") || 
    text.includes("costo") || 
    text.includes("cuanto cuesta") || 
    text.includes("cuanto vale") || 
    text.includes("descuento")
  ) {
    return {
      reply: "En HGW manejamos dos listas de precios oficiales en Panamá:\n\n" +
        "1. **Precio al Público**: Para compras directas por unidad.\n" +
        "2. **Precio de Socio (30% de descuento)**: Al activarte con una membresía desde 50 BV (~$89-$100), todos tus productos te quedan con 30% de descuento inmediato, ¡y si compras el paquete Master obtienes hasta 60% en tus recompras!\n\n" +
        "Ejemplos:\n" +
        "• Berry Gano Coffee: $22.00 (Socio: $15.00)\n" +
        "• Chang JingJing Limpiador Colon: $13.00 (Socio: $9.00)\n" +
        "• Péptido de Colágeno: $29.00 (Socio: $20.00)\n" +
        "• Blueberry Candy: $5.80 (Socio: $4.00)\n\n" +
        "¿De qué producto en particular te gustaría conocer el precio exacto?",
      suggestedAction: 'whatsapp',
      actionUrl: 'https://wa.me/50767788375',
      actionLabel: "💬 Pedir cotización por WhatsApp"
    };
  }

  // 12. Wants to buy / How to order (RULE 14 & 15)
  if (
    text.includes("quiero comprar") || 
    text.includes("como compro") || 
    text.includes("como comprar") || 
    text.includes("como es el envio") || 
    text.includes("entrega") || 
    text.includes("hacen envios") || 
    text.includes("pedir")
  ) {
    return {
      reply: "¡Con mucho gusto! Comprar es súper fácil y seguro:\n\n" +
        "1. **Entregas en todo Panamá**: Enviamos a Ciudad de Panamá, provincias centrales, Chiriquí, Colón y todo el país a través de Servientrega o mensajería rápida.\n" +
        "2. **Formas de pago**: Aceptamos transferencia bancaria / Yappy o pago directo al registrarte.\n" +
        "3. **Asesoría directa**: Puedes decirme qué productos deseas y yo misma te coordino el pedido y despacho por WhatsApp.",
      suggestedAction: 'whatsapp',
      actionUrl: `https://wa.me/50767788375?text=${encodeURIComponent('Hola Yamilka, quiero comprar productos HGW. ¿Cómo coordinamos el pedido?')}`,
      actionLabel: "💬 Coordinar compra por WhatsApp"
    };
  }

  // 13. Dynamic search in product catalog for specific name
  const matched = searchProducts(userQuery);
  if (matched.length > 0) {
    const prod = matched[0];
    const otherProds = matched.slice(0, 3);
    
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
        `• **Precio al Público:** $${prod.pricePublic.toFixed(2)} USD\n` +
        `• **Precio de Socio (30% dcto):** $${prod.pricePartner.toFixed(2)} USD (${prod.bv} BV)\n` +
        `• **Descripción:** ${prod.shortDescription}` +
        benefitsStr +
        ingredientsStr +
        usageStr +
        `\n\n¿Te gustaría que te ayude a adquirirlo o necesitas más detalles?`,
      suggestedProducts: otherProds
    };
  }

  // 14. Unconfirmed information / Fallback without inventing (RULE 2 & 20)
  return {
    reply: "Ese dato específico no lo tengo confirmado en la información oficial que manejo. Para darte una respuesta correcta y con total seguridad, prefiero no inventarte el dato. 😊 Puedes escribirme directamente a mi WhatsApp y con mucho gusto te ayudo a verificarlo.",
    suggestedAction: 'whatsapp',
    actionUrl: `https://wa.me/50767788375?text=${encodeURIComponent(`Hola Yamilka, tengo una consulta sobre: "${userQuery}"`)}`,
    actionLabel: "💬 Consultar con Yamilka por WhatsApp"
  };
}
