function touchCube(){
  var $ = document.body.querySelector.bind(document.body);
  var wrap = $('.cubeWrap');


  //绑定拖动事件
  var dragOpt = {
    el: wrap,
    moveAction: function(){
      console.log(this.getCoord('cur'));
    }
  }

  var dragCube = new dragControl(dragOpt);
  
}
touchCube();



