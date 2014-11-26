var Util = {
  $: document.querySelector.bind(document),
  timer: function(func,time){
    if(time == undefined) {
      (function _pollFunc(){
        window.requestAnimationFrame(function(){
          func();
          _pollFunc();
        })
      })()
    }else {
      (function _pollFunc(){
        setTimeout(function(){
          func();
          _pollFunc();
        },time);
      })()
    }
  }
}
window.$ = Util['$'];