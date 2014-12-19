var http = require('http');
var path = require('path');
var fs = require('fs');
var mine = require('mime');
var cache = {};

function send404(response){
  response.writeHead('404',{'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found');
  response.end();
}
/* use fileContents due to there is a file content cache */
function sendFile(response,filePath,fileContents){
  response.writeHead('200',{'Content-Type': mine.lookup(path.basename(filePath))});
  response.write(fileContents);
  response.end();
}
function serveStatic(response, cache, absPath) {
  if(cache[absPath]) {
    sendFile(response,absPath,cache[absPath]);
  }else {
    fs.exists(absPath,function(isExsits){
      if(isExsits) {
        fs.readFile(absPath,function(err,fileContents){
          if(err) {
            send404(response);
          }else {
            cache[absPath] = fileContents;
            sendFile(response,absPath,fileContents);
          }
        });
      }else {
        send404(response);
      }
    }); 
  }
}

var server = http.createServer();
server.on('request',function(request,response){
  if(request.url = '/') {
    serveStatic(response,cache,'public/index.html');
  }else {
    serveStatic(response,cache, './'+request.url);
  }
});
server.listen(3000,function(){
  console.log('listen on port 3000')
});