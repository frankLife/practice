var url = require('url');
var querystring = require('querystring');
var tool = require('./tool.js');
var dbfn = require('./dbfn.js');
var getMap = {};
var postMap = {};

getMap['/'] = function(req,res,opt){
  var html = '';

  if(opt == undefined) {
    opt  = {addstr: ''}
  }else if(opt.addstr == undefined) {
    opt.addstr = '';
  }
  dbfn.selectTable(false,function(rows){
    opt.rows = rows;
    html = tool.getPanelHTML(opt);
    tool.sendHTML(html,res);
  });
}
getMap['/archived'] = function(){

}
postMap['/add'] = function(req,res){
  var queryStr = ''
  req.setEncoding('utf-8');
  req.on('data',function(data){
    queryStr += data;
  });
  req.on('end',function(){
    var paramObj = querystring.parse(queryStr);
    console.log('paramObj: ');
    console.log(paramObj);
    dbfn.insertTable(paramObj,function(){
      getMap['/'](req,res,{addstr: paramObj['description'] + '  Added Successfully!'});
    });
  });
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