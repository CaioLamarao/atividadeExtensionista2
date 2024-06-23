const { sequelize } = require('../db');
const User = require('./User');
const Food = require('./Food');
const Meals = require('./Meals');
const RelMealFood = require('./RelMealFood');


Meals.hasMany(RelMealFood, { foreignKey: 'meal_id' });
RelMealFood.belongsTo(Meals, { foreignKey: 'meal_id' });

Food.hasMany(RelMealFood, { foreignKey: 'food_id' });
RelMealFood.belongsTo(Food, { foreignKey: 'food_id' });

module.exports = {
  sequelize,
  User,
  Food,
  Meals,
  RelMealFood,
  Sentences,
  Nutrient
};
