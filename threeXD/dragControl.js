(function(){
window.dragControl = dragControl;
function dragControl(opt){
  this.el = opt.el;
  this.action = {
    moveAction : opt.moveAction
  }
  this.isStart = false;
  this.startCoord = {
    left: "",
    top: ""
  } 
  this.endCoord = {
    left: "",
    top: ""
  }
  this.curCoord = {
    left: "",
    top: ""
  }

  this.init();
}

dragControl.prototype.getCoord = function(coordType) {
  switch(coordType) {
    case 'start':
      return this.startCoord;
    case 'end': 
      return this.endCoord;
    case 'cur': 
      return this.curCoord;
    default: 
      console.log('coordType: ',coordType);
  }
}

dragControl.prototype.dragStart = function() {
  var self = this;
  return function(e){
    self.startCoord.left = e.clientX;
    self.startCoord.top = e.clientY; 
    self.isStart = true;
  }
}
dragControl.prototype.dragMove = function() {
  var self = this;
  return function(e){
    if(!self.isStart) {
      console.log('self.isStart: ',self.isStart);
      return;
    }
    self.curCoord.left = e.clientX;
    self.curCoord.top = e.clientY;
    if(typeof self.action.moveAction == 'function') {
      self.action.moveAction.apply(self);
    }else {
      console.log(typeof self.action.moveAction)
    }
  }
}
dragControl.prototype.dragEnd = function() {
  var self = this;
  return function(e){
    self.endCoord.left = e.clientX;
    self.endCoord.top = e.clientY;
  }
}
dragControl.prototype.init = function(){
  var self = this;
  var el = self.el;
  
  el.addEventListener('mousedown', self.dragStart());
  el.addEventListener('mousemove', self.dragMove());
  el.addEventListener('mouseup', self.dragEnd());
}
})()

