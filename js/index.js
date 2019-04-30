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

	//  Variable for picture source and return value format.
	var pictureSource;
	var destinationType;

	// Loading device API libraries.
	document.addEventListener("deviceready",onDeviceReady,false);

	// turn map on when lib clicked
	$(".lib").click(()=>{
	  window.localStorage.setItem("map", "on");
	});

	// turn map off when camera clicked
	$(".cam").click(()=>{
	  window.localStorage.setItem("map", "off");
	});

	// device APIs are ready to use.
	function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
	}

	// The function is called on successful retrieval of photo.
	function onPhotoDataSuccess(imageData) {
	var smallImage = document.getElementById('smallImage');

	// This function is used for unhide the image elements
	smallImage.style.display = 'block';

	// This function is used to display the captured image
	smallImage.src = "data:image/jpeg;base64," + imageData;
	}

	// This function is called on the successful retrival of image.
	function onPhotoURISuccess(imageURI) {
	var largeImage = document.getElementById('largeImage');

	// This function is used for unhiding the image elements
	largeImage.style.display = 'block';

	// This function is used to display the captured image.
	largeImage.src = imageURI;
	}

	// This function will execute on button click.
	function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL });
	}

	// This function will execute on button click.
	function capturePhotoEdit() {
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
	destinationType: destinationType.DATA_URL });
	}

	// This function will execute on button click.
	function getPhoto(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
	}

	// This function will be called if some thing goes wrong.
	function onFail(message) {
	alert('Failed because: ' + message);
	}
