var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3307,
    password: 'CANsa123***',
    database: 'product'
});
dbConn.connect();

module.exports = dbConn;