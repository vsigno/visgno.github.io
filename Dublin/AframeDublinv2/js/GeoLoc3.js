//Global Variable
var jsontopass;

//Add field to store JSON data of the Dublin Monuments
AFRAME.registerComponent('datamon', {
  schema: {
    SMRS:{type: 'string'},
    CLASSDESC:{type: 'string'},
  }
});


//Add field to store JSON data of the Dublin Architectural Heritage
AFRAME.registerComponent('dataarch', {
  schema: {
    SURVEY_ID:{type: 'string'},
    WEBSITE_LINK:{type: 'string'},
    IMAGE_LINK:{type: 'string'},
    DATEFROM:{type: 'string'},
    DATETO:{type: 'string'},
    ORIGINAL_TYPE:{type: 'string'},
  }
});









//Parsing a json with the location
AFRAME.registerComponent('parsedlocation', {

	init:function (){
		console.log('Parse Ireland Monument/Architectural Dataset - Dublin');

		$.getJSON("resource/MonumentPoint3857.json", function(json_loc) {
      //console.log(json_loc);
			console.log(json_loc.features.length);

			//Centre model DublinCentre_WM_3857.gltf
			var lonWGS84cen = -6.266050;
			var latWGS84cen = 53.342101;

		var sourcePrj = new proj4.defs('EPSG:4326');    //source coordinates will be in Longitude/Latitude 4326
		var destPrj = new proj4.defs('EPSG:3857');     //destination coordinates in WebMercator 3857

		var pcen4326 = new proj4.Point(lonWGS84cen,latWGS84cen);   //any object will do as long as it has 'x' and 'y' properties
		var pcen3857 = new proj4(sourcePrj, destPrj, pcen4326);

	for (var i = 0; i < json_loc.features.length; i++)
	{
		if(	json_loc.features[i].geometry !=null){
		var locations = json_loc.features[i].geometry.coordinates;

            var lonWGS84 = locations[0];
            var latWGS84 = locations[1];

	var sceneEl = document.querySelector('a-scene');
	var entityEl= sceneEl.querySelector('#NIAH');
	//var mon = document.createElement('a-entity');
  var mon = document.createElement('a-gltf-model');

	var tempx = pcen3857.x-lonWGS84;
	var tempy = pcen3857.y-latWGS84;

	var dist=Math.hypot(tempx-0, tempy-0);


	if(dist<1000){

	//mon.setAttribute('geometry', {primitive: 'box', depth:10, height:10, width: 10});

  mon.setAttribute('id','POI');
  mon.setAttribute('src','#conepin');
  mon.setAttribute('material','color','red');


	mon.object3D.position.set(-tempx,0,tempy);


	mon.setAttribute('datamon', {SMRS:json_loc.features[i].properties.SMRS,CLASSDESC:json_loc.features[i].properties.CLASSDESC});

 mon.setAttribute('cursor-listenerb','');
  mon.setAttribute('data-clickable','');

	entityEl.setAttribute('position', {x: 0, y: -1, z: 0});
	entityEl.appendChild(mon);
	}


	}
	}


}),




//Parse Architectural Buildings

$.getJSON("resource/NHAI.json", function(json_loc) {
  console.log(json_loc);
  console.log(json_loc.features.length);
  console.log(json_loc.features[0].LATITUDE);

  //Centre model DublinCentre_WM_3857.gltf
  var lonWGS84cen = -6.266050;
  var latWGS84cen = 53.342101;

var sourcePrj = new proj4.defs('EPSG:4326');    //source coordinates will be in Longitude/Latitude 4326
var destPrj = new proj4.defs('EPSG:3857');     //destination coordinates in WebMercator 3857

var pcen4326 = new proj4.Point(lonWGS84cen,latWGS84cen);   //any object will do as long as it has 'x' and 'y' properties
var pcen3857 = new proj4(sourcePrj, destPrj, pcen4326);

for (var i = 0; i < json_loc.features.length; i++)
{
if(	json_loc.features[i].LATITUDE !=null){
//var locations = json_loc.features[i].geometry.coordinates;

        var lonWGS84 = json_loc.features[i].LONGITUDE;
        var latWGS84 = json_loc.features[i].LATITUDE;

        var p = new proj4.Point(lonWGS84,latWGS84);
        var p2 = new proj4(sourcePrj, destPrj, p);


var sceneEl = document.querySelector('a-scene');
var entityEl= sceneEl.querySelector('#NIARCH');
var mon = document.createElement('a-entity');

var tempx = pcen3857.x-p2.x;
var tempy = pcen3857.y-p2.y;

var dist=Math.hypot(tempx-0, tempy-0);


if(dist<1000){

mon.setAttribute('geometry', {primitive: 'box', depth:40, height:40, width: 40});

mon.object3D.position.set(-tempx,0,tempy);

mon.setAttribute('dataarch', {SURVEY_ID:json_loc.features[i].SURVEY_ID,IMAGE_LINK:json_loc.features[i].IMAGE_LINK,WEBSITE_LINK:json_loc.features[i].WEBSITE_LINK,DATEFROM:json_loc.features[i].DATEFROM,
  DATETO:json_loc.features[i].DATETO,ORIGINAL_TYPE:json_loc.features[i].ORIGINAL_TYPE});

entityEl.setAttribute('position', {x: 0, y: -1, z: 0});
entityEl.appendChild(mon);
}
}
}
});



}});
