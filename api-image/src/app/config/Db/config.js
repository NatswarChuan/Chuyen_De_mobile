var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'image'
});
dbConn.connect();

module.exports = dbConn;