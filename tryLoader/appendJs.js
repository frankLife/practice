function appendJs(name) {
  var script = document.createElement('script');
  script.src = './' + name + '.js';
 
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(script);
  script.onload = function(){
	alert('ok');
    head.removeChild(script);
  }
  
}
appendJs('a');
appendJs('b');