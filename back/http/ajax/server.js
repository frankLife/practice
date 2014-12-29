var http = require('http');
var fs = require('fs');
var server = http.createServer();

server.on('request',function(req,res){
  console.log(req.method);
  if(req.method == 'GET') {
    var resStream = fs.createReadStream('./ajax.html');
    res.writeHead(200,{'Content-Type':'text/html'});
    resStream.pipe(res);
  }else {
    res.end('{"name":"franklife"}');
  }

});

server.listen(3000,function(){
  console.log('server listen on 3000');
});