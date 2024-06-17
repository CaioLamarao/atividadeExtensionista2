const db = require('../db');

exports.login = (req, res) => {
    const { cpf, birthdate } = req.body;
    db.query('SELECT cpf, password, nome FROM foodapp.user WHERE cpf = ? AND password = ?', [cpf, birthdate])
    .then(([results, fields]) => {
        if (results.length > 0) {
            res.send({ success: true, message: "Login successful", user: { name: results[0].nome } });
        } else {
            res.status(401).send({ success: false, message: "Dados incorretos" });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Database error", error: err });
    });
};
