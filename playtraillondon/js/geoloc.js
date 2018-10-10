
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
		});
	
	getLocation(); 
}

//Get the location of the user		
function getLocation() 
{
	    if (navigator.geolocation) 
		{
	      navigator.geolocation.watchPosition(showPosition);
	    } 
		else 
		{
        document.getElementById('latlon').innerHTML  = "Geolocation is not supported by this browser.";
		}	
}


//Show the Location
function showPosition(position) {
    
	document.getElementById('latlon').innerHTML  = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
	
	for (var i = 0; i < Object.keys(jsontopass).length; i++) {
	
	if (position.coords.latitude>jsontopass.locations[i].loc_min_lat && position.coords.latitude<jsontopass.locations[i].loc_max_lat && position.coords.longitude>jsontopass.locations[i].loc_min_long && position.coords.longitude<jsontopass.locations[i].loc_max_long)
	{
		document.getElementById('deb').innerHTML  =jsontopass.locations[i].loc_name;
		o.c=true;
	}

	else
	{
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