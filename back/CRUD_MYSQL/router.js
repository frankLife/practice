var url = require('url');
var querystring = require('querystring');
var tool = require('./tool.js');
var dbfn = require('./dbfn.js');
var getMap = {};
var postMap = {};

getMap['/'] = function(req,res,opt){
  tool.selectRecord(req,res,opt);
}
getMap['/archived'] = function(){

}
postMap['/add'] = function(req,res,cb){
  tool.insertRecord(req,res);
}

function route(req,res){
  var entrance = url.parse(req.url)['pathname'];
  console.log('entrance: ',entrance);
  if(req.method == 'GET') {
    if(getMap[entrance] != undefined) {
      getMap[entrance](req,res);
    }else {
      getMap['/'](req,res);
    }
  }else if(req.method == 'POST') {
    postMap[entrance](req,res)
  }
}


exports.route = route;