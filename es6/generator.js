/*
// yield expression after `yield` operator
var obj = {};
function *setVal(){
  obj.name = yield getVal();
}
function getVal(){
  return 'name';
}

var s = setVal();
var val = s.next().value;
s.next(val)
console.log(obj);
*/



/*
var obj = {};
function *setVal(){
  obj.name = yield* getVal();
}
function getVal(){
  return 'name'
}


var s = setVal();
var val = s.next().value;
console.log('val: ')
console.log(val)  //'n'
console.log(s.next(val))
console.log(obj);
*/


function *a(){
  yield* b();

  /*
  yield* b();
           ^
  TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined
      at a (d:\mine\practice\es6\generator.js:39:10)
      at GeneratorFunctionPrototype.next (native)
      at Object.<anonymous> (d:\mine\practice\es6\generator.js:45:5)
      at Module._compile (module.js:460:26)
      at Object.Module._extensions..js (module.js:478:10)
      at Module.load (module.js:355:32)
      at Function.Module._load (module.js:310:12)
      at Function.Module.runMain (module.js:501:10)
      at startup (node.js:129:16)
      at node.js:814:3
  */
}
function b(){
  console.log('just console');
}

a().next();

