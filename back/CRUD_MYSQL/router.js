var url = require('url');
var querystring = require('querystring');
var tool = require('./tool.js');
var dbfn = require('./dbfn.js');
var getMap = {};
var postMap = {};

getMap['/'] = function(req,res,opt){
  tool.selectRecord(req,res);
}
getMap['/delete'] = function(req,res){
  console.log('into delete');
  tool.deleteRecord(req,res);
}
getMap['/archived'] = function(req,res){
  tool.selectRecord(req,res,{isArchived:true});
}
postMap['/add'] = function(req,res,cb){
  tool.insertRecord(req,res);
}
postMap['/archived'] = function(req,res){
  tool.archivedRecord(req,res)
}


function route(req,res){
  var entrance = url.parse(req.url)['pathname'];
  console.log('entrance: ',entrance);
  if(req.method == 'GET') {
    if(getMap[entrance] != undefined) {
      getMap[entrance](req,res);
    }else {
   //    getMap['/'](req,res);
      tool.serveStatic(req,res,entrance);
    }
  }else if(req.method == 'POST') {
    if(postMap[entrance] != undefined) {
      postMap[entrance](req,res)
    }else {
      res.end('404 error');
    }
  }
}


exports.route = route;