var town1, town2, sourcestore = '', destinationstore = '';
var directionsDisplay;
var directionsService;
var map; 
function initialize() {

	directionsService = new google.maps.DirectionsService();

	var mapOptions = {
		center : new google.maps.LatLng(17.385044, 78.486671),
		zoom : 13,
		disableDefaultUI: true
	};
	directionsDisplay = new google.maps.DirectionsRenderer();
	map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
	directionsDisplay.setMap(map);

	var input = (document.getElementById('pac-input1'));
	var button_search= (document.getElementById('find_location'));

	var types = document.getElementById('type-selector');
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(types);
	

	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);

	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		var place = autocomplete.getPlace();

		var address = '';
		if (place.address_components) {
			address = [
					(place.address_components[0]
							&& place.address_components[0].short_name || ''),
					(place.address_components[1]
							&& place.address_components[1].short_name || ''),
					(place.address_components[2]
							&& place.address_components[2].short_name || '') ]
					.join(',');
		}
		sourcestore = address;
	});

	var input1 = (document.getElementById('pac-input2'));

	var types1 = document.getElementById('type-selector');
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(input1);
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(types1);
map.controls[google.maps.ControlPosition.TOP_CENTER].push(button_search);
	var autocomplete1 = new google.maps.places.Autocomplete(input1);
	autocomplete.bindTo('bounds', map);
	google.maps.event.addListener(autocomplete1, 'place_changed', function() {
		var place1 = autocomplete1.getPlace();

		var address1 = '';
		if (place1.address_components) {
			address1 = [
					(place1.address_components[0]
							&& place1.address_components[0].short_name || ''),
					(place1.address_components[1]
							&& place1.address_components[1].short_name || ''),
					(place1.address_components[2]
							&& place1.address_components[2].short_name || '') ]
					.join(',');
		}
		destinationstore = address1;
	});
	getLocation();
}
// gets the current locatiob
function setRoute() {
	if (sourcestore != '' && destinationstore != '') {
		calcRoute();
	} else {
		alert("please enter the google adress bars.... source and destination");
	}
}

function calcRoute() {
	var start = sourcestore;
	var end = destinationstore;

	console.log(sourcestore);
	var request = {
		origin : start,
		destination : end,
		travelMode : google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}

var geocoder;
function codeAddress() {
geocoder = new google.maps.Geocoder();
    var src_address = document.getElementById("pac-input1").value;
	
    geocoder.geocode( { 'address': src_address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
		console.log(results[0].geometry);

           /* $.ajax({
    url: '/orders/add',
    type: 'post',
    data: {hardware: hardwareModel, service:serviceModel}, //            data:hardwarePayload,
    contentType: 'application/json',
    success: function (result) {
        alert(result);
    }
});*/
		alert("I am ready to send latitude and longitude=(" +results[0].geometry.location.A+" , "+results[0].geometry.location.k+") ");
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
	
  }


google.maps.event.addDomListener(window, 'load', initialize);