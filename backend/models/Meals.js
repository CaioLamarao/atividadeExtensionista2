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
    allowNull: true // Se components pode ser nulo, configurado corretamente
  },
  preco_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true // Se preco_total pode ser nulo, configurado corretamente
  }
}, {
  tableName: 'meals', // Assegura que o modelo refira-se à tabela 'meals' no banco de dados
  timestamps: false // Opta por não usar os campos 'createdAt' e 'updatedAt' automáticos
});

module.exports = Meals;
