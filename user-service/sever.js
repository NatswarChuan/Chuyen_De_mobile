const express = require('express');
const { exists } = require('fs');
const app = express();
const http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const server = http.createServer(app);
var mysql = require('mysql');
var _ = require('lodash');
const port = 3000;
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var md5 = require('md5');
const redis = require('redis');
const connectRedis = require('connect-redis');
// enable this if you run behind a proxy (e.g. nginx)
const RedisStore = connectRedis(session)
//Configure redis client
const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
    password: 'hoanganh11k'
})
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('trust proxy', 1);

//Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient, collection: 'sessions' }),
    secret: 'secret$%^134',
    resave: true,
    saveUninitialized: true,
    name: 'hoanganh11k',
    cookie: {
        sameSite: 'none',
        secure: true, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    },
}))



const APIs_KEY = 'e4611a028c71342a5b083d2cbf59c494';
var codepin = [];
var con = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "CANsa123***",
    database: "user"
});



const crypto = require('crypto');
const { compact } = require('lodash');
const { default: axios } = require('axios');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const PasswordHash = "hoanganh11k";

// create a sha-256 hasher
let sha256Hasher = crypto.createHmac("sha256", PasswordHash);


con.connect(function (err) {
    if (err) throw err;
    setInterval(() => {
        con.query('SELECT version()', function (error, results, fields) {
            console.log("User Database Check...")
        })
    }, 300000)
    console.log("User Database Connected Success!!!")
});

server.listen(port, () => {
    console.log('Listen on port ' + port + '...')

});

//Thông tin Mailer
var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'minecaft94@gmail.com',
        pass: '0613885315'
    }
}));

app.get('/', (req, res, next) => {
    console.log(req.session.id)
    res.send(data_json_endcode(true, 'Tạo Cokiee App thành công'));
});


