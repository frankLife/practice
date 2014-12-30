function Todo(){
  this.tasks = [];
}
Todo.prototype.add = function(task){
  this.tasks.push(task);
}
Todo.prototype.deleteAll = function(){
  this.tasks = []
}
Todo.prototype.getLength = function(){
  return this.tasks.length;
}
Todo.prototype.doAsync = function(fn){
  setTimeout(fn,1000,true);
}
var todo = new Todo();


module.exports = Todo;
