const express = require('express');
const axios = require('axios');

const app = express();

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

app.get('/retry-example', async (req, res) => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.get('https://api.example.com/data');
      return res.json(response.data);
    } catch (error) {
      console.error(`Error occurred: ${error.message}`);
      retries++;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }

  return res.status(500).json({ error: 'Failed after retries' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
