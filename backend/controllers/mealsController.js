const db = require('../db');

exports.getAllMeals = async (req, res) => {
    try {
        const [meals] = await db.query("SELECT * FROM meals");
        res.json(meals);
    } catch (error) {
        console.error('Error retrieving meals:', error);
        res.status(500).send({ message: "Database error", error });
    }
};

exports.getMealById = async (req, res) => {
    try {
        const [meal] = await db.query("SELECT * FROM meals WHERE id = ?", [req.params.id]);
        if (meal.length > 0) {
            res.json(meal[0]);
        } else {
            res.status(404).send({ message: "Meal not found" });
        }
    } catch (error) {
        console.error('Error retrieving meal:', error);
        res.status(500).send({ message: "Database error", error });
    }
};

exports.getRandomMeal = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM meals ORDER BY RAND() LIMIT 1");
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send({ message: "Meal not found" });
        }
    } catch (error) {
        console.error('Error retrieving random meal:', error);
        res.status(500).send({ message: "Database error", error });
    }
};

exports.createMeal = async (req, res) => {
    const { prato, weekday, components, preco_total } = req.body;
    try {
        const [result] = await db.query("INSERT INTO meals (prato, weekday, components, preco_total) VALUES (?, ?, ?, ?)", [prato, weekday, components, preco_total]);
        res.status(201).send({ message: "Meal added successfully", mealId: result.insertId });
    } catch (error) {
        console.error('Error adding meal:', error);
        res.status(400).send({ message: "Error creating meal", error });
    }
};

exports.updateMeal = async (req, res) => {
    const { id } = req.params;
    const { prato, weekday, components, preco_total } = req.body;
    try {
        const [result] = await db.query("UPDATE meals SET prato = ?, weekday = ?, components = ?, preco_total = ? WHERE id = ?", [prato, weekday, components, preco_total, id]);
        if (result.affectedRows > 0) {
            res.send({ message: "Meal updated successfully" });
        } else {
            res.status(404).send({ message: "Meal not found" });
        }
    } catch (error) {
        console.error('Error updating meal:', error);
        res.status(500).send({ message: "Database error", error });
    }
};

exports.deleteMeal = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("DELETE FROM meals WHERE id = ?", [id]);
        if (result.affectedRows > 0) {
            res.send({ message: "Meal deleted successfully" });
        } else {
            res.status(404).send({ message: "Meal not found" });
        }
    } catch (error) {
        console.error('Error deleting meal:', error);
        res.status(500).send({ message: "Database error", error });
    }
};
