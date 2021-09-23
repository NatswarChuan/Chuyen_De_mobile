var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shop'
});
dbConn.connect();

module.exports = dbConn;