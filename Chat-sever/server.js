const express = require('express');
const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server, { cors: { origin: '*' } });
var mysql = require('mysql');
var db = mysql.createConnection({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'chat2',
  debug: false,
  multipleStatements: true,
})

const cors = require("cors");
const { emit } = require('process');
const users = {};

app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

db.connect(function (err) {
  if (err) console.log("db err :" + err);
  else console.log('db connected');
})

io.on("connection", function (client) {
  console.log("Client connected...");
  client.on("roomList", function (data) {
    var query = '';
    users[client.id] = data;

    db.query('SELECT * FROM `room` WHERE `room_name` = ?', [data], function (error, results, fields) {
      if (results.length != 0) {
        results.forEach(element => {
          query += `SELECT * FROM messages WHERE (user_from = '${data}' AND user_to = '${element.room_preson}') OR (user_from = '${element.room_preson}' AND user_to = '${data}') ORDER BY CreateDate DESC LIMIT 1;`;
        });

        db.query(query, function (error, results, fields) {
          client.emit('roomList', results)
        })
      }
    })
  });
  client.on('watched', function (user_from, user_to) {
    console.log(user_from, user_to)
    //UPDATE `messages` SET `isWatched`= 1 WHERE `user_from` = 1 AND `user_to` = 2
    db.query(`UPDATE messages SET isWatched= 1 WHERE  (user_from = '${user_from}'AND user_to = '${user_to}') OR (user_from = '${user_to}' AND user_to = '${user_from}')`, function (error, results, fields) {
    })
  });
  client.on('onlineStatus', function (userid) {
    for (var k in users) {
      if (users[k] == userid) {
        return client.emit("onlineStatus", { userID: userid, status: true });
      }
    }
    return client.emit("onlineStatus", { userID: userid, status: false });
  });
  client.on('send-file', function (name, buffer, userid) {
    var fs = require('fs');
    var timestamp = new Date().getTime();
    var imgName = timestamp + "-" + name
    var fileName = __dirname + '/uploads/' + imgName;
    fs.open(fileName, 'a', 0755, function (err, fd) {
      if (err) throw err;
      fs.write(fd, buffer, null, 'Binary', function (err, written, buff) {
        fs.close(fd, function () {
          console.log('File saved successful!');
          client.emit("send_file", imgName, buffer, userid);
          client.broadcast.emit("send_file", imgName, buffer, userid);
        });
      })
    });
  });

  client.on('preview-file', function (base64, userid) {
    client.emit("preview_file", base64, userid);
    client.broadcast.emit("preview_file", base64, userid);
  });


  // On Message broadCast it & Saved in DB
  client.on("messages", function (data) {
    client.emit("thread", data);
    client.broadcast.emit("thread", data);
    db.query("INSERT INTO `messages` (`user_from`,`user_to`,`message`,`image`,`base64`) VALUES ('" + data.user_id + "','" + data.user_to + "','" + data.message + "','" + data.image + "','" + data.base64 + "')", function (error, results, fields) {
      db.query('SELECT * FROM `room` WHERE `room_name` = ? AND `room_preson`= ?', [data.user_id, data.user_to], function (error, results, fields) {
        if (results.length == 0) {
          db.query('INSERT INTO `room`( `room_name`, `room_preson`) VALUES (?,?)', [data.user_id, data.user_to])
          db.query('INSERT INTO `room`( `room_preson`,`room_name`) VALUES (?,?)', [data.user_id, data.user_to])
        }
      });
    });
  });

  // On Typing... 
  client.on('is_typing', function (data) {
    if (data.status === true) {
      client.emit("typing", data);
      client.broadcast.emit('typing', data);
    } else {
      client.emit("typing", data);
      client.broadcast.emit('typing', data);
    }
  });

  client.on('disconnect', function () {
    console.log('user ' + users[client.id] + ' disconnected');
    // remove saved socket from users object
    delete users[client.id];
  });
});

app.get('/api/chat/getChatHistory/:user_form/:user_to/:page/:oldPage', function (request, response) {
  let user_form = request.params.user_form
  let user_to = request.params.user_to
  let page = request.params.page
  let oldpage = request.params.oldPage
  db.query('SELECT * FROM `messages` WHERE `user_from` = ? AND `user_to` = ? ORDER BY `CreateDate` ASC', [user_form, user_to], function (error, results, fields) {
    console.log(user_form)
    response.send(data_json_endcode(results, 'Lấy thành công'))
  });
});

app.get('/api/chat/getChatList/:user_form/', function (request, response) {
  let user_form = request.params.user_form
  db.query('SELECT `user_to` FROM `messages` WHERE `user_from` = ? GROUP BY `user_to`', [user_form], function (error, results, fields) {
    response.send(data_json_endcode(results, 'Lấy thành công'))
  });
});

app.get('/api/chat/getChatList/mess/near/:user_form', function (request, response) {
  let user_form = request.params.user_form
  db.query('SELECT * FROM `messages` WHERE `user_from` = ? ORDER BY `CreateDate` DESC LIMIT 1', [user_form], function (error, results, fields) {
    response.send(data_json_endcode(results, 'Lấy thành công'))
  });
});
//Hàm trả về thành công
function data_json_endcode(data, messger) {
  var data = {
    "status": "success",
    "data": data,
    "message": messger /* Or optional success message */
  }
  return data;
}
server.listen(3002);
