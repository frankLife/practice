var childProcess = require('child_process');
var spawn = childProcess.spawn;

/*
var ls = spawn('ls',['-lh','/usr']);

ls.stdout.on('data',function(data){
  data = data.toString();
  console.log('stdout: ');
  console.log(data)
});
ls.stderr.on('data',function(data){
  data = data.toString();
  console.log('stderr: ');
  console.log(data)
});
ls.on('close',function(code){
  console.log('child process exited with code ' + code);
});
*/

var mongo = spawn('mongoexport',['-d','myroom','-c','user','-o','user.dat']);
mongo.stdout.on('data',function(data){
  data = data.toString();
  console.log('mongoData: ');
  console.log(data);
});