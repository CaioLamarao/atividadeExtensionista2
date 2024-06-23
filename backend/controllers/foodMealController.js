exports.getMealFoods = async (req, res) => {
    const { mealId } = req.params;
    try {
        const mealFoods = await db.query(
            `SELECT * FROM relmealfoods WHERE meal_id = ?`,
            [mealId]
        );
        res.json(mealFoods);
    } catch (error) {
        console.error('Error fetching meal foods:', error);
        res.status(500).send({ message: "Database error", error });
    }
};
