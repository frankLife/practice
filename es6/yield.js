// function *g(){
//   yield (function(){ console.log(0.1); setTimeout(function(){console.log(1)},1000)})()
//   yield (function(){ console.log(0.2); setTimeout(function(){console.log(2)},1000)})()
//   yield (function(){ console.log(0.3); setTimeout(function(){console.log(3)},1000)})()
// }

// for(let i of g()) {}


// var promise = new Promise(function(resolve, reject) {
//   resolve("ok");
//   setTimeout(function() { throw new Error('test') }, 0)
// });
// promise.then(function(value) { console.log(value) });

var someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
}).then(function() {
  console.log('carry on');
});