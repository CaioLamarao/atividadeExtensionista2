const db = require('../db');

exports.login = (req, res) => {
    const { cpf, birthdate } = req.body;
    // Atualizar a query para buscar as colunas adicionais
    db.query('SELECT * FROM foodapp.user WHERE cpf = ? AND password = ?', [cpf, birthdate])
    .then(([results, fields]) => {
        if (results.length > 0) {
            const user = results[0];
            // Retornar todas as informações do usuário no login
            res.send({ 
              success: true, 
              message: "Login successful", 
              user: {
                name: user.nome,
                loginCount: user.login_count,
                loginStreak: user.login_streak,
                familyMembers: user.family_members,
                age: user.age,
                active: user.active,
                membersInfo: user.members_info
              }
            });
        } else {
            res.status(401).send({ success: false, message: "Dados incorretos" });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Database error", error: err });
    });
};
