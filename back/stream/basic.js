/*
readable stream basic
 
//we could regard invoking push method as preparing stream data
var stream = require('stream');
var Readable = stream.Readable;
var rs = new Readable;
rs.push('beep ');
rs.push('boop\n');
// there must be a 'push(null)' to implement the readable stream interface. 
// rs.push(null) tells the consumer that rs is done outputting data.
rs.push(null);

rs.pipe(process.stdout);
*/

/*
_read


var stream = require('stream');
var Readable = stream.Readable;
var rs = Readable();

var c = 97;

// All Readable stream implementations must provide a _read method to fetch data from the underlying resource.

// This method is prefixed with an underscore because it is internal to the class that defines it, 
// and should not be called directly by user programs. 
// However, you are expected to override this method in your own extension classes.

// When data is available,
//  put it into the read queue by calling readable.push(chunk). If push returns false, then you should stop reading. When _read is called again, you should start pushing more data.


rs._read = function(){
  rs.push(String.fromCharCode(c++));
  if(c > 'z'.charCodeAt(0)) rs.push(null); 
}

rs.pipe(process.stdout);
 */


// /*
//  _read 2
//  */

// var Readable = require('stream').Readable;
// var rs = Readable();

// var c = 97 - 1;
// var readTimes = 0;
// rs._read = function () {
//   // once the put data is fetched , onece read operate excute again. (?)
//   console.log('\nreadTimes: ',++readTimes);
//     if (c >= 'z'.charCodeAt(0)) return rs.push(null);

//     setTimeout(function () {
//         rs.push(String.fromCharCode(++c));
//     }, 500);
// };

// rs.pipe(process.stdout);

// process.on('exit', function () {
//     console.error('\n_read() called ' + (c - 97) + ' times');
// });
// process.stdout.on('error', process.exit);


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




