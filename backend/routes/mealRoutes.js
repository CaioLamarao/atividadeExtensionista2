// backend\routes\mealRoutes.js
const express = require('express');
const mealsController = require('../controllers/mealsController');
const router = express.Router();

router.get('/random', mealsController.getRandomMeal);  // Certifique-se de que esta rota está definida

module.exports = router;
