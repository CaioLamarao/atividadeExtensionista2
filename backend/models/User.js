const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define('User', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  cpf: DataTypes.STRING,
  endereco: DataTypes.STRING,
  password: DataTypes.STRING
});

module.exports = User;
