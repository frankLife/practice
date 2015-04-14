var fs = require('fs');

function writeMore(stream,count,chunk,encoding,callback){
  var isDealing = false;
  var args = Array.prototype.slice.call(arguments,2);
  function _write(){
    // stream.cork();
    while(count-- > 0 && !isDealing) {
      if(!stream.write.apply(stream,args)) {
        isDealing = true;
      }
    }
    // stream.uncork();
  }
  _write();
  stream.on('drain', function(){
    isDealing = false;
    _write();
  })
}

var writable = fs.createWriteStream('./write.txt');
var chunk = new Buffer('你好你好你好你好你好你好','utf8');
writeMore(writable,100,chunk,'utf8');