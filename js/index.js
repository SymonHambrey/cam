$(document).ready(function(){
	var test=window.localStorage.getItem("map");
	console.log("test="+test);
	if(window.localStorage.getItem("map")=="on"){
		$("#map").show();
	}
});

var locArray=[];

//Call this function when you want to get the current position
function getPosition() {

	//navigator.geolocation.clearWatch(watchID);

	var	watchID=navigator.geolocation.watchPosition(function(position){
			locArray=[position.coords.latitude, position.coords.longitude, position.timestamp, position.coords.altitude];
		});
	};

function locateMe(lat,long,time,alti){
	locArray=[lat,long,alti]
}

function initMap(){
	var	watchID=navigator.geolocation.watchPosition(function(position){
			locArray=[position.coords.latitude, position.coords.longitude, position.timestamp, position.coords.altitude];
			var location={lat:locArray[0], lng:locArray[1]};
			var map = new google.maps.Map(document.getElementById('map'), {
		  	center: location,
		    zoom: 12,
				mapTypeId: 'roadmap'
		  });
			var marker=new google.maps.Marker({
				position: {lat: locArray[0], lng: locArray[1]},
				map:map,
				title:"Current Location",
				zIndex:locArray[2],
				draggable:true
			});
		});


	};
