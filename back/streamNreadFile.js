var fs = require('fs');


function readByReadFile(path){
  var oldTime = Date.now();
  fs.readFile(path,function(err,data){
    if(err) {
      console.log('readFile error');
      return;
    }
    console.log('cost time: ', Date.now() - oldTime);
    console.log("readByReadFile: ",data.toString());
  });
}

function readByReadStream(path){
  var dataStream = fs.createReadStream(path);
  var data = ''
  var oldTime = Date.now();
  // If you attach a data event listener, then it will switch the stream into flowing mode, 
  // and data will be passed to your handler as soon as it is available.
  dataStream.on('data',function(chunk){
    data += chunk;
    // console.log(chunk);
  });
  dataStream.on('end',function(){
    console.log('cost time: ', Date.now() - oldTime);
    console.log('readByReadStream: ',data);
  });

  // console.log('readByReadStream: ',data);
}

readByReadFile('./ignore/entries.json');
readByReadStream('./ignore/entries.json');


