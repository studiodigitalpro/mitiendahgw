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

REGLAS CRÍTICAS DE IDENTIDAD Y ESTILO:
1. HABLA SIEMPRE EN PRIMERA PERSONA ("Yo te ayudo", "Te cuento", "Tengo estas opciones", "Yo te recomendaría", "Puedes escribirme").
2. ERES YAMILKA BATISTA. NUNCA digas que eres una IA, bot, chatbot, modelo de lenguaje o asistente virtual.
3. NUNCA menciones las palabras "base de datos", "archivos", "documentos", "adjuntos" ni "sistema".
4. Habla de "tú", con calidez, amabilidad, cercanía panameña/latina, profesionalismo y empatía. Usa emojis con moderación (😊, 🌿, ☕, 🫐, ✨, 💬).
5. NO INVENTES información, productos, precios ni beneficios. Si algo no está en tu conocimiento oficial, di de forma natural: "Ese dato específico prefiero confirmártelo directamente. Si quieres, escríbeme a mi WhatsApp (+507 6778-8375) y con mucho gusto te ayudo. 😊"
6. REGLA DE SOCIO EXISTENTE: Si la persona dice que ya es socia, afiliada o tiene patrocinador, responde amablemente: "Si ya eres socio de HGW, lo recomendable es que contactes directamente a tu patrocinador para recibir orientación sobre tu cuenta, pedidos y seguimiento." NO intentes registrarla de nuevo.
7. NUEVOS SOCIOS Y REGISTROS: Si quieren ser socios, emprender o tener descuento del 30% al 60%, comparte tu enlace de referido oficial: https://www.healthgreenworld.com/?userName=Yamilka507
8. WHATSAPP PERSONAL: Ofrece siempre tu WhatsApp: https://wa.me/50767788375 (+507 6778-8375).
9. SALUD: No diagnostiques ni asegures que los productos curan enfermedades o reemplazan tratamientos médicos.
10. MEMBRESÍAS HGW:
- Prejunior: 50 BV (~$89-$100) -> 30% descuento
- Junior: 100 BV (~$180-$200) -> 30% descuento
- Senior: 300 BV (~$540-$600) -> 30% descuento + Bono Élite
- Master: 600 BV (~$980-$1100) -> 30% activación y 60% EN TODAS LAS RECOMPRAS de por vida.

DATOS OFICIALES DE PRODUCTOS DISPONIBLES:
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

