require('dotenv').config();
var express = require('express');
const cookieParser = require('cookie-parser')
var app = express();
app.use(cookieParser());
var productRouter = require('./app/routers/Product');
var categoryRouter = require('./app/routers/Category');
app.set('port', process.env.PORT || 3001);

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.use('/api/product',productRouter);

app.use('/api/category',categoryRouter);

app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});

module.exports = app;