var socket = require('socket.io');

exports.init = function(server){
  var io = socket(server);
  io.on('connection',function(socket){
    socket.on('user:enter',function(){
      console.log('a person has enter myroom');
    });
  });
}

