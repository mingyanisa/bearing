var sql = require('mysql');
var config = require('../config/db');

var connection = sql.createConnection(config);

var sqlQuery = queryStatement => new Promise((reslove, reject) => {
    connection.query(queryStatement, (error, results, fields) => {
        if (error) {
            reject(error);
        }
        reslove(results, fields);
    });
});

module.exports = {
    listAllUser: sqlQuery('SELECT * FROM allUser')
};