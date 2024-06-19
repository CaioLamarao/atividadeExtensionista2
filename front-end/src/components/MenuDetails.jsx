import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../MenuDetails.css';
import { fetchRandomMeal } from '../services/mealService';
import { searchFoodByName } from '../services/foodService';

function MenuDetails() {
  const [activeDetail, setActiveDetail] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [mealDetailsAlmoço, setMealDetailsAlmoço] = useState({ prato: '', components: '' });
  const [mealDetailsJantar, setMealDetailsJantar] = useState({ prato: '', components: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const day = location.state ? location.state.day : "Dia";

  const toggleDetails = (detail) => {
    setSidebarVisible(!sidebarVisible);
    setActiveDetail(activeDetail === detail ? '' : detail);
  };

  useEffect(() => {
    fetchRandomMeal().then(result => {
      setMealDetailsAlmoço(result);
    }).catch(error => {
      console.error('Failed to fetch meal details for lunch:', error);
    });
    fetchRandomMeal().then(result => {
      setMealDetailsJantar(result);
    }).catch(error => {
      console.error('Failed to fetch meal details for dinner:', error);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setAlertMessage('');
  };

  const handleSearch = async () => {
    if (searchQuery.length > 0) {
      try {
        const data = await searchFoodByName(searchQuery);
        if (data.length === 0) {
          setAlertMessage('Alimento não encontrado');
          setSearchResults([]);
        } else {
          setSearchResults(data.slice(0, 3));
          setSearchQuery('');
        }
      } catch (error) {
        console.error('Search failed:', error);
        setAlertMessage('Search failed');
      }
    }
  };

  const removeItem = id => {
    setSearchResults(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="menu-details-container">
      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        {sidebarVisible && (
          <>
            <img src="/images/curitiba-logo.png" alt="Curitiba Logo" className="logo"/>
            <button onClick={() => navigate(-1)} className="back-button">🔙</button>
            <input type="text" placeholder="Pesquisar..." className="search-input" value={searchQuery} onChange={handleSearchChange} />
            <button onClick={handleSearch} className="search-button">Adicionar</button>
            {alertMessage && <div className="alert">{alertMessage}</div>}
            <div className="search-results">
              {searchResults.map(item => (
                <div key={item.id}>
                  {item.nome} <button onClick={() => removeItem(item.id)} className="remove-button">X</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="content">
        <h2 className="menu-title">Cardápio de {day}</h2>
       <h3>Almoço:</h3>
        <p>Cardápio: {mealDetailsAlmoço.prato}</p>
        <p>Ingredientes: {mealDetailsAlmoço.components}</p>
        <h3>Jantar:</h3>
        <p>Cardápio: {mealDetailsJantar.prato}</p>
        <p>Ingredientes: {mealDetailsJantar.components}</p>
        <div className="info-section">
          <ul>
            <li onClick={() => toggleDetails('doubts')}>
              <span className="icon" aria-hidden="true">❓</span>  Dúvidas com o preparo?
{activeDetail === 'doubts' && (
  <p>
    Confira mais em:   
    <a href={`https://www.google.com/search?q=${encodeURIComponent(mealDetailsAlmoço.prato)}`}
       target="_blank"
       rel="noopener noreferrer">
      {' '} Pesquisa sobre {mealDetailsAlmoço.prato}
    </a>
  </p>
)}
            </li>
            <li onClick={() => toggleDetails('substitutes')}>
              <span className="icon" aria-hidden="true">🔄</span> Alimentos substitutos.
              {activeDetail === 'substitutes' && <p>Opções para substituir...</p>}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default MenuDetails;
