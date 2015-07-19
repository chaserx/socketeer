var msgs = $('#messages')
var socket = io();

$('form').submit(function(){
  var msg = $('#m').val();

  if (msg === '/clear') {
    $('#messages').empty();
  } else if (msg === '/com_check') {
    socket.emit('chat message', msg);
    var aac = new Audio('static/sounds/578628main_hskquindar.m4a');
    aac.play();
  }
  else {
    socket.emit('chat message', msg);
  }

  $('#m').val('');
  return false;
});

socket.on('welcome', function(msg){
  msgs.append($('<li>').text(msg));
});

socket.on('chat message', function(msg){
  msgs.append($('<li>').text(msg));
  $('#terminal').stop().animate({
    scrollTop: $("#terminal")[0].scrollHeight
  }, 500);
});
