function appendJs(name) {
  var script = document.createElement('script');
  script.src = './' + name + '.js';

  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(script);
  console.log('after insert');
  if('onload' in script) {
        script.onload = function(){
            console.log('ok');
            head.removeChild(script);

        }
  }else {
        script.onreadystatechange = function(){
            if (/loaded|complete/.test(script.readyState)) {
                console.log('ok');
                head.removeChild(script);

            }
        }
  }


}
appendJs('a');
appendJs('b');