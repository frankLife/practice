

// Pull off a header delimited by \n\n
// use unshift() if we get too much
// Call the callback with (error, header, stream)
var StringDecoder = require('string_decoder').StringDecoder;
function parseHeader(stream, callback) {
  stream.on('error', callback);
  stream.on('readable', onReadable);

  var decoder = new StringDecoder('utf8');
  var header = '';
  function onReadable() {
    console.log('trigger readable event');
    var chunk;
    while (null !== (chunk = stream.read())) {
      var str = decoder.write(chunk);

      // console.log(str);
      if (str.match(/\r\n/)) {
        // unshift will trigger readable event,
        // so it need off handler beforehand
        // 
        // ( ps: When you call stream.
        // unshift() if will emit the data event immediately if the stream is in flowing mode.)
        // 
        stream.removeListener('error', callback);
        stream.removeListener('readable', onReadable);
        // found the header boundary
        var split = str.split(/\r\n/);
        header += split.shift();
        var remaining = split.join('\r\n');
        // console.log(remaining);
        var buf = new Buffer(remaining, 'utf8');
        if (buf.length) {
          // console.log(chunk)
          // console.log(buf);
          stream.unshift(chunk);
        }

       
        // now the body of the message can be read from the stream.
        // console.log(stream.read());
        callback(null, header, stream);
        break;
      } else {
        // still reading the header.
        header += str;
      }
    }
  }
}


var fs = require('fs');
var readable = fs.createReadStream('./unshift.txt');

// so that the stream can be passed on to some other party
parseHeader(readable,function(err,header,stream){
  if(err) {
    throw err;
  }
  console.log('header: ');
  console.log(header);
  

  console.log('body: ');
  stream.pipe(process.stdout);
})




/*

var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;
var readable = fs.createReadStream('./unshift.txt');
readable.on('readable',function(){
  var chunk;
  while( null != (chunk = readable.read())) {
    var decoder = new StringDecoder('utf8');
    console.log(decoder.write(chunk));
    readable.unshift(chunk);
  }
});
*/