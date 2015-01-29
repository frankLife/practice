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
  Photo.find({},function(err,photos){
    if(err) {
      throw err;
    }
    console.log(photos);
    res.render('about',{title:'Photo',photos:photos});
  });
  
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
    console.log(util.inspect({fields: fields, files: files}))
    console.dir(files);
    var dirPath = path.join(root,'../ignore/',fields.photoName[0]);
    console.log('dirPath: ',dirPath);
    cut.cut(files.photoImage[0].path,dirPath,false,function(){
      //ignore folder are being served static files,
      //so path should be filename
      var tempPhoto = new Photo({name:fields.photoName,path: fields.photoName[0]});
      tempPhoto.save(function(err){
        if(err) {
          throw err;
        }
      });
      console.log('upload success: ');
      console.log(tempPhoto.name);
      console.log(tempPhoto.path);
    });
    res.redirect('/upload');
  });

});
module.exports = router;