const express = require('express');
const nutrientController = require('../controllers/nutrientController');


const router = express.Router();

router.get('/nutrientes', nutrientController.getNutrients);

module.exports = router;
