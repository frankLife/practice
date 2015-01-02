var fs = require('fs');
var querystring = require('querystring');
var ejs = require('ejs');
var dbfn = require('./dbfn.js');

function sendHTML(html,res) {
  res.setHeader('Content-Type','text/html');
  res.setHeader('Content-Length',Buffer.byteLength(html));
  res.end(html);
}
function getPanelHTML(opt){
  // // var html = ejs.render('./tpl/<%=xxx %>panel.ejs',{xxx: 1});

  // var tpl = fs.readFileSync('./tpl/panel.ejs').toString();
  // var html = ejs.render(tpl);
  var html = ''

  //renderFile use readFileSync ,so is a Synchronous process;
  //renderFile doesn't need config filename when using include function
  ejs.renderFile('./tpl/panel.ejs',opt,function(err,str){
    html = str;
  })
  return html;
  // return html;
}
function selectRecord(req,res,opt){
  if(opt == undefined) {
    opt  = {addstr: ''}
  }else if(opt.addstr == undefined) {
    opt.addstr = '';
  }
  dbfn.selectTable(false,function(rows){
    opt.rows = rows;
    html = getPanelHTML(opt);
    sendHTML(html,res);
  });
}
function insertRecord(req,res){
  var queryStr = [];
  req.setEncoding('utf-8');
  req.on('data',function(data){
    queryStr.push(data);
  });
  req.on('end',function(){
    queryStr = queryStr.join('')
    var paramObj = querystring.parse(queryStr);
    console.log('paramObj: ');
    console.log(paramObj);
    dbfn.insertTable(paramObj,function(){
      selectRecord(req,res,{addstr: paramObj['description'] + '  Added Successfully!'});
    });
  });
}

exports.sendHTML = sendHTML;
exports.getPanelHTML = getPanelHTML;
exports.selectRecord = selectRecord;
exports.insertRecord = insertRecord;
