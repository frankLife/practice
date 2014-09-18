function appendJs(name) {
  var script = document.createElement('script');
  script.src = './' + name + '.js';
 
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(script);
  if('onload' in script) {
		script.onload = function(){
			alert('ok');
			head.removeChild(script);
		}
  }else {
		script.onreadystatechange = function(){
			if (/loaded|complete/.test(script.readyState)) {
				alert('ok');
				head.removeChild(script);
			}
		}
  }

  
}
appendJs('a');
appendJs('b');
103.245.222.133