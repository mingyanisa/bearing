var mysql = require('mysql');
module.exports = function (sqlQuery) {
    return {
        findByEmail: (email) => sqlQuery(mysql.format('SELECT * FROM users WHERE email = ?', [email])),
        addUser: (email, password) => sqlQuery(mysql.format('INSERT INTO users (email, password, type) VALUES (?,?,"user")', [email, password])),
    }
}