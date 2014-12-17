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
