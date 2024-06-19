import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginPage.css';  // Reutilizando o CSS para consistência

function DownloadMeals() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/foodappmain');  // Retorna à página principal
  };

  
  return (
    <div className="login-container">
      <img src="/images/curitiba-logo.png" alt="Curitiba Logo" className="logo"/>
      <h1>Baixar cardápios</h1>
      <div>
        <img src="/images/Download-icon.png" alt="Download Icon" style={{ width: '50px', height: '50px' }}/>
        <button onClick={handleBack}>Voltar</button>
      </div>
    </div>
  );
}

export default DownloadMeals;
