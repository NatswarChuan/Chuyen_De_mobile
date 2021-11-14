const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * cập nhật doanh thu app
 */
router.get('/update_revenue/:price/:key', async (req, res) => {
    let key = req.params.key;
    let price = req.params.price;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `revenue`  GROUP BY `revenue_id` DESC', function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            const access = results[0];
            const now = new Date(Date.now());
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const season = ((month + 1) % 3 == 0) ? Math.floor((month + 1) / 3) : Math.floor(((month + 1) / 3) + 1);
            let sql = '';
            if (access.revenue_year == year && access.revenue_month == month && access.revenue_seasion == season) {
                sql = 'UPDATE `revenue` SET `revenue_money`= `revenue_money` + ? WHERE `revenue_month` = ? AND `revenue_year` = ? AND `revenue_seasion` = ?';
            }
            else {
                sql = 'INSERT INTO `revenue`(`revenue_money`, `revenue_month`, `revenue_year`, `revenue_seasion`) VALUES (?,?,?,?)';
            }
            dbConn.query(sql, [price, month, year, season], function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                return res.send({ status: "success", message: 'cập nhật thành công' });
            })
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * lấy doanh thu app
 */
router.get('/get/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `revenue`  GROUP BY `revenue_id` ', function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            return res.send({ status: "success", data: results, message: 'cập nhật thành công' });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;