const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');
const Meals = require('./Meals');
const Food = require('./Food');

const RelMealFood = sequelize.define('RelMealFood', {
  meal_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Meals,
      key: 'id'
    }
  },
  food_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Food,
      key: 'id'
    }
  }
});

module.exports = RelMealFood;
