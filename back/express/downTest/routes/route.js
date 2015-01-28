var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var mongoose = require('mongoose');
var util = require('util');
var path = require('path');
var cut = require('../cut');
var root = __dirname;
mongoose.connection.on('open',function(){
  console.log('mongodb connected successfully!');
})
mongoose.connect('mongodb://localhost:27017/mtest');
var photoSchema = mongoose.Schema({
  name: String,
  path: String
});
var Photo = mongoose.model('Photo',photoSchema);

router.get(/^\/$|^\/about$/,function(req,res,next){
  res.render('about',{title:'Photo'});
});
router.get('/upload',function(req,res,next){
  res.render('upload',{title:'upload'});
});
router.post('/upload',function(req,res,next){
  var form = new multiparty.Form();
  form.parse(req,function(err,fields,files) {
    if(err) {
      throw err;
    }
    // console.log(util.inspect({fields: fields, files: files}))
    console.dir(files);
    var dirPath = path.join(root,'/ignore/',fields.photoName);
    cut.cut(files.photoImages[0].path,dirPath,false,function(){
      var tempPhoto = new Photo({name:fields.photoName,path:dirPath});
      console.log('upload success: ');
      console.log(tempPhoto.name);
      console.log(tempPhoto.path);
    });
    res.redirect('/upload');
  });

});
module.exports = router;