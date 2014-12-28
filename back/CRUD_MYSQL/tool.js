var ejs = require('ejs');

function sendHTML(html,res) {
  res.setHeader('Content-Type','text/html');
  res.setHeader('Content-Length',Buffer.byteLength(html));
  res.end(html);
}
function getPanelHTML(){
  console.log(ejs);
  var html = ejs.render('./tpl/<%=xxx %>panel.ejs',{xxx: 1});
  return html;
}


exports.sendHTML = sendHTML;
exports.getPanelHTML = getPanelHTML;
