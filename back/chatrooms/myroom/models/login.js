var db = require('../util/db');
var fs = require('fs');

function login(req,res){
  db.findUser({username:req.body.username},function(result){
    if(result.length > 0 && result[0].password == req.body.password) {
      console.log('login success');
      res.end('login success');
    }else {
      serveLogin(res);
    }
  });
}
function serveLogin(res){
  fs.readFile('../public/html/login.html',function(err,data){
    res.writeHead('200',{'Content-Type':'text/html'});
    res.end(data);
  });
}

exports.login = login