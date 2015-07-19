var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/static/css', express.static(__dirname + '/dist/css'));
app.use('/static/js', express.static(__dirname + '/dist/js'));
app.use('/static/sounds', express.static(__dirname + '/dist/sounds'));
app.use('/static', express.static(__dirname + '/dist/bower_components'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/html/index.html');
});

io.on('connection', function(socket){
  socket.emit('welcome', 'client connected. type \'/help\' for command list');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    respond(msg);
  });
});

function sendAllMessage(message, timeout) {
  if (timeout && timeout > 0) {
    setTimeout(function(){
      io.sockets.emit('chat message', message);
    }.bind(message), timeout);
  } else {
    io.sockets.emit('chat message', message);
  }
}

function sendOneMessage(message) {
  io.emit('chat message', message);
}

function countdown() {
  sendAllMessage('countdown started. t minus 15 seconds');
  for (var i=10; i >= 0; i--) {
    if (i === 10){
      sendAllMessage('t minus 10. guidance set to internal.');
    }
    else if (i === 5) {
      sendAllMessage('5... ignition sequence start', 5000);
    }
    else if (i === 0) {
      sendAllMessage('we have liftoff.', 10000);
    }
  }
}

function systems_report() {
  sendAllMessage('telemetry: check.');
  sendAllMessage('track: check.');
  sendAllMessage('guidance: check.');
  sendAllMessage('all systems nominal.');
}

function respond(msg) {
  if (msg === '/start_countdown') {
    countdown();
  } else if (msg === '/systems') {
    systems_report();
  } else if (msg === '/com_check') {
    sendAllMessage('initiating quindar test');
  } else if (msg === '/help') {
    sendOneMessage('commands: /start_countdown, /systems, /com_check, and /clear');
  }
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});
