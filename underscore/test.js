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
// testFlatten();
function testWithout() {
  console.log(without([1, 2, 1, 0, 3, 1, 4], 0, 1));
}
// testWithout();
function testPartition() {
  function _isOdd(val) {
    return val % 2 != 0;
  }
  console.log(partition([0, 1, 2, 3, 4, 5], _isOdd));
}
/*
testPartition();
*/
function testUnion() {
  console.log(union([1, 2, 3], [101, 2, 1, 10], [2, 1]));
}
/*
testUnion();
*/
function testSingleArray() {
  console.log(singleArray([1,1,1,1,3,2]));
}
// testSingleArray();
function testIntersection (){
  console.log(intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]));
}
// testIntersection();
function testDifference(){
  console.log(difference([1, 2, 3, 4, 5], [5, 2, 10],1));
}
// testDifference();
function testZip() {
  console.log(zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]));
}
// testZip();
function testObject(){
  console.log(object(['moe', 'larry', 'curly'], [30, 40, 50]));
  console.log(object([['moe', 30], ['larry', 40], ['curly', 50]]));
}
//testObject();
function testIndexOf() {
  console.log(indexOf([1, 2, 3], 2));
  console.log(indexOf([1,2,3],function(val){ return val%2 == 0}));
}
// testIndexOf();
function testLastIndexOf() {
  console.log(lastIndexOf([1, 2, 3, 1, 2, 3], 2));
  console.log(lastIndexOf([1, 2, 3, 1, 2, 3], 2, 0));
  console.log(lastIndexOf([1, 2, 3, 1, 2, 3], 2, 1));
}
// testLastIndexOf();
function testSortedIndex(){
  console.log(sortedIndex([10, 20, 30, 40, 50], 35));
  console.log(sortedIndex([{name: 'moe', age: 40}, {name: 'curly', age: 60}], {name: 'larry', age: 50}, 'age'))
  console.log(sortedIndex([10, 20, 30, 40, 50], 5,function(val){ return +val})); //default sort => asccode
}
// testSortedIndex();
function testRange(){
  console.log(range(10));
    console.log(range(1, 11));
    console.log(range(0, 30, 5));
    console.log(range(0, -10, -1));
    console.log(range(0));
}
//testRange();
function testBind(){
  function demo(age){
    console.log(this.name, age);
  }
  var age = 22;
  var demoBind = bind(demo, {name:'franklife'}, age);

  demoBind();
}
//testBind();
function testBindAll(){
  var buttonView = {
    label  : 'underscore',
    name  :'ud',
    onClick: function(){ console.log('clicked: ' + this.label); },
    onHover: function(){ console.log('hovering: ' + this.label); },
    name: function(){ console.log('name: ', this.name) },
    talkThis: function(){ console.log(this) }
  };
  bindAll(buttonView, 'onClick', 'onHover','talkThis');

  window.addEventListener('click',buttonView.talkThis);
}
//testBindAll();
function testPartial(){
  var add = function(a, b, c) {
    console.log('a: ', a);
    console.log('b: ', b);
    console.log('c: ', c);
    console.log( a*100 + b*10 + c);
  };
  var add5 = partial(add, 5);

  add5(4,3);
}
//testPartial();
function testMemoize(){
  var _hasher = function(codeA,codeB){
    return parseInt(codeA + codeB )%2;
  }
  var memoFunc = memoize(function(paramA, paramB){
    return paramA + paramB;
  })

  console.log(memoFunc(0,2));
  console.log(memoFunc(0,2));
}
//testMemoize();
function testDelay(){
  var log = bind(console.log, console);
  //这里如果直接传入console.log的话，会因为console.log函数中的this指向不正确报错
  //所以会在传入之前绑定好作用域
  delay(log, 100, 'logged later');
}
// testDelay();
function testThrottle(){
  var throttled = throttle(function(){console.log(window.scrollY)}, 1000);
  window.addEventListener('scroll', function(){
    throttled();
    console.log('scroll');
  })
}
//testThrottle();
function testDefer(){
  var log = bind(console.log, console);
  defer(log,1,2);
}
// testDefer();
function testArgs(){
  function _alert(x){
    alert(x);
  }
  defer(_alert,1,2);
}
//testArgs();
function testDebounce(){
   var debounced = debounce(function(){console.log(window.scrollY)}, 8000);
  // var debounced = debounce(function(){console.log(window.scrollY)}, 4000, true);
  window.addEventListener('scroll', function(){
    debounced();
    console.log('scroll');
  })
  var i = 0;
  setInterval(function(){
    console.log(++i);
  },1000);
}
//testDebounce();
function testOnce(){
  function one(){
    alert('yeah!');
  }
  var onced = once(one);
  onced();
  onced();
  onced();
  onced();
}
// testOnce();
function testAfter() {
  var aftered = after(2,function(){alert('hi')});
  // aftered();
  // aftered();
  aftered();
}
//testAfter();
function testBefore(){
  var i = 0;
  var befored = before(3,function() {return ++i;});
  for(var j = 0 ;j<10;j++) {
    console.log(befored());
  }
}
//testBefore();
function testWrap(){
  var hello = function(name) { return "hello: " + name; };
  hello = wrap(hello, function(func) {
    console.log( "before, " + func("moe") + ", after");
  });
  hello();
}
// testWrap();
function testNegate(){
  var negated = negate(function(){return false;});
  console.log(negated());
}
// testNegate();
function testCompose(){
  var greet    = function(name){ return "hi: " + name; };
  var exclaim  = function(statement){ return statement.toUpperCase() + "!"; };
  var welcome = compose(greet, exclaim);
  console.log(welcome('moe'));
}
 //testCompose();
