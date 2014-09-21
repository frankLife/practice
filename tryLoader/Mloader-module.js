var Mloader = {};
var Module = {};


Module.cache = [];
Module.tempMetaInfo = {};
Module.reg = {
  parseDeps: /require\(['"]([^;]+)['"]\)/g
}

Module.factory = function(){
  //表示模块id
  this.id = '';
  //模块依赖
  this.deps = [];
  //依赖该模块的模块
 // this.duties;
  //模块定义
  this.factory = null;
  //模块输出
  this.exports = {};
}
Module.get = function(id){
  console.log('getId: ',id);
  var curCache = Module.cache;
  var isInMloader = false;
  
  console.log('getCurCache: ',curCache);
  for(var i = curCache.length;i--;) {
    console.log('geti: ',i)
    if(curCache[i].id == id) {
      isInMloader = true;
      break;
    }
  }
  console.log('isInMloader: ',isInMloader);
  console.log('getReturn: ',isInMloader?curCache[i]:Module.save(id));
  return isInMloader?curCache[i]:Module.save(id);
}
Module.save = function(url,modInfo){
  console.log('save-modInfo: ', modInfo);
  var curCache = Module.cache;
  var modId = url || modInfo.id;
  var isInMloader = false;
  console.log('saveCurCache: ',curCache);
  for(var i = curCache.length;i--;) {

    if(curCache[i].id == modId) {
      isInMloader = true;
      break;
    }
  }
  
  var newMod = isInMloader? curCache[i]: new Module.factory();
  newMod.id = url;
  
  if(modInfo == undefined) {
    Module.cache.push(newMod);
    console.log('newMod-modInfoUndefined: ',newMod);
    return newMod;
  }
  for(var prop in newMod) {
    for(var item in modInfo) {
      if(prop == item) {
        newMod[prop] = modInfo[item];
      }
    }
  }
  
  Module.cache.push(newMod);
  console.log('newMod: ',newMod);
  return newMod;
}

Module._require = function(id){
    Module.cache(Path.resolve(id)).exec();
}
//公用use方法
Mloader.use = Module.use = function(id,charset){
  console.log('use Path.resolve: ', Path.resolve(id));
  var actionModule = Module.save('useMod',{
    deps: [Path.resolve(id)]
  });
  
  actionModule.action = function(){
    Module.get(Path.resolve(id)).exec();
  }
  console.log('actionModule: ',actionModule);
  actionModule.load(charset);
}
//模块实例方法
Module.factory.prototype.load = function(charset){
  var deps = this.deps;
  var self = this;
  
  console.log('loaddeps: ', this.deps);
  //入口函数模块执行
  if(this.deps.length == 0) {
    if(this.action != undefined) {
      console.log('final use');
      this.action();
    }
  }
  
  

  for(var i = deps.length;i--;) {
    if(!Module.cache[deps[i]]) {
      var requestDep = deps[i];
      Util.request(requestDep,charset,function(){
        //函数执行完加载模块信息
        var modInfo = Module.tempMetaInfo;
        modInfo.id = requestDep;
        console.log('requestCallbackInfo: ', modInfo);
        var loadMod = Module.save(modInfo.id,modInfo);
        loadMod.load();
        
        //更新调用该模块的依赖信息
        var dutyMod = self;
        for(var i = dutyMod.deps.length;i--;) {
          if(dutyMod.deps[i].id == requestDep) {
            dutyMod.deps.splice(i,1);
          }
        }
        
        dutyMod.load();
      })
    }
  }
}

Module.factory.prototype.exec = function(){
  if(this.factory != undefined) {
    return this.exports = this.factory(Module._require,this.exports,this) || this.exports;
  }
}

//将define函数暴露给用户
window.define = Module.define = function(factory){
  var deps = [];
  factory.toString().replace(Module.reg.parseDeps,function(m,m1) {
    deps.push(Path.resolve(m1));
  });
  console.log('parseDeps: ', deps)
  Module.tempMetaInfo = {
    deps: deps,
    factory: factory,
  }
} 
