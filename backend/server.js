const express = require('express');
const cors = require('cors');
const foodRoutes = require('./routes/foodRoutes');  
const userRoutes = require('./routes/userRoutes');  
const mealRoutes = require('./routes/mealRoutes');
const sentenceRoutes = require('./routes/sentenceRoutes');
const nutrientRouter = require('./routes/nutrientRouter');
const path = require('path');

const app = express();
const PORT = 3301;

app.use(cors());
app.use(express.json());

// Definindo rotas
app.use('/api/food', foodRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/meals', mealRoutes);
app.use('/api/sentences', sentenceRoutes);
app.use('/api', nutrientRouter);


// Servindo os arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../front-end/build')));

// Rota de fallback para qualquer outra requisição não tratada especificamente acima
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
