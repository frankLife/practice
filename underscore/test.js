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
function testBind(par,par2) {
  console.log('par: ' + par);
  console.log('par2: ' + par2);
  console.log('name: ' + this.name);
}
/*
bind(testBind,eachObj,['hello', 'world'])();
*/

function testFind(item) {
  return item == this.name;
}
/*
console.log(find(['Frank','FrankLife','Life'], testFind, eachObj));
console.log(find({name: 'Frank',fullname: 'FrankLife'}, testFind, eachObj));
*/
function testFilter(item) {
  return item % 2 == 0;
}
/*
console.log(filter([1,2,4],testFilter));
console.log(filter({step1: 1,step2: 2,step3: 4},testFilter));
*/
function testHas() {
  console.log(has({name: '1'},'name'));
}
/*
testHas();
*/
function testWhere() {
  console.log(where([
    {name: 'frank',year:'2014',test: '1'},
    {name: 'lll',year: '2014',test: '2'},
    {name:'frank',year:'2013',test:'3'}]
    , {name: 'frank',year:'2014'}));
}
/*
testWhere();
*/
function testFindWhere() {
    console.log(findWhere([
    {name: 'frank',year:'2014',test: '1'},
    {name: 'lll',year: '2014',test: '2'},
    {name:'frank',year:'2014',test:'3'}]
    , {name: 'frank',year:'2014'}));
}
/*
testFindWhere();
*/
function testReject(item) {
  return item % 2 == 0;
}
/*
console.log(reject([1,2,4],testReject));
console.log(reject({step1: 1,step2: 2,step3: 4},testReject));
*/
function testEvery(item) {
  return item % 2 == 0;
}
/*
console.log(every([2,4],testEvery));
console.log(every([1,2,4],testEvery));
console.log(every([1,true]));
*/
function testSome(item) {
  return item % 2 == 0;
}
/*
console.log(some([1,2,4],testSome));
console.log(some({
  step1: 1,
  step2: 1
},testSome));
console.log(some({
  step1: false,
  step2: false
}));
console.log(some([false,null,false]));
*/
function testContains() {
  console.log(contains([1,2,4],1));
  console.log(contains({step1:1,step2:2},1));
}
testContains()