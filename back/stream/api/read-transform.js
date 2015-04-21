var Readable = require('stream').Readable;
var util = require('util');

util.inhertis(reduceLetter,Readable);
function reduceLetter(src,letter,opt){
  Readable.call(this,opt);
  this.src = src;
  this.code = String.charCodeAt(letter);
  src.on('readable',function(){
    this.src.read(0);
  })
}
reduceLetter.prototype._read = function(){
  var chunk = this.src.read();
  if(chunk == null) {
    this.push(null);
    return;
  }
  for(var i = 0,len = chunk.length;i<len;i++) {
    if(chunk[i] == this.code) {
      chunk.splice(i,1);
    }
  }
  this.push(chunk);
}
