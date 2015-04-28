
var util = require('util');
var fs = require('fs');
var Writable = require('stream').Writable;

util.inherits(myWrite,Writable);
function myWrite(opt){
  Writable.call(this,opt);
}
myWrite.prototype._write = function(chunk){
  console.log(chunk.toString());
}

var readStream = fs.createReadStream('./chinese.txt');
var write = new myWrite();
readStream.pipe(write);
