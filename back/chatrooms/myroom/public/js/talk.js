$(function(){
  var socket = io();
  var user = $('.J_username').text();
  var writeBox = $('.J_writeBox');
  var sendBtn = $('.J_sendBtn');
  var messageBox = $('.J_messageBox');
  var selectItem = null;
  var groups = [];

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
      if(opt.isGroup && opt.from == user) {
        return;
      }
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
    /* friends login */
    socket.on('user:login',function(loginPerson){
      if(loginPerson != user) {
        var liEls = $('.J_friendsList li');
        for(var i = 0 ,len = liEls.length;i<len;i++) {
          if($(liEls[i]).text() == loginPerson) {
            $(liEls[i]).addClass('online');
          }
        } 
      }
    });
    /* friends logout */
    socket.on('user:logout',function(logoutPerson){
      if(logoutPerson != user) {
        var liEls = $('.J_friendsList li');
        for(var i = 0 ,len = liEls.length;i<len;i++) {
          if($(liEls[i]).text() == logoutPerson) {
            $(liEls[i]).removeClass('online');
          }
        } 
      }
    });
  }
  function bindEvent() {
    /* link friend */
    $('.J_friendsList').on('click','li',function(e){
      var target = $(e.currentTarget);
      if(!target.hasClass('online')) {
        return;
      }
      var sendTo = target.text();
      target.siblings('li').add($('.J_groupsList li')).removeClass('selected');

      selectItem = target;
      messageBox.attr('data-selected',sendTo);
      writeBox.attr('disabled','disabled');
      sendBtn.attr('disabled','disabled');

      socket.emit('user:link',{from:user,to:sendTo});
    });

    /* send message */
    sendBtn.on('click',function(){
      if(messageBox.attr('data-selected') == undefined) {
        return;
      }
      var sendTo = messageBox.attr('data-selected');
      var msg = writeBox.val();
      var matchSendTo = sendTo.match((/groupName:(\w+)/));

      /* send group message */
      if( matchSendTo != null) {
        console.log('send emit');
        socket.emit('group:send',{
          from: user,
          to: matchSendTo[1],
          msg: msg,
          isGroup: true
        });
        return;
      }
      /* send user message */
      socket.emit('user:send',{
        from: user,
        to: sendTo,
        msg: msg,
        isGroup:false
      });
    });

    /* get group members */
    $('.J_groupsList').on('click','li',function(e){
      var target = $(e.currentTarget);
      var groupName = target.text();

      $.ajax({
        url: '/getGroupMembers',
        type: 'post',
        data: {
          groupName: groupName
        },
        dataType:'json',
        success: function(data){
          var membersHTML = '';
          data = data.members;
          for(var i = 0,len = data.length;i<len;i++) {
            membersHTML += '<li>'+data[i]+'</li>'
          }
          $('.J_groupsMembers').html(membersHTML);
          target.siblings().add($('.J_friendsList li')).removeClass('selected');
          target.addClass('selected');
          messageBox.attr('data-selected','groupName:'+groupName);
          writeBox.removeAttr('disabled');
        }
      });

    });

  }
  function getGroups(){
    var groupsEl = $('.J_groupsList li');
    for(var i = 0,len = groupsEl.length;i<len;i++) {
      groups.push($(groupsEl[i]).text());
    }
  }
  
  function init(){
    getGroups();
    socket.emit('user:enter',{username:user,groupsName:groups});
    bindSocketEvent();
    bindEvent();
  }
  init();
});