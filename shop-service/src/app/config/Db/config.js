var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: "root",
    password: "CANsa123***",
    database: 'shop'
});
dbConn.connect();

module.exports = dbConn;