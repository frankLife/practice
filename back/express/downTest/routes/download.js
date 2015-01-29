var router = require('express').Router();
var root = __dirname;
router.get(/\/.*/,function(req,res,next){
  //req.url will reduce the prefix part
  console.log(req.url);
  res.download(root + '/../ignore' + req.url);
});

module.exports = router;