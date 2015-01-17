var http = require('http');
var connect = require('connect');
var compression = require('compression');
var staticServe = require('serve-static');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');

var socketControl = require('./socketControl')
var router = require('./util/router');
var midRoute = require('./middleware/route');
var config = require('./config');

var app = connect();
var server = null;


var newRouter = new router();
newRouter.addRouteBySchema(config.resMap);
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'myroom',
  resave: true,
  saveUninitialized: true
}))
/* match mounting path 
that can even doesn't exists with static middleware parameter
(default is '/') */
app.use(/*'/app',*/staticServe('public',{'index':['login.html']}));
app.use(midRoute.route(newRouter.resMap));
server = http.createServer(app);
socketControl.init(server);
// io = socket(server);
// io.on('connection',function(socket){
//   socket.on('user:enter',function(){
//     console.log('a person has enter myroom');
//   });
// });



server.listen(3000,function(){
  console.log('server listen on 3000 port');
});