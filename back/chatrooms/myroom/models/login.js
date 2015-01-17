var db = require('../util/db');
var tool = require('../util/tool');
var fs = require('fs');



function login(req,res){
  console.log('username:req.body.username: '+req.body.username);
  db.findUser({username:req.body.username},function(result){
    console.log('findUserResult: ');
    console.log(result);
    console.log(req.body);
    if(result.length > 0 && result[0].password == req.body.password) {
      result = result[0];
      for(var item in result) {
        req.session[item] = result[item];
      }

      /*can't no change reference to session,
      there are some assist properties upon it */
      // req.session = result;
      tool.direct(res,'/');
    }else {
      tool.direct(res,'/app/html/login.html');
    }
  });
}


module.exports = login; 