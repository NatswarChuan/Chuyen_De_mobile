require('dotenv').config({ path: __dirname + '/../.env' });
var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var dbConn = require('./app/config/Db/config');
var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var accessRouter = require('./app/routers/Accesss');
app.set('port', process.env.PORT || 3005);

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.use('/api/access', accessRouter);

app.listen(3005, function () {
    console.log('Admin service port 3005');
    setInterval(function () {
        dbConn.query('SELECT version()', function (error, results, fields) {
            if (error) console.log('Admin service port error '+ error);
            console.log('Admin service port 3005');
        });
    }, 300000);
});

module.exports = app;