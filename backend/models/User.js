const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  login_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  login_streak: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  family_members: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  age: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  active: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  members_info: {
    type: DataTypes.STRING(455),
    allowNull: true
  }
}, {
  tableName: 'user',
  timestamps: true
});

module.exports = User;
