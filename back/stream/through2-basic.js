var fs = require('fs');
var through2 = require('through2');
var readStream = fs.createReadStream('./through-basic.txt');
var writeStream = fs.createWriteStream('./through-basicOut.txt');


function filterLetter(readStream,writeStream,letter) {
	var code = letter.toString().charCodeAt();
	readStream.pipe(through2(function(chunk,enc,callback) {
		var arr = []
		for(var i = 0, len = chunk.length;i<len;i++) {
			if(chunk[i] != code) {
				arr.push(chunk[i]);
			}
		}
		console.log(arr);
		chunk = new Buffer(arr);
		this.push(chunk);
		callback();
	})).pipe(writeStream);
}

filterLetter(readStream,writeStream,'b');
