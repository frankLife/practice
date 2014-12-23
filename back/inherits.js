var util = require('util');

// /* inherits events.EventEmitter */
// var events = require('events');

// function Dog(){
//   // events.EventEmitter.call(this);
// }
// util.inherits(Dog,events.EventEmitter);

// var dog = new Dog();
// dog.on('bark',function(msg){
//   console.log(msg);
// });

// dog.emit('bark','hello human~');

/* inherits custome class */
function Animal(name){
  this.name = name;
}
Animal.prototype.speak = function(msg) {
  console.log(msg);
}

function Fish(name){
  Animal.call(this,name);
}
util.inherits(Fish,Animal);
var fish = new Fish('Frank');
fish.speak('hello dog');
console.log(fish);