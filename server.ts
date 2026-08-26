import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Email Transporter (configured via SMTP or fallback logger)
  const getTransporter = () => {
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
    return null;
  };

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

  // Quotation Submission Route
  app.post("/api/send-quotation", async (req, res) => {
    try {
      const {
        clientName,
        clientPhone,
        clientEmail,
        clientAddress,
        deliveryMethod,
        orderNotes,
        items,
        totalBV,
        publicSubtotal,
        partnerSubtotal,
        shippingCost,
        finalTotal,
        isPartnerEligible,
        totalSavings,
      } = req.body;

      const dateStr = new Date().toLocaleString("es-PA", { timeZone: "America/Panama" });
      const deliveryLabel =
        deliveryMethod === "domicilio"
          ? "A Domicilio (Servientrega Panamá - B/. 5.00)"
          : "Retiro en Oficina Panamá (Gratis)";

      // Build product rows HTML & Text
      const productRowsHtml = (items || [])
        .map(
          (item: any, idx: number) => `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; text-align: center; color: #64748b; font-weight: bold;">${idx + 1}</td>
            <td style="padding: 10px; color: #0f172a; font-weight: 600;">${item.product?.name || "Producto"}</td>
            <td style="padding: 10px; text-align: center; color: #0f172a;">${item.quantity}</td>
            <td style="padding: 10px; text-align: right; color: #0f172a;">B/. ${(isPartnerEligible ? item.product?.pricePartner : item.product?.pricePublic || 0).toFixed(2)}</td>
            <td style="padding: 10px; text-align: center; color: #059669; font-weight: bold;">${((item.product?.bv || 0) * item.quantity).toFixed(1)} BV</td>
            <td style="padding: 10px; text-align: right; color: #0f172a; font-weight: bold;">B/. ${((isPartnerEligible ? item.product?.pricePartner : item.product?.pricePublic || 0) * item.quantity).toFixed(2)}</td>
          </tr>`
        )
        .join("");

      const itemsText = (items || [])
        .map(
          (item: any, idx: number) =>
            `${idx + 1}. ${item.product?.name || "Producto"} x ${item.quantity} und | Unitario: B/. ${(isPartnerEligible ? item.product?.pricePartner : item.product?.pricePublic || 0).toFixed(2)} | BV: ${((item.product?.bv || 0) * item.quantity).toFixed(1)} pts | Sub: B/. ${((isPartnerEligible ? item.product?.pricePartner : item.product?.pricePublic || 0) * item.quantity).toFixed(2)}`
        )
        .join("\n");

      // Notification HTML to Admin & Yamilka
      const adminHtml = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: #059669; padding: 24px; color: #ffffff;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800;">🛒 Nueva Cotización de Productos HGW Panamá</h1>
            <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 14px;">Fecha: ${dateStr}</p>
          </div>
          
          <div style="padding: 24px;">
            <div style="background: #f8fafc; border-radius: 12px; padding: 18px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
              <h2 style="margin: 0 0 12px 0; font-size: 16px; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">👤 Datos del Cliente</h2>
              <table style="width: 100%; font-size: 14px; color: #334155;">
                <tr><td style="padding: 4px 0; font-weight: bold; width: 140px;">Nombre:</td><td>${clientName}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold;">WhatsApp/Tel:</td><td><a href="https://wa.me/${(clientPhone || '').replace(/[^0-9]/g, '')}" style="color: #059669; font-weight: bold;">${clientPhone}</a></td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold;">Correo:</td><td>${clientEmail ? `<a href="mailto:${clientEmail}">${clientEmail}</a>` : 'No proporcionado'}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold;">Modalidad:</td><td>${deliveryLabel}</td></tr>
                ${clientAddress ? `<tr><td style="padding: 4px 0; font-weight: bold;">Dirección:</td><td>${clientAddress}</td></tr>` : ''}
                ${orderNotes ? `<tr><td style="padding: 4px 0; font-weight: bold;">Notas:</td><td>${orderNotes}</td></tr>` : ''}
              </table>
            </div>

            <h2 style="margin: 0 0 12px 0; font-size: 16px; color: #0f172a;">📦 Detalle de la Cotización</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
              <thead>
                <tr style="background: #f1f5f9; color: #475569; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px;">
                  <th style="padding: 8px; text-align: center;">#</th>
                  <th style="padding: 8px; text-align: left;">Producto</th>
                  <th style="padding: 8px; text-align: center;">Cant.</th>
                  <th style="padding: 8px; text-align: right;">Unitario</th>
                  <th style="padding: 8px; text-align: center;">BV</th>
                  <th style="padding: 8px; text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${productRowsHtml}
              </tbody>
            </table>

            <div style="background: #0f172a; color: #ffffff; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
              <table style="width: 100%; font-size: 14px;">
                <tr>
                  <td style="padding: 4px 0; color: #94a3b8;">Total BV:</td>
                  <td style="padding: 4px 0; text-align: right; color: #34d399; font-weight: bold;">${(totalBV || 0).toFixed(1)} BV</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #94a3b8;">Subtotal Productos:</td>
                  <td style="padding: 4px 0; text-align: right;">B/. ${(publicSubtotal || 0).toFixed(2)}</td>
                </tr>
                ${
                  isPartnerEligible
                    ? `<tr>
                        <td style="padding: 4px 0; color: #34d399; font-weight: bold;">Descuento Socio (-30%):</td>
                        <td style="padding: 4px 0; text-align: right; color: #34d399; font-weight: bold;">-B/. ${(totalSavings || 0).toFixed(2)}</td>
                      </tr>`
                    : ""
                }
                <tr>
                  <td style="padding: 4px 0; color: #94a3b8;">Envío:</td>
                  <td style="padding: 4px 0; text-align: right;">B/. ${(shippingCost || 0).toFixed(2)}</td>
                </tr>
                <tr style="border-top: 1px solid #334155;">
                  <td style="padding: 10px 0 4px 0; font-size: 18px; font-weight: 800;">TOTAL A PAGAR:</td>
                  <td style="padding: 10px 0 4px 0; text-align: right; font-size: 20px; font-weight: 800; color: #34d399;">B/. ${(finalTotal || 0).toFixed(2)} USD</td>
                </tr>
              </table>
            </div>

            <div style="font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 14px;">
              Distribuidora Independiente: <strong>Yamilka Batista (Código: Yamilka507)</strong><br />
              WhatsApp Oficial: <strong>+507 6778-8375</strong> | Sitio Web: <a href="https://hgwpanamacity.com/" style="color: #059669;">hgwpanamacity.com</a>
            </div>
          </div>
        </div>
      `;

      // Customer Confirmation HTML (if email is provided)
      const customerHtml = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: #059669; padding: 24px; color: #ffffff; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800;">¡Gracias por tu Cotización, ${clientName}! 🌿</h1>
            <p style="margin: 6px 0 0 0; opacity: 0.95; font-size: 14px;">Health Green World (HGW) Panamá</p>
          </div>
          
          <div style="padding: 24px;">
            <p style="font-size: 15px; color: #334155; line-height: 1.6;">
              ¡Hola <strong>${clientName}</strong>! 👋<br/><br/>
              Muchas gracias por tu interés en los productos HGW. Soy <strong>Yamilka Batista</strong>, Distribuidora Independiente autorizada en Panamá, y he recibido tu cotización con éxito.
            </p>

            <div style="background: #f8fafc; border-radius: 12px; padding: 16px; margin: 18px 0; border-left: 4px solid #059669;">
              <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #0f172a;">📋 Resumen de tu Cotización:</h3>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #475569; line-height: 1.7;">
                ${(items || []).map((i: any) => `<li><strong>${i.product?.name}</strong> x ${i.quantity} und — Subtotal: B/. ${((isPartnerEligible ? i.product?.pricePartner : i.product?.pricePublic || 0) * i.quantity).toFixed(2)} (${((i.product?.bv || 0) * i.quantity).toFixed(1)} BV)</li>`).join('')}
              </ul>
              <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 15px; font-weight: bold; color: #0f172a;">
                Total a Pagar: <span style="color: #059669;">B/. ${(finalTotal || 0).toFixed(2)} USD</span>
              </div>
            </div>

            <p style="font-size: 14px; color: #334155; line-height: 1.6;">
              En breve estaré contactándote por WhatsApp para coordinar los detalles de entrega y responder cualquier consulta que tengas.
            </p>

            <div style="text-align: center; margin: 24px 0;">
              <a href="https://wa.me/50767788375" style="display: inline-block; background: #25D366; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 30px; font-size: 15px;">
                💬 Chatear directamente con Yamilka Batista por WhatsApp (+507 6778-8375)
              </a>
            </div>

            <div style="font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 14px;">
              Yamilka Batista — Distribuidora Independiente HGW Panamá<br/>
              WhatsApp: +507 6778-8375 | Email: info.yamilka@gmail.com | Web: https://hgwpanamacity.com/
            </div>
          </div>
        </div>
      `;

      const transporter = getTransporter();

      console.log(`[HGW Cotización Recibida - Registro en Sistema]`, {
        fecha: dateStr,
        cliente: clientName,
        telefono: clientPhone,
        email: clientEmail || "No proporcionado",
        modalidad: deliveryLabel,
        total: `B/. ${(finalTotal || 0).toFixed(2)}`,
        bv: totalBV,
        destinatarioPrincipal: "info@hgwpanama.com",
        cc: ["info.yamilka@gmail.com", "yamilkabatista2026@gmail.com"],
        notificarClienteEmail: Boolean(clientEmail),
      });

      if (transporter) {
        // Send email to Admin and CC Yamilka
        await transporter.sendMail({
          from: process.env.SMTP_FROM || '"HGW Panamá" <info@hgwpanama.com>',
          to: "info@hgwpanama.com",
          cc: ["info.yamilka@gmail.com", "yamilkabatista2026@gmail.com"],
          subject: `🛒 Nueva Cotización HGW Panamá - ${clientName} (B/. ${(finalTotal || 0).toFixed(2)})`,
          html: adminHtml,
        });

        // Send email to customer if provided
        if (clientEmail && clientEmail.includes("@")) {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Yamilka Batista - HGW Panamá" <info@hgwpanama.com>',
            to: clientEmail,
            subject: `¡Hemos recibido tu cotización en HGW Panamá! — Yamilka Batista`,
            html: customerHtml,
          });
        }
      }

      // WhatsApp personalized thank-you template from Yamilka (+507 6778-8375)
      const thankYouWhatsAppMsg = `¡Hola ${clientName}! 👋 Muchas gracias por tu interés en los productos HGW Panamá. Soy Yamilka Batista (+507 6778-8375) y he recibido tu cotización con éxito por un total de B/. ${(finalTotal || 0).toFixed(2)} (${(totalBV || 0).toFixed(1)} BV). ¡Enseguida te atiendo con mucho gusto! 🌿`;

      res.json({
        success: true,
        message: "¡Cotización enviada con éxito!",
        notifiedEmails: {
          to: "info@hgwpanama.com",
          cc: ["info.yamilka@gmail.com", "yamilkabatista2026@gmail.com"],
          clientEmail: clientEmail || null,
        },
        thankYouMessage: thankYouWhatsAppMsg,
        sponsorWhatsApp: "+50767788375",
      });
    } catch (err) {
      console.error("Error al procesar y enviar cotización:", err);
      res.status(500).json({ error: "Error al enviar la cotización" });
    }
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
        conCopiaA: ['info.yamilka@gmail.com', 'yamilkabatista2026@gmail.com'],
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

