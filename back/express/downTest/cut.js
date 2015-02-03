var fs = require('fs');
var path = require('path');

function cut(oldPath,newPath,isKeepExt,cb) {
  if(isKeepExt) {
    if(path.extname(oldPath) != path.extname(newPath)) {
      throw new Error('file extension name should be keep the same');
    }
  }
  fs.rename(oldPath,newPath,function(err){
    if(err && err.code == 'EXDEV') {
      transport(oldPath,newPath,cb);
      return;
    }
    cb && cb();
  });
}
function transport(oldPath,newPath,cb){
  var readStream = fs.createReadStream(oldPath);
  var writeStream = fs.createWriteStream(newPath);

  readStream.pipe(writeStream);
  readStream.on('close',function(){
    fs.unlink(oldPath,function(err){
      if(err) {
        throw err;
      }
      cb && cb();
    });
  });
}

exports.cut = cut;