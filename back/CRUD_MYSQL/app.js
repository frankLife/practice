var http = require('http');
var router = require('./router');

var server = http.createServer();
server.on('request',function(req,res){
  router.route(req,res);
});

server.listen(3000,function(){
  console.log('listen on 3000 port');
});