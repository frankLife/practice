**Notes**

0.  浏览器请求网页包含两个请求，请求页面文件本身，请求页面favico
1.  If you attach a data event listener, then it will switch the stream into flowing mode, and data will be passed to your handler as soon as it is available. (FROM API) 通过stream绑定data事件来进行文件读取
3.	windows的cmd输入单个字符立马触发data事件，并且在c.write(data)时，将输入的原始字符再打印出来
4.	c.pipe(c) === c.on('data',function(data){c.write(data)})
5.	终端输入的时机，cmd是输入任何字符就会发送消息，xshell输入时发送输入内容之后再发送一次0d0a
?:
0.net 模块的clinet 的connect事件触发   ->不是通过server端建立的时候在异步回调的client中绑定，是在client端，通过connect方法建立的client中绑定,server端可以通过connection事件


