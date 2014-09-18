(function(global,undefined){
var doc = document;
var head = document.head || document.getElementsByTagName('head')[0];
var Util = Mloader.util;
var Tool = Mloader.tool;
var anonymousModuleInfo = null;
var Reg = {
  relativeReg : /^(\.\/|\.\.\/)+(\w+\/)*\w+(\.js)?/,
  findDirReg : /^(.*)\/(\w)+(\.\w+)?$/,
  nameReg: /^[^./]+(\.js)?$/
}
Util.isType = function(value,type) {
  return Object.prototype.toString.call(value) === '[object '+type+']';
}
Util.on = function(){
  var Util.on.eventBox = {};
}
Util.off = detachEvent || removeEventListener;
Tool.resolve = function(id,rId){
  if(arguments.length == 1) {
    if(Reg['relativeReg'].test(id)) {
    return id;
    }else if(Reg['nameReg'].test(id)) {
      return Mloader.dir + id;
    }
  
    throw  id +' 模块加载路径出错'; 
  }else if(arguments.length == 2) {
  
  }

}

Mloader = {};
//Mloader param
Mloader.dir = '';
function Module(opt){
  this.url = opt.url;
  this.deps = opt.deps;
  this.duties = opt.duties;
  this.status = {
    isLoad: false
  }
}


var moduleCache = Mloader.moduleCache = {};
var URL = doc.URL;

Module.prototype.load = function(){

  var deps = this.deps;

  for(var i = deps.length;i--;) {
    var depUrl = Tool.resolve(id);
    if(!moduleCache[depUrl]['status']['isLoad']) {
      modlueCache[depUrl].load();
    }
  }
}

Module.prototype.exec = function(){
  if(!this.isLaod) {
    this.load();
    return;
  }
  
}
Mloader.dir = URL.match(Reg['findDirReg'])[0];
Mloader.moduleInfoSave = function(url,module){
  moduleCache[url] = module;
}
global.require = Mloader.require = function(id){
  var url = Tool.resolve(id);
  if(moduleCache(url) == undefined) {
    Mloader.request(id)
  }
}
Mloader.request = function(id) {
  var url = Tool.resolve(id);
  if(url.indexOf('.js') >= 0) {
    var script = doc.createElement('script');
    script.src = url;
    head.appendChild(script);
    Mloader.addOnload(script,'js');
    if(anonymousModuleInfo != null) {
      anonymousModuleInfo['url'] = url
      Mloader.moduleInfoSave(url, new Module(anonymousModuleInfo));
      anonymousModuleInfo = null;
    }
  }else if(url.indexOf('.css') >=0) {
    var link = doc.createElement('link');
    link.rel = "stylesheet";
    head.appendChild(link);
  }else {
    var url = url + '.js';
    var script = doc.createElement('script');
    script.src = url;
    head.appendChild(script);
    Mloader.addOnload(script,'js');
    if(anonymousModuleInfo != null) {
      anonymousModuleInfo['url'] = url
      Mloader.moduleInfoSave(url, new Module(anonymousModuleInfo));
      anonymousModuleInfo = null;
    }
  }
}

Mloader.addOnload = function(uri,type){
  if(type == 'js') {
    uri.onload = function(){
	  moduleCache[uri.src]['status']['isLoad'] = true;
	  head.removeChild(uri);
    }
  }
}
Mloader.use = function(id,callback) {
  if(arguments.length == 1) {
    Mloader.request(id);
  }else if(arguments.length == 2) {
    callback.apply(null,moduleCache(Mloader.request(id)).exec());
  }
}
global.define = Mloader.define = function(id,deps,callback){
  if(arguments.length == 2) {
    var depUrls = [];
    deps = id;
    callback = deps;

    if(Util.isType(deps,'String')) {
      deps = [deps];
    }
    for(var i = deps.length;i--;) {
      depUrls[i] = Tool.resolve(deps[i]);
      //moduleCache[depUrls[i]]['duties']
    }
    anonymouseModuleInfo = {
      depUrls: depUrls
    }
    
  }
  if(arguments.length == 1) {
    callback = id;
    anonymouseModuleInfo = 
  }
  if(aeguments.length == 3) {
    var depUrls = [];
    var moduleUrl = Tool.resolve(id);
    if(Util.isType(deps,'String')) {
        deps = [deps];
      }
    for(var i = deps.length;i--) {
      depUrls[i] = Tool.resolve(deps[i]);
      moduleCache[depUrls[i]].duties.push(moduleUrl);
    }
    
    var newModule = new Module({
      deps: depUrls
    });
    /*
    moduleCache[url] = newModule;
    */
    Mloader.moduleInfoSave(url,newModule);
  }
  
  
}

})(this)

