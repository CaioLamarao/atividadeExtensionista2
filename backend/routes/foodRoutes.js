const express = require('express');
const foodController = require('../controllers/foodController');  // Assegure-se de que o caminho está correto
const router = express.Router();

// Endpoint para buscar alimentos por nome
router.get('/search', foodController.searchFoodByName);

module.exports = router;
