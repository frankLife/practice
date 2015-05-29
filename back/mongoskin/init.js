var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/mtest", {native_parser:true});
db.bind('article').bind({
    getByAuthor: function(author_id, callback) {
      this.findOne({author_id: author_id}, callback);
    },
    insertArticle: function(opt,callback){
      this.insert({
        author_id: opt.author_id,
        content: opt.content,
        time: opt.time
      },function(err,result){
        callback(err,result);
      })
    }
});

// db.article.getByAuthor(author_id, function(err, article) {
//         console.log(article);
// });
db.article.insertArticle({
  author_id: 1,
  content: 'mXm',
  time: Date.now()
},function(err,result){
  if(err) {
    throw err;
    return;
  }
  console.log(result);
});
