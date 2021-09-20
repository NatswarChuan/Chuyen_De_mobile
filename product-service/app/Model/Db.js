var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'product'
});
dbConn.connect();

module.exports = dbConn;