const db = require('../db');

const sentenceController = {

    // Método para buscar uma frase motivacional baseada no loginStreak
    getLoginCountMessage: async (req, res) => {
        const { loginStreak } = req.query; // Assume que loginStreak é passado como um parâmetro de query

        let sentenceId;
        if (loginStreak <= 1) {
            sentenceId = 14;
        } else if (loginStreak <= 10) {
            sentenceId = 13;
        } else {
            sentenceId = 15;
        }

        try {
            const [results] = await db.query("SELECT message FROM sentences WHERE id = ?", [sentenceId]);
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send({ message: "No motivational sentence found for the provided criteria." });
            }
        } catch (error) {
            console.error('Error retrieving motivational sentence:', error);
            res.status(500).send({ message: "Database error", error });
        }
    },



    // Método para buscar uma frase motivacional aleatória
    getRandomMotivational: async (req, res) => {
        try {
            const [results] = await db.query("SELECT message FROM sentences WHERE type = 'motivacional' ORDER BY RAND() LIMIT 1");
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send({ message: "No motivational sentences found" });
            }
        } catch (error) {
            console.error('Error retrieving motivational sentence:', error);
            res.status(500).send({ message: "Database error", error });
        }
    }
};

module.exports = sentenceController;
