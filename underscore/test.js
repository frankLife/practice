function testEach(value,key,list) {
  console.log('this: '+ this.name);
  console.log('value: '+ value);
  console.log('key: '+ key);
  console.log('list: ' + list);
}
var eachObj = {
  name: 'FrankLife'
};
each({
  one: 'step1',
  two: 'step2'
},testEach);
each([2,3,4],testEach,eachObj);