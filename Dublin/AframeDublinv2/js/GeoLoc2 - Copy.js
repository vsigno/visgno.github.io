//Global Variable
var jsontopass;

AFRAME.registerComponent('data', {
  schema: {type: 'string'},

});


//Parsing a json with the location
AFRAME.registerComponent('parsedlocation', {
	
	
	init:function (){
		console.log('Parse NIAH Dataset Dublin');
	
	//$.getJSON("resource/DublinNIAH.json", function(json_loc) {
		$.getJSON("resource/MonumDublin.json", function(json_loc) {
		console.log(json_loc);
	
	console.log(json_loc.features.length);
		//Debug
	//reading through the array
	
			//var lonWGS84cen = -6.267569;
            //var latWGS84cen = 53.343144;
			
			 
			var lonWGS84cen = -6.265420;
            var latWGS84cen = 53.342285;
			
		//	var lonWGS84cen = -6.262723;
          //  var latWGS84cen = 53.341688;
		
			
			
		var sourcePrj = new proj4.defs('EPSG:4326');    //source coordinates will be in Longitude/Latitude
		var destPrj = new proj4.defs('EPSG:3857');     //destination coordinates in LCC, south of France	
			
			
            var num = lonWGS84cen * 0.017453292519943295; // 0.017453292519943295--> Pi/180
            var x = 6378137.0 * num; // 6378137.0 --> Equatorial Radius, WGS84
            var a = latWGS84cen * 0.017453292519943295; // 0.017453292519943295--> Pi/180

            var loncen = x;
            var latcen = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
/*		
		console.log("Old version");
				console.log("Longitude: " + loncen);
				console.log("Latitude: " + latcen);
	*/	
			
		
		
			var pcen = new proj4.Point(lonWGS84cen,latWGS84cen);   //any object will do as long as it has 'x' and 'y' properties
			var pcennew = new proj4(sourcePrj, destPrj, pcen); 
		
			console.log("New version");
			console.log("Longitude: " + pcen.x);
			console.log("Latitude: " + pcen.y);
			console.log("Longitude: " + pcennew.x);
			console.log("Latitude: " + pcennew.y);
			
		
	for (var i = 0; i < json_loc.features.length; i++) 
	{
		//console.log(json_loc.features[i].properties.SMRS);
	
		if(	json_loc.features[i].geometry !=null && (json_loc.features[i].properties.SMRS=='DU018-020488-' || json_loc.features[i].properties.SMRS=='DU018-020142-' || json_loc.features[i].properties.SMRS=='DU018-020592-' )){
			//if(	json_loc.features[i].geometry !=null){
			var locations = json_loc.features[i].geometry.coordinates;
			console.log(locations[0],locations[1]);	
		
            // doing calculations in double precision for greater accuracy along the way
            var lonWGS84 = locations[0];
            var latWGS84 = locations[1];

			var p = new proj4.Point(lonWGS84,latWGS84);
			var p2 = new proj4(sourcePrj, destPrj, p); 	

			/*
            var num = lonWGS84 * 0.017453292519943295; // 0.017453292519943295--> Pi/180
            var x = 6378137.0 * num; // 6378137.0 --> Equatorial Radius, WGS84
            var a = latWGS84 * 0.017453292519943295; // 0.017453292519943295--> Pi/180

            var lon = x;
            var lat = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
			////////////////////
			*/
	
	var sceneEl = document.querySelector('a-scene');
	var entityEl= sceneEl.querySelector('#NIAH');
	var mon = document.createElement('a-entity');
	var ref = sceneEl.querySelector('#ref');
	
	
	
	mon.setAttribute('geometry', {primitive: 'box', depth:10, height:10, width: 10});
	//mon.setAttribute('position', {x: p2.x-(-pcennew.x), y: 0, z: p2.y-(pcennew.y)});
	mon.setAttribute('position', {x: (lonWGS84-pcennew.x), y: 0, z: (latWGS84-pcennew.y)});
	
	mon.setAttribute('data', json_loc.features[i].properties.SMRS);
			
			console.log("Longitude: " + lonWGS84);
			console.log("Latitude: " + latWGS84);
			
			//console.log("Longitude: " + p2.x);
			//console.log("Latitude: " + p2.y);
		//console.log("Still Longitude: " + pcennew.x);
			//console.log("Still Latitude: " + pcennew.y);

	entityEl.setAttribute('position', {x: 0, y: -1, z: 0});			
	entityEl.appendChild(mon);
	
	ref.setAttribute('position', {x: 0, y: 3, z: 0});			
	
	}	
	}
	
	//Debug
	
	});
}});
