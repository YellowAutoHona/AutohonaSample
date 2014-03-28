$(document)
		.ready(
				function() {
					var town1, town2, sourcestore = '', destinationstore = '';
					var directionsDisplay;
					var directionsService;
					var map;
					var geocoder;
					function initialize() {
						headerDown();
						bottomUp();
						geocoder = new google.maps.Geocoder();
						directionsService = new google.maps.DirectionsService();

						var mapOptions = {
							center : new google.maps.LatLng(17.385044,
									78.486671),
							zoom : 13,
							disableDefaultUI : true
						};
						directionsDisplay = new google.maps.DirectionsRenderer();
						map = new google.maps.Map(document
								.getElementById('map-canvas'), mapOptions);
						directionsDisplay.setMap(map);

						var input = (document.getElementById('pac-input1'));
						var button_search = (document
								.getElementById('find_location'));

						var types = document.getElementById('type-selector');

						var autocomplete = new google.maps.places.Autocomplete(
								input);
						autocomplete.bindTo('bounds', map);

						google.maps.event
								.addListener(
										autocomplete,
										'place_changed',
										function() {
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

						var autocomplete1 = new google.maps.places.Autocomplete(
								input1);
						autocomplete.bindTo('bounds', map);
						google.maps.event
								.addListener(
										autocomplete1,
										'place_changed',
										function() {
											var place1 = autocomplete1
													.getPlace();
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

						// --------------map loaded end -----------//
						// --------search and pointing ----------//

						function setRoute() {
							if (sourcestore != '' && destinationstore != '') {

								calcRoute();
							} else {
								alert("please enter the google adress bars.... source and destination");
							}
						}

						
						function codeAddress() {
                            if(geocoder==null)
							    geocoder = new google.maps.Geocoder();
							var src_address = document.getElementById("pac-input1").value;
							alert(src_address);
							geocoder.geocode({ 'address': src_address},
	
										 function(results, status) {
									
								                if (status == google.maps.GeocoderStatus.OK) {
								                	  console.log(results[0].geometry);
//												        map.setCenter(results[0].geometry.location);
//												        var marker = new google.maps.Marker({
//												        										map: map,
//												        										position: results[0].geometry.location
//												        	                                });
//												        console.log(results[0].geometry);
												        alert("I am ready to send latitude and longitude=(" +results[0].geometry.location.lat()+" , "+results[0].geometry.location.lng()+") ");
									               }
												 else {
													 	alert("Geocode was not successful for the following reason: " + status);
												 		}
										});
	
						}//codeAddress()

						
						
						
						function calcRoute() {

							var start = sourcestore;
							var end = destinationstore;

							// console.log(sourcestore);
							var request = {
								origin : start,
								destination : end,
								travelMode : google.maps.TravelMode.DRIVING
							};
							directionsService.route(request, function(response,
									status) {
								if (status == google.maps.DirectionsStatus.OK) {
									directionsDisplay.setDirections(response);
								}
							});
						}

						function getAutoData() {
							$.blockUI({
										message : '<h3><img src="img/loader.gif" /> Just a moment...</h3>',
										css : {
											border : '0px'
										}
									});
							$.ajax({
										url : "http://192.168.1.130:8080/AutoHona/getAutoData.php",
										cache : false,
										dataType : "json",
										success : function(dataAll) {

											setTimeout($.unblockUI,2000);
                                           console.log(dataAll);
											$("#autolistDiv").html("");
                                            var data=dataAll[0].data;
											data.sort(function(a, b) {
												return parseFloat(a.dist)
														- parseFloat(b.dist)
											});

											window.location.autolist = data;
											$.each(
															data,
															function(index,
																	value) {
																// console.log(value);
																$(
																		"#autolistDiv")
																		.append(
																				"<a><div class='auto'>Name: "
																						+ value.drivername
																						+ "<br>Phone No.: "
																						+ value.phonenum
																						+ "<br>Dist: KM"
																						+ value.dist
																						+ "<div class='display-item'></div><button id='"
																						+ value.autoid
																						+ "' index='"
																						+ index
																						+ "' onclick='visibleDiv(this);' >Details</button></div></a>");

															});
											pointingAutos();
										},
										error : function(error) {
											$.unblockUI();
											alert("Error in loading....");
											
										}
									});

						}

						var pointingAutos = function() {

							autolist = window.location.autolist;

							var marker;
							var markers = new Array();

							// Add the markers and infowindows to the map
							for (var i = 0; i < 10; i++) {
								marker = new google.maps.Marker({
									position : new google.maps.LatLng(
											autolist[i].latitude,
											autolist[i].longitude),

									icon : 'img/auto.png',
									map : map
								});

								markers.push(marker);
								google.maps.event
										.addListener(
												marker,
												'click',
												(function(marker, i) {
													return function() {
														infowindow
																.setContent("Auto<br>DriverName:"
																		+ autolist[i].drivername
																		+ "<br>Rating"
																		+ autolist[i].rating
																		+ "<br>Distance"
																		+ autolist[i].dist
																		+ "KM");
														infowindow.open(map,
																marker);
													}
												})(marker, i));

							}
						}
						var infowindow = new google.maps.InfoWindow({
						// maxWidth: 160
						});

						$("#showRight").click(function() {

							setRoute();
							codeAddress();
							getAutoData();

						});

					}

					google.maps.event
							.addDomListener(window, 'load', initialize);

				});