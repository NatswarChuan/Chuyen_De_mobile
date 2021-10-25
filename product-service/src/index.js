require('dotenv').config({ path: __dirname + '/../.env' });
var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var dbConn = require('./app/config/Db/config');
var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var productRouter = require('./app/routers/Product');
var categoryRouter = require('./app/routers/Category');
var commentRouter = require('./app/routers/Comment');
var complaintRouter = require('./app/routers/Complaint');

app.set('port', process.env.PORT);

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.use('/api/product', productRouter);

app.use('/api/category', categoryRouter);

app.use('/api/comment', commentRouter);

app.use('/api/complaint', complaintRouter);

app.listen(3001, function () {
    console.log('Product service port ' + process.env.PORT);
    setInterval(function () {
        dbConn.query('SELECT version()', function (error, results, fields) {
            if (error) throw error;
            console.log('Product service port ' + process.env.PORT);
        });
    }, 300000);
});

module.exports = app;