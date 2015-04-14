var fs = require('fs');
var readStream = fs.createReadStream('./chinese.txt');
var writeStream = fs.createWriteStream('./pipe.txt');


writeStream.on('pipe',function(){
  console.error('something is piping into the writer');
})
//finish event can only trigger once ?
writeStream.on('finish',function(){
  console.error('all writes are now complete.');
})

writeStream.on('unpipe', function(src) {
  console.error('something has stopped piping into the writer');
});
readStream.on('end', function(){
  console.log('get end');
  // call immediately will directly trigger unpipe event
  // readStream.pipe(writeStream);
})

readStream.pipe(writeStream);
//since finish piping, call after a delay,it will happening nothing after pipe event will be called again
setTimeout(function(){
  readStream.pipe(writeStream);
},200)

// readStream.on('end', function(){
//   console.log('get end');
//   readStream.pipe(writeStream);
// })



//1. bind `end` event before pipe
// something is piping into the writer
// get end
// all writes are now complete.
// something has stopped piping into the writer

//2. bind `end` event after pipe
// something is piping into the writer
// all writes are now complete.
// something has stopped piping into the writer
// get end
