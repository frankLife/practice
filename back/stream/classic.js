// /* classic readable stream */
// var Stream = require('stream');
// var stream = new Stream;
// stream.readable = true;

// var c = 64;
// var iv = setInterval(function(){
//   if(++c >= 75) {
//     clearInterval(iv);
//     stream.emit('end');
//   }else {
//     stream.emit('data', String.fromCharCode(c));
//   }
// },200);

// stream.pipe(process.stdout);


// (echo beep; sleep 1; echo boop) | node classic1.js 
process.stdin.on('data', function(data){
  console.log(data)
}); 
process.stdin.on('end', function(data){
  console.log('__END__');
});






