function bindFactory(func, context) {
  if(Type.isObj(context)) {
    return func.bind(context);
  }
  return func;
}

function _map(list,iterator,context) {
  var _results = [];
  iterator = bindFactory(iterator,context);
  each(list, function(val,key,list){
    _results.push(iterator(val,key,list));
  });
  return _results;
}
function _find(list, predicate, context) {
  predicate = bindFactory(predicate, context);
  var _results = [];
  each(list, function(val, key, list) {
    if( true == predicate(val)) {
       _results.push(val);
    }
  });
  return _results[0];
}
function _filter(list, predicate, context) {
  predicate = bindFactory(predicate);
  var _results = [];
  each(list, function(val, key, list) {
    if(true == predicate(val)) {
      _results.push(val);
    }
  });
  return _results;
}
function _where(list, props) {
  if(Type.isArray(list) && Type.isObj(props)) {
    var _results = [];
    each(list,function(val, key, list) {
      var flag = true;
      each(props, function(prop, key, list) {
        if(!(key in val && val[key] == prop)) {
          flag = false;
        }
      });
      if(flag) {
        _results.push(val);
      }
    });
    return _results;
  }else {
     throw 'list' + list + '类型不为数组或props' + props + '类型不为对象' ;
  }
}
function _findWhere(list, props) {
  if(Type.isArray(list) && Type.isObj(props)) {
    var _results = [];
    each(list,function(val, key, list) {
      var flag = true;
      each(props, function(prop, key, list) {
        if(!(key in val && val[key] == prop)) {
          flag = false;
        }
      });
      if(flag) {
        _results.push(val);
      }
    });
    return _results[0];
  }else {
     throw 'list' + list + '类型不为数组或props' + props + '类型不为对象' ;
  }
}
function _reject(list, predicate, context) {
  predicate = bindFactory(predicate);
  var _results = [];
  each(list, function(val ,key, list) {
    if(!predicate(val)) {
      _results.push(val);
    }
  });

  return _results;
}
function _every(list, predicate, context) {
  if( !(predicate != undefined && Type.isFunction(predicate))) {
    predicate = function(val) {
      return !!val;
    }
  }
  predicate = bindFactory(predicate, context);
  var _result = true;
  each(list, function(val, key, list) {
    if(predicate(val) == false) {
      _result = false;
    }
  });
  return _result;
}
function _some(list, predicate, context) {
  if( !(predicate != undefined && Type.isFunction(predicate))) {
    predicate = function(val) {
      return !!val;
    }
  }
  predicate = bindFactory(predicate, context);
  var _result = false;
  each(list, function(val, key, list) {
    if(predicate(val) == true) {
      _result = true;
    }
  });
  return _result;
}