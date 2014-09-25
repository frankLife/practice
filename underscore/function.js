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
//Collections
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
function invoke(list, funcName, arg) {
  var _results = [];
  if(Type.isObj(list)) {
    for(var item in list) {
      _results.push(list[item][funcName](arg));
    }
  }else if(Type.isArray(list)) {
    for(var i = 0, len = list.length;i<len;i++) {
      _results.push(list[i][funcName](arg));
    }
  }else {
    throw 'list' + list + '类型出错';
  }
  return _results;
}
function pluck(list,prop) {
  var _results = [];
  if(Type.isArray(list)) {
    for(var i = 0, len = list.length;i<len;i++) {
      _results.push(list[i][prop]);
    }
  }else {
    throw 'list ' + list + '类型出错';
  }

  return _results
}
function max(list, iterator, context) {
  if(context) {
    if(Type.isObj(context)) {
      iterator = iterator.bind(context);
    }else {
      throw 'context: ' + context + '不是对象类型，无法绑定';
    }
  }
  var _result = null;
  var tempVal = null;
  if(Type.isArray(list)) {
    _result = list[0];
    for(var i = 1, len = list.length;i<len;i++) {
      tempVal = _number(list[i], iterator);
      if(tempVal > _number(_result, iterator)) {
        _result = list[i];
      }
    }
    return _result;
  }else {
    throw 'list' + list + '类型出错';
  }

}
function min(list, iterator, context) {
  if(context) {
    if(Type.isObj(context)) {
      iterator = iterator.bind(context);
    }else {
      throw 'context: ' + context + '不是对象类型，无法绑定';
    }
  }
  var _result = null;
  var tempVal = null;
  if(Type.isArray(list)) {
    _result = list[0];
    for(var i = 1, len = list.length;i<len;i++) {
      tempVal = _number(list[i], iterator);
      if(tempVal < _number(_result, iterator)) {
        _result = list[i];
      }
    }
    return _result;
  }else {
    throw 'list' + list + '类型出错';
  }
}
function sortBy(list, iterator, context) {
  if(context) {
    if(Type.isObj(context)) {
      iterator = iterator.bind(context);
    }else {
      throw 'context: ' + context + '不是对象类型，无法绑定';
    }
  }
  if(Type.isArray(list)) {
    var _temp = null;
    for(var i = 0, len = list.length - 1;i< len;i++) {
      for(var j = i+1,jLen = list.length ;j<jLen;j++) {
        if(_number(list[i], iterator) > _number(list[j], iterator)) {
          _swap(list,i,j);
        }
      }
    }
  }else {
    throw 'list ' + list + '类型出错';
  }

  return list;
}
function groupBy(list, iterator, context) {
  if(context) {
    if(Type.isObj(context)) {
      iterator = iterator.bind(context);
    }else {
      throw 'context: ' + context + '不是对象类型，无法绑定';
    }
  }
  var _results = {};
  var _tempVal = null;
  if(Type.isObj(list)) {
    if(Type.isFunction(iterator)) {
      for(var item in list) {
        _tempVal = iterator(list[item]);
        if(Type.isArray(_results[_tempVal])) {
          _results[_tempVal].push(list[item]);
        }else {
          _results[_tempVal] = [list[item]];
        }
      }
    }else if(Type.isString(iterator)) {
      for(var item in list) {
        _tempVal = list[item][iterator];
        if(Type.isArray(_results[_tempVal])) {
          _results[_tempVal].push(list[item]);
        }else {
          _results[_tempVal] = [list[item]];
        }
      }
    }else {
      throw 'iterator' + iterator + '类型出错';
    }

  }else if(Type.isArray(list)) {
    if(Type.isFunction(iterator)) {
      for(var i = 0, len = list.length;i<len;i++) {
        var _tempVal = iterator(list[i]);
        if(Type.isArray(_results[_tempVal])) {
          _results[_tempVal].push(list[i]);
        }else {
          _results[_tempVal] = [list[i]];
        }
      }
    }else if(Type.isString(iterator)){
      for(var i = 0, len = list.length;i<len;i++) {
        var _tempVal = list[i][iterator];
        if(Type.isArray(_results[_tempVal])) {
          _results[_tempVal].push(list[i]);
        }else {
          _results[_tempVal] = [list[i]];
        }
      }
    }else {
      throw 'iterator' + iterator + '类型出错';
    }
  }else {
    throw 'list ' + list + '类型出错';
  }

  return _results;
}
function indexBy(list, iterator, context) {
  if(context) {
    if(Type.isObj(context)) {
      iterator = iterator.bind(context);
    }else {
      throw 'context: ' + context + '不是对象类型，无法绑定';
    }
  }
  var _results = {};
  var _uniqueKeys = [];
  if(iterator == undefined || !Type.isString('iterator')) {
    throw 'iterator' + iterator + '不能为空或类型必须为字符串';
    return;
  }
  if(Type.isArray(list)) {
    for(var i = 0, len = list.length;i<len;i++) {
      _uniqueKeys.push(list[i][iterator]);
    }
    _uniqueKeys.sort();
    for(var i = 0, len = _uniqueKeys.length;i<len;i++) {
      for(var j = 0, jLen = list.length;j<jLen;j++) {
        if(_uniqueKeys[i] == list[j][iterator]) {
          _results[_uniqueKeys[i]] = list[j];
        }
      }
    }
  }else {
    throw 'list' + list + '类型出错';
  }

  return _results;
}
function countBy(list, iterator, context) {
  if(context) {
    if(Type.isObj(context)) {
      iterator = iterator.bind(context);
    }else {
      throw 'context: ' + context + '不是对象类型，无法绑定';
    }
  }
  var _results = {};
  var _tempVal = null;
  if(Type.isObj(list)) {
    if(Type.isFunction(iterator)) {
      for(var item in list) {
        _tempVal = iterator(list[item]);
        if(Type.isNumber(_results[_tempVal])) {
          _results[_tempVal]++;
        }else {
          _results[_tempVal] = 1;
        }
      }
    }else if(Type.isString(iterator)) {
      for(var item in list) {
        _tempVal = list[item][iterator];
        if(Type.isNumber(_results[_tempVal])) {
          _results[_tempVal]++;
        }else {
          _results[_tempVal] = 1;
        }
      }
    }else {
      throw 'iterator' + iterator + '类型出错';
    }

  }else if(Type.isArray(list)) {
    if(Type.isFunction(iterator)) {
      for(var i = 0, len = list.length;i<len;i++) {
        var _tempVal = iterator(list[i]);
        if(Type.isNumber(_results[_tempVal])) {
          _results[_tempVal]++;
        }else {
          _results[_tempVal] = 1;
        }
      }
    }else if(Type.isString(iterator)){
      for(var i = 0, len = list.length;i<len;i++) {
        var _tempVal = list[i][iterator];
        if(Type.isArray(_results[_tempVal])) {
          _results[_tempVal]++;
        }else {
          _results[_tempVal] = 1;
        }
      }
    }else {
      throw 'iterator' + iterator + '类型出错';
    }
  }else {
    throw 'list ' + list + '类型出错';
  }

  return _results;
}
function shuffle(list) {
  var _results = [];
  if(Type.isObj(list)) {
    for(var item in list) {
      _results.push(list[item]);
    }
    for(var i = 0, len = _results.length;i<len;i++) {
      _swap(_results,i,_getRandomInt(0, len));
    }
    return _results;
  }else if(Type.isArray(list)) {
    _results = clone(list);
    for(var i = 0, len = list.length;i<len;i++) {
      _swap(_results,i,_getRandomInt(0, len));
    }
    return _results;
  }else {
    throw 'list' + list + '类型出错';
  }
}
function sample(list, n) {
  if(n == undefined || Number.isNaN(parseInt(n))) {
    n = 1;
  }
  list = clone(list);
  var _results = [];
  if(Type.isObj(list)) {
    var _tempArray = [];
    for(var item in list) {
      _tempArray[_tempArray.length] = list[item];
    }
    for(var i = 0 ;i<n;i++) {
      var _index = _getRandomInt(0,_tempArray.length);
      _results[_results.length] = _tempArray[_index];
      _tempArray.splice(_index, 1);
    }
    return _results;
  }else if(Type.isArray(list)) {
    for(var i = 0;i<n;i++) {
      var _index = _getRandomInt(0,list.length);
      _results[_results.length] = list[_index];
      list.splice(_index, 1);
    }
    return _results;
  }else{
    throw 'list: ' + list + '类型出错';
  }
}
function toArray(list) {
  return Array.prototype.slice.call(list);
}
function size(list) {
  if(Type.isObj(list)) {
    var _count = 0;
    for(var item in list) {
      _count ++;
    }
    return _count;
  }else if(Type.isArray(list)) {
    return list.length;
  }else {
    throw 'list ' + list + '类型出错';
  }
}
//Arrays
function first(array, n) {
  if(!Type.isArray(array)) {
    throw 'array' + array + '类型不为Array';
  }
  array = clone(array);
  if(n == undefined || Number.isNaN(parseInt(n)) || parseInt(n) <= 0 ) {
    n = 1;
  }
  var _results = [];
  for(var i = 0;i<n;i++) {
    _results.push(array[0]);
    array.splice(0,1);
  }
  return _results;
}
function initial(array, n) {
  if(!Type.isArray(array)) {
    throw 'array' + array + '类型不为Array';
  }
  array = clone(array);
  if(n == undefined || Number.isNaN(parseInt(n)) || parseInt(n) <= 0) {
    n = 1;
  }
  var _results = [];
  for(var i = 0,len = array.length - n;i<len;i++) {
    _results.push(array[i]);
  }
  return _results;
}
function last(array, n) {
  if(!Type.isArray(array)) {
    throw 'array' + array + '类型不为Array';
  }
  array = clone(array);
  if(n == undefined || Number.isNaN(parseInt(n)) || parseInt(n) <= 0) {
    n = 1;
  }
  var _results = [];
  while( n > 0 ) {
    _results.unshift(array[array.length-1]);
    array.splice(array.length-1,1);
    n--;
  }
  return _results;
}
function rest(array, n) {
  if(!Type.isArray(array)) {
    throw 'array' + array + '类型不为Array';
  }
  array = clone(array);
  var index = 1;
  var _results = [];
  if(n<0) {
    index = array.length + n;
  }else if(n != undefined && Type.isNumber(parseInt(n))) {
    index = n;
  }else if(n != undefined && !Type.isNumber(parseInt(n))) {
    index = 0;
  }

  _results = array.slice(index);
  return _results;
}
function compact(array) {
  if(!Type.isArray(array)) {
    throw 'array' + array + '类型不为Array';
  }
  array = clone(array);
  for(var i = 0,len=array.length;i<len;i++) {
    if(!array[i]) {
      array.splice(i,1);
    }
  }
  return array;
}
function flatten(array, shallow) {
  if(!Type.isArray(array)) {
    throw 'array' + array + '类型不为Array';
  }
  array = clone(array);
  var _result = [];
  var isEnd = true;
  _result = reduce(array,function(memo, val){
    if(!Type.isArray(memo)) {
      memo = [memo];
    }
    return memo.concat(val);
  });

  for(var i = 0, len = _result.length;i<len;i++) {
    if(Type.isArray(_result[i])) {
      isEnd = false;
      break;
    }
  }

  if(!isEnd && shallow != true) {
    return flatten(_result);
  }

  return _result;
}
function without(array) {
  if(!Type.isArray(array)) {
    throw 'array' + array + '类型不为Array';
  }
  array = clone(array);
  var args = Array.prototype.slice.call(arguments,1);
  var _results = [];
  for(var i=0, len=array.length;i<len;i++) {
    var isWith = true
    for(var j = 0, jLen = args.length;j<jLen;j++) {
      if(array[i] == args[j]) {
        isWith = false;
        break;
      }
    }
    if(isWith) {
      _results.push(array[i]);
    }
  }

  return _results;
}
function partition(array, predicate) {
  if(!Type.isArray(array)) {
    throw 'array' + array + '类型不为Array';
  }
  return [filter(array,predicate),reject(array,predicate)]
}
function union() {
  var args = Tool.makeArray(arguments);
  var temp = flatten(args);
  var _results = []
  for(var i = 0, len = temp.length;i<len;i++) {
    for(j = i+1;j<len;j++) {
      if(temp[i] == temp[j]) {
        temp[j] = undefined;
      }
    }
  }

  for(var i = 0;i<len;i++) {
    if(temp[i] != undefined) {
      _results.push(temp[i]);
    }
  }

  return _results;
}
function intersection() {
  var args = Tool.makeArray(arguments);

  for(var i = 0, len = args.length;i<len;i++) {
    if(!Type.isArray(args[i])) {
        throw 'agrs['+i+']' + args[i] + '类型不为Array';
    }
  }
  var result = [];
  result = reduce(args, function(array1, array2){
    var _result = []
    for(var i = 0, len = array1.length;i<len;i++) {
      for(var j = 0, jLen = array2.length;j<jLen;j++) {
        if(array1[i] === array2[j]) {
          _result.push(array1[i]);
        }
      }
    }
    _result = singleArray(_result);
    return _result;
  })

  return result;
}
function difference(array) {
  if(!Type.isArray(array)) {
    throw 'array' + array + '类型不为Array';
  }
  array = clone(array);
  var args = Tool.makeArray(arguments).slice(1);
  for(var i = 0;i<array.length;i++) {
    for(var j = 0,jLen = args.length;j<jLen;j++) {
      if(Type.isArray(args[j])) {
        var tempArray = args[j];
        for(var k = 0,kLen = tempArray.length;k<kLen;k++) {
          if(array[i] === tempArray[k]) {
            array.splice(i, 1);
          }
        }
      }else {
        if(args[j] === array[i]) {
          array.splice(i, 1);
          i--;
        }
      }
    }
  }

  return array;
}

