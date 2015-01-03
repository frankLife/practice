var redis = require('redis');
var client = redis.createClient(6379,'127.0.0.1');

client.on('error',function(err){
  if(err) {
    throw err;
  }
});
client.set('color','red',redis.print);
client.get('color',function(err,data){
  if(err) {
    throw err;
  }
  console.log('color: ',data);
});