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
/*
console.log(map([2,3,4], testMap, eachObj));
console.log(map({
  step1: 1,
  step2: 2
},testMap));
*/
function testReduce(memo,value) {
  return memo * value;
}
/*
console.log(reduce([1,2,3],testReduce,0));
console.log(reduce({
  step1: 1,
  step2: 2
},testReduce,0));
*/
function testReduceRight(memo,value) {
  return memo.concat(value);
}
/*
console.log(reduceRight([[0,1],[2,3],[4,5]],testReduceRight,[]));
console.log(reduceRight({
  step2: [1,2],
  step1: [3,4]
},testReduceRight));
*/