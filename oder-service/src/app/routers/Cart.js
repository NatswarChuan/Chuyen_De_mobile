const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * Thêm sản phẩm vào giỏ hàng
 */
router.get('/add/:product_id/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.product_id;
    if (key == process.env.KEY) {
        if (req.cookies.cart) {
            for (let index = 0; index < req.cookies.cart.length; index++) {
                if (req.cookies.cart[index].product_id == Number(id)) {
                    req.cookies.cart[index].qty++;
                    res.cookie('cart', req.cookies.cart, { secure: true, sameSite: 'none' });
                    return res.send({ status: "success", data: req.cookies.cart })
                }
            }
            let cart = req.cookies.cart;
            cart.push({ product_id: id, qty: 1 })
            res.cookie('cart', cart, { secure: true, sameSite: 'none' });
            return res.send({ status: "success", data: cart })
        } else {
            let cart_item = [{ product_id: id, qty: 1 }];
            res.cookie('cart', [{ product_id: id, qty: 1 }], { secure: true, sameSite: 'none' });
            return res.send({ status: "success", data: cart_item })
        }
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Lấy tất cả sản phẩm trong giỏ hàng
 */
router.get('/all/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        if (!req.cookies.cart) {
            return res.send({ status: "fail", message: 'không có giỏ hàng' });
        }
        else if (req.cookies.cart.length == 0) {
            return res.send({ status: "fail", message: 'không có giỏ hàng' });
        }
        else {
            let cart = req.cookies.cart;
            let total = 0;
            for (let i = 0; i < req.cookies.cart.length; i++) {
                axios.get(process.env.PRODUCT_URL + `/api/product/get/` + cart[i].product_id + `/` + 1 + `/` + req.params.key)
                    .then(res => {
                        const { data } = res.data;
                        cart[i].product = data;
                        delete cart[i]['product_id'];
                    })
                    .catch(error => {return res.send({ status: "fail",  message: error })})
                    .finally(() => {
                        total = total + (cart[i].qty * ((cart[i].product.product_price * (100 - cart[i].product.product_sale) / 100)));
                        if (i == req.cookies.cart.length - 1) {
                            cart.price = total;
                            let data = {
                                cart: cart,
                                sub_price: total,
                                ship: 20000,
                                total_price: total + 20000,
                            }
                            res.cookie('cart_price', total, { secure: true, sameSite: 'none' });
                            return res.send({ status: "success", data: data, message: 'tất cả thông tin sản phẩm' });
                        }
                    });
            }
        }

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * cập nhật giỏ hàng
 */
router.get('/update/:product_id/:qty/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.product_id;
    let qty = req.params.qty;
    let total = 0;
    if (key == process.env.KEY) {
        if (req.cookies.cart) {
            for (let index = 0; index < req.cookies.cart.length; index++) {
                if (req.cookies.cart[index].product_id == Number(id)) {
                    if (qty == 0) {
                        req.cookies.cart.splice(index, 1);
                    }
                    else {
                        req.cookies.cart[index].qty = qty;
                    }
                    res.cookie('cart', req.cookies.cart, { secure: true, sameSite: 'none' });
                }
            }
            if (req.cookies.cart.length > 0) {
                let cart = req.cookies.cart;
                for (let i = 0; i < req.cookies.cart.length; i++) {
                    axios.get(process.env.PRODUCT_URL + `/api/product/get/` + cart[i].product_id + `/` + 1 + `/` + req.params.key)
                        .then(res => {
                            const { data } = res.data;
                            cart[i].product = data;
                            delete cart[i]['product_id'];
                        })
                        .catch(error => {return res.send({ status: "fail",  message: error })})
                        .finally(() => {
                            total = total + (cart[i].qty * ((cart[i].product.product_price * (100 - cart[i].product.product_sale) / 100)));

                            if (i == req.cookies.cart.length - 1) {
                                cart.price = total;
                                let data = {
                                    cart: cart,
                                    sub_price: total,
                                    ship: 20000,
                                    total_price: total + 20000,
                                }
                                res.cookie('cart_price', total, { secure: true, sameSite: 'none' });
                                return res.send({ status: "success", data: data, message: 'tất cả thông tin sản phẩm' });
                            }
                        });
                }
            }
            else {
                res.cookie('cart_price', total, { secure: true, sameSite: 'none' });
                return res.send({ status: "success", data: null, message: 'tất cả thông tin sản phẩm' });
            }
        }
        else {
            return res.send({ status: "fail", message: 'không có giỏ hàng' })
        }

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;