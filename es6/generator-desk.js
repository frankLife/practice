/*
function* longRunningTask() {
  var value1 = yield step1();
  var value2 = yield step2(value1);
  var value3 = yield step3(value2);
  var value4 = yield step4(value3);
}

function step1(){ return 1; }
function step2(val){ return val + 1; }
function step3(val) { return val + 2; }
function step4(val) { return val + 3; }

var l = longRunningTask();
var step1Val = l.next().value; //1
var step2Val = l.next(step1Val).value; //2
var step3Val = l.next(step2Val).value; //4
var step4Val = l.next(step3Val).value; //7
*/

var delegatedIterator = (function* () {
  yield 'Hello!';
  yield 'Bye!';
}());

var delegatingIterator = (function* () {
  yield 'Greetings!';
  yield* delegatedIterator;
  yield 'Ok, bye.';
}());

var gen = delegatingIterator;
var val = {};
while((val = gen.next()) && (val.done == false)) {
    console.log(val.value);
}


/*
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