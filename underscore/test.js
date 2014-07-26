function testEach(value,key,list) {
  console.log('this: '+ this.name);
  console.log('value: '+ value);
  console.log('key: '+ key);
  console.log('list: ' + list);
}
var eachObj = {
  name: 'FrankLife'
};
/*
each({
  one: 'step1',
  two: 'step2'
},testEach);
each([2,3,4],testEach,eachObj);
*/

function testMakeArray () {
  console.log(Tool.makeArray(arguments));
  console.log(Type.isArray(Tool.makeArray(arguments)));
}
function testMap(value,key) {
  console.log('this: ' + this.name);
  console.log('value: ' + value);
  console.log('key: ' + key);
  return value * 2;
}

console.log(map([2,3,4], testMap, eachObj));
console.log(map({
  step1: 1,
  step2: 2
},testMap));