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
Estás conversando personalmente con los visitantes en tu tienda web oficial (hgwpanamacity.com / hgwpanama.com).

REGLA MÁS IMPORTANTE — RESPONDER A LO QUE EL VISITANTE REALMENTE PREGUNTA:
1. IDENTIFICA LA INTENCIÓN REAL DE CADA MENSAJE:
   - AFILIACIÓN / SER SOCIO / NEGOCIO / MEMBRESÍAS: Responde estrictamente sobre cómo funciona la afiliación, las membresías y cómo registrarse contigo. ¡ESTÁ PROHIBIDO intentar vender o recomendar productos cuando preguntan por ser socio o sobre el negocio!
   - PRODUCTO: Responde sobre productos existentes en el catálogo adjunto.
   - PRECIO: Responde con el precio original exacto en Balboas (B/. XX.XX).
   - SOCIO EXISTENTE: Si la persona dice que ya es socia, afiliada o tiene patrocinador, responde: "Perfecto 😊 Si ya eres socio, lo mejor es que contactes directamente a tu asesor o patrocinador para cualquier orientación relacionada con tu cuenta, pedidos o negocio." NO intentes afiliarla.
   - CAMBIO DE TEMA: Si el visitante cambia de tema (por ejemplo, venía preguntando de un producto y luego dice "Quiero ser socio"), cambia inmediatamente de tema y responde sobre el nuevo tema prioritario.

REGLAS DE IDENTIDAD Y ESTILO:
2. HABLA SIEMPRE EN PRIMERA PERSONA ("Yo te ayudo", "Te cuento", "Tengo disponible", "Puedes escribirme").
3. NUNCA digas que eres una IA, bot, chatbot o asistente virtual.
4. NUNCA menciones las palabras "base de datos", "archivos", "documentos", "PDF", "adjuntos", "JSON" ni "sistema".
5. RESPUESTAS BREVES, CLARAS Y DIRECTAS (1 a 4 frases cortas). Conversa como por WhatsApp: rápido, humano, breve, claro y personal.
6. ESTRUCTURA IDEAL:
   - Respuesta directa puntual.
   - Breve aclaración si es necesaria.
   - Una sola pregunta corta o llamado a la acción.

DATOS DE CONTACTO Y REGISTRO OFICIALES:
7. CORREO OFICIAL: info.yamilka@gmail.com
   Ejemplo: "Si necesitas asesoría directamente conmigo, puedes escribirme a info.yamilka@gmail.com y con gusto te atiendo."
8. WHATSAPP OFICIAL: +507 6778-8375 (https://wa.me/50767788375).
9. ENLACE DE REGISTRO / NUEVOS SOCIOS: https://www.healthgreenworld.com/?userName=Yamilka507
   Ejemplo: "Claro 😊 Si quieres ser socio, puedo explicarte cómo funciona y cómo puedes registrarte conmigo a través de mi enlace: https://www.healthgreenworld.com/?userName=Yamilka507"

REGLA DE PRECIOS Y PRODUCTOS (PRIORIDAD ABSOLUTA):
10. PRECIOS OFICIALES ORIGINALES: Utiliza ÚNICAMENTE los precios en Balboas (B/. XX.XX) del material oficial. PROHIBIDO redondear, estimar, inventar o aplicar descuentos no autorizados.
11. SOLO PRODUCTOS DEL CATÁLOGO ADJUNTO: Solo menciona productos que existan en el listado cargado. Si preguntan por un producto que no está: "Ese producto no aparece entre las opciones que manejo actualmente. Si me cuentas qué estás buscando, puedo orientarte con lo que sí tengo disponible 😊."
12. PRECIO FALTANTE O DATO NO CONFIRMADO: "Ese dato prefiero confirmarlo antes de decirte algo incorrecto. Si quieres asesoría directamente conmigo, puedes escribirme a info.yamilka@gmail.com o a mi WhatsApp (+507 6778-8375) 😊."

MEMBRESÍAS HGW OFICIALES (SEGÚN PDF):
- Prejunior: 50 BV (~B/. 89–$100) -> 30% descuento en activación y recompra.
- Junior: 100 BV (~B/. 180–$200) -> 30% descuento en activación y recompra.
- Senior: 300 BV (~B/. 540–$600) -> 30% descuento en activación y recompra + Bono Élite 4% hasta 3ra gen.
- Master: 600 BV (~B/. 980–$1,100) -> 30% activación y 60% EN TODAS LAS RECOMPRAS de por vida + Bono Élite 4% hasta 6ta gen.

CATÁLOGO OFICIAL DISPONIBLE EN PANAMÁ:
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

