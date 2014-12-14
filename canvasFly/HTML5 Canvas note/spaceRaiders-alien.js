function Alien(opt){
  this.speed = opt.speed;
  this.x = opt.x;
  this.y = opt.y;
  this.width = opt.width;
  this.height = opt.height;
  this.maxWidth = opt.maxWidth;
  this.minWidth = opt.minWidth;
  this.maxHeight = opt.maxHeight;
  this.isAlive = true;
}
Alien.prototype.move = function(){
  if(this.x + this.width + this.speed >= this.maxWidth || this.x + this.speed <= this.minWidth) {
    this.speed *= -1;
    this.y += 25;
  }
  if(this.y + this.height >= this.maxHeight) {
    this.clear();
  }
  this.x = this.x + this.speed;
}
Alien.prototype.clear = function(){
  this.isAlive = false;
}


function Missile(opt){
  this.x = opt.x;
  this.y = opt.y;
  this.speed = opt.speed;
  this.width = opt.width;
  this.height = opt.height;
  this.objArray = opt.objArray;
}
Missile.prototype.isHit = function(objArray) {
  objArray = this.objArray || objArray;
  if(objArray == undefined) {
    return;
  }
  for(var i = 0,len = objArray.length;i<len;i++) {
    var obj = objArray[i];
    if(!(this.x > obj.x + obj.width || 
       this.x+ this.width < obj.x || 
       this.y + this.height  > obj.y ||
       this.y > obj.y + obj.height) ) {
       obj.clear();
    }
  }
}

Missile.prototype.move = function(){
  this.y += this.speed;
}

function Fly(opt){
  this.x = opt.x;
  this.y = opt.y;
  this.width = opt.width;
  this.height = opt.height;
  this.canvas = opt.canvas;
  this.bindMove();
}
Fly.prototype.bindMove = function(){
  var self = this;
  this.canvas.addEventListener('mousemove',function(e){
    self.x = e.offsetX - self.width/2 ;
    self.y = e.offsetY - self.height/2;
  });
}