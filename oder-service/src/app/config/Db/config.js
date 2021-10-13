var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    port:3308,
    user: "root",
    password: "CANsa123***",
    database: 'order_bill'
});
dbConn.connect();

module.exports = dbConn;