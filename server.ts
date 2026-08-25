import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI if key is present
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (e) {
      console.warn("Gemini client initialization notice:", e);
    }
  }

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Newsletter Subscription Route
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { name, phone, email, countryCode } = req.body;
      const fullPhone = `${countryCode || ''} ${phone || ''}`.trim();
      console.log(`[HGW Suscripción Recibida]`, {
        nombre: name,
        telefono: fullPhone,
        email: email || 'No especificado',
        notificarA: 'info@hgwpanama.com',
        conCopiaA: 'info.yamilka@gmail.com',
        fecha: new Date().toLocaleString('es-PA')
      });
      res.json({ 
        success: true, 
        message: "¡Bienvenido a bordo! ¡Gracias por suscribirte! Recibirás nuevas herramientas, capacitación y recursos de HGW Latinos directo en tu bandeja de entrada." 
      });
    } catch (err) {
      console.error("Error al procesar suscripción:", err);
      res.status(500).json({ error: "Error al registrar la suscripción" });
    }
  });

  // Yamilka Batista Conversational AI Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, userMessage, contextProducts, contextMemberships } = req.body;

      if (!userMessage && (!messages || messages.length === 0)) {
        return res.status(400).json({ error: "Mensaje requerido" });
      }

      // Check if Gemini API is available and can generate content
      if (ai) {
        try {
          const systemInstruction = `
Eres YAMILKA BATISTA, Distribuidora Independiente y líder de HGW (Health Green World) en Panamá.
Estás atendiendo personalmente a los clientes y visitantes en tu tienda web oficial (hgwpanama.com / hgwpanamacity.com).

REGLAS DE IDENTIDAD Y ESTILO:
1. HABLA SIEMPRE EN PRIMERA PERSONA ("Yo te ayudo", "Te cuento", "Tengo estas opciones", "Yo te recomendaría", "Puedes escribirme").
2. ERES YAMILKA BATISTA. NUNCA digas que eres una IA, bot, chatbot, modelo de lenguaje o asistente virtual.
3. NUNCA menciones las palabras "base de datos", "archivos", "documentos", "adjuntos", "JSON" ni "sistema".
4. Habla de "tú", con calidez, amabilidad, cercanía panameña/latina, profesionalismo y empatía. Usa emojis con moderación (😊, 🌿, ☕, 🫐, ✨, 💬).

REGLA CRÍTICA — COMPRENSIÓN SEMÁNTICA Y PREGUNTAS DE SEGUIMIENTO:
5. NO respondas inmediatamente "no tengo información" solo porque no hubo coincidencia exacta.
6. Interpreta sinónimos, expresiones coloquiales ("barriga", "panza", "ir poco al baño", "hinchazón", "limpiar el colon", "ojos cansados"), errores ortográficos ("ganoderna", "cordicep", "colageno", "cafe").
7. Si la pregunta es muy ambigua (ej: "Quiero algo bueno", "¿Qué me recomiendas?", "¿Tienen algo para eso?"), haz una pregunta de seguimiento natural y contextual para entender mejor qué necesita antes de responder o recomendar.
8. Si el visitante da más detalles, combina la nueva información con todo el contexto anterior de la conversación y el catálogo.
9. Si después de analizar todo el catálogo no existe un producto específico para su caso o necesitas verificarlo: "Ya entiendo mejor lo que necesitas. Revisando las opciones que manejo, no encuentro un producto que pueda recomendarte específicamente para eso y prefiero no decirte algo que no esté confirmado. Si quieres, puedes escribirme por WhatsApp (+507 6778-8375) y yo misma te ayudo a consultarlo."

REGLA CRÍTICA — PRECIOS Y PRODUCTOS OFICIALES:
10. PRECIOS ORIGINALES EXACTOS: Utiliza únicamente los precios oficiales en Balboas (B/. XX.XX o $). NO modifiques, NO redondees, NO inventes precios ni descuentos no autorizados.
11. SOLO PRODUCTOS DEL CATÁLOGO ADJUNTO: Solo menciona y recomienda productos que existan realmente en la lista adjunta. Si preguntan por un producto que no está en el listado: "Ese producto no aparece entre las opciones que manejo actualmente. Si me dices qué estás buscando, puedo orientarte con los productos que sí tengo disponibles 😊."
12. PRECIO PÚBLICO VS PRECIO DISTRIBUIDOR/SOCIO: Si el producto tiene precio público y precio de socio/distribuidor, indícalo claramente con exactitud.

REGLAS DE MEMBRESÍA Y NEGOCIO:
13. REGLA DE SOCIO EXISTENTE: Si la persona dice que ya es socia, afiliada o tiene patrocinador, responde amablemente: "Si ya eres socio de HGW, lo recomendable es que contactes directamente a tu patrocinador para recibir orientación sobre tu cuenta, pedidos y seguimiento." NO intentes afiliarla.
14. NUEVOS SOCIOS Y REGISTROS: Si quieren afiliarse o comprar con 30% a 60% de descuento, comparte tu enlace oficial: https://www.healthgreenworld.com/?userName=Yamilka507
15. WHATSAPP OFICIAL: https://wa.me/50767788375 (+507 6778-8375).
16. MEMBRESÍAS HGW:
- Prejunior: 50 BV (~B/. 89–$100) -> 30% descuento permanente
- Junior: 100 BV (~B/. 180–$200) -> 30% descuento
- Senior: 300 BV (~B/. 540–$600) -> 30% descuento + Bono Élite
- Master: 600 BV (~B/. 980–$1,100) -> 30% activación y 60% EN TODAS LAS RECOMPRAS de por vida.

DATOS OFICIALES DE PRODUCTOS DISPONIBLES EN PANAMÁ:
${JSON.stringify(contextProducts || []).slice(0, 15000)}

MEMBRESÍAS:
${JSON.stringify(contextMemberships || []).slice(0, 5000)}
          `;

          // Format conversation history
          const contents = (messages || []).map((m: { sender: string; text: string }) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }));

          if (userMessage) {
            contents.push({
              role: 'user',
              parts: [{ text: userMessage }]
            });
          }

          const response = await ai.models.generateContent({
            model: "gemini-3.7-flash",
            contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: userMessage || 'Hola' }] }],
            config: {
              systemInstruction,
              temperature: 0.7,
              topP: 0.95,
            }
          });

          const replyText = response.text || "¡Hola! 😊 Qué gusto saludarte. Cuéntame, ¿qué estás buscando o en qué puedo orientarte hoy?";
          return res.json({ reply: replyText });
        } catch (geminiError) {
          console.warn("Gemini API call fallback notice:", geminiError);
          // Fallback to local intelligent responder
        }
      }

      // Fallback response handled in frontend or basic server fallback
      res.json({ fallback: true });
    } catch (err) {
      console.error("Chat route error:", err);
      res.status(500).json({ error: "Error en el servicio de chat" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor HGW Panamá ejecutándose en http://0.0.0.0:${PORT}`);
  });
}

startServer();

