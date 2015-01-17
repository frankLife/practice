/*
var resMap = {
  'GET': {},
  'POST': {}
};
*/
/*
{
'GET': {
  '/login.html' : function(req,res) {},
  '/index.html' : function(req,res) {}
},
'POST': {
  '/login' : function(req,res){},
  '/sendMessage': function(req,res){}
}
}
*/

function getRouter (resMap) { 
  return new Router(resMap);
}

function Router(){
  this.resMap = {};
}
Router.prototype.addRouteBySchema = function(resMap){
  for(var method in resMap) {
    if(this.resMap[method] == undefined) {
      this.resMap[method] = {};
    }
    for(var model in resMap[method]) {
      this.resMap[method][model] = resMap[method][model];
    }
  }
  return this;
}
Router.prototype.addSingleRoute = function(method,path,model){
  if(this.resMap[method] == undefined) {
    this.resMap[method] = {};
  }
  this.resMap[method][path] = model;
  return this;
}



module.exports = getRouter;