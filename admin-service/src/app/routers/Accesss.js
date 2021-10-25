const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * Cập nhật lượt truy cập vao app
 */
router.get('/update/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        //kiểm tra đã tồn tại cookie chưa
        if (req.cookies.access) {
            return res.send({ status: "fail", message: 'cập nhật thất bại' });
        }
        else {
            dbConn.query('SELECT * FROM `access` ORDER BY `access`.`id` DESC', function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                const access = results[0];
                const now = new Date(Date.now());
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const season = ((month + 1) % 3 == 0) ? Math.floor((month + 1) / 3) : Math.floor(((month + 1) / 3) + 1);
                let sql = '';
                if (access.year == year && access.month == month && access.season == season) {
                    sql = 'UPDATE `access` SET `access_times` = `access_times` + 1 WHERE `year` = ? AND `month` = ? AND `season` = ?';
                }
                else {
                    sql = 'INSERT INTO `access`(`year`, `month`, `season`) VALUES ( ?, ? , ?)';
                }
                dbConn.query(sql, [year, month, season], function (error, results, fields) {
                    if (error) throw error;
                    res.cookie('access', 'access', { expires: new Date(Date.now() + 86400000), secure: true, sameSite: 'none' });
                    return res.send({ status: "success", message: 'cập nhật thành công' });
                })
            });
        }
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;