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
})()
