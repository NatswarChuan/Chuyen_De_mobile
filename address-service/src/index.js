require('dotenv').config({ path: __dirname + '/../.env' });
var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var mysql = require('mysql');
var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var addressRouter = require('./app/routers/Address');
app.set('port', process.env.PORT);

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.use('/api/address', addressRouter);

var dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
dbConn.connect();

app.listen(3006, function () {
    console.log('Address service port ' + process.env.PORT);
    setInterval(function () {
        dbConn.query('SELECT version()', function (error, results, fields) {
            if (error) console.log('error ' + error);;
            console.log('Address service port ' + process.env.PORT);
        });
    }, 300000);
});

module.exports = app;