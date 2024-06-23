import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DownloadMeal.css';

function DownloadMeals() {
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:3301/api/meals/download');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'meals.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download CSV:', error);
    }
  };

  const handleBack = () => {
    navigate('/foodappmain');
  };

  return (
    <div className="download-container">
      <img src="/images/curitiba-logo.png" alt="Curitiba Logo" className="logo" />
      <h1>Baixar cardápios da semana</h1>
      <button onClick={handleDownload}>Baixar CSV</button>
      <button onClick={handleBack}>Voltar ao Menu Anterior</button>
    </div>
  );
}

export default DownloadMeals;
