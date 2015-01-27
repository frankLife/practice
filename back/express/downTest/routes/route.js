var express = require('express');
var router = express.Router();


router.get(/^\/$|^\/about$/,function(req,res,next){
  res.render('about',{title:'Photo'});
});
router.get('/upload',function(req,res,next){
  res.render('upload');
});
router.post('/upload',function(req,res,next){

});
module.exports = router;