**Notes**

0.  浏览器请求网页包含两个请求，请求页面文件本身，请求页面favico
1.  If you attach a data event listener, then it will switch the stream into flowing mode, and data will be passed to your handler as soon as it is available. (FROM API) 通过stream绑定data事件来进行文件读取
2.  readfile 读出来的内容(buffer)在通过response返回的时候，会根据writeHead写的Content-Type来进行解析
3.	windows的cmd输入单个字符立马触发data事件，并且在c.write(data)时，将输入的原始字符再打印出来
4.	c.pipe(c) === c.on('data',function(data){c.write(data)}) note: res.end() notneeded, called internally by stream.pipe()
5.	终端输入的时机，cmd是输入任何字符就会发送消息，xshell输入时发送输入内容之后再发送一次0d0a
6.  util.inherits(ChildClass,SuperClass) 相当于  ChildClass.prototype =  new SuperClass(),如果需要继承属性的话，还是需要SuperClass.call(this,[parameters]);
7.  rename可以通过指定不同的文件夹进行文件移动(剪切)以及本身可以进行重命名
8.  mongodb不能传递undefined
9.  Another feature that Connect provides is the concept of "mounting", a simple yet
powerful organizational tool that allows you to define a path prefix that is required
in order for the middleware to be called.**the point is that the mouting part means the prefix of url**
10. If a writable.write(chunk) call returns false, then the drain event will indicate when it is appropriate to begin writing more data to the stream. if writable.write(chunk) will returns true if the entire data was flushed successfully to the kernel buffer, returns false if all or part of the data was queued in user memory. 'drain' will be emitted when the buffer is again free.
?:
0. net 模块的clinet 的connect事件触发   ->不是通过server端建立的时候在异步回调的client中绑定，是在client端，通过connect方法建立的client中绑定,server端可以通过connection事件
1. post请求用data事件传递参数，get请求通过url解析(url.parse(url).search得到参数)
2. res.locals -> app.locals貌似可以用来做打底数据？



