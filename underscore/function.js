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
    throw 'context: ' + context + '不是对象类型，无法绑定';
    return;
  }

  return _result;
}

