const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Nutrient = sequelize.define('Nutrient', {
  grupo_etario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade_min: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idade_max: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.ENUM('Masculino', 'Feminino'),
    allowNull: false,
  },
  proteina: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  carboidratos: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  gorduras: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fibra: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  calcio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ferro: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'Nutrientes',
  timestamps: false,
});

module.exports = Nutrient;
