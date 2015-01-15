function route(resMap){
  return function (req,res,next){
    if(resMap[req.method] != undefined) {
      if()
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