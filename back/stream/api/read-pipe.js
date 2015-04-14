var fs = require('fs');
var zlib = require('zlib');
var fsStream = fs.createReadStream('./lorem.txt');
var writeStream = fs.createWriteStream('./lorem.txt.gz');
var gzip = zlib.createGzip();

fsStream.pipe(gzip).pipe(writeStream);
