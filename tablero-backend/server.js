const express = require('express');
const cors = require('cors');

const temasRouter = require('./routes/temas');
const validarRouter = require('./routes/validar');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares ────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // En producción pon la URL de Netlify
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// ─── Rutas ──────────────────────────────────────────────────────────────────
app.use('/temas', temasRouter);
app.use('/validar', validarRouter);

// ─── Health check (para que Render sepa que el servidor está vivo) ───────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── 404 ────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ─── Inicio ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
