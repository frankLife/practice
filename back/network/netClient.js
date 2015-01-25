var net = require('net');
var sendTimes = 0;
var client = net.connect({port: 3000,host: 'localhost'});

client.on('connect',function(){
  console.log('connected to server!');
  client.write('world!\r\n');
  /*
  setInterval(function(){
    client.write('sendTimes: '+ (++sendTimes));
  },1000);
  */
  process.stdin.pipe(client);  
  console.log('client connect');
});
/*
client.on('data', function(data) {
  console.log('client: '+ data.toString());
  // client.end();
});
*/
client.on('end', function() {
  console.log('disconnected from server');
});


