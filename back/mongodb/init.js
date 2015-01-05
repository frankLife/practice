var mongodb = require('mongodb');
/*
var server = new mongodb.Server('127.0.0.1',27017,{});
var client = new mongodb.Db('mtest', server);

client.open(function(err) {
  if (err) throw err;
  client.collection('test_insert', function(err, collection) {
    if (err) throw err;
    console.log('We are now able to perform queries.');
    collection.insert(
    {
      "title": "I like cake",
      "body": "It is quite good."
    },
    {safe: true},
    function(err, documents) {
      if (err) throw err;
      console.log('Document ID is: ' + documents[0]._id);
    }
);
  });
});
*/

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/mtest", function(err, db) {
  if(err) { return console.dir(err); }
  // console.log(db);
  db.collection('test_insert').insert({
    'title': 'hi frank!@_@'
  },
  /* 
    here,w == safe,
    The biggest reason is that the new class will have acknowledged writes on by default,
    or expressed in deprecated wording: MongoClient has safe mode on by default.
  */
  // {w:1}, {safe:true}
  function(err,result){
    console.log(result);
  });
  

});