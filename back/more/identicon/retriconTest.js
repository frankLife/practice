// var retricon = require('retricon');
// // var fmt = require('util').format;
// console.log(retricon('kibo', {pixelSize: 16}));
// // console.log(fmt("<img alt='kibo' src='%s' />", retricon('kibo', {pixelSize: 16}).toDataURL()));

var identicon = require('identicon');
var fs = require('fs');
 
// Asynchronous API (base_string, size, callback) 
identicon.generate('ajido', 150, function(err, buffer) {
    if (err) throw err;
 
    // buffer is identicon of the PNG format 
    fs.writeFileSync(__dirname + '/identicon.png', buffer);
});