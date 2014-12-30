var vows = require('vows');
var assert = require('assert');
var Todo = require('../assertCases/todo');
//bactch
vows.describe('Todo').addBatch({
  //context
  'add a task': {
    //topic
    topic: function(){
      var todo = new Todo();
      todo.add('kill time');
      return todo;
    },
    //vow
    'it should exist a task':function(er,todo){
      assert.equal(todo.getLength(),1);
    }
  }
}).export(module);