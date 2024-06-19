const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');
const Meals = require('./Meals');
const Food = require('./Food');

const RelMealFood = sequelize.define('RelMealFood', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  meal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Meals', // Este deve ser o nome da tabela
      key: 'id'
    }
  },
  food_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Food', // Este deve ser o nome da tabela
      key: 'id'
    }
  }
}, {
  timestamps: true // Para garantir que createdAt e updatedAt sejam gerados
});

module.exports = RelMealFood;
