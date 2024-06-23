const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { Readable } = require('stream');
const db = require('../db');


const csvStringifier = require('csv-writer').createObjectCsvStringifier({
    header: [
        { id: 'id', title: 'REF' },
        { id: 'prato', title: 'Cardápio' },
        { id: 'weekday', title: 'Dia da semana' },
        { id: 'components', title: 'Ingredientes' },
        { id: 'preco_total', title: 'Preço sugerido' }
    ]
});

const translateWeekday = (englishDay) => {
    const days = {
        'Sunday': 'Domingo',
        'Monday': 'Segunda-feira',
        'Tuesday': 'Terça-feira',
        'Wednesday': 'Quarta-feira',
        'Thursday': 'Quinta-feira',
        'Friday': 'Sexta-feira',
        'Saturday': 'Sábado'
    };
    return days[englishDay] || englishDay;
};

exports.downloadAllMeals = async (req, res) => {
    try {
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let allMeals = [];
        for (let day of weekdays) {
            const [results] = await db.query("SELECT * FROM meals WHERE weekday = ? ORDER BY RAND() LIMIT 2", [day]);
            allMeals = allMeals.concat(results.map(meal => ({
                ...meal,
                weekday: translateWeekday(meal.weekday)
            })));
        }

        const csvHeader = csvStringifier.getHeaderString();
        const csvRecords = csvStringifier.stringifyRecords(allMeals);
        const csvStream = Readable.from([csvHeader, csvRecords]);
        const tempFilePath = `temp_meals_${Date.now()}.csv`;

        await pipeline(csvStream, fs.createWriteStream(tempFilePath));

        res.download(tempFilePath, 'meals.csv', (err) => {
            if (err) {
                console.error('Download failed:', err);
            }
            fs.unlink(tempFilePath, (err) => {
                if (err) console.error('Error deleting temp file:', err);
            });
        });
    } catch (error) {
        console.error('Error retrieving and sending meals:', error);
        res.status(500).send({ message: "Database error", error });
    }
};

exports.getTwoRandomMeals = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM meals ORDER BY RAND() LIMIT 2");
        if (results.length === 2) {
            res.json({ almoço: results[0], jantar: results[1] });
        } else {
            res.status(404).send({ message: "Not enough meals found" });
        }
    } catch (error) {
        console.error('Error retrieving random meals:', error);
        res.status(500).send({ message: "Database error", error });
    }
};