const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, '..', 'data');

// ─── POST /validar ────────────────────────────────────────────────────────────
// Body: { temaId, letra, opcionSeleccionada }
// Responde: { correcta: true/false, respuestaCorrecta: number }
router.post('/', (req, res) => {
  const { temaId, letra, opcionSeleccionada } = req.body;

  // Validar que llegaron los campos necesarios
  if (temaId === undefined || !letra || opcionSeleccionada === undefined) {
    return res.status(400).json({ error: 'Faltan campos requeridos: temaId, letra, opcionSeleccionada' });
  }

  // Leer el tema
  const filePath = path.join(DATA_DIR, `tema${temaId}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Tema no encontrado' });
  }

  const tema = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const pregunta = tema.preguntas.find(p => p.letra === letra.toUpperCase());

  if (!pregunta) {
    return res.status(404).json({ error: `No existe pregunta para la letra ${letra}` });
  }

  const esCorrecta = parseInt(opcionSeleccionada) === pregunta.correcta;

  res.json({
    correcta: esCorrecta,
    respuestaCorrecta: pregunta.correcta  // para mostrar cuál era la correcta si falló
  });
});

module.exports = router;
