//Global Variables
var jsontopass;
var options;
var condition;

var events;

//Detect Variables Changed
var check = { condition:false };
		Object.defineProperties(check, {
			'b': { get: function() { return this.condition; } },
			'c': { set: function(x) { this.condition = x; } }
		});
		//console.log(o.b);
		
/*

Geolocation		

*/

//Parsing a json with the location
function parsedLocation()
{
	$.getJSON("resources/locations.json", function(json_loc) {
		console.log(json_loc);
		//store the parsed json in a global variable
		jsontopass=json_loc;
		
	//reading through the array (just for debug purposes)	
	for (var i = 0; i < json_loc.locations.length; i++) {
    var locations = json_loc.locations[i];

    console.log(locations.loc_name);	
	}	
	getLocation(); 
	});
}

//Get the location continously of the user setting the high accuracy in the options		
function getLocation() 
{
	    if (navigator.geolocation) 
		{
	      navigator.geolocation.watchPosition(showPosition,error,options);
	    } 
		else 
		{
        document.getElementById('latlon').innerHTML  = "Geolocation is not supported by this browser.";
		}	
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

//Show the Location
function showPosition(position) {
    
	document.getElementById('latlon').innerHTML  = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude; 
			
	for (var i = 0; i < jsontopass.locations.length; i++) {
	
	//use the distance between two points rather then buffer approach (faster computation and short JSON)
		
	var R = 6371; // Radius of the earth in km
	var dLat = (jsontopass.locations[i].loc_lat - position.coords.latitude) * Math.PI / 180;  // deg2rad below
	var dLon = (jsontopass.locations[i].loc_long - position.coords.longitude) * Math.PI / 180;
	
	var a = 
     0.5 - Math.cos(dLat)/2 + 
     Math.cos(position.coords.latitude * Math.PI / 180) * Math.cos(jsontopass.locations[i].loc_lat * Math.PI / 180) * 
     (1 - Math.cos(dLon))/2;

	var d= R * 2 * Math.asin(Math.sqrt(a));
	
	console.log("Distance",d);
	
	document.getElementById(jsontopass.locations[i].loc_name).innerHTML  =d; 
	
	
	//if we are closer than 400meters give me the name of the location and the number of sounds/tags to discover
	if (d<0.4)
	{
		document.getElementById('deb').innerHTML  =jsontopass.locations[i].loc_name;
		
		events=jsontopass.locations[i].events;
		
		loadEvents();
		
		check.c=true;
	}

	else
	{
		check.c=false;
	}
	}
		
	
	/*
	
	if(o.b==true)
	{
		console.log("nice");
			if ("vibrate" in navigator) 
			{
			document.getElementById('deb').innerHTML  ="Works";
			navigator.vibrate(250);
			}
		
	}
	else
	{
		console.log("nope");
	}
	*/
}