var uniq = singleArray;

function zip() {
  var args = Tool.makeArray(arguments);
  for(var i = 0,len = args.length;i<len;i++) {
    if(!Type.isArray(args[i])) {
      throw 'args['+i+']' + args[i] +'的类型不为array';
    }
  }
  var result = [];
  var _tempArray = [];
  var _index = 0
  for(var i = 0,colLength = args[1].length;i<colLength;i++) {
    for(var j = 0,rowLength = args.length;j<rowLength;j++) {
      _tempArray[_index ++] = args[j][i];
    }
    result.push(_tempArray);
    _tempArray = [];
    _index = 0;
  }

  return result;
}
function object(){
  if(arguments.length == 2) {
    var keys = arguments[0];
    var vals = arguments[1];
    if(Type.isArray(keys)&&Type.isArray(vals)) {
      var result = {};
      for(var i = 0,len = arguments[0].length;i<len;i++) {
        result[keys[i]] = vals[i];
      }
    }
  }else if(arguments.length == 1) {
    var objects = arguments[0];
    var result = {};
    for(var i = 0, len = objects.length;i<len;i++) {
      if(!Type.isArray(objects[i])){
        throw '数组元素['+ i+']格式错误.';
      }
      result[objects[i][0]] = objects[i][1];
    }
  }

  return result;
}
//TODO isSorted
function indexOf(array, value){
  if(!Type.isArray(array)) {
    throw 'array' + array + '类型不为Array';
  }
  if(Type.isFunction(value)) {
    for(var i = 0, len= array.length;i<len;i++) {
      if(value(array[i])) {
        return i;
      }
    }
  }else {
    for(var i = 0, len = array.length;i<len;i++) {
      if(array[i] === value) {
        return i;
      }
    }
  }
  return -1;
}
function lastIndexOf(array,value,formIndex) {
  if(!Type.isArray(array)) {
    throw 'array ' + array + '类型不为Array';
  }
  formIndex = formIndex != undefined && !isNaN(parseInt(formIndex)) ? parseInt(formIndex) : '';
  i = formIndex === '' ? array.length -1:formIndex;
  for(;i>=0;i--) {
    if(array[i] === value) {
      return i;
    }
  }
  return -1;
}
function sortedIndex(array, value, iterator, context) {
  if(!Type.isArray(array)) {
    throw 'array ' + array + '类型不为Array';
  }
  array = clone(array);
  if(iterator !== undefined) {
    var tempArray = [];
    var tempValue = '';
    if(Type.isFunction(iterator)) {
      iterator = bindFactory(iterator, context);
      for(var i = 0, len = array.length;i<len;i++) {
        tempArray.push(iterator(array[i]));
      }

      tempArray.push( tempValue = iterator(value));
      tempArray.sort();
      for(var i = 0, len = array.length;i<len;i++) {
        if(tempArray[i] === tempValue) {
          return i;
        }
      }
    }else if(Type.isString(iterator)) {
      for(var i = 0,len = array.length;i<len;i++) {
        tempArray.push(array[i][iterator]);
      }
      tempArray.push(value[iterator]);
      tempArray.sort();
      for(var i = 0, len = array.length;i<len;i++) {
        if(tempArray[i] === value[iterator]) {
          return i;
        }
      }
    }
  }else {
    array.push(value);
    array.sort();
    for(var i = 0, len =array.length;i<len;i++) {
      if(array[i] === value) {
        return i;
      }
    }
  }

}
function range(start,stop,step) {
  var result = [];
  if(arguments.length == 1) {
    stop = start;
    start = 0;
  }
  var step = step != undefined && !isNaN(parseInt(step)) ? step: 1;
  var start = start != undefined && !isNaN(parseInt(start)) ? start: 0;
  if(stop - start < 0) {
    for(var i=stop-step;i<=start;i = i-step) {
      result.unshift(i);
    }
  }else {
    for(var i = stop - step;i>=start;i = i - step) {
      result.unshift(i);
    }
  }

  return result;
}
function singleArray (array){
  if(!Type.isArray(array)) {
     throw 'array' + array + '类型不为Array';
  }
  for(var i = 0;i<array.length;i++) {
    for(var j = i+1;j<array.length;j++) {
      if(array[i] === array[j]) {
        array.splice(j,1);
        j--;
      }
    }
  }

  return array;
}
//function
function bind(func, obj, arg) {
  if(obj == undefined) {
    throw 'obj' + obj + '不能为空';
    return;
  }
  if(!Type.isArray(arg)) {
    arg = [arg];
  }
  return function() {
    //这里函数的调用参数是通过bind来传递的
    //如果需要通过返回的绑定的函数来自己传递参数，这吧参数写在包裹函数上
    func.apply(obj,arg);
  }
}

