var fs = require('fs');
var fsStream = fs.createReadStream('./chinese.txt');

fsStream.setEncoding('utf-8');
fsStream.on('data',function(chunk){
  console.log(chunk);
})