var productModel = require('./app/Model/ProductModel');
var categoryModel = require('./app/Model/CategoryModel');
var express = require('express');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.set('port', process.env.PORT || 3001);

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

//Trả về đường 1 sản phẩm
app.get('/api/product/:product_id/:option/:key',
    function (req, res) {
        productModel.getProduct(req, res);
    }
);

//Trả về tất cả sản phẩm
app.get('/api/products/:option/:key',
    function (req, res) {
        productModel.getProducts(req, res);
    }
);

//Trả về tất cả danh mục
app.get('/api/categories/:option/:key',
    function (req, res) {
        categoryModel.getCategories(req, res);
    }
);

//Trả về tất cả sản phẩm thuộc danh mục
app.get('/api/category/:category_id/:option/:key',
    function (req, res) {
        categoryModel.getCategory(req, res);
    }
);

//Trả về tất cả sản phẩm theo từ khóa tìm kiếm
app.get('/api/search/:key_search/:option/:key',
    function (req, res) {
        productModel.searchProducts(req, res);
    }
);

//Cập nhật lượt xem của sản phẩm và trả về sản phẩm
app.get('/api/view/update/:product_id/:option/:key',
    function (req, res) {
        productModel.updateView(req, res);
    }
);

app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});

module.exports = app;