function bindAll(obj){
  var funcNames = Tool.makeArray(arguments).splice(0,1);

  each(funcNames, function(funcName, index, funcs) {
    obj[funcName] = bind(obj[funcName], obj);
  });
}




function bindFactory(func, context) {
  if(Type.isObj(context)) {
    return func.bind(context);
  }
  return func;
}
function clone(obj, isDeep) {
  var _results = null;
  if(Type.isObj(obj)) {
    _results = {};
    for(var item in obj) {
      if(isDeep) {
        if(Type.isObj(obj[item]) || Type.isArray(obj[item])) {
          _results[item] = clone(obj[item]);
        }else {
          _results[item] = obj[item];
        }
      }else {
        _results[item] = obj[item];
      }
    }
  }else if(Type.isArray(obj)) {
    _results = [];
    for(var i = 0, len= obj.length;i<len;i++) {
      if(isDeep) {
        if(Type.isObj(obj[i]) || Type.isArray(obj[i])) {
          _results[i] = clone(obj[i]);
        }else {
          _results[_results.length] = obj[i];
        }
      }else {
        _results[_results.length] = obj[i];
      }
    }
  }else {
    throw 'obj' + obj + '类型出错';
  }

  return _results;
}

function _getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//注意交换函数只能用在引用值上，所以这里需要传递array参数
function _swap(array,index1, index2) {
  var _temp = null;
  _temp = array[index1];
  array[index1] = array[index2];
  array[index2] = _temp;
}

function _number(val, iterator) {
  if(iterator != undefined) {
    if(Type.isFunction(iterator)) {
      return !Type.isNumber(iterator(val)) ? -Infinity : iterator(val);
    }else {
      throw 'iterator' + iterator + '类型出错';
    }
  }else {
    return !Type.isNumber(val) ? -Infinity: val;
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



