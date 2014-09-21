KISSY.ready(function(S) {
  KISSY.use('node,io,ua',function(S,Node,IO,UA) {

    var $ = Node.all;
    function boundlessReq(opt) {
      this.param = {
        url: opt.url,
        data: opt.data
      }
      this.callback = {
        success: opt.success,
        complate: opt.complate,
        error: opt.error
      }

      this.curName = '';
      this.originName = window.name;
      this.domain = location.host.match(/\.([^\/\.]+\.[^\/\.]+)/)[1];
      this.prepare();
      this.send();
    }
    boundlessReq.prototype.send = function(){
      var data = this.param.data;
      var html = '';
      var form = $('#crossForm');
      var self = this;
      for(var item in data) {
        html += '<input type="hidden" name="'+item+'" value="'+data[item]+'" />';
      }
      html += '<input type="hidden" name="domain" value="'+this.domain+'" />'
      form.empty();
      $(html).appendTo('#crossForm');
      form[0].submit();

      // if(UA.ie < 7) {
      //   listenName();
      // }
      function listenName(){
        setTimeout(function(){
          self.curName = window.name;
          if(self.curName != self.originName) {
          this.callback[self.curName]();
          window.name = self.originName;
          }else {
            setTimeout(arguments.callee,100)
          }
        },100);
      }

    };
    boundlessReq.prototype.prepare = function(){
      if($('#crossForm').length > 0) {
        return;
      }
      var self = this;
      document.domain = this.domain;
      $('<form style="display: none" id="crossForm" action='+this.param.url+' target="crossIfr" method="post"></form>').appendTo('body');
      $('<iframe style="display: none" name="crossIfr" src="" id="crossIfr"></iframe>').appendTo('body');
      window.callback = [];
      for(var func in this.callback) {
        if(typeof this.callback[func] === 'function') {
          window.callback[func] = this.callback[func];
        }
      }

    }

    $('#btn').on('click', function(){
      new boundlessReq({
        url: 'http://b.shangpo.com/cross/data.php',
        data: {
          'name': 'shangpo'
        },
        success: function(){
          alert('ok');
        }
      }
    );
    });





  });
});