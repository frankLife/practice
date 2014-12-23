/*use apply to change parameter pass style from array to a single-ones*/
(function(){
  function smallest(array){
    return Math.min.apply(Math,array);
  }
  function largest(array){
    return Math.max.apply(Math,array);
  }
  var testArray =  [0,3,1,2,4];

  console.log('smallest: ',smallest(testArray));
  console.log('largest: ',largest(testArray));
})();


/*use native method width change the context to do work*/
(function(){
  var elems = {
    length: 0,
    add: function(elem){
      Array.prototype.push.call(this,elem);
    },
    find: function(tagName){
      this.add(document.getElementsByTagName(tagName)[0]);
    }
  }
  console.log('before find elmes: ',elems);
  elems.find('body');
  elems.find('div');
  console.log('after find elems: ',elems);
})();

/* overload based on increament style */
(function(){
  function addMethod(obj,name,fn,ctx){
    var oldFn = obj[name];
    obj[name] = function(){
      if(fn.length == arguments.length) {
        return fn.apply(ctx,arguments);
      }else {
        return oldFn.apply(ctx,arguments);
      }
    }
  }

  var testObj = {};
  addMethod(testObj,'test',function(){
    console.log(arguments.length,' :0');
  });
  addMethod(testObj,'test',function(param){
    console.log(arguments.length,' :1');
  });
  addMethod(testObj,'test',function(param,param2){
    console.log(arguments.length,' :2');
  });

  testObj['test']();
  testObj['test'](1);
  testObj['test'](1,2);
})();

/* bind & curry excute(shim) */
(function(){
  Function.prototype.bind = function(){                           
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    var ctx = args.shift();
    return function(){
      return self.apply(ctx,args.concat(Array.prototype.slice.call(arguments)));
    }
  };

  Function.prototype.curry = function(){
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    return function(){
      return self.apply(this,args.concat(Array.prototype.slice.call(arguments)));
    }
  }
})()
/* partial */
(function(){
  Function.prototype.partial = function(){
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    return function(){
      var argIndex = 0;
      for(var i = 0,len = args.length;i<len;i++) {
        if(args[i] == undefined) {
          args[i] = arguments[argIndex];
        }
      }

      return self.apply(this,args);
    }
  }
})()
/* memorize */
(function(){
  Function.prototype.memorized = function(key){
    var _values = this._values || {};
    if(_values[key] == undefined) {
      _values[key] = this.apply(undefined,arguments);
    }

    return _values[key];
  }
  Function.prototype.memorize = function(){
    var self = this;
    return function(){
      //context set to self due to 'this.apply' invoke in memorized
      return self.memorized.apply(self,arguments);
    };
  }
  function primeCheck(num){
    var isPrime = true;

    for(var i = 2;i<num;i++) {
      if(num%2 == 0) {
        isPrime = false;
        break;
      }
    }
    if(num == 1) {
      isPrime = false;
    }
    return isPrime;
  }

  var isPrime = primeCheck.memorize();
  isPrime(1);

})();
