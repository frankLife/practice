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
    return type._typeFactory('String')(obj);
  },
  //todo PlainObj
  isObj: function(obj) {
    return type._typeFactory('Object')(obj);
  },
  isNumber: function(obj) {
    return type._typeFactory('Number')(obj);
  },
  isBoolean: function(obj) {
    return type._typeFactory('Boolean')(obj);
  },
  isArray: function(obj) {
    return type._typeFactory('Array')(obj);
  }
  
}

function each(list,iterator,context) {
  if(Type.isObj(list)) {

  }else if(Type.isArray(list)) {

  }else {
    throw list+"类型出错."
  }
}

