**Notes**

0.  浏览器请求网页包含两个请求，请求页面文件本身，请求页面favico
1.  If you attach a data event listener, then it will switch the stream into flowing mode, and data will be passed to your handler as soon as it is available. (FROM API) 通过stream绑定data事件来进行文件读取
2.  readfile 读出来的内容(buffer)在通过response返回的时候，会根据writeHead写的Content-Type来进行解析

