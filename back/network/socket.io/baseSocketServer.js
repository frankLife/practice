var app = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io')(app);
//forward declaration function before variable
function handler(req,res) {
  fs.readFile(__dirname + '/baseSocketClient.html',function(err, data){
    if(err) {
      res.statusCode = 500;
      res.end('internal error');
      return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length',Buffer.byteLength(data.toString()));
    res.end(data);
  });
}
app.listen(3000,function(){
  console.log('server listen on 3000 port.');
});
io.on('connection',function(socket){
  socket.emit('news',{hello: 'world'});
  // setTimeout(function(){
    socket.on('news',function(data){
      console.log(data);
    })
  // },1000)


});
