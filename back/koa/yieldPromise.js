var fs = require('fs');
var path = require('path');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) reject(error);
      console.log(1);
      console.log(data);
      resolve(data);
    });
  });
};

var gen = function* (){
  console.log(path.join(__dirname,'./yieldNnext.js'));
  var f1 = yield readFile(path.join(__dirname,'./yieldNnext.js'));
  var f2 = yield readFile(path.join(__dirname,'./helloworld.js'));
  console.log(f1.toString());
  console.log(f2.toString());
}
var fn = gen();
console.log(fn.next());
