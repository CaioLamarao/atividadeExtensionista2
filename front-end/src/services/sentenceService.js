const API_BASE_URL = 'http://localhost:3301/api/sentences';

export const fetchRandomMotivationalSentence = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/random-motivational`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Failed to fetch random motivational sentence:', error);
        throw error;
    }
};

export const fetchLoginCountMotivationalSentence = async (loginStreak) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login-count-message?loginStreak=${loginStreak}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Failed to fetch login count motivational sentence:', error);
        throw error;
    }
};
