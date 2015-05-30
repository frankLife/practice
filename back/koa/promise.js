var promise = new Promise(function(resolve,reject){
  resolve(1);
})

console.log(promise.then(function(result){
  console.log(result)
}));