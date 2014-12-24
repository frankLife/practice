var http = require('http');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var fs = require('fs');

var server = http.createServer();
var postData = [];
var routerRes = {};
var rootDir = __dirname;
var getAPI = {
  getInfo: function(req,res){
    for(var i = 0,len = postData.length;i<len;i++) {
      var tempObj = postData[i]
      for(var prop in tempObj) {
        res.write(prop +" : "+ tempObj[prop] + '\r\n');
      }
    }

    res.end();
  }
};

routerRes['POST'] = function(req,res){
  var item = '';
  req.setEncoding('utf-8');
  req.on('data',function(chunk){
    item += chunk;
  });
  req.on('end',function(){
    postData.push(querystring.parse(item));
    console.log('postData: ',postData);
    res.end('ok\n');
  });
}
routerRes['GET'] = function(req,res){
  var pathname = url.parse(req.url).pathname;
  console.log('pathname:',pathname);
  pathname = pathname.slice(1);
  if(pathname in getAPI) {
    getAPI[pathname](req,res);
    return;
  }
  var requestUrl = path.join(rootDir,url.parse(req.url).pathname);
  console.log('requestUrl: ' + requestUrl);
  serverStatic(res,requestUrl);
}
routerRes['DELETE'] = funtion(){
  
}
function serverStatic(res,requestUrl){
  res.setHeader('Content-Type','text/html; charset="utf-8"');
  fs.stat(requestUrl,function(err,stats){
    if(err) {
      if(err,code = 'ENOENT'){
        res.statusCode = 404;
        res.end('Not Found: '+ requestUrl);
      }else {
        res.statusCode = 500;
        res.end('Internal Error');
      }
    }else {
      var serveStream = fs.createReadStream(requestUrl);
      serveStream.on('error',function(){
        res.statusCode = 500;
        res.end('Internal Error');
      });
      serveStream.pipe(res);
    }
  });
}
function dealRes(req,res) {
  console.log('req.method: ',req.method);
  routerRes[req.method](req,res);
}

server.on('request',function(req,res){
  dealRes(req,res);
});

server.listen(3000,function(){
  console.log('server listen on 3000 port');
});