function testKeys(){
  console.log(keys({one: 1, two: 2, three: 3}));
}
// testKeys();
function testValues(){
  console.log(values({one: 1, two: 2, three: 3}));
}
// testValues();
function testPairs(){
  console.log(pairs({one: 1, two: 2, three: 3}));
}
// testPairs();
function testInvert(){
  console.log(invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"}));
}
// testInvert();
function testFunctions(){
  var obj = {
    a: function(){},
    b: 'ok',
    c: function(){}
  }

  console.log(functions(obj));
}
// testFunctions();
function testExtend(){
  console.log(extend({name: 'moe'}, {age: 50},{name:'frank'}));
}
// testExtend();
function testPick(){
  console.log(pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age'));
  console.log(pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
  return value == 'moe';
}))
}
// testPick();
function testOmit(){
  console.log(omit({name: 'moe', age: 50, userid: 'moe1'}, 'userid'));
   console.log(omit({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
  return value == 'moe';
}))
}
// testOmit();
function testDefaults(){
  var iceCream = {flavor: "chocolate"};
  console.log(defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"},{sprinkles:'pink',name:'xxx'}));
  
}
// testDefaults();
function testProperty(){
  var moe = {name: 'moe'};
  console.log('moe' === property('name')(moe));
}
// testProperty();
function testMatches(){
  var ready = matches({selected: true, visible: true});
  var readyToGoList = filter([{selected: true},{selected: true, visible: true,name: 'frank'}], ready);
  console.log(readyToGoList);
}
// testMatches();
function testIsEmpty(){
  console.log(isEmpty([1, 2, 3]));
  console.log(isEmpty({}));
}
// testIsEmpty();
function testIsElement(){
  console.log(isElement(document.body));
  console.log(isElement(document));
}
// testIsElement();
function testIsArguments(){
  console.log((function(){ return isArguments(arguments); })(1, 2, 3));
  console.log(isArguments([1,2,3]));
}
// testIsArguments();
function testInfinity(){
  console.log(isInfinite(101));
  console.log(isInfinite(-Infinity));
  console.log(isInfinite(Infinity));
}
// testInfinity();
function testIsDate(){
  console.log(isDate(new Date()));
  console.log(isDate('xxx'));
}
// testIsDate();
function testIsRegExp(){
  console.log(isRegExp(/xx/));
  console.log(isRegExp('xx'));
}
// testIsRegExp();
function testIsNaN_(){
  console.log(isNaN_(undefined));
  console.log(isNaN(undefined));
}
// testIsNaN_();
function testIsNull(){
  console.log(isNull(null));
  console.log(isNull(undefined));
}
// testIsNull();
function testIsUndefined(){
  console.log(isUndefined(undefined));
  console.log(isUndefined(null));
}
testIsUndefined();
