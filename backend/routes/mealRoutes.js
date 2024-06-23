// backend\routes\mealRoutes.js
const express = require('express');
const mealsController = require('../controllers/mealsController');
const router = express.Router();

router.get('/random', mealsController.getTwoRandomMeals); 
router.get('/download', mealsController.downloadAllMeals);

module.exports = router;
