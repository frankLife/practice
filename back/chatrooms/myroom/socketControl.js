var socket = require('socket.io');
var db = require('./util/db');
var sockets = {};

//user to user link build
function u2uLink(socket){
  socket.on('user:link',function(opt){
    if(sockets[opt.to] == undefined) {
      sockets[opt.from].emit('user:linkStatus',false);
      return;
    }
    sockets[opt.from].emit('user:linkStatus',true);
  });
}
//send message
function u2uSend(socket){
  socket.on('user:send',function(opt){
    if(sockets[opt.to] == undefined) {
      throw 'sendTo error';
    }
    console.log(opt);
    sockets[opt.to].emit('user:getMessage',opt);
    sockets[opt.from].emit('user:sendMessage',opt);
  });
}
function found(server){
  var io = socket(server);
  io.on('connection',function(socket){
    // console.log('socket: ',socket.id);
    socket.on('user:enter',function(username){
      db.updateUser({username: username},{$set: {isOnline:true}},function(result) {
        if(result >= 1) {
          io.sockets.emit('user:login',username);
        }
      });
      socket.on('disconnect',function(){
        delete sockets[username];
        db.updateUser({username: username},{$set: {isOnline:false}},function(result) {
          if(result >= 1) {
            io.sockets.emit('user:logout',username);
          }
        });
      });
      sockets[username] = socket;
      console.log('a person has enter myroom: '+ username);

    });

    u2uLink(socket);
    u2uSend(socket);
  });

}


exports.init = found;

