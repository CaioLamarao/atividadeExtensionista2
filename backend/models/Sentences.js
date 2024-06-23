const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Sentence = sequelize.define('Sentence', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING(455),
    allowNull: false
  },
  message: {
    type: DataTypes.STRING(455),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'sentences',
  timestamps: true,
  paranoid: true 
});

module.exports = Sentence;
