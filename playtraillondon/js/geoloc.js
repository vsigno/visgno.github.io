
var jsontopass;



var o = { mayi:false };
		Object.defineProperties(o, {
			'b': { get: function() { return this.mayi; } },
			'c': { set: function(x) { this.mayi = x; } }
		});
		console.log(o.b);


		
		
//Parsing a json with the location
function parsedLocation()
{
	$.getJSON("resources/locations.json", function(json_loc) {
		console.log(json_loc);
		jsontopass=json_loc;
	for (var i = 0; i < json_loc.locations.length; i++) {
    var locations = json_loc.locations[i];

    console.log(locations.loc_name);	
	}	
	getLocation(); 
		});
	
	
}

//Get the location of the user		
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
    
	document.getElementById('latlon').innerHTML  = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
	
	console.log(jsontopass.locations);
	
	
	
	
	
	
	
	
	
	
	
	for (var i = 0; i < jsontopass.locations.length; i++) {
	
	//use the distance between the point rather then the between
	
	
	var R = 6371; // Radius of the earth in km
	var dLat = (jsontopass.locations[i].loc_lat - position.coords.latitude) * Math.PI / 180;  // deg2rad below
	var dLon = (jsontopass.locations[i].loc_long - position.coords.longitude) * Math.PI / 180;
	var a = 
     0.5 - Math.cos(dLat)/2 + 
     Math.cos(position.coords.latitude * Math.PI / 180) * Math.cos(jsontopass.locations[i].loc_lat * Math.PI / 180) * 
     (1 - Math.cos(dLon))/2;

	var d= R * 2 * Math.asin(Math.sqrt(a));
	
	console.log("Distance",d);
	
	
	
	if (d<0.3)
	{
		document.getElementById('deb').innerHTML  =jsontopass.locations[i].loc_name;
		o.c=true;
	}

	else
	{
		console.log("my lat",position.coords.latitude, "my long", position.coords.longitude,"min lat",jsontopass.locations[i].loc_min_lat,"max lat",jsontopass.locations[i].loc_max_lat, "min long", jsontopass.locations[i].loc_min_long,"max long", jsontopass.locations[i].loc_max_long)
		document.getElementById('deb').innerHTML  ="Keep looking"; 
		o.c=false;
	}
	}
	
	/*
	if (position.coords.latitude>51.3)
	{
		document.getElementById('deb').innerHTML  ="Works";
		o.c=true;
	}

	else
	{
		document.getElementById('deb').innerHTML  ="Oh No!"; 
		o.c=false;
	}
	*/
	
	
	
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
}