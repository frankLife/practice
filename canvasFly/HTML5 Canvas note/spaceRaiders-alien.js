function Alien(){
  this.speed = 1;
  this.x = -1;
  this.y = -1;
  this.width = -1;
  this.height = -1;
  this.isAlive = true;
  this.maxWidth = -1;
  this.minWidth = -1;
  this.obj = null;
}

Alien.prototype.isHit = function(obj){
  obj = obj || this.obj;
  if(obj == undefined) {
    return;
  }
  var isHit = true;
  if(this.x > obj.x + obj.width || 
     this.x+ this.width < obj.x || 
     this.y + this.height  > obj.y ||
     this.y > obj.y + obj.height ) {
    
    isHit = false;
  }

  return isHit;
}
Alien.prototype.clear = function(){
  this.isAlive = false;
}
Alien.prototype.move = function(){
  if(this.x + this.width + this.speed >= this.maxWidth || this.x - this.speed <= this.minWidth) {
    this.speed *= -1;
    this.y += 25;
  }
  this.x = this.x + this.speed;
}
Alien.prototype.run = function(){
  if(this.isHit()) {
    this.clear();
  }
  this.move();
}
