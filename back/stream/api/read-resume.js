var fs = require('fs');
var fsStream = fs.createReadStream('./chinese.txt');

// call resume() explicitly turn stream into paused mode
fsStream.resume();

fsStream.on('end',function(){
  console.log('go to the end, but did not do anything');
})