const express = require('express');
const router = express.Router();

// Exemplo de uma rota GET
router.get('/', (req, res) => {
  res.send('Response from meals routes');
});

module.exports = router;
