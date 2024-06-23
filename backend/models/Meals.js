const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Meals = sequelize.define('Meals', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  prato: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  weekday: {
    type: DataTypes.ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    allowNull: false
  },
  components: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  preco_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  proteina: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  carboidrato: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  gorduras: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  fibra: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  calcio: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  ferro: {
    type: DataTypes.DOUBLE,
    allowNull: true
  }
}, {
  tableName: 'meals',
  timestamps: false
});

module.exports = Meals;
