import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage'; // Certifique-se de que o caminho está correto
import Foods from './components/Foods'; // Este será um novo componente para a lista de alimentos
import PasswordResetPage from './components/PasswordResetPage'; // Este será um novo componente para a lista de alimentos
import FoodAppMain from './components/FoodAppMain';
import MenuDetails from './components/MenuDetails';
import DownloadMeals from './components/DownloadMeals';
import NutrientDetails from './components/NutrientDetails'; // Importe o novo componente




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/foods" element={<Foods />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="/foodappmain" element={<FoodAppMain />} />
        <Route path="/menu-details" element={<MenuDetails />} />
        <Route path="/download-meals" element={<DownloadMeals />} />
        <Route path="/nutrientes" element={<NutrientDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
