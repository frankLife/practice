(function(){
window.dragControl = dragControl;
function dragControl(opt){
  this.el = opt.el;
  this.isSequence = opt.isSequence || false;
  this.isOutEnd = opt.isOutEnd || true;

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
  this.curDistance = {
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
    case 'dis':
      return this.curDistance;
    default: 
      console.log('coordType: ',coordType);
  }
}

dragControl.prototype.dragStart = function() {
  var self = this;
  return function(e){
    self.isStart = true;
    if(self.startCoord.left != "") {
      return;
    }
    self.startCoord.left = e.clientX;
    self.startCoord.top = e.clientY; 
   
  }
}
dragControl.prototype.outEnd = function(){
  var self = this;
  function _pollJudge(){
    if(self.isStart == true) {
        setTimeout(_pollJudge,200);
    }else {
      self.isStart = false;
    }
  }
  self.el.addEventListener('mouseout', function(){
    if(self.isOutEnd) {
      console.log('out');
      self.isStart = false;
    }
  });

}
dragControl.prototype.dragMove = function() {
  var self = this;

  return function(e){
    var startCoord = self.startCoord;
    var curCoord = self.curCoord;
    var curDistance = self.curDistance;

    if(!self.isStart) {
      console.log('self.isStart: ',self.isStart);
      return;
    }

    curCoord.left = e.clientX;
    curCoord.top = e.clientY;
    curDistance.left = curCoord.left - startCoord.left;
    curDistance.top = curCoord.top - startCoord.top;

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
    if(self.isSequence) {
      console.log('se');
      self.startCoord.left = self.endCoord.left;
      self.startCoord.top = self.endCoord.top;
    }
    self.isStart = false;
  }
}
dragControl.prototype.init = function(){
  var self = this;
  var el = self.el;
  
  self.outEnd();
  el.addEventListener('mousedown', self.dragStart());
  el.addEventListener('mousemove', self.dragMove());
  el.addEventListener('mouseup', self.dragEnd());
}

})()

