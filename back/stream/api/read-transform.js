var Readable = require('stream').Readable;
var fs = require('fs');
var util = require('util');

util.inherits(reduceLetter,Readable);

function reduceLetter(src,letter,opt){
  Readable.call(this,opt);
  this.src = src;

  if(Object.prototype.toString.call(letter) == '[object String]' && 
     letter.length == 1) {
    this.code = letter.charCodeAt();
  }else {
    this.code = ''.charCodeAt();  
  }
  var self = this;
  src.on('readable', function(){
    // console.log('readable')
    self.read(0);
  })
  src.on('end', function(){
    // console.log('end')
    self.push(null);
  });
}
reduceLetter.prototype._read = function(){
  var chunk = this.src.read();
  // console.log(chunk);
  if(chunk === null) {
    this.push('');
    return;
  }
  console.log(chunk)
  var outChunk = [];
  //TODO: use buffer write method
  for(var i = 0,len = chunk.length;i<len;i++) {
    console.log('chunk[i]: ',chunk[i])
    if(chunk[i] != this.code) { 
      outChunk.push(chunk.slice(i,i+1));
    }
  }
  this.push(Buffer.concat(outChunk));
}

var stream = new reduceLetter(fs.createReadStream('./transform.txt'),'a');
stream.pipe(process.stdout);


/*
var txt = fs.createReadStream('./lorem.txt');
txt.on('readable',function(){
  console.log(txt.read());
});
*/

