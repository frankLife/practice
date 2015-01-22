var MongoClient = require('mongodb').MongoClient;

function initConnect(){
  MongoClient.connect('mongodb://localhost:27017/myroom',function(err,db){
    if(err) {
      throw err;
    }else {
      console.log('db connect successfully');
    }

    insertGroup(db,{
      groupId:1,
      members: ['franklife','tom']
    })
  });
}
function insertGroup(db,groupData){
  var groupCol = db.collection('group');
  groupCol.insert(groupData,function(err,result){
    if(err) {
      throw err;
    }
    console.log('insert result');
    console.log(result);
  });
}

initConnect();