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
  console.log('%s \n %s',req.method,req.url);
}
function hello(req,res,next){
  res.setHeader('Content-Type','text/html');
  res.statusCode = 200;
  // res.end('hello world');
  next();
}
function configLogger(configStr){
  var filterReg = /:(\w+)/g;
  var props = configStr.match(filterReg);
  return function(req,res,next){
    for(var i = 0,len = props.length;i<len;i++) {
      var prop = props[i].slice(1);
      res.write(prop + ': ' + req[prop] + '</br>');
    }
    res.end();
    next();
  }
}

task.use(hello);
task.use(configLogger(':url :method'));
task.use(logger);
task.listen();

