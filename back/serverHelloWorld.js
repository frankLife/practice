/* simple start
var http = require('http');
http.createServer(function(req,res){
  console.log('a request into');
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('Hello World');

}).listen(3000);
*/

/* start based on event & callback
var http = require('http');
var server = http.createServer();

server.on('request',function(req,res){
  console.log("req.url: ",req.url);
  if(req.url == '/favicon.ico') {
    console.log('A REQUEST INTO');
  }
  res.writeHead('200',{'Content-Type':'text/plain'});
  res.end('Hello Node');
});

server.listen(3000)
console.log('Server Start on 127.0.0.1:3000');
*/

/* use stream to read a big file
var fs = require('fs');
var stream = fs.createReadStream('./ignore/test.mov');
stream.on('data',function(chunk){
  console.log(chunk);
});
stream.on('end',function(){
  console.log('stream finish read');
});
*/

/* use pipe to copy file
var fs = require('fs');
var stream = fs.createReadStream('./ignore/seeyouagain.mp3');
stream.pipe(fs.createWriteStream('./ignore/seeyouagaincopy.mp3'));
*/
