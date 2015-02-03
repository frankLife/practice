// When a chunk of data can be read from the stream, it will emit a 'readable' event.
process.stdin.on('readable',function(){
  // //The read() method pulls some data out of the internal buffer and returns it. If there is no data available, then it will return null.
  // //This method should only be called in non-flowing mode. In flowing-mode, this method is called automatically until the internal buffer is drained.
  // var buf = process.stdin.read();
  
  var buf = process.stdin.read(3);
  //we need to give node a "kick" to tell it that we are interested in more data past the 3 bytes that we've already read
  process.stdin.read(0);

  //When the stream is finished, .read() returns null because there are no more bytes to fetch
  console.dir(buf);
});

// (echo abc; sleep 1; echo def; sleep 1; echo ghi) | node remote.js 




