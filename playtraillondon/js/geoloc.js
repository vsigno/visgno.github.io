//Parsing a json with the location

function parsedLocation()
{
	$.getJSON("resources/locations.json", function(json_loc) {
		
		console.log(json_loc);
	
	var JSON_Locparsed=JSON.parse(json_loc);
	
	for (var i = 0; i < JSON_Locparsed.locations.length; i++) {
    var locations = JSON_Locparsed.locations[i];
	
    console.log(locations.loc_name);	
	}	
		});
	
	
}