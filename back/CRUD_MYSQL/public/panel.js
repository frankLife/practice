$(function(){
  bindEvent();
  function bindEvent(){
    $(document).on('click','.J_del',function(e){
      var target = $(e.currentTarget);
      var parentTr = target.parents('tr');
      var id = $($('td',parentTr)[0]).text();


      $.ajax({
        url: 'delete',
        type: 'get',
        dataType: 'json',
        data: {
          id: id
        },
        success: function(d){
          if(d.status == 1) {
            parentTr.fadeOut();
          }else {
            console.log('delete error');
          }
        },
        error: function(){
          console.log('ajax error');
        }
      });
    });
    $(document).on('click','.J_archived',function(e){
      var target = $(e.currentTarget);
      var parentTr = target.parents('tr');
      var id = $($('td',parentTr)[0]).text();


      $.ajax({
        url: 'archived',
        type: 'post',
        dataType: 'json',
        data: {
          id: id
        },
        success: function(d){
          if(d.status == 1) {
            parentTr.fadeOut();
          }else {
            console.log('delete error');
          }
        },
        error: function(){
          console.log('ajax error');
        }
      });
    });
  }
});