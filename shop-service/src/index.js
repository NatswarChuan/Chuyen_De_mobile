require('dotenv').config({ path: __dirname + '/../.env' });
var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var dbConn = require('./app/config/Db/config');
var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var shopRouter = require('./app/routers/Shop');
app.set('port', process.env.PORT || 3003);

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.use('/api/shop', shopRouter);

app.listen(3003, function () {
    console.log('Shop service port 3003');
    setInterval(function () {
        dbConn.query('SELECT version()', function (error, results, fields) {
            if (error) throw error;
            console.log('Shop service port 3003');
        });
    }, 300000);
});

module.exports = app;