var http = require('http');
var server = http.createServer();

var task = {
  tasks: [],
  index: 0,
  use: function(fn){
    function _wrapFn(req,res){
      nextFn = function(){
        next.call(undefined,req,res);
      }
      fn(req,res,nextFn);
    }
    this.tasks.push(_wrapFn);
  },
  //Todo: make sure that this platform can abstracted
  listen: function(req,res){
    server.listen(3000,function(){
      console.log('Server Listent On Port 3000');
    });
    server.on('request',function(req,res){
      next(req,res);
    });
  }
}
function next(req,res){
  if(task.index >= task.tasks.length) {
    task.index = 0
  }
  var fn = task.tasks[task.index++];
  fn(req,res);
}

//pass a next parameter due to clouser will binding the next when task was being defined
function logger(req,res,next){
  console.log(2);
  console.log('%s %s',req.method,req.url);
}
function hello(req,res,next){
  res.setHeader('Content-Type','text/html');
  res.statusCode = 200;
  res.end('hello world');
  next();
}

task.use(hello);
task.use(logger);
task.listen();

