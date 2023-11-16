const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Definir middleware de rate limiting para la "área" 1
const limiterArea1 = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 3, // Máximo 3 solicitudes por minuto para el área 1
  message: 'Demasiadas solicitudes desde esta IP en el área 1, por favor intenta nuevamente en un momento.',
});

// Definir middleware de rate limiting para el "área" 2
const limiterArea2 = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5, // Máximo 5 solicitudes por minuto para el área 2
  message: 'Demasiadas solicitudes desde esta IP en el área 2, por favor intenta nuevamente en un momento.',
});

// Ruta para el "área" 1
app.get('/area1', limiterArea1, (req, res) => {
  res.send('¡Bienvenido al área 1!');
});

// Ruta para el "área" 2
app.get('/area2', limiterArea2, (req, res) => {
  res.send('¡Bienvenido al área 2!');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor Express en ejecución en el puerto 3000');
});
