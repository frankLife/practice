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
// foo=1&foo=2&blah=a&blah=b&foo=3 => foo=1,2,3&blah=a,b
function replaceTraverse(src){
  var regExp = /(\w+)=(\w+)/g;
  var keyVal = {}

  src.replace(regExp,function(str,key,val){
    if(keyVal[key]) {
      keyVal[key] = keyVal[key] + ',' + val;
    }else {
      keyVal[key] = val;
    }

    return '';
  });
 
  var ret = [];
  for(var key in keyVal) {
    ret.push(key+'='+keyVal[key]);
  }
  return ret.join('&');
}
//"<b>Hello</b>\n<i>world!</i>" -> /[\s\S]*/  or /[.\s]*/


