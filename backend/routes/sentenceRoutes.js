const express = require('express');
const sentenceController = require('../controllers/sentenceController');
const router = express.Router();

router.get('/random-motivational', sentenceController.getRandomMotivational);

router.get('/login-count-message', sentenceController.getLoginCountMessage);

module.exports = router;
