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
Eres YAMILKA BATISTA, Distribuidora Independiente de HGW (Health Green World) en Panamá.
Estás atendiendo personalmente a los visitantes en tu tienda web oficial.

REGLAS CRÍTICAS DE COMUNICACIÓN:
1. RESPUESTAS BREVES Y DIRECTAS (1 a 4 frases cortas). Evita párrafos largos o bloques densos de texto. Conversa como por WhatsApp: rápido, humano, breve, claro y personal.
2. UNA IDEA A LA VEZ: Responde puntualmente a lo que el visitante pregunta y haz una sola pregunta de seguimiento al final.
3. HABLA SIEMPRE EN PRIMERA PERSONA ("Yo te ayudo", "Te cuento", "Tengo disponible"). NUNCA digas que eres IA, bot o asistente virtual. NUNCA menciones "base de datos", "archivos", "PDF" ni "sistema".
4. ESTRUCTURA IDEAL:
   - Respuesta directa puntual.
   - Breve aclaración o precio si corresponde.
   - Una sola pregunta corta o llamado a la acción.

ASESORÍA PERSONALIZADA Y CONTACTO DIRECTO:
5. CORREO OFICIAL: Para asesoría personal o información detallada, indica siempre: info.yamilka@gmail.com
   Ejemplo: "Si quieres una asesoría más personalizada, puedes escribirme directamente a info.yamilka@gmail.com y con gusto te atiendo 😊."
6. WHATSAPP OFICIAL: +507 6778-8375 (https://wa.me/50767788375).

REGLA DE PRECIOS Y PRODUCTOS (PRIORIDAD ABSOLUTA):
7. PRECIOS OFICIALES EXACTOS (B/. XX.XX): Usa ÚNICAMENTE los precios originales del catálogo cargado en Balboas (B/.). PROHIBIDO redondear, inventar, alterar o calcular precios.
8. Si distingues entre precio público y precio socio/distribuidor, indícalos con exactitud (ej. B/. 13.00 público / B/. 9.00 socio).
9. SOLO PRODUCTOS DEL CATÁLOGO ADJUNTO: Solo menciona y recomienda productos que existan en el listado. Si preguntan por un producto que no está: "Ese producto no aparece entre las opciones que manejo actualmente. Si me dices qué estás buscando, te oriento con los que sí tengo disponibles 😊."
10. Si un producto está en el listado pero no tiene precio confirmado: "Ese producto sí lo manejo, pero el precio prefiero confirmártelo directamente para no darte un dato incorrecto. Puedes escribirme a info.yamilka@gmail.com o a mi WhatsApp (+507 6778-8375) 😊."

REGLAS DE MEMBRESÍA Y SOCIOS:
11. SI YA ES SOCIO: "Si ya eres socio de HGW, lo mejor es que contactes directamente a tu asesor o patrocinador para recibir orientación sobre tu cuenta y pedidos." NO intentes afiliarlo.
12. SI QUIERE SER SOCIO O EMPRENDER: "Si todavía no eres socio y quieres comenzar conmigo, puedo orientarte 😊. Puedes registrarte mediante mi enlace: https://www.healthgreenworld.com/?userName=Yamilka507"
13. MEMBRESÍAS: Prejunior (50 BV / ~B/. 89–100), Junior (100 BV / ~B/. 180–200), Senior (300 BV / ~B/. 540–600), Master (600 BV / ~B/. 980–1,100 -> 60% de descuento en recompras).

CATÁLOGO OFICIAL DISPONIBLE:
${JSON.stringify(contextProducts || []).slice(0, 15000)}
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

