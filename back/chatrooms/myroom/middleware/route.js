var path = require('path');
function route(resMap){
  return function (req,res,next){
          var reqPathName = path.parse(req.url)['pathname'];
    if(resMap[req.method] != undefined &&
    resMap[req.method][reqPathName] != undefined) {
      resMap[req.method][reqPathName](req,res);
    }else {
      serve404(res);
    }
  };
}
function serve404(res){
  res.statusCode = 404;
  res.setHeader('Content-Type','text/html');
  res.end('Not Found');
}