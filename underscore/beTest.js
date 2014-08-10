var testObj = {
    name: 'franklife'
}
function testMap(){
    console.log(_map([1, 2, 3],
            function(num){
                console.log(this.name)
                return num * 3; }
                ,testObj)
            );
}
// testMap();
function testFind() {
  console.log(_find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));
}
// testFind();
function testFilter() {
  console.log(_filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));
}
// testFilter();
function testWhere() {
  console.log(_where([
    {name: 'frank',year:'2014',test: '1'},
    {name: 'lll',year: '2014',test: '2'},
    {name:'frank',year:'2014',test:'3'}]
    , {name: 'frank',year:'2014'}));
}
 // testWhere();
function testFindWhere() {
  console.log(_findWhere([
    {name: 'frank',year:'2014',test: '1'},
    {name: 'frank',year: '2014',test: '2'},
    {name:'frank',year:'2013',test:'3'}]
    , {name: 'frank',year:'2014'}));
}
// testFindWhere();
function testReject() {
  console.log(reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));
}
// testReject();
function testEvery(item) {
  return item % 2 == 0;
}

// console.log(_every([2,4],testEvery));
// console.log(_every([1,2,4],testEvery));
// console.log(_every([1,true]));

function testSome(item) {
  return item % 2 == 0;
}

console.log(some([1,2,4],testSome));
console.log(some({
  step1: 1,
  step2: 1
},testSome));
console.log(some({
  step1: false,
  step2: false
}));
console.log(some([false,true,false]));
