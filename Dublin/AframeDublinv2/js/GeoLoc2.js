//Global Variable
var jsontopass;

//Add a field to store JSON data
AFRAME.registerComponent('data', {
  schema: {type: 'string'},
});


//Parsing a json with the location
AFRAME.registerComponent('parsedlocation', {

	init:function (){
		console.log('Parse Ireland Monument Dataset - Dublin');
	
		//$.getJSON("resource/DublinNIAH.json", function(json_loc) {
		$.getJSON("resource/MonumentPoint3857.json", function(json_loc) {
			console.log(json_loc);
	
			console.log(json_loc.features.length);
	
	//Centre Point Reference of the Model
	
			//centre point Dublin Castle Courtyard
			//var lonWGS84cen = -6.267569;
            //var latWGS84cen = 53.343144;
			
			//Centre model DublinCentre_WM_3857.gltf 
			var lonWGS84cen = -6.266010;
			var latWGS84cen = 53.342101;
			 
			
			//Fake Location dublinCenter.gltf
			//var lonWGS84cen = -6.266452;
            //var latWGS84cen = 53.3436578;
			
			
			//var lonWGS84cen = -6.262723;
			//var latWGS84cen = 53.341688;
			
			
			
		var sourcePrj = new proj4.defs('EPSG:4326');    //source coordinates will be in Longitude/Latitude 4326
		var destPrj = new proj4.defs('EPSG:3857');     //destination coordinates in WebMercator 3857
	
		var pcen4326 = new proj4.Point(lonWGS84cen,latWGS84cen);   //any object will do as long as it has 'x' and 'y' properties
		var pcen3857 = new proj4(sourcePrj, destPrj, pcen4326); 
		
			console.log("Proj4 conversion");
			console.log("Longitude: " + pcen4326.x);
			console.log("Latitude: " + pcen4326.y);
			console.log("Longitude: " + pcen3857.x);
			console.log("Latitude: " + pcen3857.y);
			
		
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
	
	var tempx = pcen3857.y-latWGS84;
	var tempy = pcen3857.x-lonWGS84;
	console.log("this is it"+tempx+"  "+tempy);
	
	mon.setAttribute('geometry', {primitive: 'box', depth:10, height:10, width: 10});
	//mon.setAttribute('position', {x: p2.x-(-pcen3857.x), y: 0, z: p2.y-(pcen3857.y)});
	mon.setAttribute('position', {x: tempx, y: 0, z: tempy});
	
	mon.setAttribute('data', json_loc.features[i].properties.SMRS);
			
			console.log("Longitude: " + lonWGS84);
			console.log("Latitude: " + latWGS84);
			
			//console.log("Longitude: " + p2.x);
			//console.log("Latitude: " + p2.y);
		//console.log("Still Longitude: " + pcen3857.x);
			//console.log("Still Latitude: " + pcen3857.y);

	entityEl.setAttribute('position', {x: 0, y: -1, z: 0});			
	entityEl.appendChild(mon);
	
	ref.setAttribute('position', {x: 0, y: 3, z: 0});			
	
	}	
	}
	
	//Debug
	
	});
}});
