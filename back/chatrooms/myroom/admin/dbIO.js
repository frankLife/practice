var exec = require('child_process').exec;
function dbExport(db,collection,file,cb){
  exec('mongoexport -d ' + db +' -c '+collection+' -o ' + file,
  function(error,stdout,stderr){
    console.log(''+stderr);
    console.log(''+stdout);
    if(error != null) {
      console.log('exec error: ' + error);
    }
    cb&&cb();
  });
}
function dbImport(db,collection,file,cb){
  exec('mongoimport -d '+db+' -c '+collection+' '+file,
  function(error,stdout,stderr){
    console.log(''+stderr);
    console.log(''+stdout);
    if(error != null) {
      console.log('exec error: ' + error);
    }
    cb&&cb();
  });
}

// dbExport('myroom','user','user.dat');
dbImport('myroom','user','user.dat',function(){
  console.log('insert ok');
})


