const express = require('express');
const { exists } = require('fs');
const app = express();
const http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const server = http.createServer(app);
var mysql = require('mysql');
const port = 3000;

const APIs_KEY = 'e4611a028c71342a5b083d2cbf59c494';

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: "user"
});

app.use(cookieParser())
app.use(session({
    originalMaxAge: 8 * 60 * 60 * 1000,
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);



con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected Success!!!")
});

server.listen(port, () => {
    console.log('Listen on port ' + port + '...')

});

//1.Thêm user trên app người dùng
app.get('/api/user/create/:user_permission/:user_name/:user_password/:user_email/:key', (req, res, next) => {
    var user_permission = req.params.user_permission;
    var email = req.params.user_email;
    var password = req.params.user_password;
    var user_name = req.params.user_name
    if (req.params.key == APIs_KEY) {
        check_email_exits(email, function (err, data) {
            if (err) {
                // error handling code goes here
                console.log("ERROR : ", err);
            } else {
                // code to execute on data retrieval
                if (data != true) {
                    check_user_name_exits(user_name, function (err, data) {

                        if (err) {
                            // error handling code goes here
                            console.log("ERROR : ", err);
                        } else {
                            // code to execute on data retrieval
                            var permission = user_permission;
                            var user_email = email;
                            var user_password = password;
                            var id;
                            if (data == false) {
                                var user_create = 'INSERT INTO `user`(`user_name`) VALUES (\'' + user_name + '\')';
                                con.query(user_create, function (err, results) {
                                    if (err) throw err;
                                    id = results.insertId;
                                    var user_permission = 'INSERT INTO `user_permission`(`permission_id`, `user_id`) VALUES (\'' + permission + '\',\'' + results.insertId + '\')';
                                    var user_infomation = 'INSERT INTO `information`(`user_id`, `information_email`, `information_password`, `last_update`) VALUES (\'' + results.insertId + '\',\'' + user_email + '\',\'' + user_password + '\',\'' + results.insertId + '\')';
                                    con.query(user_permission, function (err, results) {
                                        console.log(req.ip + ' : Register Successs.');
                                    })
                                    con.query(user_infomation, function (err, results) {
                                        console.log(req.ip + ' : Register Successs information');
                                    })
                                    con.query('INSERT INTO `profile`(`user_id`) VALUES (?)', [results.insertId], function (err, results) {
                                        console.log(req.ip + ' : Register Successs profile');
                                    })
                                    var temp = { 'user_id': id, 'user_name': user_name, 'user_password': user_password }
                                    res.send(data_json_endcode(temp, 'Đăng ký thành công!!'));
                                    next();
                                })
                            } else {
                                console.log(req.ip + ' : Register Faild');
                                res.send(error_Print('faild', 'Tài khoản đã tồn tại!!'))
                                next()
                            }
                        }

                    });
                } else {
                    console.log(req.ip + ' : Register Faild');
                    res.send(error_Print('faild', 'Email đã tồn tại!!'))
                    next()
                }
            }

        });

    } else {
        res.send(error_Print('faild', 'APIs_KEY Không đúng!!'));
        next();
    }

});

//Xác thực login trên hệ thống
app.get('/api/user/login/:user_email/:user_password/:key', function (request, response) {
    var email = request.params.user_email;
    var password = request.params.user_password;
    if (email != null && password != null) {
        con.query('SELECT `user_id`, `information_email`, `information_password`, `last_update` FROM `information` WHERE information_email = ? AND information_password = ?', [email, password], function (error, results, fields) {
            if (results.length > 0) {
                var id;
                Object.keys(results).forEach(function (key) {
                    var row = results[key];
                    id = row.user_id;
                });
                request.session.loggedin = true;
                request.session.user_id = id;
                request.session.email = encrypt(email);
                request.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
                response.send(data_json_endcode(null, 'Đăng nhập thành công!!'));
                console.log(request.ip + ' : Login success!!!')
            } else {
                response.send(error_Print('Faild', 'Sai Email Hoặc Mật Khẩu!'));
            }
            response.end();
        });
    } else {
        response.send(error_Print('Faild', 'Vui lòng nhập Email hoặc Mật Khẩu!'));
        response.end();
    }
});

//lấy thông tin tài khoản khi đã xác thực
app.get('/api/user/loginUser', function (request, response) {
    if (request.session.loggedin) {
        var data = { 'user_id': request.session.user_id, 'email': decrypt(request.session.email) };
        response.send(data_json_endcode(data, 'Đăng nhập thành công!!'));
    } else {
        response.send(error_Print('faild', 'Vui lòng đăng ký hoặc đăng nhập!'));
    }
    response.end();
});

//Hàm đăng xuất
app.get('/api/user/logout', function (request, response) {
    if (request.session.loggedin) {
        request.session.destroy();
        console.log(request.ip + ' : Logout success!!!')
        response.send(data_json_endcode(null, 'Đăng xuất thành công!!'));
    } else {
        response.send(error_Print('faild', 'Bạn chưa đăng nhập'));
    }
    response.end();
});

