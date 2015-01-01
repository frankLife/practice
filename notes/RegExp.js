/*
RegExp notes:
0. This phase of parsing and conversion must occur every time a regular expression is created;compiling a regex once and storing it in a  variable for later reference can be an important optimization
1. \b匹配这样的位置：它的前一个字符和后一个字符不全是(一个是,一个不是或不存在)\w。
*/

function getElsByClassName(className) {
  var ret = []
  // if(document.getElementsByClassName) {
  //   ret= document.getElementsByClassName(className);
  // }else if(document.querySelectorAll) {
  //   ret = document.querySelectorAll(className);
  // }else {
    //unable to use a regex literal
    var reg = new RegExp('\\b' + className +'\\b');
    var els = document.getElementsByTagName('*');
    for(var i = 0,len = els.length;i<len;i++) {
      if(reg.test(els[i].className)) {
        ret.push(els[i]);
      }
    }
  // }

  return ret;

}

