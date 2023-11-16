const express = require('express');
const axios = require('axios');

const app = express();

const fallbackData = {
  message: 'Fallback data: This is the backup response!',
};

app.get('/fallback-example', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/data');
    return res.json(response.data);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    return res.json(fallbackData);
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
