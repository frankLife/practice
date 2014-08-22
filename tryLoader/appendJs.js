function appendJs(name) {
  var script = document.createElement('script');
  script.src = './' + name + '.js';
  document.head.appendChild(script);
  
  script.onload = function(){
    document.head.removeChild(script);
    alert(a);
  }
  
}
appendJs('a');
appendJs('b');