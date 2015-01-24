var tool = require('../util/tool');
var db = require('../util/db');





function home(req,res){
  if(req.session.username == undefined) {
    tool.direct(res,'/html/login.html');
    return;
  }

  db.findUser({username: {$in: req.session.friends}},function(friends){
<<<<<<< HEAD
    db.findGroup({group: {$in: req.session.group}},function(groups){
=======
    db.findGroup([{groupId: {$in:req.session.groupId}},{groupName:1,_id:0}],function(groups){
>>>>>>> 82e03b3d599142e4ab19cf948ebdf4b9d896e525
      tool.renderTpl('home',{session: req.session,friends: friends,groups:groups},function(html){
        tool.sendHTML(res,html);
      });
    })
  });

}
module.exports = home;