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


// var fs = require('fs');
// var ws = fs.createWriteStream('../ignore/message.txt');
// ws.write('beep ');
// setTimeout(function(){
//   //Call this method when no more data will be written to the stream. If supplied, 
//   //the callback is attached as a listener on the finish event.
//   ws.end('boop');
// },1000);


var Writable = require('stream').Writable;
var ws = new Writable({
  highWaterMark: 1
})

ws._write = function(chunk, encoding, cb){
    // console.dir(chunk);
    cb();
}
var index = 0;
//writes will be buffered in memory
while(ws.write('a')) {
  console.log(index++)
}
ws.on('drain',function(){
  console.log('drained!');
});

