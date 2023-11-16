const express = require("express");
const axios = require("axios");
const CircuitBreaker = require("opossum");

const app = express();

const breakerOptions = {
  timeout: 5000,
  errorThresholdPercentage: 50,
  resetTimeout: 10000,
};

const circuit = new CircuitBreaker(async (bad) => {
  console.log("🚀 ~ file: index.js:14 ~ circuit ~ breaker:", bad)
  if (bad) {
    // este código explota adrede
    const response = await axios.get("https://api.example.com/data");
    return response.data;
  } else {
    const response = await axios.get("https://rickandmortyapi.com/api/character");
    return response.data;
  }
}, breakerOptions);

circuit.fallback(() => {
  return { fallback: "Fallback data: This is the backup response!" };
});

app.get("/circuit-breaker-example", async (req, res) => {
  try {
    const result = await circuit.fire(req.query.bad);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Service unavailable" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
