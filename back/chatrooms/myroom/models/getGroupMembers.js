var db = require('../util/db');

function getGroupMembers(req,res){
  if(req.body.groupName == undefined) {
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('group found error');
  }
  db.findGroup([{groupName:req.body.groupName},{_id:0,members:1}],function(members){
    data = JSON.stringify(members[0]);
    res.end(data);
  });
}
module.exports = getGroupMembers;
