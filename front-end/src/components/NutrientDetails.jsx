import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para navegação
import { fetchUserNutrients } from '../services/nutrientService';
import '../css/NutrientDetails.css';

function NutrientDetails() {
  const navigate = useNavigate(); // Inicializa useNavigate
  const age = parseInt(localStorage.getItem('age'), 10);
  const sexo = localStorage.getItem('sexo');
  const [userNutrients, setUserNutrients] = useState(null);

  useEffect(() => {
    fetchUserNutrients(age, sexo).then(data => {
      setUserNutrients(data);
    }).catch(error => {
      console.error('Failed to fetch user nutrients:', error);
    });
  }, [age, sexo]);

  const handleBackClick = () => {
    navigate('/menu-details'); // Navega para o menu anterior
  };

  return (
    <div className="nutrient-details-container">
      <img src="/images/curitiba-logo.png" alt="Curitiba Logo" className="logo" />
      <h1>Tabela Nutricional Padrão</h1>
      <h2>Informações baseadas em uma pessoa do sexo {sexo} com {age} anos de idade</h2>
      {userNutrients ? (
        <table className="nutrition-table">
          <thead>
            <tr>
              <th>Componente</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Proteínas</td>
              <td>{userNutrients.proteina}g</td>
            </tr>
            <tr>
              <td>Carboidratos</td>
              <td>{userNutrients.carboidratos}g</td>
            </tr>
            <tr>
              <td>Gorduras</td>
              <td>{userNutrients.gorduras}</td>
            </tr>
            <tr>
              <td>Fibras</td>
              <td>{userNutrients.fibra}g</td>
            </tr>
            <tr>
              <td>Cálcio</td>
              <td>{userNutrients.calcio}mg</td>
            </tr>
            <tr>
              <td>Ferro</td>
              <td>{userNutrients.ferro}mg</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Carregando dados nutricionais...</p>
      )}
      <button onClick={handleBackClick} className="back-button">Voltar ao menu anterior</button>
    </div>
  );
}

export default NutrientDetails;
