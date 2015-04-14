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
})

// pipe will trigger write stream `finish` & `unpipe` event when it finished
// readStream.pipe(writeStream);


/*
readStream.pipe(writeStream);
setTimeout(function(){
  readStream.unpipe(writeStream);
  setTimeout(function(){
    readStream.pipe(writeStream);
  },200)
},0)

// result: 
// something is piping into the writer
// something has stopped piping into the writer
// something is piping into the writer
// all writes are now complete.
// something has stopped piping into the writer
*/

//the first time pipe will comsume all read stream data
readStream.pipe(writeStream);
setTimeout(function(){
  readStream.unpipe(writeStream);
  setTimeout(function(){
    readStream.pipe(writeStream);
  },200)
},20)

// result: 
// something is piping into the writer
// all writes are now complete.
// something has stopped piping into the writer
// something is piping into the writer

