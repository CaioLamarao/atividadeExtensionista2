const express = require('express');
const cors = require('cors');
const foodRoutes = require('./routes/foodRoutes');  // Caminho para as rotas de alimentos
const userRoutes = require('./routes/userRoutes');  // Caminho para as rotas de usuários
const mealRoutes = require('./routes/mealRoutes'); // Caminho para as rotas de refeições
const path = require('path');

const app = express();
const PORT = 3301;

app.use(cors());
app.use(express.json());

// Definindo rotas para alimentos, usuários e refeições
app.use('/api/food', foodRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/meals', mealRoutes);

// Servindo os arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../front-end/build')));

// Rota de fallback para qualquer outra requisição não tratada especificamente acima
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
