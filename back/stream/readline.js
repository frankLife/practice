/* realize in process module  */
process.stdout.write('What do you think of node.js? ');
process.stdin.setEncoding('utf-8');
// process.stdin.on('readable',function(){
      // 'process.stdin.read()' can get data from stream,
      // if you use it to get data ,the data event will not be triggered.
//   var chunk = process.stdin.read(); 
//   var index = -1;
//   if(chunk && (index = chunk.indexOf('\r\n')) >= 0 ) {
//     process.stdout.write('you mean "' + chunk.slice(0,index) + chunk.slice(index + 2) + '" ? \r\n');
//     // process.exit(0);
//   }
  
// });
/* 
If you attach a data event listener, then it will switch the stream into flowing mode, 
and data will be passed to your handler as soon as it is available.
 */
process.stdin.on('data',function(data){
  console.log('data event: ' + data);
});

// /* realize in readline module */
// var readline = require('readline');
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question("What do you think of node.js? ",function(answer){
//   console.log("Thank you for your valuable feedback:", answer);
//   rl.close();
// });
