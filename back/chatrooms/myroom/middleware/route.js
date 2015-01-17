var url = require('url');
var models = require('../models');
function route(resMap){
  return function (req,res,next){
    var reqPathName = url.parse(req.url)['pathname'];
    if(resMap[req.method] != undefined &&
    resMap[req.method][reqPathName] != undefined) {
      models[resMap[req.method][reqPathName]](req,res);
    }else {
      serve404(res);
    }
  };
}
function serve404(res){
  res.statusCode = 404;
  res.setHeader('Content-Type','text/plain');
  res.end('Not Found');
}

exports.route = route;