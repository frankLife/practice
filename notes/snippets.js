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

