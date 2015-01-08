var http = require('http');
var server = require('server');

var task = {
  tasks: [],
  use: function(fn){
    function _wrapFn(req,res){
      var tempNext = next;
      next = function(){
        next.apply(req,res);
      }
      fn(req,res);
      next = tempNext;
    }
    this.tasks.push(_wrapFn);
  }
  //Todo: make sure that this platform can abstracted
  listen: function(req,res){
    server.listen(3000);
    server.on('request',function(req,res){
      next(req,res);
    });
  }
}
function next(req,res){
  task.tasks.shift(tasks)(req,res);
}


function logger(req,res,next){
  console.log('%s %s',req.method,req.url);
  next();
}
function hello(req,res,next){
  res.setHeader('Content-Type','text/plain');
  res.end('hello world');
  next();
}

task.use(logger);
task.use(hello);
task.listen();

