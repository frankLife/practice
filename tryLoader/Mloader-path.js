var Path = {};
Path.reg = {
  //reg for judge
  relativeReg : /^(\.\/|\.\.\/)+(\w+\/)*\w+(\.js)?/,  //相对路径判断 ../a/c/./b.js
  nameReg: /^(\w+\/)+/,                               //toplevel 判断 abc/b/c.js
  dotBegin: /^\.\//,                                  // .开头判断
  
  //reg for util
  removeDot: /\/\.\//g,                               //替换/./ -> /
  removeDoubleDot: /(\w+\/)\w+\/\.\.\//g,             //替换a/b/../c -> a/c 
  removeSlash: /\/\//g,                               //替换 // -> /
  
  getDir: /^(.*\/)/
}
Path.dir = document.URL.match(Path.reg.getDir)[1];

//TODO:处理传入refId的情况
Path.resolve = function(id,refId){
	if(arguments.length == 1) {
	   //相对路径判断
		if(Path.reg.relativeReg.test(id)) {
			id = id.replace(Path.reg.removeDot,'/');
			id = id.replace(Path.reg.removeDoubleDot,'$1');
			id = id.replace(Path.reg.removeSlash,'/');
			
			if(Path.reg.dotBegin.test(id)) {
				id = Path.dir + id.slice(2);
			}else {
				id = (Path.dir + id).replace(Path.reg.removeDoubleDot,'$1');
			}
			return id;
		//toplevel判断
		}else if(Path.reg.nameReg.test(id)) {
			return Path.dir + id;
		//绝对路径判断
		}else if(/\/\//.test(id)) {
			return id;
		}
		throw  id +' 模块加载路径出错'; 
  }else if(arguments.length == 2) {
  
  }
}