import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../FoodAppMain.css';  // Certifique-se de criar e importar o arquivo CSS

function FoodAppMain() {
  
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');  // Recupera o nome do usuário do localStorage
  const handleDayClick = (day) => {
    navigate('/menu-details', { state: { day } });
  };

  const handleGenerateWeekMenus = () => {
    navigate('/download-meals');
  };
 
  
  return (
    <div className="app-container">
      <header className="app-header">
        <img src="/images/curitiba-logo.png" alt="Curitiba Logo" className="logo"/>
        <h1>Bem vindo! {userName || "Usuário"}</h1> 
      </header>
      <div className="search-box">
        <input type="text" placeholder="Que tipo de informação você busca?" />
      </div>
      <div className="weekdays-container">
        <button className="day-button" onClick={() => handleDayClick('2ª Feira')}>2ª Feira</button>
        <button className="day-button" onClick={() => handleDayClick('3ª Feira')}>3ª Feira</button>
        <button className="day-button" onClick={() => handleDayClick('4ª Feira')}>4ª Feira</button>
        <button className="day-button" onClick={() => handleDayClick('5ª Feira')}>5ª Feira</button>
        <button className="day-button" onClick={() => handleDayClick('6ª Feira')}>6ª Feira</button>
        <button className="day-button" onClick={() => handleDayClick('Final de Semana')}>Final de Semana</button>
      </div>
      <button className="generate-button" onClick={handleGenerateWeekMenus}>Gerar cardápios da semana</button>
    </div>
  );
}

export default FoodAppMain;
