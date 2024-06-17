const db = require('../db');

exports.searchFoodByName = async (req, res) => {
    const { name } = req.query;
    const sql = `SELECT * FROM food WHERE nome LIKE ?`;
    try {
        const [results, fields] = await db.query(sql, [`%${name}%`]);
        res.json(results);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).send({ message: "Database error", error });
    }
};

exports.addFood = async (req, res) => {
    const { nome, preco, kcal, nutricional } = req.body;
    const sql = `INSERT INTO food (nome, preco, kcal, nutricional) VALUES (?, ?, ?, ?)`;
    try {
        const [result] = await db.query(sql, [nome, preco, kcal, nutricional]);
        res.status(201).send({ message: "Food added successfully", foodId: result.insertId });
    } catch (error) {
        console.error('Add error:', error);
        res.status(400).send({ message: "Error adding food", error });
    }
};

exports.updateFood = async (req, res) => {
    const { id } = req.params;
    const { nome, preco, kcal, nutricional } = req.body;
    const sql = `UPDATE food SET nome = ?, preco = ?, kcal = ?, nutricional = ? WHERE id = ?`;
    try {
        const [result] = await db.query(sql, [nome, preco, kcal, nutricional, id]);
        if (result.affectedRows > 0) {
            res.send({ message: "Food updated successfully" });
        } else {
            res.status(404).send({ message: "Food not found" });
        }
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).send({ message: "Error updating food", error });
    }
};

exports.deleteFood = async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM food WHERE id = ?`;
    try {
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) {
            res.send({ message: "Food deleted successfully" });
        } else {
            res.status(404).send({ message: "Food not found" });
        }
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).send({ message: "Error deleting food", error });
    }
};