//1.Thêm user trên app người dùng
app.get('/api/user/create/:user_permission/:user_name/:user_password/:user_email/:key', (req, res, next) => {
    var user_permission = req.params.user_permission;
    var email = req.params.user_email;
    sha256Hasher = crypto.createHmac("sha256", PasswordHash);
    var password = sha256Hasher.update(req.params.user_password).digest("hex");
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
app.post('/api/user/login/:key', function (request, response) {
    console.log(request.body.password)
    var email = request.body.email;
    sha256Hasher = crypto.createHmac("sha256", PasswordHash);
    var password = sha256Hasher.update(request.body.password).digest("hex");
    if (email != null && password != null) {
        con.query('SELECT `information`.`user_id`, `information`.`information_email`, `information`.`information_password`, `information`.`last_update` FROM `information` JOIN `user` ON `user`.`user_id` = `information`.`user_id` WHERE information.information_email = ? AND information.information_password = ? AND user.status = 1', [email, password], function (error, results, fields) {
            if (results.length > 0) {
                var id;
                Object.keys(results).forEach(function (key) {
                    var row = results[key];
                    id = row.user_id;
                });
                request.session.loggedin = true;
                request.session.user_id = id;
                request.session.email = email;
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
        con.query('SELECT * FROM `user_permission` WHERE `user_id` = ?  AND (permission_id = 4 OR permission_id = 3)  ORDER BY `user_permission`.`permission_id` ASC', [request.session.user_id], function (error, results, fields) {
            response.send(data_json_endcode(results[0], 'Lay Thanh Cong!!!'))
        });
    } else {
        response.send(error_Print('faild', 'Vui lòng đăng ký hoặc đăng nhập!'));
    }
});

//Hàm đăng xuất
app.get('/api/user/logout', function (request, response) {
    if (request.session.loggedin) {
        request.session.destroy();
        response.clearCookie("login_id");
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
        var email = request.session.email;
        con.query('SELECT * FROM `profile` WHERE user_id=' + id, function (error, results, fields) {
            var data = { 'id': null, 'phone': null, 'name': null, 'birthday': null, 'email': null };
            var phone = '';
            var name = '';
            var birthday = '';
            if (results != null) {
                Object.keys(results).forEach(function (key) {
                    var row = results[key];
                    phone = row.profile_phone;
                    name = row.profile_name;
                    birthday = row.profile_birthday
                });
                data = { 'id': id, 'phone': phone, 'name': name, 'birthday': birthday, 'email': email };
                console.log(data)
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
        con.query('SELECT `user`.*,`profile`.`profile_birthday` AS `user_birthday`, `profile`.`profile_phone` AS `user_phone`, `profile`.`profile_name` AS `user_real_name`, `information`.`information_email` AS `user_email`, `user_permission`.`permission_id` AS `user_permission` FROM `user` JOIN `profile` ON `profile`.`user_id` = `user`.`user_id` JOIN `information` ON `information`.`user_id` = `user`.`user_id` JOIN `user_permission` ON `user`.`user_id` = `user_permission`.`user_id` WHERE (`user_permission`.`permission_id` = 4 OR `user_permission`.`permission_id` = 3 OR `user_permission`.`permission_id` = 1) AND `user`.`user_id`= ? ORDER BY `user_permission`.`permission_id` ASC', [id], function (error, results, fields) {
            console.log(results[0])
            if(results[0]!==undefined){
            axios.get(`http://127.0.0.1:3002/api/image/get/` + results[0].user_avatar + `/` + APIs_KEY)
                .then(res => {
                    const { data } = res.data;
                    results[0].user_avatar_image = data;
                    response.send(data_json_endcode(results[0], 'Lấy thành công!!'));
                })
            }else{
                var data = {};
                data.user_avatar_image = undefined;
                response.send(data_json_endcode(data, 'Lấy thành công!!'));
            }
        })
    } else {
        response.send(data_json_endcode(false, 'Chưa đăng nhập!!'));
    }
});

//Hàm lấy thông tin user theo id
app.get('/api/user/get/user/by/:id', function (request, response) {
    var id = request.params.id;
    var _data;
    var user_key;
    var user_name;
    var user_avatar;
    var user_status;
    var user_last_update;
    var user_full_name;
    con.query('SELECT * FROM `user` JOIN `profile` ON `user`.`user_id` = `profile`.`user_id` WHERE `profile`.`user_id` =  ' + id, function (error, results, fields) {
        Object.keys(results).forEach(function (key) {
            var row = results[key];
            user_key = row.user_key;
            user_name = row.user_name;
            user_avatar = row.user_avatar;
            user_status = row.status;
            user_last_update = row.last_update
            user_full_name = row.profile_name;
        });
        axios.get(`http://127.0.0.1:3002/api/image/get/` + user_avatar + `/` + APIs_KEY)
            .then(res => {
                const { data } = res.data;
                const user_avatar_image = data;
                _data = { 'user_id': id, 'user_key': user_key, 'user_name': user_name, 'user_avatar': user_avatar_image, 'user_status': user_status, 'user_last_update': user_last_update, 'user_full_name': user_full_name }
                response.send(data_json_endcode(_data, 'Lấy thành công!!'));
            })

    })
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
        var profile_birthday = request.params.profile_birthday
        con.query('UPDATE `profile` SET`profile_phone`= ?,`profile_birthday`=?,`profile_name`= ?,`last_update`= ? WHERE user_id =?', [profile_phone, profile_birthday, profile_name, user_id, user_id], function (error, results, fields) {
            var data = { 'user_id': user_id, 'profile_name': profile_name, 'profile_phone': profile_phone, 'profile_birthday': profile_birthday }
            response.send(data_json_endcode(data, 'Sửa thông tin thành công!!'));
        })
    } else {
        response.send(data_json_endcode(false, 'Chưa đăng nhập!!'));
    }
});
//update all
app.get('/api/user/update/profile/:profile_name/:profile_phone/:profile_birthday/:user_avatar', function (request, response) {
    if (request.session.loggedin) {
        var user_id = request.session.user_id
        var profile_phone = request.params.profile_phone
        var profile_name = request.params.profile_name
        var profile_birthday = request.params.profile_birthday
        var user_avatar = request.params.user_avatar
        var last_update = request.session.user_id;
        con.query('UPDATE `profile` SET`profile_phone`= ?,`profile_birthday`=?,`profile_name`= ?,`last_update`= ? WHERE user_id =?', [profile_phone, profile_birthday, profile_name, user_id, user_id], function (error, results, fields) {
            var data = { 'user_id': user_id, 'profile_name': profile_name, 'profile_phone': profile_phone, 'profile_birthday': profile_birthday }
            con.query('UPDATE `user` SET `user_avatar`=?,`last_update`=? WHERE user_id = ? ', [user_avatar, last_update, user_id], function (error, results, fields) {
                response.send(data_json_endcode(true, 'Sửa thông tin thành công!!'));
            })
        })
    } else {
        response.send(data_json_endcode(false, 'Chưa đăng nhập!!'));
    }
});

//Hàm đặt lại mật khẩu gửi mail code
app.get('/api/user/forgot/password/:email', function (request, response) {
    var email = request.params.email;
    var codePinTemp = Math.random().toString().substr(2, 6);

    var mailOptions = {
        from: email,
        to: email,
        subject: 'Quên mật khẩu Code Pin :' + codePinTemp,
        text: 'Mã code chỉ có hiệu lực trong 1 phút \n Code pin: ' + codePinTemp
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            response.send(error_Print(556, 'Vui lòng kiểm tra lại email!!'))
        } else {
            redisClient.rpush('codePin2', JSON.stringify({ 'email': email, 'codePin': codePinTemp }))
            setTimeout(function () {
                redisClient.lrem('codePin2', 0, JSON.stringify({ 'email': email, 'codePin': codePinTemp }), function (err, data) {
                });
            }, 60000);
            console.log('Email sent: ' + info.response);
            response.send(data_json_endcode(null, 'Vui lòng check mail!!'))
        }
    });
});

//Hàm check codePin
app.get('/api/user/forgot/password/checkPin/:email/:codePin', function (request, response) {
    var codePinTemp = request.params.codePin;
    var email = request.params.email
    var dataTemp = { 'email': email, 'codePin': codePinTemp };
    redisClient.lrange('codePin2', 0, -1, function (error, items) {
        if (error) throw error
        if (items.some(item => _.isEqual(JSON.parse(item), dataTemp)) == true) {
            response.send(data_json_endcode(true, "Xác nhận thành công!!"))
        } else {
            response.send(data_json_endcode(false, "Mã code không hợp lệ!!"))
        }
    })

});
//Hàm đổi mật khẩu
app.get('/api/user/forgot/password/center/:email/:password', function (request, response) {
    sha256Hasher = crypto.createHmac("sha256", PasswordHash);
    var password = sha256Hasher.update(request.params.password).digest("hex");
    var email = request.params.email;
    con.query('UPDATE `information` SET `information_password`= ? WHERE information_email = ?', [password, email], function (error, results, fields) {
        response.send(data_json_endcode(true, 'Đổi mật khẩu thành công vui lòng đăng nhập!!!'))
    });

});

//1.Login facebook trên app người dùng
app.post('/api/user/login/facebook/:key', (request, response, next) => {
    var user_permission = request.body.user_permission;
    var email = request.body.user_email;
    // var password = null;
    var user_name = request.body.user_name
    var tocken = request.body.tocken
    if (request.params.key == APIs_KEY) {
        check_tocken_exits(tocken, function (err, data) {
            if (data == true) {
                con.query('SELECT `user_id`, `information_email`, `information_password`, `last_update` FROM `information` WHERE api_key = ?', [tocken], function (error, results, fields) {
                    if (results.length > 0) {
                        var id;
                        var email;
                        Object.keys(results).forEach(function (key) {
                            var row = results[key];
                            id = row.user_id;
                            email = row.information_email;
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
                                    var user_password = null;
                                    var id;
                                    if (data == false) {
                                        var user_create = 'INSERT INTO `user`(`user_name`) VALUES (\'' + user_name + '\')';
                                        con.query(user_create, function (err, results) {
                                            if (err) throw err;
                                            id = results.insertId;
                                            var user_permission = 'INSERT INTO `user_permission`(`permission_id`, `user_id`) VALUES (\'' + permission + '\',\'' + results.insertId + '\')';
                                            var user_infomation = 'INSERT INTO `information`(`user_id`, `api_key` ,`information_email`, `information_password`, `last_update`) VALUES (\'' + results.insertId + '\',\'' + tocken + '\',\'' + user_email + '\',\'' + user_password + '\',\'' + results.insertId + '\')';
                                            con.query(user_permission, function (err, results) {
                                                console.log(request.ip + ' : Register Successs.');
                                            })
                                            con.query(user_infomation, function (err, results) {
                                                console.log(request.ip + ' : Register Successs information');
                                            })
                                            con.query('INSERT INTO `profile`(`user_id`, `profile_name`) VALUES (?,?)', [results.insertId, request.body.full_name], function (err, results) {
                                                console.log(request.ip + ' : Register Successs profile');
                                            })
                                            var temp = { 'user_id': id, 'user_name': user_name, 'user_password': user_password }
                                            request.session.loggedin = true;
                                            request.session.user_id = id;
                                            request.session.email = email;
                                            request.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
                                            response.send(data_json_endcode(null, 'Đăng nhập thành công!!'));
                                            console.log(request.ip + ' : Login success!!!')
                                            next();
                                        })
                                    } else {
                                        console.log(request.ip + ' : Register Faild');
                                        response.send(error_Print('faild', 'Tài khoản đã tồn tại!!'))
                                        next()
                                    }
                                }

                            });
                        } else {
                            con.query('UPDATE `information` SET `api_key`= ? WHERE information_email = ?', [tocken, email], function (error, results, fields) {
                                con.query('SELECT `user_id` FROM `information` WHERE information_email =? ', [email], function (error, results, fields) {
                                    var id;
                                    Object.keys(results).forEach(function (key) {
                                        var row = results[key];
                                        id = row.user_id;
                                    });
                                    request.session.loggedin = true;
                                    request.session.user_id = id;
                                    request.session.email = email;
                                    request.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
                                    response.send(data_json_endcode(null, 'Đăng nhập thành công!!'));
                                    console.log(request.ip + ' : Login success!!!')
                                    next()
                                })
                            })
                        }
                    }

                });
            }
        });


    } else {
        response.send(error_Print('faild', 'APIs_KEY Không đúng!!'));
        next();
    }

});

//Hàm Update Status user
app.get('/api/user/update/status/:id/:status', function (request, response) {
    let id = request.params.id
    let status = request.params.status
    if (request.session.loggedin) {
        let id_user_login = request.session.user_id
        con.query('SELECT * FROM `user_permission` WHERE user_id = ? AND (permission_id = 4 OR permission_id = 3)  ORDER BY `user_permission`.`permission_id` ASC ', [id_user_login], function (error, results, fields) {
            if (results[0].permission_id == 3) {
                con.query('UPDATE `user` SET `status`= ? WHERE user_id = ?', [status, id], function (error, results, fields) {
                    response.send(data_json_endcode(true, 'Đổi thành công!!'));
                })
            } else {
                response.send(data_json_endcode(false, 'Bạn Không đủ quyền hạn!!'));

            }
        })

    } else {
        response.send(data_json_endcode(false, 'Chưa đăng nhập!!'));
    }
});

//Hàm trả về danh sách user
app.get('/api/user/get/:option/:page/:numPage', function (request, response) {
    let page = request.params.page
    let numpage = request.params.numPage
    let option = request.params.option
    if (request.session.loggedin) {
        let id_user_login = request.session.user_id
        con.query('SELECT * FROM `user_permission` WHERE user_id = ? AND (permission_id = 4 OR permission_id = 3)  ORDER BY `user_permission`.`permission_id` ASC ', [id_user_login], function (error, results, fields) {
            if (results[0].permission_id == 3) {
                var query = '';
                switch (option) {
                    case 'all':
                        query = `SELECT * FROM user LIMIT ${page} , ${numpage}`
                        break;
                    case 'desc_id':
                        query = `SELECT * FROM user ORDER BY user_id DESC LIMIT ${page} , ${numpage}`
                        break;
                    case 'asc_id':
                        query = `SELECT * FROM user ORDER BY user_id ASC LIMIT ${page} , ${numpage}`
                        break;
                    case 'asc_name':
                        query = `SELECT * FROM user ORDER BY user.user_name ASC LIMIT ${page} , ${numpage}`
                        break;
                    case 'desc_name':
                        query = `SELECT * FROM user ORDER BY user.user_name DESC LIMIT ${page} , ${numpage}`
                        break;
                    default:
                        break;
                }
                if (query != '') {
                    con.query(query, function (error, results, fields) {
                        response.send(data_json_endcode(results, 'Lấy thành công!!'));
                    })
                } else {
                    response.send(data_json_endcode(false, 'Option không hợp lệ!!'));
                }
            } else {
                response.send(data_json_endcode(false, 'Bạn Không đủ quyền hạn!!'));
            }
        })

    } else {
        response.send(data_json_endcode(false, 'Chưa đăng nhập!!'));
    }
});

//Hàm search user
app.get('/api/user/update/search/:keyword/:page/:numPage', function (request, response) {
    let page = request.params.page
    let numpage = request.params.numPage
    let keyword = request.params.keyword
    if (request.session.loggedin) {
        let id_user_login = request.session.user_id
        con.query('SELECT * FROM `user_permission` WHERE user_id = ? ', [id_user_login], function (error, results, fields) {
            if (results[0].permission_id == 3) {
                con.query(`SELECT * FROM user WHERE user_name LIKE '%${keyword}%' LIMIT ${page} , ${numpage}`, function (error, results, fields) {
                    response.send(data_json_endcode(results, 'Lấy thành công!!'));
                })
            } else {
                response.send(data_json_endcode(false, 'Bạn Không đủ quyền hạn!!'));
            }
        })

    } else {
        response.send(data_json_endcode(false, 'Chưa đăng nhập!!'));
    }
});

//Xác thực login Admin trên hệ thống
app.post('/api/user/login/admin/:key', function (request, response) {
    var email = request.body.email;
    sha256Hasher = crypto.createHmac("sha256", PasswordHash);
    var password = sha256Hasher.update(request.body.password).digest("hex");
    if (email != null && password != null) {
        con.query('SELECT `user_id`, `information_email`, `information_password`, `last_update` FROM `information` WHERE information_email = ? AND information_password = ?', [email, password], function (error, results, fields) {
            if (results.length > 0) {
                var id;
                Object.keys(results).forEach(function (key) {
                    var row = results[key];
                    id = row.user_id;
                });
                con.query('SELECT * FROM `user_permission` WHERE user_id = ? AND (permission_id = 4 OR permission_id = 3)  ORDER BY `user_permission`.`permission_id` ASC', [id], function (error, results, fields) {
                    if (results[0] !== undefined) {
                        if (results[0].permission_id == 3 || results[0].permission_id == 4) {
                            request.session.loggedin = true;
                            request.session.user_id = id;
                            request.session.email = email;
                            request.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
                            response.send(data_json_endcode({ permission_id: results[0].permission_id }, 'Đăng nhập thành công!!'));
                            console.log(request.ip + ' : Login success!!!')
                        } else {
                            response.send(data_json_endcode(false, 'Bạn Không đủ quyền hạn!!'));
                        }
                    } else {
                        response.send(data_json_endcode(false, 'Bạn Không đủ quyền hạn!!'));
                    }
                })
            } else {
                response.send(error_Print('Faild', 'Sai Email Hoặc Mật Khẩu!'));
            }
        });
    } else {
        response.send(error_Print('Faild', 'Vui lòng nhập Email hoặc Mật Khẩu!'));
    }
});



function check_tocken_exits(tocken, callback) {
    var sql = 'SELECT user_id FROM `information` WHERE api_key = \'' + tocken + '\'';
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
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
