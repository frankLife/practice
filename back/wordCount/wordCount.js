var fs = require('fs');
var tasks = [];
var wordCount = {};
var countDir = './countDir';

function readDir(countDir){
  fs.readdir(countDir,function(err,files) {
    if(err) {
      console.log('readdir error');
      return;
    }
    for(var i = 0,len = files.length;i<len;i++) {
      // this point easy make a closure error
      var task =  (function(fileName){
                    return  function(){
                              fs.readFile(countDir+'/'+fileName,function(err,data){
                                if(err) {
                                  console.log('readFile error');
                                  return;
                                }
                                console.log(fileName)
                                countWord(data);
                                checkFinish();
                              })
                            }
                  })(files[i]);
      addTask(task);
    }

    for(var i = 0;i<len;i++) {
      tasks[i]();
    }
  });
}
function countWord(data){
  var strArray = data.toString()
                     .match(/\w+/g)
                     .sort();
  // console.log(strArray)
  for(var i = 0,len = strArray.length;i<len;i++) {
    var str = strArray[i];

    wordCount[str] = wordCount[str] == undefined ? 1: wordCount[str]+1;
  }

  // console.log(wordCount);

}
function addTask(fn){
  tasks.push(fn);
}
checkFinish.index = 0;
function checkFinish(){
  checkFinish.index ++;
  if(checkFinish.index == tasks.length) {

    for(var word in wordCount) {
        console.log(word+': ',wordCount[word]);
    }
  }
}

readDir(countDir);

