var productModel = require('./app/Model/ProductModel');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('port', process.env.PORT || 3001);

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

//Trả về đường 1 sản phẩm
app.get('/api/product/:product_id/:key',
    function (req, res) {
        productModel.getProduct(req, res);
    }
);

//Trả về tất cả sản phẩm
app.get('/api/products/:key',
    function (req, res) {
        productModel.getProducts(req, res);
    }
);

app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});
module.exports = app;