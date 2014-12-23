var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');

var tasks = [
  //judge
  function(){
    var path = './rsslist.txt'
    fs.exists(path,function(isExists){
      if(isExists) {
        next(false,path)
      }else {
        next("there is not rss  list file.");
      }
    });
  },
  //readfile and return request url
  function (path){
    fs.readFile(path,function(err,data){
      if(err) {
        next(path + ' path read file fail ');
        return;
      }else{
        console.log(data);
        data = data.toString()
                   .replace(/^\s+|\s+$/g,'')
                   .split("\r\n");
        next(false,data);
      }
    });
  },
  //get response content & output the title & link
  function(feedList){ 
    var handler = new htmlparser.RssHandler();
    var parser = new htmlparser.Parser(handler);

    for(var i = 0,len = feedList.length;i<len;i++) {
      request(feedList[i],function(error,response,body){
        if(!error && response.statusCode == 200 ) {
          parser.parseComplete(body);
          console.log(handler.dom.items);
        }
      });
    }
  }
];

function next(isError,param) {
  if(!!isError) {
    console.log(isError);
  }else {
    tasks.shift()(param);
  }
}

next();