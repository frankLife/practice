var fs = require('fs');
var fsStream = fs.createReadStream('./lorem.txt');
// Attaching a data event listener to a stream that has not been explicitly paused will switch the stream into flowing mode.
// Data will then be passed as soon as it is available.

// call pause() turn stream into paused mode
// readable.read() will not automatically call by binding data event
// explicitly use readable.read() to trigger data event internally
fsStream.pause();

fsStream.on('readable',function(){
  var chunk = '';
  while((chunk = fsStream.read(10)) != null) {
    console.log('go %d bytes of data',chunk.length);
    // console.log(chunk);
  }
});

var total = []
fsStream.on('data', function(chunk){
  total.push(chunk);
})
fsStream.on('end',function(){
  console.log(total.join(''));
});