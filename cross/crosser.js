
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
  //防止多次插入中介form
  if(document.getElementById('crossForm') != null) {
    return;
  }
  var self = this;
  var param = self.param;
  var body = document.getElementsByTagName('body')[0]
  var dataForm = this._dataForm  = document.createElement('form');
  var msgIframe = this._msgIframe =  document.createElement('iframe');
  self._isPostMessage = 'postMessage' in window;

  dataForm.style.display = 'none';
  dataForm.id = 'crossForm';
  dataForm.action = this.param.url;
  dataForm.target = 'crossIfr';
  dataForm.method = 'post';
  body.appendChild(dataForm);

  msgIframe.style.display = 'none';
  msgIframe.style.name = 'crossIfr';
  msgIframe.src = '';
  msgIframe.id = 'crossIfr';
  body.appendChild(msgIframe);

  document.domain = self._domain;
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
  

  dataForm.submit();
  self.receive();

}
crosser.prototype.receive = function(){
  var self = this;
  var isPostMessage = this._isPostMessage;
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
  }else {

  }
}

document.getElementById('btn').onclick = function(){
  new crosser({
    url: 'http://b.shangpo.com/cross/data.php',
    data: {
      'name': 'shangpo'
    },
    success: function(){
      alert('ok');
    }
  })
  console.log('x');
};
