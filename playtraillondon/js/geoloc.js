//Parsing a json with the location

function parsedLocation()
{
	$.getJSON("resources/locations.json", function(json_loc) {
		
		console.log(json_loc);
	
	//var JSON_Locparsed=JSON.parse(json_loc);
	
	for (var i = 0; i < json_loc.locations.length; i++) {
    var locations = json_loc.locations[i];
	
    console.log(locations.loc_name);	
	}	
		});
	
	
}