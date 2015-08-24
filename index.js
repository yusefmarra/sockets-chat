var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var util = require('./utility.js')

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get("/js/main.js", function(req, res) {
  res.sendFile(__dirname + '/js/main.js');
});

app.get("/css/main.css", function(req, res) {
  res.sendFile(__dirname + '/css/main.css');
});

var users = [];

io.on('connection', function(socket) {
  console.log("User Connected.");
  console.log(io.sockets.connected);
  io.emit('users', users);
  socket.on('newUser', function(name) {
    name = util.validateName(name);
    if (users.indexOf(name) === -1) {
      socket.name = util.validateName(name);
      users.push(socket.name)
    }
    io.emit('message', {'name': 'SERVER', 'message': socket.name +  ' connected to the server.'})
    io.emit('users', users);
  });
  socket.on('message', function(message) {
    if (socket.name) {
      var data = {'name': socket.name, 'message': util.messageCensor(message)};
      io.emit('message', data);
    } else {
      socket.emit('noName', 'You need to choose a new name.');
      console.log(socket.name, message);
    }
  });
  socket.on('disconnect', function() {
    io.emit('message', { 'name' : 'SERVER', 'message': socket.name + ' disconnected from the server.'})
    if (socket.name) {
      users.splice(users.indexOf(socket.name),1);
    }
    io.emit('users', users);
    console.log(socket.name + " disconnected.")
  })
});





http.listen(3000, function(){
  console.log('listening on *:3000');
});
