const db = require('../db');

const nutrientController = {
    getNutrients: async (req, res) => {
        const { age, sexo } = req.query;

        try {
            const [results] = await db.query(
                `SELECT * FROM nutrientes WHERE ? BETWEEN idade_min AND idade_max AND sexo = ? LIMIT 1`,
                [age, sexo]
            );
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send({ message: "No nutritional information found for the provided criteria" });
            }
        } catch (error) {
            console.error('Error retrieving nutritional information', error);
            res.status(500).send({ message: "Database error", error });
        }
    }
};

module.exports = nutrientController;
