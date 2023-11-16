const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Definir el middleware de rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5, // Máximo 5 solicitudes por ventana de tiempo
  message: 'Demasiadas solicitudes desde esta IP, por favor intenta nuevamente en un momento.',
});

// Aplicar el middleware de rate limiting a todas las solicitudes
app.use(limiter);

// Ruta de ejemplo
app.get('/api/ejemplo', (req, res) => {
  res.send('¡Ejemplo de ruta con rate limiting!');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor Express en ejecución en el puerto 3000');
});
