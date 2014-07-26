var Type = {
  _typeFactory: function(type) {
    return function ( obj ){
      if ( !type ) { return };
      return type == Object.prototype.toString.call(obj).slice(8,-1);
    }
  },
  isType: function(type,obj) {
    return Type._typeFactory(type)(obj);
  },
  isString: function(obj) {
    return Type._typeFactory('String')(obj);
  },
  //todo PlainObj
  isObj: function(obj) {
    return Type._typeFactory('Object')(obj);
  },
  isNumber: function(obj) {
    return Type._typeFactory('Number')(obj);
  },
  isBoolean: function(obj) {
    return Type._typeFactory('Boolean')(obj);
  },
  isArray: function(obj) {
    return Type._typeFactory('Array')(obj);
  },
  isFunction: function(obj) {
    return Type._typeFactory('Function')(obj);
  }
}
var Tool = {
  makeArray: function(obj) {
    return Array.prototype.slice.call(obj);
  }
}
//TODO:兼容原生
function each(list,iterator,context) {
  if(!list || !iterator) {
    throw "参数传递错误";
    return;
  }
  if(context) {
    if(Type.isObj(context)) {
      iterator = iterator.bind(context);
    }else {
      throw context + '不是对象类型，无法绑定';
      return;
    }
  }
  if(Type.isObj(list)) {
    for(var item in list) {
      iterator(list[item], item, list);
    }
  }else if(Type.isArray(list)) {
    for(var i = 0, len = list.length;i<len;i++ ) {
      iterator(list[i], i, list);
    }
  }else {
    throw list+"类型出错";
  }
}
function map(list,iterator,context) {
  var _results = [];
  if(!list || !iterator) {
    throw "参数传递错误";
    return;
  }
  if(context) {
    if(Type.isObj(context)) {
      iterator = iterator.bind(context);
    }else {
      throw context + '不是对象类型，无法绑定';
      return;
    }
  }
  if(Type.isObj(list)) {
    for(var item in list) {
      _results[_results.length] = iterator(list[item],item);
    }
  }else if(Type.isArray(list)) {
    for(var i = 0, len = list.length;i<len;i++) {
      _results[_results.length] = iterator(list[i],i);
    }
  }else {
    throw list+"类型出错";
  }

  return _results;
}
function reduce(list, iterator, memo, context) {
 if(!list || !iterator) {
    throw "参数传递错误";
    return;
  }
  if(context) {
    if(Type.isObj(context)) {
      iterator = iterator.bind(context);
    }else {
      throw context + '不是对象类型，无法绑定';
      return;
    }
  }
  var _result = null;
  if(Type.isObj(list)){
    if(memo != undefined) {
      _result = memo;
      for( var item in list) {
        _result = iterator(_result,list[item]);
      }
    }else {
      var _index = 0;
      for(var item in list) {
        if(_inedx++ == 0) {
          _result = list[item];
        }else {
          _result = iterator(_result,list[item]);
        }
      }
    }
  }else if(Type.isArray(list)) {
    if(memo != undefined) {
      _result = memo;
      for(var i = 0, len = list.length;i<len;i++) {
        _result = iterator(_result,list[i]);
      }
    }else {
      _result = list[0];
      for(var i = 1, len = list.length;i<len;i++) {
        _result = iterator(_result,list[i]);
      }
    }

  }else {
    throw list+ "类型出错";
  }

  return _result;
}
function reduceRight(list, iterator, memo, context) {
   if(!list || !iterator) {
    throw "参数传递错误";
    return;
  }
  if(context) {
    if(Type.isObj(context)) {
      iterator = iterator.bind(context);
    }else {
      throw context + '不是对象类型，无法绑定';
      return;
    }
  }
  var _result = null;
  if(Type.isObj(list)) {
    var _propertyReverse = [];
    for(var item in list) {
      _propertyReverse.unshift(item);
    }
    if(memo != undefined) {
      _result = memo;
      for(var i = 0, len = list.length;i<len;i++) {
        _result = iterator(_result,list[_propertyReverse[i]]);
      }
    }else {
      _result = list[_propertyReverse[0]];
      for(var i = 1, len = _propertyReverse.length;i<len;i++) {
        _result = iterator(_result,list[_propertyReverse[i]]);
      }
    }
  }else if(Type.isArray(list)) {
    if(memo != undefined) {
      _result = memo;
      for(var i = list.length-1;i>=0;i--) {
        _result = iterator(_result,list[i]);
      }
    }else {
      _result = list[list.length-1];
      for(var i = list.length - 2 ;i>=0;i--) {
        _result = iterator(_result,list[i]);
      }
    }
  }else {
    throw 'list: ' + list + '不是对象类型，无法绑定';
    return;
  }

  return _result;
}
function find(list, predicate, context) {
  if(context) {
    if(Type.isObj(context)) {
      predicate = predicate.bind(context);
    }else {
      throw 'context' + context +'不是对象类型，无法绑定'
      return;
    }
  }
  if(Type.isObj(list)) {
    for(item in list) {
      if(predicate(list[item])) {
        return list[item];
      }
    }
    return undefined;
  }else if(Type.isArray(list)) {
    for(var i = 0, len = list.length;i<len;i++) {
      if(predicate(list[i])) {
        return list[i];
      }
    }
    return undefined;
  }else {
    throw 'lsit' + list + '类型出错';
  }
}
function filter(list, predicate, context) {
  if(context) {
    if(Type.isObj(context)) {
      predicate = predicate.bind(context);
    }else {
      throw 'context: ' + context + '不是对象类型，无法绑定';
    }
  }
  var _results = [];
  if(Type.isObj(list)) {
    for(var item in list) {
      if(predicate(list[item])) {
        _results.push(list[item]);
      }
    }
    return _results;
  }else if(Type.isArray(list)) {
    for(var i = 0, len = list.length;i<len;i++) {
      if(predicate(list[i])) {
        _results.push(list[i]);
      }
    }
    return _results;
  }else {
    throw 'list ' + list + '类型出错';
  }

}
function where(list, props) {
  var _results = [];
  if(Type.isArray(list)&&Type.isObj(props)) {
    for(var i = 0, len = list.length;i<len;i++) {
      var flag = true;
      for(var item in props) {
        if(!(list[i].hasOwnProperty(item)&&list[i][item] == props[item])){
          flag = false;
          break;
        }
      }
      if(flag) {
        _results.push(list[i]);
      }
    }
  }else {
    throw 'list' + list + '类型不为数组或props' + props + '类型不为对象' ;
  }

  return _results;
}
function findWhere(list, props) {
  if(Type.isArray(list)&&Type.isObj(props)) {
    for(var i = 0, len = list.length;i<len;i++) {
      var flag = true;
      for(var item in props) {
        if(!(list[i].hasOwnProperty(item)&&list[i][item] == props[item])){
          flag = false;
          break;
        }
      }
      if(flag) {
        return list[i];
      }
    }
  }else {
    throw 'list' + list + '类型不为数组或props' + props + '类型不为对象' ;
  }
}
function reject(list, predicate, context) {
  if(context) {
    if(Type.isObj(context)) {
      predicate = predicate.bind(context);
    }else {
      throw 'context' + context +'不是对象类型，无法绑定'
      return;
    }
  }
  var _results = [];
  if(Type.isObj(list)) {
    for(var item in list) {
      if(!predicate(list[item])) {
        _results.push(list[item]);
      }
    }
    return _results;
  }else if(Type.isArray(list)) {
    for(var i = 0, len = list.length;i<len;i++) {
      if(!predicate(list[i])) {
        _results.push(list[i]);
      }
    }
    return _results;
  }else{
    throw 'list' + list + '类型出错';
  }
}
function every(list,predicate,context) {
  if(predicate) {
    try{
    if(Type.isFunction(predicate)) {
          if(reject(list,predicate,context).length > 0) {
            return false;
          }else {
            return true;
          }
        }else {
        throw 'predicate ' + predicate + '类型出错';
      }
    }
    catch(e){
        throw '参数传递错误';
    }
  }else {
    if(Type.isObj(list)) {
      for(var item in list) {
        if(!list[item]) {
          return false;
        }
      }
      return true;
    }else if(Type.isArray(list)) {
      for(var i=0, len = list.length;i<len;i++) {
        if(!list[i]) {
          return false;
        }
      }
      return true;
    }else {
      throw 'list ' + list + '类型出错';
    }
  }

}
function some(list,predicate,context) {
  if(predicate) {
    try {
    if(Type.isFunction(predicate)) {
      if(filter(list,predicate,context).length > 0) {
        return true;
      }else {
        return false;
      }
    }else{
      throw 'predicate ' + predicate + '类型出错';
    }
  }catch(e) {
    throw '参数传递错误';
  }
  }else{
    if(Type.isObj(list)) {
      for(var item in list) {
        if(list[item]) {
          return true
        }
      }
      return false;
    }else if(Type.isArray(list)) {
      for(var i = 0,len = list.length;i<len;i++) {
        if(list[i]) {
          return true;
        }
      }
      return false;
    }else {
      throw 'list ' + list +'类型出错';
    }
  }
}
function contains(list,value) {
  if(Type.isArray(list)) {
    for(var i = 0, len = list.length;i<len;i++) {
      if(list[i] === value) {
        return true
      }
    }
    return false;
  }else if(Type.isObj(list)) {
    for(var item in list) {
      if(list[item] == value) {
        return true;
      }
    }
    return false;
  }
}
function has(obj, key) {
  if(Type.isObj(obj)) {
    for(var item in obj) {
      if(item == key) {
        return true;
      }
    }
    return false;
  }else {
    throw 'obj ' + obj + '类型不为对象';
  }
}
function bind(func, obj, arg) {
  if(obj == undefined) {
    throw 'obj' + obj + '不能为空';
    return;
  }
  return function() {
    //这里函数的调用参数是通过bind来传递的
    //如果需要通过返回的绑定的函数来自己传递参数，这吧参数写在包裹函数上
    func.apply(obj,arg);
  }
}

