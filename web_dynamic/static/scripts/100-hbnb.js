$(document).ready(function() {
    $('.chckbx').click(function() {
      let text= "";
      $('.chckbx:checked').each(function() {
        text+=' ' + $(this).attr('data_name')+ ',';
      });
      text=text.substring(0, text.length-1);
      $("#selectedtext").text(text);
    });

    $('.chk_state').click(function() {
      let text= "";
      $('.chk_state:checked').each(function() {
        text+=' ' + $(this).attr('data_name')+ ',';
      });
      text=text.substring(0, text.length-1);
      $("#selected").text(text);
    });

    $('.chk_city').click(function() {
      let text= "";
      $('.chk_city:checked').each(function() {
        text+=' ' + $(this).attr('data_name')+ ',';
      });
      text=text.substring(0, text.length-1);
      $("#selected").text(text);
    });

    $.get('http://localhost:5001/api/v1/status/', function(data, statusText, xhr) {
      if (xhr.status == 200) {
        $("DIV#api_status").addClass("available");
      }
      else {
        $("DIV#api_status").removeClass("available");
      }
    });

    /*const url = 'http://localhost:5001/api/v1/places_search';
    const data = {};
    fetch(url, {
        data: JSON.stringify(data),
        headers: {
            'dataType': 'json',
            'content-type': 'application/json'
        },
        type: 'POST',
        redirect: 'follow',
        success: function (response) {
            let place = JSON.parse(response.d);
            // Iterate through your table (e.g. your images
            $.each(place.Table, function(index, pl) {
                 console.log(pl[index].name);
            });
        }
    });*/
    
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5001/api/v1/places_search',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({}),
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                $("section.places").append( "<article><div class='title_box'><h2>" + response[i].name + "</h2><div class='price_by_night'>$" + response[i].price_by_night + "</div></div><div class='information'><div class='max_guest'>" + response[i].max_guest + " Guest</div><div class='number_rooms'>" + response[i].number_rooms + " Bedroom</div><div class='number_bathrooms'>" + response[i].number_bathrooms + " Bathroom</div></div><div class='description'>" + response[i].description + "</div></article>" );
            }
        }
    });

    $('button').click(function(event) {   
        console.log("hello");
        const values = [];
	const v_states = [];
	const v_cities = [];
        $('.chckbx:checked').each(function() {
          values.push($(this).attr('data_id'));
        });
        $('.chk_state:checked').each(function() {
          v_states.push($(this).attr('data_id'));
        });
        $('.chk_city:checked').each(function() {
          v_cities.push($(this).attr('data_id'));
        });

        $("section.places").empty();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:5001/api/v1/places_search',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({"states": v_states, "cities": v_cities, "amenities": values}),
            success: function (response) {
                console.log(response);
                for (let i = 0; i < response.length; i++) {
                    $("section.places").append( "<article><div class='title_box'><h2>" + response[i].name + "</h2><div class='price_by_night'>$" + response[i].price_by_night + "</div></div><div class='information'><div class='max_guest'>" + response[i].max_guest + " Guest</div><div class='number_rooms'>" + response[i].number_rooms + " Bedroom</div><div class='number_bathrooms'>" + response[i].number_bathrooms + " Bathroom</div></div><div class='description'>" + response[i].description + "</div></article>" );
                }
            }
        });
        event.preventDefault();
    });
  });
