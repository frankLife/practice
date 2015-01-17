var http = require('http');
var connect = require('connect');
var socket = require('socket.io');
var compression = require('compression');
var staticServe = require('serve-static');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var router = require('./util/router');
var midRoute = require('./middleware/route');
var config = require('./config');

var app = connect();
var server = null;
var io = null

var newRouter = new router();
newRouter.addRouteBySchema(config.resMap);


app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser());
/* match mounting path 
that can even doesn't exists with static middleware parameter
(default is '/') */
app.use('/app',staticServe('public',{'index':['login.html']}));
app.use(route(newRouter.resMap));
server = http.createServer(app);

// io = socket(server);
// io.on('connection',function(socket){
//   socket.on('user:enter',function(){
//     console.log('a person has enter myroom');
//   });
// });



server.listen(3000,function(){
  console.log('server listen on 3000 port');
});