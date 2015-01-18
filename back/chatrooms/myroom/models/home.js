var tool = require('../util/tool');
var db = require('../util/db');





function home(req,res){
  if(req.session.username == undefined) {
    tool.direct(res,'/html/login.html');
    return;
  }

  db.findUser({username: {$in: req.session.friends}},function(friends){
    tool.renderTpl('home',{session: req.session,friends: friends},function(html){
      tool.sendHTML(res,html);
    });
  });

}
module.exports = home;