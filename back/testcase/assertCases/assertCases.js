var assert = require('assert');
var Todo = require('./todo');
var testsCompleted = 0;
var todo = new Todo();
function test(){
  todo.add('kill me');
  // console.log(todo.getLength());
  assert.equal(todo.getLength(),1,'there should be a task to do');
  
  // assert.equal(todo.getLength(),2,'there should be two tasks to do');
  // assert.notEqual(todo.getLength(),1,'there shouldn"t be one task to do');
  
  todo.deleteAll();
  // console.log(todo.getLength());
  assert.equal(todo.getLength(),0,'there is not task');
  testsCompleted++;
}
function test2(){
  todo.doAsync(function(value){
    assert.ok(value,'the value should be set true');
    testsCompleted++;
    console.log('Completed ' + testsCompleted + ' tests'); 
  });
}
function test3(){
  assert.throws(todo.add,/undefined/);
  testsCompleted++;
}
test();
test3();
test2();