var MongoClient = require('mongodb').MongoClient;

function initConnect(){
  MongoClient.connect('mongodb://localhost:27017/myroom',function(err,openDB){
    if(err) {
      return err;
    }else {
      console.log('db connect success');
    }

    // insertUser(openDB,
    // {
    //   userId:2,
    //   username:'tom',
    //   password:'1',
    //   friends: ['franklife'],
    //   isOnline: false
    // });
    updateUser(openDB,[{username:{ $in: ['franklife','tom']}},{$set:{groupId:[1]}},{multi:true},function(err,result){
      if(err) {
        throw err;
      }
      console.log(result);
    }])
  });
}
function insertUser(db,userData){
  var userCol = db.collection('user');
  userCol.insert(userData,function(err,result){
    if(err) {
      throw err;
    }
    console.log('insert result: ');
    console.log(result);
  });
}
function updateUser(db,param) {
  var userCol = db.collection('user');
  userCol.update.apply(userCol,param);
}
initConnect();