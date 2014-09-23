var Util = {};
Util.reg = {
	//reg for judge
	isCss: /\.css/
}
Util.static = {
	doc: document,
	head: document.head ||
		  document.getElementsByTagName('head')[0] ||
	      document.documentElement
}
Util.isType = function(value,type) {
  return Object.prototype.toString.call(value) === '[object '+type+']';
}

Util.request = function(url,charset,callback) {
	//css的情况
	if(Util.reg.isCss.test(url)) {
		var cssDom = Util.static.doc.createElement('link');
		cssDom.rel = 'stylesheet';
		cssDom.href = url;
		Util.static.head.appendChild(cssDom);
	}else {
		var scriptDom = Util.static.doc.createElement('script');
		scriptDom.charset = charset || 'utf-8';
		scriptDom.src = url;
		Util.static.head.appendChild(scriptDom);
    console.log('after');
		_addOnload();
	}


	function _addOnload(){
		if('onload' in scriptDom) {
			scriptDom.onload = function(){
				Util.static.head.removeChild(scriptDom);
				if(Util.isType(callback, 'Function')) {
					callback();
				}

			}
		}else {
			scriptDom.onreadystatechange = function(){
				if(/loaded|complete/.test(scriptDom.readyState)) {
					Util.static.head.removeChild(scriptDom);
					if(Util.isType(callback, 'Function')) {
						callback();
					}
				}
			}
		}
	}
}



