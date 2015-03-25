var mongoose = require('mongoose');
var _ = require('underscore');

mongoose.connection.on('open',function(){
  console.log('mongodb connected successfully!');
})
mongoose.connect('mongodb://localhost:27017/mtest');
var demoSchema = mongoose.Schema({
  title: String,
  body: String
});
var demoModel = mongoose.model('demo',demoSchema);
var demo = new demoModel({title:'x',body:'x'});
// demo.save(function(err,d,numAffected){
//   if(err) {
//     throw err;
//   }
//   console.log(d);
// })

demoModel.find({title:'x'},function(err,result){
  if(err) {
    throw err;
  }
  result = result[0];
  // result = result.toJSON(); //toObject
  console.log(Object.isExtensible(result));
  result.x = 'y';
  
  console.log(result);
})