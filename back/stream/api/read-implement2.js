var Readable = require('stream').Readable;
var util = require('util');

util.inherits(Counter,Readable);
function Counter(){
  Readable.call(this,arguments);
  this._index = 10000;
}

Counter.prototype._read = function(){ 
  if(this._index >= 0) {
    this.push(new Buffer(this._index-- + '','ascii'));
  }else {
    this.push(null);
  }
}

var stream = new Counter();
stream.pipe(process.stdout);


