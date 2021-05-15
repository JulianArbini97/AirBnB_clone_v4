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
      $('#count').val(ids);
    });

    $.get('http://localhost:5001/api/v1/status/', function(data, statusText, xhr) {
      if (xhr.status == 200) {
        $("DIV#api_status").addClass("available");
      }
      else {
        $("DIV#api_status").removeClass("available");
      }
    });
  });
