var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'order_bill'
});
dbConn.connect();

module.exports = dbConn;