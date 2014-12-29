var fs = require('fs');
var ejs = require('ejs');

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
  if(opt == undefined) {
    opt  = {addstr: ''}
  }else if(opt.addstr == undefined) {
    opt.addstr = '';
  }
  //renderFile use readFileSync ,so is a Synchronous process
  ejs.renderFile('./tpl/panel.ejs',opt,function(err,str){
    html = str;
  })
  return html;
  // return html;
}
function insertRecord(){

}

exports.sendHTML = sendHTML;
exports.getPanelHTML = getPanelHTML;
