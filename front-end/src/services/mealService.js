// front-end\src\services\mealService.js
const API_BASE_URL = 'http://localhost:3301/api';

export const fetchTwoRandomMeals = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/meals/random`);
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
  } catch (error) {
    console.error('Failed to fetch two random meals:', error);
    throw error;
  }
};

export const downloadMealsCsv = async () => {
  const response = await fetch('http://localhost:3301/api/meals/download');
  if (!response.ok) throw new Error('Network response was not ok.');

  // Trigger download
  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', 'meals.csv'); // any other attributes as needed
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};