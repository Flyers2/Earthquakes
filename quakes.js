var map;
function initialize() {
    var mapOptions = {
        center: {lat: 34.063112, lng: -118.221622},
        zoom: 8
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

}


google.maps.event.addDomListener(window, 'load', initialize);

$("#quake_data").click(function() {
    $.getJSON("quakes.php", function(data) {
       // $('#map-canvas').effect("shake",{times:10},7000);
        $.each(data, function(i, data) {       
        var circleOptions = {
        strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: new google.maps.LatLng(data.latitude, data.longitude),
                radius: (data.mag) * 5000
           };
                // Add the circle for this earthquake to the map.
            theCircle = new google.maps.Circle(circleOptions);
            google.maps.event.addListener(theCircle, 'click', function() {
                    $.post("quakes.php", {circleId: data.id}, function(data) {
                        var parsedData = $.parseJSON(data);
                        var date = new Date(parsedData.time);
                        var year = date.getFullYear();
                        var month = date.getMonth()+1;
                        var day = date.getDate();
                        var message = "<b>Location: </b>"+parsedData.place+"<br>"+                                    
                                      "<b>Latitude: </b>"+parsedData.latitude+"<br>"+
                                      "<b>Longitude: </b>"+parsedData.longitude+"<br>"+
                                      "<b>Date: </b>"+month+"/"+day+"/"+year+"<br>"+
                                      "<b>Time: </b>"+date.toLocaleTimeString()+"<br>"+
                                      "<b>Magnitude: </b>"+parsedData.mag+"<br>";
                        $('#myModalBody').html(message);
                        $('#myModal').modal('show');
                        });

                   });
                });
         });
});
      