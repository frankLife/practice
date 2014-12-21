/*net moudle event sample*/

// var net = require('net');

// var server = net.createServer(function(c){
//   // c.on('data',function(data) {
//   //   console.log(data.toString());
//   //   c.write(data);
//   // })
//   c.pipe(c);  //c.pipe(c) === c.on('data',function(data){c.write(data)})
//   // c.on('connect',function(){
//   //   console.log(this.remoteAddress);
//   // });
// });
// server.on('connection',function(c){
//   var id = c.remoteAddress + ':' + c.remotePort;
//   console.log("c.remoteAddress: ",c.remoteAddress);
//   console.log("c.remotePort: ",c.remotePort);

// });
// server.listen(3000,function(){
//   console.log('server liten on port 3000');
// });

/* create client */

// var client = net.connect({port: 3000,host: 'localhost'},
//   function() { //'connect' listener
//   console.log('connected to server!');
//   client.write('world!\r\n');
// });
// client.on('connect',function(client){
//   console.log('client connect');
// });
// client.on('data', function(data) {
//   console.log('client: '+ data.toString());
//   // client.end();
// });
// client.on('end', function() {
//   console.log('disconnected from server');
// });


/* pubsub.js  create broadcast server using net module*/

var net = require('net');
var events = require('events');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join',function(id,c){
  this.clients[id] = c;
  this.subscriptions[id] = function(senderId,data) {
    if(id != senderId) {
      this.clients[id].write(data.toString());
    }
  }
  //bind e event each time when a client join in,
  // when broadcast event emitted bind handdlers excute sequencely
  this.on('broadcast',this.subscriptions[id]);
});

var server = net.createServer(function(c){
  //=============
  c.on('connect',function(){
    console.log('connect event emit');
  });
  //============== didn't excute 

  var id = c.remoteAddress + ':' + c.remotePort;
  // c.on('connection',function(){
    console.log(c.remoteAddress + ':' + c.remotePort);
    channel.emit('join',id,c);
  // });
  
  c.on('data',function(data){
    channel.emit('broadcast',id,data);
  });
}).listen(3000,function(){
  console.log('listen on port 3000');
});

