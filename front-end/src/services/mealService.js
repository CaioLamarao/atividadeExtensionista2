// front-end\src\services\mealService.js
const API_BASE_URL = 'http://localhost:3301/api';

export const fetchRandomMeal = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/meals/random`);
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch meal details:', error);
    throw error;  // Esta linha vai lançar o erro que você está capturando no componente
  }
};
