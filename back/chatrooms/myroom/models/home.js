var tool = require('../util/tool');
function home(req,res){
  console.log(req.session);
  tool.renderTpl('home',req.session,function(html){
    console.log(html);
    tool.sendHTML(res,html);
  });
}
module.exports = home;