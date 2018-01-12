var mysql = require('mysql');
var db = require('../config/db')

var connection = mysql.createConnection(db);
var sqlQuery = sqlStatement => {
  return new Promise((resolve,reject)=>{
      connection.query(sqlStatement,(error,results,fields)=>{
        if (error) reject(error);
        resolve(results);
      });
    })
}
var resetTable = ()=>{
    sqlQuery('DROP TABLE users');//reset table
}

var initSqlTable = () => {
    sqlQuery('CREATE TABLE IF NOT EXISTS users (' +
    'id int NOT NULL AUTO_INCREMENT,' + 
    'email varchar(255) NOT NULL,'+
    'password varchar(255) NOT NULL,'+
    'first_name varchar(255),'+
    'last_name varchar(255),'+
    'PRIMARY KEY (id))');
}

module.exports = {
    user: require('./user')(sqlQuery),
    initSqlTable: initSqlTable,
    resetTable: resetTable
}
