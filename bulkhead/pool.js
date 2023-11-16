const express = require('express');
const axios = require('axios');
const { Semaphore } = require('await-semaphore'); // Para simular el pool de conexiones

const app = express();

// Simulando un pool de conexiones con un límite de 3 conexiones simultáneas
const connectionPool = new Semaphore(3);

app.get('/api/simulated', async (req, res) => {
  try {
    // Adquirir una "conexión" del pool
    const release = await connectionPool.acquire();

    // Simular una solicitud a una API externa (espera de 2 segundos)
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Liberar la "conexión" después de completar la solicitud
    release();

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

app.listen(3000, () => {
  console.log('Servidor Express en ejecución en el puerto 3000');
});
