define(function(require,exports,module){

  var modB = require('./Mloader-modB');

  modB.believe();
  alert('Rome was not built ');
  require('./Mloader-modCssA.css');

});