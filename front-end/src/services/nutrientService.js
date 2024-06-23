const API_BASE_URL = 'http://localhost:3301/api/nutrientes';

export const fetchUserNutrients = async (age, sexo) => {
    try {
        const response = await fetch(`${API_BASE_URL}?age=${age}&sexo=${sexo}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Failed to fetch user nutrients:', error);
        throw error; // Propagando o erro para ser tratado por quem chama a função
    }
};
