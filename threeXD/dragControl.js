(function(){
window.dragControl = dragControl;
function dragControl(opt){
  this.el = opt.el;
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
  this.lastDistance = {
    left: '',
    top: ''
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
    // if(self.startCoord.left != "") {
    //   return;
    // }
    self.startCoord.left = e.clientX;
    self.startCoord.top = e.clientY; 
   
  }
}
dragControl.prototype.outEnd = function(){
  var self = this;

  self.el.addEventListener('mouseout', function(){
    if(self.isOutEnd) {
      console.log('out');
      self.endCoord.left = self.curCoord.left;
      self.endCoord.top = self.curCoord.top;
      self.lastDistance.left = self.curDistance.left;
      self.lastDistance.top = self.curDistance.top;
      self.isStart = false;
    }
  }, false);

}
dragControl.prototype.dragMove = function() {
  var self = this;

  return function(e){
    var startCoord = self.startCoord;
    var curCoord = self.curCoord;
    var curDistance = self.curDistance;
    var lastDistance = self.lastDistance;

    if(!self.isStart) {
      console.log('self.isStart: ',self.isStart);
      return;
    }

    curCoord.left = e.clientX;
    curCoord.top = e.clientY;

    if(lastDistance.left != '' ) {
      curDistance.left = curCoord.left - startCoord.left + lastDistance.left;
      curDistance.top = curCoord.top - startCoord.top + lastDistance.top;
    }else {
      curDistance.left = curCoord.left - startCoord.left;
      curDistance.top = curCoord.top - startCoord.top;
    }


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
    self.lastDistance.left = self.curDistance.left;
    self.lastDistance.top = self.curDistance.top;
    self.isStart = false;
    console.log('self.lastDistance.left: ',self.lastDistance.left);
    console.log('self.lastDistance.top: ',self.lastDistance.top);
  }
}
dragControl.prototype.init = function(){
  var self = this;
  var el = self.el;
  
  self.outEnd();
  el.addEventListener('mousedown', self.dragStart(), false);
  el.addEventListener('mousemove', self.dragMove(), false);
  el.addEventListener('mouseup', self.dragEnd(), false);
}

})()

