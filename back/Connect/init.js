var connect = require('connect');
var app = connect();

function logger(req,res,next){
  console.log('%s %s',req.method,req.url);
  next();
}
function hello(req,res,next){
  res.setHeader('Content-Type','text/plain');
  res.end('hello world');
  next();
}
app.use(hello);
app.use(logger);
app.listen(3000,function(){
  console.log('Server Listent On Port 3000');
});