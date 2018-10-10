

//Parsing a json with the location

function parsedLocation()
{
	$.getJSON("resources/locations.json", function(json_loc) {
    console.log(json); // this will show the info it in firebug console
});
	var JSON_Loc=JSON.parse(json_loc);
	
	for (var i = 0; i < JSON_Loc.locations.length; i++) {
    var locations = JSON_Loc.locations[i];
    console.log(locations.loc_name);
}}