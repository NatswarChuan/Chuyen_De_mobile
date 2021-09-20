
var imageModel = require('./app/Model/ImageModel');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

//Trả về đường link lưu hình ảnh
app.get('/api/image/:image_id/:key',
    function (req, res) {
        imageModel.getImage(req, res);
    }
);

app.listen(3002, function () {
    console.log('Node app is running on port 3000');
});
module.exports = app;
