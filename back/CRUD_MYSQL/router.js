var url = require('url');
var tool =  require('./tool.js');

var getMap = {};
var postMap = {};

getMap['/'] = function(req,res){
  var html = '';
  html = tool.getPanelHTML();
  console.log('html: ',html);
  tool.sendHTML(html,res);
}

function route(req,res){
  if(req.method == 'GET') {
    var entrance = url.parse(req.url)['pathname'];
    console.log('entrance: ',entrance);
    if(getMap[entrance] != undefined) {
      getMap[entrance](req,res);
    }
  }
}


exports.route = route;