const API_BASE_URL = 'http://localhost:3301/api';

export const searchFoodByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/food/search?name=${encodeURIComponent(name)}`);
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};
