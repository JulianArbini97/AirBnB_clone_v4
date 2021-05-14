$(document).ready(function() {
    $('.chckbx').click(function() {
      let text= "";
      let ids = [];
      $('.chckbx:checked').each(function() {
        text+=' ' + $(this).attr('data_name')+ ',';
        ids.push($(this).attr('data_id'));
      });
      text=text.substring(0, text.length-1);
      $("#selectedtext").text(text);
      
      let count = $("[type='checkbox']:checked").length;
      $('#count').val(ids);
    });
  });