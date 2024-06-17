const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Food = sequelize.define('Food', {
  nome: DataTypes.STRING,
  preco: DataTypes.DECIMAL,
  kcal: DataTypes.INTEGER,
  tabela_nutricional: DataTypes.JSON
});

module.exports = Food;
