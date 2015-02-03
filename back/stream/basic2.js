// /*
// _write
//  */
// var Writable = require('stream').Writable;
// var ws = Writable();

// //All Writable stream implementations must provide a _write() method to send data to the underlying resource.
// //This function MUST NOT be called directly. It should be implemented by child classes, 
// //and called by the internal Writable class methods only.
// ws._write = function(chunk, encoding, cb){
//     console.dir(chunk);
//     cb();
// }
// process.stdin.pipe(ws);

var fs = require('fs');
var ws = fs.createWriteStream('../ignore/message.txt');
ws.write('beep ');
setTimeout(function(){
  ws.end('boop');
},1000);

