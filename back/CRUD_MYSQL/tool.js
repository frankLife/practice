var fs = require('fs');
var path = require('path');
var url = require('url');
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
    opt  = {addstr: '',isArchived: false}
  }
  if(opt.addstr == undefined) {
    opt.addstr = '';
  }
  if(opt.isArchived == undefined) {
    opt.isArchived = false;
  }
  dbfn.selectTable(opt.isArchived,function(rows){
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
function deleteRecord(req,res){
  var paramObj = querystring.parse(url.parse(req.url)['search'].slice(1));
  console.log(paramObj);
  dbfn.deleteTable(paramObj,function(){
    res.end('{"status":1}');
  });
}
function archivedRecord(req,res) {
  var queryStr = [];
  req.on('data',function(data){
    queryStr.push(data);
  });
  req.on('end',function(){
    var paramObj = querystring.parse(queryStr.join(''));
    dbfn.updateTable(paramObj,function(){
      res.end('{"status":1}');
    });
  });
}
function serveStatic(req,res,pathname){
  var isCss = /.css(\?.*)?$/;
  var isJs = /.js(\?.*)?$/;
  var root = __dirname;
  if(isCss.test(pathname)) {
    _readFileNServe('text/css')
  }else if(isJs.test(pathname)) {
    _readFileNServe('text/javascript');
  }else {
    selectRecord(req,res);
  }

  function _readFileNServe(ContentType){
    var requestUrl = path.join(root,pathname);
    console.log('requestUrl: ',requestUrl);
    fs.stat(requestUrl,function(err,stats){
      if(err) {
        if(err.code = 'ENOENT') {
          res.statusCode = 404;
          res.end('Not Found: ' + requestUrl);
        }else {
          res.statusCode = 500
          res.end('Internal Error');
        }
      }else {
        fs.readFile(requestUrl,function(err,data){
          res.setHeader('Content-Type',ContentType);
          res.end(data);
        });
      }
    });
  }
}
exports.sendHTML = sendHTML;
exports.getPanelHTML = getPanelHTML;
exports.selectRecord = selectRecord;
exports.insertRecord = insertRecord;
exports.deleteRecord = deleteRecord;
exports.archivedRecord = archivedRecord;
exports.serveStatic = serveStatic;
