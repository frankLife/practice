var net = require('net');

var client = net.connect({port: 3000,host: 'localhost'},
  function() { //'connect' listener
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('connect',function(client){
  console.log('client connect');
});
client.on('data', function(data) {
  console.log('client: '+ data.toString());
  // client.end();
});
client.on('end', function() {
  console.log('disconnected from server');
});