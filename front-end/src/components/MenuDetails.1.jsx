import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { fetchTwoRandomMeals } from '../services/mealService';

export function MenuDetails() {
  const [activeDetail, setActiveDetail] = useState(true);
  const members = parseInt(localStorage.getItem('familyMembers'), 10); // Ensure members is an integer
  const [mealDetailsAlmoço, setMealDetailsAlmoço] = useState({ prato: '', components: '', preco_total: 0, proteina: 0, carboidrato: 0, gorduras: 0, fibra: 0, calcio: 0, ferro: 0 });
  const [mealDetailsJantar, setMealDetailsJantar] = useState({ prato: '', components: '', preco_total: 0, proteina: 0, carboidrato: 0, gorduras: 0, fibra: 0, calcio: 0, ferro: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const day = location.state ? location.state.day : "Dia";

  useEffect(() => {
    fetchTwoRandomMeals().then(result => {
      setMealDetailsAlmoço(result.almoço);
      setMealDetailsJantar(result.jantar);
    }).catch(error => {
      console.error('Failed to fetch meal details:', error);
      setMealDetailsAlmoço({ prato: 'Erro ao carregar', components: 'Erro ao carregar' });
      setMealDetailsJantar({ prato: 'Erro ao carregar', components: 'Erro ao carregar' });
    });
  }, []);

  const toggleDetails = (detail) => {
    setActiveDetail(activeDetail === detail ? '' : detail);
  };

  const renderIngredientLinks = (ingredients) => {
    return ingredients.split(', ').map((ingredient, index) => (
      <li key={index}>
        <a href={`https://www.google.com/search?q=substituto+${encodeURIComponent(ingredient)}`}
          target="_blank"
          rel="noopener noreferrer">
          {ingredient}
        </a>
      </li>
    ));
  };

  const renderNutritionalInfoTable = (mealDetails) => {
    return (
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
            <td>{mealDetails.proteina}g</td>
          </tr>
          <tr>
            <td>Carboidratos</td>
            <td>{mealDetails.carboidrato}g</td>
          </tr>
          <tr>
            <td>Gorduras</td>
            <td>{mealDetails.gorduras}g</td>
          </tr>
          <tr>
            <td>Fibras</td>
            <td>{mealDetails.fibra}g</td>
          </tr>
          <tr>
            <td>Cálcio</td>
            <td>{mealDetails.calcio}mg</td>
          </tr>
          <tr>
            <td>Ferro</td>
            <td>{mealDetails.ferro}mg</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const calculateMealPrice = (mealDetails) => {
    return formatCurrency(mealDetails.preco_total * members);
  };

  return (
    <div className="menu-details-container">
      <div className={`sidebar`}>
        <img src="/images/curitiba-logo.png" alt="Curitiba Logo" className="logo" />
        <button onClick={() => navigate('/foodappmain')} className="back-button">Voltar ao menu anterior</button>
        <div className="info-section">
          <ul>
            <li onClick={() => toggleDetails('doubts')}>
              <span className="icon" aria-hidden="true">❓</span> <strong>Dúvidas com o preparo?</strong>
              {activeDetail === 'doubts' && (
                <p>
                  <strong>Confira mais em:</strong>
                  <p>                  </p>
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(mealDetailsAlmoço.prato)}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {' '}Pesquisa sobre {mealDetailsAlmoço.prato}
                  </a>
                  <p>                  </p>
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(mealDetailsJantar.prato)}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {' '}Pesquisa sobre {mealDetailsJantar.prato}
                  </a>
                </p>
              )}
            </li>
            <p></p>
            <li className={activeDetail === 'substitutes' ? 'active' : ''} onClick={() => toggleDetails('substitutes')}>
              <span className="icon">🔄</span><strong>Alimentos substitutos</strong>
              {activeDetail === 'substitutes' && (
                <ul>
                  <p></p>
                  {renderIngredientLinks(mealDetailsAlmoço.components)}
                  <p></p>
                  {renderIngredientLinks(mealDetailsJantar.components)}
                </ul>
              )}
            </li>
          </ul>
        </div>
        <Link to="/nutrientes" className="nutrient-link"> Ver sua Tabela Nutricional Ideal</Link>
      </div>
      <div className="content">
        <h1 className="menu-title">Cardápio de {day}</h1>
        <h3 className="menu-title">Cardápios para {members} pessoa(s)</h3>

        <br></br>
        <h3>Almoço:</h3>
        <h><strong>Cardápio:</strong> {mealDetailsAlmoço.prato}</h>
        <p><strong>Ingredientes:</strong> {mealDetailsAlmoço.components}</p>
        <p><strong>Valor aproximado:</strong> {calculateMealPrice(mealDetailsAlmoço)}</p>
        {renderNutritionalInfoTable(mealDetailsAlmoço)}
        <br></br>
        <h3>Jantar:</h3>
        <h><strong>Cardápio:</strong> {mealDetailsJantar.prato}</h>
        <p><strong>Ingredientes:</strong> {mealDetailsJantar.components}</p>
        <p><strong>Valor aproximado:</strong> {calculateMealPrice(mealDetailsJantar)}</p>
        {renderNutritionalInfoTable(mealDetailsJantar)}
      </div>
    </div>
  );
}
