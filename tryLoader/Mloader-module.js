var Mloader = {};
var Module = {};


Module.cache = [];
Module.tempMetaInfo = {};
Module.reg = {
  parseDeps: /require\(['"]([^;]+)['"]\)/g
}

Module.factory = function(){
  //��ʾģ��id
  this.id = '';
  //ģ������
  this.deps = [];
  //ģ�鶨��
  this.factory = null;
  //ģ�����
  this.exports = {};
  //���������ģ�飬������ɼ���ʱ����ͨ��֪ͨ
  this.dutyMod = null;

  //����������ȡ��־
  this._fectched = false;
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
  console.log('Path.resolve(id)_require: ',Path.resolve(id))
  var curCache = Module.cache;
  id = Path.resolve(id);
  for(var i=curCache.length;i--;) {
    if(curCache[i].id == id) {
      console.log('inyo');
      return curCache[i].exec();
    }
  }
 // Module.cache[Path.resolve(id)].exec();

}
//����use����
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
//ģ��ʵ������

Module.factory.prototype.load = function(charset){
  var self = this;
  var deps = self.deps;


  console.log('loaddeps: ', self.deps);
  //��ں���ģ��ִ��
  if(self.deps.length == 0) {
    _onload();
  }

  if(!self._fectched) {
    self.fetchDeps(charset);
    self._fectched = true;
  }

  //ͨ��onload������֪ͨ�����Լ���ģ�������Ѿ���ɼ���
  function _onload(){
    var dutyMod = self.dutyMod;
    if(dutyMod!=null) {
      console.log('dutyMod: ',dutyMod);

      for(var i = dutyMod.deps.length;i--;) {
        if(dutyMod.deps[i] == self.id) {
      console.log('self.id: ', self.id);
          dutyMod.deps.splice(i,1);
        }
      }
      dutyMod.load();
    }else {
      //˵����use�������ɵ�ģ��
      console.log('action')
      self.action();
    }

  }

}
Module.factory.prototype.fetchDeps = function(charset){
  var self = this;
  var deps = this.deps;

  for(var i = deps.length;i--;) {
    if(!Module.cache[deps[i]]) {
      var requestDep = deps[i];
      Util.request(requestDep,charset,function(){
        //����ִ�������ģ����Ϣ
        var modInfo = Module.tempMetaInfo;
        modInfo.id = requestDep;
        modInfo.dutyMod = self;
        var loadMod = Module.save(modInfo.id,modInfo);
        loadMod.load();

        //���µ��ø�ģ���������Ϣ
        // var dutyMod = self;
        // for(var i = dutyMod.deps.length;i--;) {
        //   if(dutyMod.deps[i].id == requestDep) {
        //     dutyMod.deps.splice(i,1);
        //   }
        // }

      })
    }
  }
 // dutyMod.load();
}
Module.factory.prototype.exec = function(){
  if(this.factory != undefined) {
    return this.exports = this.factory(Module._require,this.exports,this) || this.exports;
  }
}

//��define������¶���û�
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
