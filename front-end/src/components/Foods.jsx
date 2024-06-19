import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Foods() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/food')
      .then(response => setFoods(response.data))
      .catch(error => console.error('Error fetching foods', error));
  }, []);

  return (
    <div>
      <h1>Foods Available</h1>
      <ul>
        {foods.map(food => <li key={food.id}>{food.nome} - ${food.preco}</li>)}
      </ul>
    </div>
  );
}

export default Foods;
