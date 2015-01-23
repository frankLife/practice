var MongoClient = require('mongodb').MongoClient;

function initConnect(){
  MongoClient.connect('mongodb://localhost:27017/myroom',function(err,db){
    if(err) {
      throw err;
    }else {
      console.log('db connect successfully');
    }

    // insertGroup(db,{
    //   groupId:1,
    //   members: ['franklife','tom']
    // })
    
    
    updateGroup(db,[{groupId:1},{$set:{groupName:'heartTalk'}},function(result){
      console.log(result + ' was update successfully ');
    }]);
  });
}
function insertGroup(db,groupData){
  var groupCol = db.collection('group');
  groupCol.insert(groupData,function(err,result){
    if(err) {
      throw err;
    }
    console.log('insert result: ');
    console.log(result);
  });
}
function updateGroup(db,param){
  var groupCol = db.collection('group');
  var paramFn = param[param.length-1];
  var fn = null;
   if(typeof paramFn == 'function') {
      paramFn = param.pop();
      fn = function(err,result){
        if(err) {
          throw fn;
        }
       paramFn(result);
      }
   }else {
    fn = function(err,result){
      if(err) {
        throw err;
      }
      console.log(result);
    }
   }
  groupCol.update.apply(groupCol,param.concat(fn));
}

initConnect();