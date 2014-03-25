angular.module('myApp', [])
.controller('MyCtrl', ['$scope', '$http', function($scope, $http) {

	//------------------------------------------------------
	
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
						map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
						directionsDisplay.setMap(map);

						var input = (document.getElementById('pac-input1'));
						var button_search= (document.getElementById('find_location'));

						var types = document.getElementById('type-selector');
					//	map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
					//	map.controls[google.maps.ControlPosition.TOP_CENTER].push(types);
		

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
//						map.controls[google.maps.ControlPosition.TOP_CENTER].push(input1);
//						map.controls[google.maps.ControlPosition.TOP_CENTER].push(types1);
//						map.controls[google.maps.ControlPosition.TOP_CENTER].push(button_search);
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
									} 
								else {
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
								geocoder.geocode({ 'address': src_address},
		
											 function(results, status) {
										
									                if (status == google.maps.GeocoderStatus.OK) {
													        map.setCenter(results[0].geometry.location);
													        var marker = new google.maps.Marker({
													        										map: map,
													        										position: results[0].geometry.location
													        	                                });
													        console.log(results[0].geometry);
													        alert("I am ready to send latitude and longitude=(" +results[0].geometry.location.A+" , "+results[0].geometry.location.k+") ");
										               }
													 else {
														 	alert("Geocode was not successful for the following reason: " + status);
													 		}
											});
		
							}//codeAddress()


		google.maps.event.addDomListener(window, 'load', initialize);
	
		$("#find_location").click(function(e) {
											e.preventDefault();
											$("#sidebar-wrapper").toggleClass("active");
											});
   
		    $("#menu-close").click(function(e) {
	        e.preventDefault();
	        $("#sidebar-wrapper").toggleClass("active");
	    });
	 
	   $(function() {
	        $('a[href*=#]:not([href=#])').click(function() {
	            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

	                var target = $(this.hash);
	                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	                if (target.length) {
	                    $('html,body').animate({
	                        scrollTop: target.offset().top
	                    }, 1000);
	                    return false;
	                }
	            }
	        });
	    });
	   
	  var geocoder;
	 
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
	  }
	//Get the latitude and the longitude;
	function successFunction(position) {
	    var lat = position.coords.latitude;
	    var lng = position.coords.longitude;
	    codeLatLng(lat, lng)
	}
	 
	function errorFunction(){
	    alert("Geocoder failed");
	}
	 
	  function initializec() {
	                                 geocoder = new google.maps.Geocoder();
	   }
	  
	  
	  function codeLatLng(lat, lng) {
	 
				    var latlng = new google.maps.LatLng(lat, lng);
				    geocoder.geocode({'latLng': latlng}, function(results, status) {
				    	
							      if (status == google.maps.GeocoderStatus.OK) {
							      console.log(results);
							        if (results[1]) {
							         //formatted address
							         //alert(results[0].formatted_address)
							        var giveaway =  results[0].formatted_address;
									
							 
							        } else {
							          alert("No results found");
							        }
							      } else {
							        alert("Geocoder failed due to: " + status);
							      }
				    });
	  }
	//**********************************************
	  var menuRight = document.getElementById( 'cbp-spmenu-s2' ),
		showRight = document.getElementById( 'showRight' ),
		menuTop = document.getElementById( 'cbp-spmenu-s3' ),
		showTop = document.getElementById( 'showTop' ),
		body = document.body;

	showRight.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuRight, 'cbp-spmenu-open' );
	};
	showTop.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuTop, 'cbp-spmenu-open' );
		
	};
	function displayMenu()
	{
							
		classie.toggle( showTop, 'active' );
		classie.toggle( menuTop, 'cbp-spmenu-open' );
	
	}
	
	
	displayMenu();
  //	<!------------------------------------------------------->
	$scope.user    = {};
    $scope.autolist = [];
          
  $scope.search = function() {
    /* the $http service allows you to make arbitrary ajax requests.
     * in this case you might also consider using angular-resource and setting up a
     * User $resource. */
      
    $http.get('http://192.168.1.117:8080/AutoHona/getAutoData.php').success(function(data){

    	console.log(data);
    	$scope.autolist =data;
    	
    	setRoute();
    	$scope.pointingAutos();
    	
    	}).error(function(error){
    		
    		console.log(error);
    	});
  }
  var infowindow = new google.maps.InfoWindow({
     // maxWidth: 160
    });
  $scope.pointingAutos=function(){
	  
	 console.log($scope.autolist);
	  
	 
	 var marker;
	    var markers = new Array();
	    
	  
	    
	    // Add the markers and infowindows to the map
	    for (var i = 0; i < 10; i++) {  
	      marker = new google.maps.Marker({
	        position: new google.maps.LatLng($scope.autolist[i].latitude, $scope.autolist[i].longitude),
	       
	        icon: '../v3/img/auto.png',
	        map: map
	      });

	      markers.push(marker);
	      google.maps.event.addListener(marker, 'click', (function(marker, i) {
	          return function() {
	            infowindow.setContent("Auto<br>DriverName:"+$scope.autolist[i].drivername+"<br>Rating"+$scope.autolist[i].rating+"<br>Distance"+$scope.autolist[i].dist+"KM");
	            infowindow.open(map, marker);
	          }
	        })(marker, i));
	      
	      
	      
	    }
  }
}]);
