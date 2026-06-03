# Tablero del Conocimiento — Backend

API REST para el juego Tablero del Conocimiento.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Verificar que el servidor está vivo |
| GET | `/temas` | Lista de los 3 temas (sin preguntas) |
| GET | `/temas/:id` | Tema completo con preguntas (sin respuestas correctas) |
| POST | `/validar` | Valida si una respuesta es correcta |

### POST /validar — Body esperado
```json
{
  "temaId": 1,
  "letra": "A",
  "opcionSeleccionada": 2
}
```

## Cómo cambiar las preguntas de un tema

1. Ve a tu repositorio en GitHub
2. Abre el archivo `data/tema1.json` (o tema2, tema3)
3. Edita las preguntas directamente en el navegador
4. Haz commit → Render se actualiza automáticamente en ~30 segundos

### Estructura del JSON de un tema
```json
{
  "id": 1,
  "nombre": "Nombre del tema",
  "descripcion": "Descripción breve",
  "icono": "💻",
  "color": "#1a1a2e",
  "camino": {
    "colorFondo": "#0f3460",
    "colorCasilla": "#e94560",
    "colorMeta": "#f5a623",
    "totalCasillas": 30,
    "forma": "serpentina"
  },
  "musica": {
    "correcto": "correcto.mp3",
    "incorrecto": "incorrecto.mp3",
    "agotado": "agotado.mp3",
    "avanzar": "avanzar.mp3",
    "victoria": "victoria.mp3"
  },
  "preguntas": [
    {
      "letra": "A",
      "texto": "Tu pregunta aquí",
      "opciones": ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
      "correcta": 0
    }
  ]
}
```
> ⚠️ `correcta` es el índice de la opción correcta (0, 1, 2 o 3)

## Despliegue en Render

1. Sube este código a un repositorio de GitHub
2. En render.com → New → Web Service → conecta el repositorio
3. Configuración:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
4. Variable de entorno: `FRONTEND_URL` = URL de tu sitio en Netlify

## Desarrollo local

```bash
npm install
npm run dev   # usa nodemon para auto-reiniciar
```

Servidor en: http://localhost:3000
