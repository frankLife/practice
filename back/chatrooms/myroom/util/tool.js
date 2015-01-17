var ejs = require('ejs');

function renderTpl(tpl,data,cb){
  var html = '';
  ejs.renderFile(__dirname+'/../tpl/' + tpl +'.ejs',data,function(err,str){
    if(err) {
      throw err;
    }
    console.log('str: ');
    console.log(str);
    html = str;
    cb(html)
  });

}
function direct(res,url){
  res.writeHead(302,{'Location':url});
  res.end();
}
function sendHTML(res,html){
  res.writeHead(200,{
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(html)
  });
  res.end(html);
}
exports.direct = direct;
exports.renderTpl = renderTpl;
exports.sendHTML = sendHTML;
