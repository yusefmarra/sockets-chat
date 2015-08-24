var socket = io();

$('#messageForm').submit(function(event) {
  event.preventDefault();
  if ($('#messageInput').val() !== '') {
    socket.emit('message', $('#messageInput').val());
    $('#messageInput').val('');
  }
});

$('#userForm').submit(function(event) {
  event.preventDefault();
  if ($('#userInput').val() !== '') {
    socket.emit('newUser', $('#userInput').val());
    $('#userForm').hide();
    $('#messageForm').show();
  }
});

socket.on('message', function(data) {
  $("#messages").append($('<li>').text(data.name + ': ' + data.message));
});

socket.on('users', function(users) {
  $('#userList').empty();
  for (var i = 0; i < users.length; i++) {
    $('#userList').append($('<li>').text(users[i]));
  }
})

socket.on('noName', function(errorMsg) {
  $('#userForm').show();
  $('#messageForm').hide();
  console.log(errorMsg);
  $('#messages').append('<li style="color:red;">' + errorMsg + '</li>');
});

$(function() {
  $('#messageForm').hide()
})
