var http = require('http');
var fs = require('fs'); 
var server = http.createServer();

server.on('request',function(request,response){
  if(request.url == "/") {
    fs.readFile('./ignore/entries.json',function(err,data){
      if(err) {
        console.log('read error');
        response.writeHead('404',{'Content-Type':'text/plain'});
        response.end('404 Not Found');
        return;
      }
      response.writeHead('200',{'Content-Type':'text/html'});
      response.write(getResData(data));
      response.end();
    });
  }
});

function getResData(data){
  var html = '<html><head><title>Latest Posts</title></head><body><h1>Latest Posts</h1><ul>'
  var postsData = JSON.parse(data.toString());
  for(var i  = 0,len = postsData.length;i<len;i++){
    html += '<li>'+postsData[i]['title']+'</li>'
  }
  html += "</ul></body></html>"

  return html;
}

server.listen('3000',function(){
  console.log('listening on port 3000');
})