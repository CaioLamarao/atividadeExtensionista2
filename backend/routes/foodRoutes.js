const express = require('express');
const foodController = require('../controllers/foodController');
const router = express.Router();

router.get('/search', foodController.searchFoodByName);

module.exports = router;
