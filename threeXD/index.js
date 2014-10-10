function touchCube(){
  var $ = document.body.querySelector.bind(document.body);
  var wrap = $('.cubeTrigger');


  //绑定拖动事件
  var dragOpt = {
    el: wrap,
    moveAction: function(){
    //  console.log('start: ', this.getCoord('start'));
      console.log('dis: ', this.getCoord('dis'));
      var cube = $('.cube');
      var degs = {
        X: (-this.getCoord('dis').top) + 'deg',
        Y: this.getCoord('dis').left + 'deg'
      }

      cube.style.transform = 'rotateX('+degs['X']+') rotateY('+degs['Y']+')';
      // this.el.style.transform = 'rotateX('+degs['X']+') rotateY('+degs['Y']+')';
    }
  }

  var dragCube = new dragControl(dragOpt);
  
}
touchCube();



