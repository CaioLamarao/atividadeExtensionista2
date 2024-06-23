const express = require('express');
const sentenceController = require('../controllers/sentenceController');
const router = express.Router();

// Rota para buscar uma frase motivacional aleatória
router.get('/random-motivational', sentenceController.getRandomMotivational);

// Rota para buscar uma frase motivacional baseada no loginStreak
router.get('/login-count-message', sentenceController.getLoginCountMessage);

module.exports = router;