//Hàm lấy thông tin người dùng
app.get('/api/user/get/profile', function (request, response) {
    if (request.session.loggedin) {
        var id = request.session.user_id;
        con.query('SELECT * FROM `profile` WHERE user_id=' + id, function (error, results, fields) {
            var data = { 'id': null, 'phone': null, 'name': null, 'birthday': null };
            var phone;
            var name;
            var birthday;
            if (results != null) {
                Object.keys(results).forEach(function (key) {
                    var row = results[key];
                    phone = row.profile_phone;
                    name = row.profile_name;
                    birthday = row.profile_birthday
                });
                data = { 'id': id, 'phone': phone, 'name': name, 'birthday': birthday };
            }
            response.send(data_json_endcode(data, 'Lấy dữ liệu thành công!!'));
        });

    } else {
        response.send(error_Print('faild', 'Bạn chưa đăng nhập'));
    }
});

//Hàm Kiểm tra trạng thái login
app.get('/api/user/check/login', function (request, response) {
    if (request.session.loggedin) {
        response.send(data_json_endcode(true, 'Đã đăng nhập!!'));
    } else {
        response.send(data_json_endcode(false, 'Chưa đăng nhập!!'));
    }
    response.end();
});

//Hàm lấy thông tin user
app.get('/api/user/get/user', function (request, response) {
    if (request.session.loggedin) {
        var id = request.session.user_id;
        var data;
        var user_key;
        var user_name;
        var user_avatar;
        var user_status;
        var user_last_update;
        con.query('SELECT * FROM `user` WHERE user_id = ' + id, function (error, results, fields) {
            Object.keys(results).forEach(function (key) {
                var row = results[key];
                user_key = row.user_key;
                user_name = row.user_name;
                user_avatar = row.user_avatar;
                user_status = row.status;
                user_last_update = row.last_update
            });
            data = { 'user_id': id, 'user_key': user_key, 'user_name': user_name, 'user_avatar': user_avatar, 'user_status': user_status, 'user_last_update': user_last_update }
            response.send(data_json_endcode(data, 'Lấy thành công!!'));
        })
    } else {
        response.send(data_json_endcode(false, 'Chưa đăng nhập!!'));
    }
});

//Hàm Update user
app.get('/api/user/update/user/:user_key/:user_name/:user_avatar/:status', function (request, response) {
    if (request.session.loggedin) {
        var user_id = request.session.user_id
        var user_key = request.params.user_key
        var user_name = request.params.user_name
        var user_avatar = request.params.user_avatar
        var last_update = request.session.user_id;
        var user_status = request.params.status
        con.query('UPDATE `user` SET `user_key`=?,`user_name`=?,`user_avatar`=?,`last_update`=?,`status`=? WHERE user_id = ? ', [user_key, user_name, user_avatar, last_update, user_status, user_id], function (error, results, fields) {
            var data = { 'user_id': user_id, 'user_key': user_key, 'user_name': user_name, 'user_avatar': user_avatar, 'user_status': user_status, 'user_last_update': last_update }
            response.send(data_json_endcode(data, 'Sửa thông tin thành công!!'));
        })
    } else {
        response.send(data_json_endcode(false, 'Chưa đăng nhập!!'));
    }
});

//Hàm update profile
app.get('/api/user/update/profile/:profile_name/:profile_phone/:profile_birthday', function (request, response) {
    if (request.session.loggedin) {
        var user_id = request.session.user_id
        var profile_phone = request.params.profile_phone
        var profile_name = request.params.profile_name
        var profile_birthday =  request.params.profile_birthday
        con.query('UPDATE `profile` SET`profile_phone`= ?,`profile_birthday`=?,`profile_name`= ?,`last_update`= ? WHERE user_id =?', [profile_phone, profile_birthday, profile_name, user_id, user_id], function (error, results, fields) {
            var data = { 'user_id': user_id, 'profile_name': profile_name, 'profile_phone': profile_phone, 'profile_birthday': profile_birthday }
            response.send(data_json_endcode(data, 'Sửa thông tin thành công!!'));
        })
    } else {
        response.send(data_json_endcode(false, 'Chưa đăng nhập!!'));
    }
});

//Hàm lấy thông báo



//Hàm check User Name tồn tại
function check_user_name_exits(user_name, callback) {
    var sql = 'SELECT user_id FROM `user` WHERE user_name = \'' + user_name + '\'';
    con.query(sql, function (err, result) {
        if (err)
            callback(err, null);
        else
            if (result.length) {
                callback(null, true);
            } else {
                callback(null, false);
            }
    });
}


//Hàm check Email tồn tại
function check_email_exits(email, callback) {
    var sql = 'SELECT user_id FROM `information` WHERE information_email = \'' + email + '\'';
    con.query(sql, function (err, result) {
        if (err)
            callback(err, null);
        else
            if (result.length) {
                callback(null, true);
            } else {
                callback(null, false);
            }
    });
}

//Hàm trả về lỗi
function error_Print(status, message) {
    var error = {
        "status": status,
        "data": null,
        "message": message /* Or optional success message */
    }
    return error;
};

//Hàm trả về thành công
function data_json_endcode(data, messger) {
    var data = {
        "status": "success",
        "data": data,
        "message": messger /* Or optional success message */
    }
    return data;
}

//Mã hóa dữ liệu
function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}