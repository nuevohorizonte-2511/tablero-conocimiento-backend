const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, '..', 'data');

// ─── Helper: leer un tema desde su JSON ──────────────────────────────────────
function leerTema(id) {
  const filePath = path.join(DATA_DIR, `tema${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

// ─── GET /temas ──────────────────────────────────────────────────────────────
// Devuelve la lista de temas (sin preguntas, solo metadata para las tarjetas)
router.get('/', (req, res) => {
  const temas = [];

  for (let i = 1; i <= 3; i++) {
    const tema = leerTema(i);
    if (tema) {
      temas.push({
        id: tema.id,
        nombre: tema.nombre,
        descripcion: tema.descripcion,
        icono: tema.icono,       // emoji o nombre de imagen
        color: tema.color,       // color de la tarjeta
        totalPreguntas: tema.preguntas.length
      });
    }
  }

  res.json({ temas });
});

// ─── GET /temas/:id ──────────────────────────────────────────────────────────
// Devuelve la configuración completa de un tema (camino + preguntas)
// Las respuestas correctas NO se envían al frontend (seguridad)
router.get('/:id', (req, res) => {
  const tema = leerTema(req.params.id);

  if (!tema) {
    return res.status(404).json({ error: 'Tema no encontrado' });
  }

  // Enviamos las preguntas SIN el índice de respuesta correcta
  const preguntasSinRespuesta = tema.preguntas.map(p => ({
    letra: p.letra,
    texto: p.texto,
    opciones: p.opciones
    // 'correcta' se omite intencionalmente
  }));

  res.json({
    id: tema.id,
    nombre: tema.nombre,
    descripcion: tema.descripcion,
    icono: tema.icono,
    color: tema.color,
    camino: tema.camino,           // configuración del camino serpenteante
    musica: tema.musica,           // nombres de archivos de audio
    preguntas: preguntasSinRespuesta
  });
});

module.exports = router;
