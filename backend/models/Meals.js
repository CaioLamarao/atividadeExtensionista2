const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Meals = sequelize.define('Meals', {
  weekday: DataTypes.STRING,
  components: DataTypes.TEXT,
  preco_total: DataTypes.DECIMAL
});

module.exports = Meals;
