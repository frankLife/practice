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
  //respond get API data
  getInfo: function(req,res){
    res.statusCode = 200;
    for(var i = 0,len = postData.length;i<len;i++) {
      var tempObj = postData[i]
      for(var prop in tempObj) {
        res.write(prop +" : "+ tempObj[prop] + '\r\n');
      }
    }

    res.end();
  },
  //render todo HTML
  getTodo: function(req,res){
    var html = '<h1>Todo List</h1>';
    html += '<ul>';
    for(var i = 0,len = postData.length;i<len;i++) {
      var tempObj = postData[i]
      for(var prop in tempObj) {
        html +='<li>' + (prop +" : "+ tempObj[prop]) + '</li>';
      }
    }
    html += '</ul>';
    html += '<form method="post" action=""><input type="text" name="task" /><input type="submit" value="Add Item" />';
    
    res.writeHead(200,{
      'Content-Type': 'text/html; charset="utf-8"',
      'Content-Length': Buffer.byteLength(html)
    })
    res.end(html);
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
    //after form submit ,route again
    var pathname = url.parse(req.url).pathname.slice(1);

    if(pathname in getAPI) {
      getAPI[pathname](req,res);
      return;
    }
    res.end('ok\n');
  });
}
routerRes['GET'] = function(req,res){
  // console.log('req: ');
  // console.log(req);
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
routerRes['DELETE'] = function(req,res){
  var pathname = url.parse(req.url).pathname;
  var deleteIndex = parseInt(pathname.slice(1),10);
  if(isNaN(deleteIndex)) {
    res.statusCode = 400;
    res.end('invalid index item,index: ' + deleteIndex);
  }else if(postData[deleteIndex] == undefined){
    res.statusCode = 404;
    res.end('not find index item,index: ' + deleteIndex);
  }else {
    res.statusCode = 200;
    res.write('ok\n');
    postData.splice(deleteIndex,1);
    for(var i = 0,len = postData.length;i<len;i++) {
      var tempObj = postData[i]
      for(var prop in tempObj) {
        res.write(prop +" : "+ tempObj[prop] + '\r\n');
      }
    }
    res.end();
  }
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
      res.setHeader('Content-Length', stats.size);
      res.statusCode = 200;
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


