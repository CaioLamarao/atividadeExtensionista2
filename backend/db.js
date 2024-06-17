const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'caioclock',
    database: 'foodapp'
});

module.exports = db.promise();  // Para usar promises com mysql2
