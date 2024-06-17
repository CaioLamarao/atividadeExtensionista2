const express = require('express');
const cors = require('cors');
const foodRoutes = require('./routes/foodRoutes');  // Caminho para as rotas de alimentos
const userRoutes = require('./routes/userRoutes');  // Caminho para as rotas de usuários
const path = require('path');

const app = express();
const PORT = 3301;

app.use(cors());
app.use(express.json());

// Definindo rotas para alimentos e usuários
app.use('/api/food', foodRoutes);
app.use('/api/user', userRoutes);  // Certifique-se de que esta rota está correta e implementada

// Servindo os arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Rota de fallback para qualquer outra requisição não tratada especificamente acima
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
