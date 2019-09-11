var io = require('socket.io')(6001);

console.log('Server Started');

io.on('connection', function(socket){
  console.log('User connected', socket.id);
    socket.on('message', function(data){
      if(data.type == 'user_send_message'){
        console.log('User writing message', data.user);
        socket.broadcast.emit('UserWriting', { data: data.user});
      }
      if(data.type == 'user_unsend_message'){
        socket.broadcast.emit('UserUnWriting', { data: data.user});
      }
      if(data.type == 'message'){
        io.sockets.emit('UserSendMessage', { username: data.user, message: data.message, message_time: data.message_time })
      }
    });
});