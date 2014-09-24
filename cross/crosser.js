
function crosser(opt){
  this.param = {
      url: opt.url,
      data: opt.data,

      success: opt.success,
      complate: opt.complate,
      error: opt.error
  }

  this._curName = '';
  this._orginName = window.name;
  this._domain = location.host.match(/\.(.*\.\w+)/)[1];
  this._dataForm = null;
  this._msgIframe = null;
  this._isPostMessage = null;

  this.prepare();
  this.send();
  }

crosser.prototype.prepare = function(){
  var self = this;
  //防止多次插入中介form
  if(document.getElementById('crossForm') != null) {
    self._dataForm = document.getElementById('cssForm');
    self._msgIframe = document.getElementById('crossIfr');

    var isPostMessage = self._isPostMessage = 'postMessage' in window;
    document.domain = self._domain;
  }else {

    var param = self.param;
    var body = document.getElementsByTagName('body')[0]
    var dataForm = this._dataForm  = document.createElement('form');
    var msgIframe = this._msgIframe =  document.createElement('iframe');

    var isPostMessage = self._isPostMessage = 'postMessage' in window;

    dataForm.style.display = 'none';
    dataForm.id = 'crossForm';
    dataForm.action = this.param.url;
    dataForm.target = 'crossIfr';
    dataForm.method = 'post';
    body.appendChild(dataForm);

    msgIframe.style.display = 'none';
    msgIframe.name = 'crossIfr';
    msgIframe.src = '';
    msgIframe.id = 'crossIfr';
    body.appendChild(msgIframe);

    document.domain = self._domain;
  }


  //通过postMessage绑定事件接受消息返回
  if(isPostMessage) {
    if(window.addEventListener) {
      window.addEventListener('message',function(e){
      self.param[e['data']]();
      },false);
    }else {
      window.attachEvent('onmessage', function(e){
        self.param[e['data']]();
      });
    }
  }
}

crosser.prototype.send = function(){
  var self = this;
  var data = self.param.data;
  var html = '';
  var dataForm = self._dataForm;

  //利用form表单发送跨域请求
  for(var item in data) {
     html += '<input type="hidden" name="'+item+'" value="'+data[item]+'" />';
  }
  html += '<input type="hidden" name="domain" value="'+self._domain+'" />'
  dataForm.innerHTML = html;
  

  //ie6、7兼容
  self.ieReceive();
  dataForm.submit();
}
crosser.prototype.ieReceive = function(){
  var self = this;

}

document.getElementById('btn').onclick = function(){
  new crosser({
    url: 'http://b.shangpo.com/mine/practice/cross/data.php',
    data: {
      'name': 'shangpo'
    },
    success: function(){
      alert('ok');
    }
  })

};
