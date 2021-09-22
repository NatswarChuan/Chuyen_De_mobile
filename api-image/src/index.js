require('dotenv').config();
var express = require('express');
var app = express();
var imageRouter = require('./app/routers/Image');
var sliderRouter = require('./app/routers/Slider');
app.set('port', process.env.PORT || 3002);
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

//Trả về đường link lưu hình ảnh
// app.get('/api/image/:image_id/:key',
//     function (req, res) {
//         imageModel.getImage(req, res);
//     }
// );

app.use('/api/image',imageRouter);

app.use('/api/slider',sliderRouter);

app.listen(3002, function () {
    console.log('Image service is running on port 3002');
});
module.exports = app;
