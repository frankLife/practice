/*
readable stream basic
 */
var stream = require('stream');
var Readable = stream.Readable;
var rs = new Readable;
rs.push('beep ');
rs.push('boop\n');
// there must be a 'push(null)' to implement the readable stream interface. (?)
rs.push(null);

rs.pipe(process.stdout);