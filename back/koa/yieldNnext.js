var koa = require('koa');
var app = koa();

app.use(function *(next){
  yield* next;
})
app.use(function *(next) {
  var self = this;
  console.log(0)
  self.body = 'halo'; 
})

app.listen(3000,function(){
  console.log('server listen on 300 port');
});
