var events = require('events');
var util = require('util');
var fs = require('fs');

function Watcher(opt){
  events.EventEmitter.call(this);
  this.watchDir = opt.watchDir;
  this.doneDir = opt.doneDir;
}
util.inherits(Watcher,events.EventEmitter);
Watcher.prototype.watch = function(){
  var self = this;
  console.log('this.watchDir: ',this.watchDir);
  fs.watchFile(this.watchDir,function(){
    console.log('watch emitted!');
    self.emit('process');
  });
}




var watcher = new Watcher({watchDir: './watch',doneDir:'./done'});

watcher.on('process',function(){
  var self = this;
  fs.readdir(this.watchDir,function(err,files){
    if(err) {
      console.log(err);
      return;
    }
    console.log('files: ',files);
    for(var i = 0,len = files.length;i<len;i++) {
      console.log(files[i]);
      // /* cut file from watch directory to done directory */
      // fs.rename(self.watchDir + '/' + files[i],self.doneDir + '/' + files[i].toUpperCase());

      /* copy using stream */
      fs.createReadStream(self.watchDir + '/' + files[i] ).pipe( fs.createWriteStream(self.doneDir + '/' + files[i].toUpperCase()));
    }
  });
});


watcher.watch();