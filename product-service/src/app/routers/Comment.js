const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

router.get('/all/:product_id/:key', async (req, res) => {
    let id = req.params.product_id;
    let key = req.params.key;
    if (key == process.env.KEY) {

        dbConn.query('SELECT * FROM `comment` WHERE `product_id` = ?', id, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có bình luận của sản phẩm có id=' + id });
            }
            else {
                let i = 0;
                results.map(comment => {
                    /**
                    * giả lập lấy thông tin user
                    * thay thế bằng dùng API để lấy
                    */
                    var mysql = require('mysql');
                    var dbConn_user = mysql.createConnection({
                        host: 'localhost',
                        user: 'root',
                        password: '',
                        database: 'user'
                    });
                    dbConn_user.connect();

                    const sql = 'SELECT `user_name`,`user_avatar` FROM `user` WHERE `user_id` = ?';

                    let user = null;
                    user_id = comment.user_id;
                    dbConn_user.query(sql, user_id, function (error, result, fields) {
                        if (error) throw error;
                        if (!(result == null || results.length === 0)) {
                            user = result[0];
                        }

                        /**
                         * đoạn này thay user_id thành thông tin user
                         */
                        // gọi API image lấy đường dẫn Avatar
                        axios.get(process.env.IMG_URL + `/api/image/` + user.user_avatar + `/` + req.params.key)
                            .then(res => {
                                const { data } = res.data;
                                user.user_avatar = data;
                            })
                            .catch(error => console.log(error))
                            .finally(() => {
                                delete comment["user_id"];
                                comment.user = user;
                                i++;
                                if (i === results.length) {
                                    return res.send({ status: "success", data: results, message: 'comment của sản phẩm có id=' + id });
                                }
                            });
                    });

                    /**
                     * kết thúc giả lập
                     */


                })

            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

router.post('/insert/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        console.log(req.body)
        let userId = req.body.user_id;
        let comment_content = req.body.comment_content;
        let product_id = req.body.product_id;
        let comment_rating = req.body.comment_rating;

        dbConn.query('INSERT INTO `comment`( `user_id`, `comment_rating`, `comment_content`, `product_id`) VALUES (?, ?, ?, ?)',
            [userId, comment_rating, comment_content, product_id], function (error, results, fields) {
                if (error) throw error;
                return res.send({ status: "success", message: 'thêm comment của user_id=' + userId + ' vào product_id=' + product_id + ' thành công!' });
            });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;