var db = [];
exports.save = function(mem) {
  db.push(mem);
}
exports.first = function(obj) {
  return db.filter(function(doc) {
    for(var key in doc) {
      if(doc[key] != obj[key]) {
        return false;
      }
    }
    return true;
  }).shift();
}
exports.clear = function(){
  db = [];
}
exports.doAsyncSave = function(obj,db){
  setTimeout(function(){
    db.push(obj);
    db();
  },1000);
}