$(function(){
  var socket = io();
  var user = $('.J_username').text()
  var writeBox = $('.J_writeBox');
  var sendBtn = $('.J_sendBtn');
  var messageBox = $('.J_messageBox');
  var sendTo = null;
  var selectItem = null;

  function bindSocketEvent(){
    /* link event */
    socket.on('user:linkStatus',function(status){
      if(status) {
        writeBox.removeAttr('disabled');
        sendBtn.removeAttr('disabled');
        selectItem.addClass('selected');
      }else {
        console.log('userlink error');
      }
    });

    /* get message */
    socket.on('user:getMessage',function(opt){
      var message =  '<li class="msgReceive fn-clear">' + 
      '<span><em>'+opt.from+' :</em>'+opt.msg+'</span></li>';
      messageBox.append(message);
    });
    /* send message response */
    socket.on('user:sendMessage',function(opt){
      var myMessage =  '<li class="msgSend fn-clear">' + 
      '<span><em>'+opt.from+' :</em>'+opt.msg+'</span></li>';
      messageBox.append(myMessage);
      writeBox.val('');
    });
  }
  function bindEvent() {
    /* link friend */
    $('.J_friendsList').on('click','li',function(e){
      var target = $(e.currentTarget);
      if(!target.hasClass('online')) {
        return;
      }
      sendTo = target.text();
      target.siblings('li').removeClass('selected');

      selectItem = target;
      messageBox.attr('data-selected',sendTo);
      writeBox.attr('disabled','disabled');
      sendBtn.attr('disabled','disabled');

      socket.emit('user:link',{from:user,to:sendTo});
    });

    /* send Message */
    sendBtn.on('click',function(){
      if(messageBox.attr('data-selected') == undefined) {
        return;
      }
      var msg = writeBox.val();
      console.log('sendMsg',msg);
      socket.emit('user:send',{
        from: user,
        to: sendTo,
        msg: msg
      });
    });
  }
  
  function init(){
    socket.emit('user:enter',user);
    bindSocketEvent();
    bindEvent();
  }
  init();
});