//Global Variable
var jsontopass;


//Parsing a json with the location
AFRAME.registerComponent('parsedlocation', {
	
	
	init:function (){
		console.log('Parse NIAH Dataset Dublin');
	
	$.getJSON("resource/DublinNIAH.json", function(json_loc) {
		console.log(json_loc);
	
	console.log(json_loc.length);
		//Debug
	//reading through the array
	
			var lonWGS84cen = -6.267569;
            var latWGS84cen = 53.343144;
			
			 

            var num = lonWGS84cen * 0.017453292519943295; // 0.017453292519943295--> Pi/180
            var x = 6378137.0 * num; // 6378137.0 --> Equatorial Radius, WGS84
            var a = latWGS84cen * 0.017453292519943295; // 0.017453292519943295--> Pi/180

            var loncen = x;
            var latcen = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
	
	console.log(loncen);
	
	for (var i = 0; i < json_loc.length; i++) 
	{
	
if(	json_loc[i].LATITUDE !=null &&  json_loc[i].LONGITUDE !=null){
    //var locations = json_loc[i].location.coordinates;
    //console.log(locations[0],locations[1]);	
	

            // doing calculations in double precision for greater accuracy along the way
            var lonWGS84 = json_loc[i].LONGITUDE;
            var latWGS84 = json_loc[i].LATITUDE;

            var num = lonWGS84 * 0.017453292519943295; // 0.017453292519943295--> Pi/180
            var x = 6378137.0 * num; // 6378137.0 --> Equatorial Radius, WGS84
            var a = latWGS84 * 0.017453292519943295; // 0.017453292519943295--> Pi/180

            var lon = x;
            var lat = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
			////////////////////
	
	
	var sceneEl = document.querySelector('a-scene');
	var entityEl= sceneEl.querySelector('#NIAH')
	var mon = document.createElement('a-entity');
	
	var entityCourt=sceneEl.querySelector('#courtModel')
	
	mon.setAttribute('geometry', {primitive: 'box', depth:10, height: 10, width: 10});
	mon.setAttribute('position', {x: lon-loncen, y: 0, z: lat-latcen});
	
	entityCourt.setAttribute('position',{x: 0, y: 0, z: 0});
		
	entityEl.appendChild(mon);
	
	}	
	}
	
	//Debug
	
	});
}});
