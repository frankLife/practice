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
/* export */
// dbExport('myroom','user','user.dat');
// dbExport('myroom','group','group.dat')

 /* import */
// dbImport('myroom','user','user.dat',function(){
//   console.log('user import ok');
// })
// dbImport('myroom','group','group.dat',function(){
//   console.log('group import ok');
// });

exports.exportDB = function(){
  dbExport('myroom','user','user.dat',function(){
    console.log('group export ok');
  });
  dbExport('myroom','group','group.dat',function(){
    console.log('group export ok')
  });
}
exports.importDB = function(){
  dbImport('myroom','user','user.dat',function(){
  console.log('user import ok');
  })
  dbImport('myroom','group','group.dat',function(){
    console.log('group import ok');
  });
}

