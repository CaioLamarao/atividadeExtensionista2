import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FoodAppMain.css'; 
import { fetchRandomMotivationalSentence, fetchLoginCountMotivationalSentence } from '../services/sentenceService';



function FoodAppMain() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');  // Recupera o nome do usuário do localStorage
  const loginStreak = localStorage.getItem('loginStreak');  // Suponha que o loginStreak esteja armazenado no localStorage
  const [motivationalSentence, setMotivationalSentence] = useState('');
  const [loginSentence, setLoginCountMotivationalSentence] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Busca a frase motivacional aleatória
    fetchRandomMotivationalSentence().then(data => {
      setMotivationalSentence(data.message); 
    }).catch(error => {
      console.error('Error fetching motivational sentence:', error);
    });

    // Busca a frase motivacional com base na contagem de logins
    if (loginStreak) {
      fetchLoginCountMotivationalSentence(loginStreak).then(data => {
        setLoginCountMotivationalSentence(data.message);
      }).catch(error => {
        console.error('Error fetching login count motivational sentence:', error);
      });
    }
  }, [loginStreak]);  // Dependência no loginStreak para reagir a mudanças



  const handleDayClick = (day) => {
    navigate('/menu-details', { state: { day } });
  };

  const handleGenerateWeekMenus = () => {
    navigate('/download-meals');
  };

  const toggleUserInfoModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="app-container">
      <header className="app-header">
        <img src="/images/curitiba-logo.png" alt="Curitiba Logo" className="logo"/>
        <h1>Bem vindo! {userName || "Usuário"}</h1> 
        <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>"{motivationalSentence}"</p>
      </header>
      <button className="user-info-button" onClick={toggleUserInfoModal}>Informações de usuário</button>
      <div className="weekdays-container">
        <button className="day-button" onClick={() => handleDayClick('2ª Feira')}>2ª Feira</button>
        <button className="day-button" onClick={() => handleDayClick('3ª Feira')}>3ª Feira</button>
        <button className="day-button" onClick={() => handleDayClick('4ª Feira')}>4ª Feira</button>
        <button className="day-button" onClick={() => handleDayClick('5ª Feira')}>5ª Feira</button>
        <button className="day-button" onClick={() => handleDayClick('6ª Feira')}>6ª Feira</button>
        <button className="day-button" onClick={() => handleDayClick('Final de Semana')}>Final de Semana</button>
      </div>
      <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{loginSentence}</p>
      <button className="generate-button" onClick={handleGenerateWeekMenus}>Gerar cardápios da semana</button>
      {isModalOpen && <UserInfoModal onClose={toggleUserInfoModal} />}
    </div>
  );
}

function UserInfoModal({ onClose }) {
  // Parse JSON string to object
  const membersInfo = localStorage.getItem('membersInfo');
  let members = [];
  try {
    // Parse only if membersInfo is not null or undefined
    if (membersInfo) {
      const parsedInfo = JSON.parse(membersInfo);
      members = parsedInfo.members || [];
    }
  } catch (error) {
    console.error("Error parsing members info:", error);
    members = []; // Reset if parsing fails
  }

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}></button>
        <h2>Informações do Usuário</h2>
        <p><strong>Nome:</strong> {localStorage.getItem('userName')}</p>
        <p><strong>Logins:</strong> {localStorage.getItem('loginCount')}</p>
        <p><strong>Logins em sequência:</strong> {localStorage.getItem('loginStreak')}</p>
        <p><strong>Membros da Família:</strong> {localStorage.getItem('familyMembers')}</p>
        <p><strong>Idade:</strong> {localStorage.getItem('age')}</p>
        <p><strong>Ativo:</strong> {localStorage.getItem('active') === '1' ? 'Sim' : 'Não'}</p>
        <p><strong>Informações dos familiares:</strong></p>
        <ul>
          {members.map((member, index) => (
            <li key={index}>
              Membro {index + 1}: {Object.entries(member).map(([key, value]) => {
                // Assuming `value` is an object, iterate over its properties
                return `${Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', ')}`;
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default FoodAppMain;
