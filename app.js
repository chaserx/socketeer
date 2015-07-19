var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/dist/bower_components'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/html/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    respond(msg);
  });
});

function sendMessage(i) {
  setTimeout(function() { io.emit('chat message', i+'...'); }.bind(i), 1000);
};

function respond(msg) {
  if (msg === 'countdown') {
    for (var i=10; i >= 0; i--) {
      sendMessage(i);
    };
  }
};

http.listen(3000, function(){
  console.log('listening on *:3000');
});
