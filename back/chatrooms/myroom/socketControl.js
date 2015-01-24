var socket = require('socket.io');
var db = require('./util/db');
var sockets = {};
var groups = {};

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
function u2gSend(socket){
  socket.on('group:send',function(opt){
    if(groups[opt.to] == undefined) {
      throw 'sendTo group error';
    }
    console.log(opt);
    // socket.to(opt.to).emit('user:getMessage',opt);
    // sockets[opt.from].emit('user:sendMessage'.opt);
  });
}
function joinGroup(socket,groups){
  for(var i = 0,len =groups.length;i<len;i++) {
    var groupName = groups[i];
    if(groups[groupName] == undefined) {
      groups[groupName] = [];
    }
    groups[groupName].push(socket);
    socket.join(groupName);
  }
}



function found(server){
  var io = socket(server);
  io.on('connection',function(socket){
    // console.log('socket: ',socket.id);
    socket.on('user:enter',function(opt){
      var username = opt.username;
      var groups = opt.groups;

      joinGroup(socket,groups);
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
    u2gSend(socket);
  });

}


exports.init = found;

