var fs = require('fs');
var path = require('path');

var filePath = path.join(process.cwd(),'/.tasks');
// console.log(typeof process.argv[3]);
// console.log(process.argv);
var args = process.argv.splice(2);
var command = args.shift();
var taskDescription = args;
var methodMap = {
  add: function(){
    taskReadFile(filePath,function(fileTasksArray){
      var resultTasksArray = JSON.stringify(fileTasksArray.concat(taskDescription));
      fs.writeFile(filePath,JSON.stringify(resultTasksArray),function(err){
        if(err) {
          throw err;
        }
        console.log('saved successfully!');
      });
    });
  },
  list: function(tasks){

  }
}
function taskReadFile(filePath,cb) {
  fs.exists(filePath,function(exists){
    if(exists){
      fs.readFile(filePath,function(err,data) {
        if(err) {
          throw err;
        }
        data = data.toString();
        var fileTasksArray = JSON.parse(data);
        cb(fileTasksArray);
      }); 
    }else {
      cb([]);
    }
  });
}
function routerMethod(command){
  methodMap[command]();
}


routerMethod(command);