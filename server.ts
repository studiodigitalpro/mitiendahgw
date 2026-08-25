import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

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
