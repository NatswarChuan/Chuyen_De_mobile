require('dotenv').config({ path: __dirname + '/../.env' });
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var imageRouter = require('./app/routers/Image');
var sliderRouter = require('./app/routers/Slider');
var dbConn = require('./app/config/Db/config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3002);
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.use('/api/image', imageRouter);

app.use('/api/slider', sliderRouter);


app.listen(3002, function () {
    console.log('Image service is running on port 3002');
    setInterval(function () {
        dbConn.query('SELECT version()', function (error, results, fields) {
            if (error) throw error;
            console.log('Image service is running on port 3002');
        });
    }, 300000);
});
module.exports = app;
