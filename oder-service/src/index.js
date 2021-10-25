require('dotenv').config({ path: __dirname + '/../.env' });
var express = require('express');
var dbConn = require('./app/config/Db/config');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var oderRouter = require('./app/routers/Order');
var cartRouter = require('./app/routers/Cart');

app.set('port', process.env.PORT);

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.use('/api/oder', oderRouter);
app.use('/api/cart', cartRouter);

app.listen(3004, function () {
    console.log('Oder service port 3004');
    setInterval(function () {
        dbConn.query('SELECT version()', function (error, results, fields) {
            if (error) throw error;
            console.log('Oder service port 3004');
        });
    }, 300000);
});

module.exports = app;