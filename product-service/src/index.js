require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var productRouter = require('./app/routers/Product');
var categoryRouter = require('./app/routers/Category');
var commentRouter = require('./app/routers/Comment');
app.set('port', process.env.PORT || 3001);

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.use('/api/product',productRouter);

app.use('/api/category',categoryRouter);

app.use('/api/comment',commentRouter);

app.listen(3001, function () {
    console.log('Product service port 3001');
});

module.exports = app;