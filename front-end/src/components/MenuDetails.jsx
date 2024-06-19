import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../MenuDetails.css';

function MenuDetails() {
  const [activeDetail, setActiveDetail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDetails = (detail) => {
    setActiveDetail(activeDetail === detail ? '' : detail);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setAlertMessage(''); // Reset alert message on new input
  };

  const handleSearch = async () => {
    if (searchQuery.length > 0) {
      try {
        const response = await fetch(`http://localhost:3301/api/food/search?name=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        if (data.length === 0) {
          setAlertMessage('Alimento não encontrado');
          setSearchResults([]);
        } else {
          setSearchResults(data.slice(0, 3)); // Limit results to 3 items
          setSearchQuery(''); // Clear the search field
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

  const day = location.state ? location.state.day : "Dia";

  return (
    <div className="menu-details-container">
      <div className="sidebar">
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
      </div>
      <div className="content">
        <h2 className="menu-title">Cardápio de {day}</h2>
        <h3>Almoço:</h3>
        <p>Lorem Ipsum...</p>
        <h3>Jantar:</h3>
        <p>Lorem Ipsum...</p>
        <div className="info-section">
          <ul>
            <li onClick={() => toggleDetails('doubts')}>
              <span className="icon" aria-hidden="true">❓</span> Dúvidas com o preparo?
              {activeDetail === 'doubts' && <p>Detalhes sobre como preparar...</p>}
            </li>
            <li onClick={() => toggleDetails('substitutes')}>
              <span className="icon" aria-hidden="true">🔄</span> Alimentos substitutivos.
              {activeDetail === 'substitutes' && <p>Opções para substituir...</p>}
            </li>
            <li onClick={() => toggleDetails('shoppingList')}>
              <span className="icon" aria-hidden="true">🛒</span> Lista de compras.
              {activeDetail === 'shoppingList' && <p>O que comprar para preparar...</p>}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuDetails;
