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
/*
testContains()
*/
function testInvoke() {
  console.log(invoke([[5, 1, 7], [3, 2, 1]], 'sort'));
  console.log(invoke({name: '22px',year:'45px'}, 'toString'));
}
/*
testInvoke();
*/
function testPluck() {
  console.log(pluck([{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60},'xxx'],'name'));
}
/*
testPluck();
*/

function testMax() {
  var stooges = [{name: 'moe', age: 80}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
  console.log(max(stooges, function(stooge){ return stooge.age; }));
  console.log(max([2,3,5,1]));
  console.log(max([2,3,'4',1],function(val){ return parseInt(val)}));
}
/*
testMax();
*/
function testMin() {
  var stooges = [{name: 'moe', age: 80}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
  console.log(min(stooges, function(stooge){ return stooge.age; }));
  console.log(min([2,3,5,1]));
  console.log(min([2,3,'4',1],function(val){ return parseInt(val)}));
}
/*
testMin();
*/
function testSortBy() {
  console.log(sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); }));
  console.log(sortBy([3, 2, 1]));
}
/*
testSortBy();
*/

function testGroupBy() {
  console.log(groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); }));
  console.log(groupBy(['one', 'two', 'three'], 'length'));
  console.log(groupBy({step1: 1, step2: 2}, function(val) { return val%2}));
  console.log(groupBy({step1: 'one', step2: 'two', step3: 'three'},'length'));
}
/*
testGroupBy();
*/
function testIndexBy() {
  var stooges = [{name: 'moe', age: 70}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
  console.log(indexBy(stooges, 'age'));
  console.log(indexBy(stooges, 'name'));
}
/*
testIndexBy();
*/
function testCountBy() {
  console.log(countBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); }));
  console.log(countBy(['one', 'two', 'three'], 'length'));
  console.log(countBy({step1: 1, step2: 2}, function(val) { return val%2}));
  console.log(countBy({step1: 'one', step2: 'two', step3: 'three'},'length'));
  console.log(countBy([1, 2, 3, 4, 5], function(num) {
  return num % 2 == 0 ? 'even': 'odd';
}));
}
/*
testCountBy();
*/
function testClone(deep) {
  var obj = {name: ['name']}
  var cloneObj = clone(obj,deep);
  console.log('obj: ' + obj.name);
  cloneObj.name.push('life');
  console.log('cloneObj: ' + cloneObj.name);
  console.log('obj: ' + obj.name);


  var array = ['name',{name: 'frank'}];
  var cloneArray = clone(array,deep);
  console.log('array:' + array[1].name);
  //这里要打断点且单步调试的时候点开看name属性
  //否则等浏览器把结果都输出之后再点看array的话，属性才开始计算，则结果错误
  //或者直接把name的值打印出来
  console.log(array);
  cloneArray[1].name = 'life';
  console.log('array:');
  console.log(array);
  console.log('cloneArray: ');
  console.log(cloneArray);
}
/*
testClone(false);
testClone(true);
*/
function testShuffle() {
  console.log(shuffle([1, 2, 3, 4, 5, 6]));
  console.log(shuffle({
    'x1': 1,
    'x2': 2,
    'x3': 3,
    'x4': 4,
    'x5': 5,
    'x6': 6
  }));
}
/*
testShuffle();
*/
function testSample() {
  console.log(sample([1, 2, 3, 4, 5, 6]));
  console.log(sample([1, 2, 3, 4, 5, 6],3));
  console.log(sample({
    s1: 1,
    s2: 2,
    s3: 3,
    s4: 4,
    s5: 5,
    s6: 6
  },3));
}
/*
testSample();
*/
function testToArray() {
  console.log('type: ' + Object.prototype.toString.call(arguments));
  console.log('arguments: ');
  console.log(arguments);
  console.log('type: ' + Object.prototype.toString.call(toArray(arguments)));
  console.log(arguments);
}
/*
testToArray(1,2,3,4,5);
*/
function testSize() {
  console.log(size([1,2,3,7]));
  console.log(size({
    s1: 1,
    s2: 2,
    s3: 7
  }));
}
/*
testSize();
*/
function testFirst() {
  console.log(first([5, 4, 3, 2, 1]));
  console.log(first([5, 4, 3, 2, 1],2));
}
/*
testFirst();
*/
function testInitial() {
  console.log(initial([5, 4, 3, 2, 1]));
  console.log(initial([5, 4, 3, 2, 1],2));
}
/*
testInitial();
*/
function testLast() {
  console.log(last([5, 4, 3, 2, 1]));
  console.log(last([5, 4, 3, 2, 1],2));
}
/*
testLast();
*/
function testRest() {
  console.log(rest([5,4,3,2,1]));
  console.log(rest([5,4,3,2,1],2));
  console.log(rest([5,4,3,2,1],-2));
  console.log(rest([5,4,3,2,1],'xxx'));
}
/*
testRest();
*/
function testCompact() {
  console.log(compact([0, 1, false, 2, '', 3]));
}
// testCompact();
function testFlatten() {
  console.log(flatten([1, [2], [3, [[[4]]]]]));
}
testFlatten();