import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginPage.css';  // Reutilizando o CSS para consistência
import { downloadMealsCsv } from '../services/mealService';

function DownloadMeals() {
  const navigate = useNavigate();

  const handleBack = () => {
      navigate('/foodappmain');
  };

  const handleDownload = () => {
      downloadMealsCsv().catch(error => {
          console.error('Failed to download meals:', error);
      });
  };

  return (
      <div className="login-container">
          <img src="/images/curitiba-logo.png" alt="Curitiba Logo" className="logo"/>
          <h1>Baixar cardápios da semana</h1>
          <button onClick={handleDownload}>Baixar CSV</button>
          <button onClick={handleBack}>Voltar ao Menu Anterior</button>
      </div>
  );
}

export default DownloadMeals;
