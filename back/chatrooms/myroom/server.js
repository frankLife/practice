var http = require('http');
var connect = require('connect');
var socket = require('socket.io');
var compression = require('compression');
var staticServe = require('serve-static');
var morgan = require('morgan');
var app = connect();
var server = null;
var io = null
app.use(morgan('dev'));
app.use(compression());
app.use(staticServe('public',{'index': ['index.html']}));
// app.use(function(req,res,next){
//   res.write('hello myroom');
//   res.end();
// })
server = http.createServer(app);
io = socket(server);
io.on('user:enter',function(){
  console.log('a person has enter myroom');
});


server.listen(3000,function(){
  console.log('server listen on 3000 port');
});