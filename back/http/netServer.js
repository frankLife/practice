var net = require('net');
var server = net.createServer();
var sendTimes = 0;
server.on('connection',function(c){
  console.log('a connection in');
  // c.write('connection build');
  c.on('data',function(data) {
    var content = '';
    if(data.slice(-2).toString('hex') == '0d0a') {
      // content = Array.prototype.splice.call(data,-2);
      content = data.slice(0,-2);
    }else {
      content = data;
    }

    console.log('content: ' + content);
    content = content.toString();
    if(content != '') {
      c.write('server: '+ content + '\n\r');
    }
  });
});

server.listen(3000,function(){
  console.log('listen on port 3000');
});