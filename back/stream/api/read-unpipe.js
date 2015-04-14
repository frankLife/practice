// process.stdin.pipe(process.stdout);
var readStream = require('fs').createReadStream('lorem.txt');

readStream.pipe(process.stdout);
if(process.argv[2] == 1) {
  setTimeout(function(){
    readStream.unpipe(process.stdout);
    
    // Note that process.stderr and process.stdout are never closed until the process exits,
    // regardless of the specified options.
    // so process.stdout can't end
    // process.stdout.end();
  },50)
}
