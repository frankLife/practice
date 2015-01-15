/*
var resMap = {
  'GET': {},
  'POST': {}
};
*/
/*
{
'get': {
  '/login.html' : function(req,res) {},
  '/index.html' : function(req,res) {}
},
'post': {
  '/login' : function(req,res){},
  '/sendMessage': function(req,res){}
}
}
*/


function getRouter (resMap) { 
  return new Router(resMap);
}
function Router(resMap){
  this.resMap = resMap;
}

function addRouteBySchema(schema){

}
function addSingleRoute(method,type){

}

module.exports = getRouter;