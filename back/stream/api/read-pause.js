var fs = require('fs');
var fsStream = fs.createReadStream('./lorem.txt');

fsStream.on('data', function(chunk){
  console.log(chunk);
  console.log('paused,after 1s it will resume');
  fsStream.pause();

  setTimeout(function(){
    fsStream.resume();
    console.log('resume');
  },1000)
})