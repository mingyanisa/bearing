var mysql = require('mysql');
var db = require('../config/db')

var connection = mysql.createConnection(db);

var sqlQuery = queryStatement => new Promise((reslove, reject) => {
    connection.query(queryStatement, (error, results, fields) => {
        if (error) {
            reject(error);
        }
        reslove(results, fields);
    });
});

var initDatabase = function () {
    sqlQuery('CREATE TABLE IF NOT EXISTS users (' +
                'id int NOT NULL AUTO_INCREMENT,' + 
                'email varchar(255) NOT NULL,'+
                'password varchar(255) NOT NULL,'+
                'first_name varchar(255),'+
                'last_name varchar(255),'+
                'type varchar (255) DEFAULT "user",'+
                'PRIMARY KEY (id) )');
}

var clearAllDatabase = function(){
    sqlQuery('DROP TABLE users');
}

module.exports = {
    user: require('./user')(sqlQuery),
    initDatabase: initDatabase,
    clearAllDatabase: clearAllDatabase
}