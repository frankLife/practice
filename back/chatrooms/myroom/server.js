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
app.use(function(req,res,next){
  console.log(__dirname + req.url);
  next();
})
/* match mounting path 
that can even doesn't exists with static middleware parameter
(default is '/') */
app.use('/app',staticServe('public'));
app.use(function(req,res,next){
  res.write('hello myroom');
  res.end();
})
server = http.createServer(app);
io = socket(server);
io.on('connection',function(socket){
  socket.on('user:enter',function(){
    console.log('a person has enter myroom');
  });
});



server.listen(3000,function(){
  console.log('server listen on 3000 port');
});