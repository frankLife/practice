var MongoClient = require('mongodb').MongoClient;
var db = null;
var dbFn = {
  findUser: function(opt,cb){
    var userCol = db.collection('user');
    var findObj = {};
    for(var prop in opt) {
      if(opt[prop] != undefined) {
        findObj[prop] = opt[prop];
      }
    }

    userCol.find(findObj).toArray(function(err,result){
      if(err) {
        throw err;
      }
      cb(result);
    });
  },
  updateUser: function(){
    var userCol = db.collection('user');
    var arg = Array.prototype.slice.call(arguments);
    var cb = arg.pop();

    userCol.update.apply(userCol,arg.concat(function(err,result){
      if(err) {
        throw err;
      }
      cb && typeof db == 'function' && cb(result);
    }));
  }
};

function initConnect(){
  if(db != null) {
    return;
  }
  MongoClient.connect('mongodb://localhost:27017/myroom',function(err,openDB){
    if(err) {
      return err;
    }else {
      console.log('db connect success');
    }
    db = openDB;
  });
}

initConnect();

module.exports = dbFn;
