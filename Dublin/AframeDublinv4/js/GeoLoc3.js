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
    APPRAISAL:{type:'string'},
  }

//API JDBKE 9875aca4c8cf09d55eeae2176d2f1c07c292e642



});

AFRAME.registerComponent('infoName', {
init:function(){console.log("Name of This");}
});

//NEED TO BE FIXED
//request images on crossOrigin Anonymous
function webRequest(url)
{
  var img = document.createElement('img');

  img.crossOrigin = ''; // no credentials flag. Same as img.crossOrigin='anonymous'
  console.log('done');
  img.src = url;
  console.log(img);

}



AFRAME.registerComponent('imgreq',{
  init:function(){
    webRequest('http://www.buildingsofireland.ie/niah/images/survey_specific/fullsize/50070292_1.jpg');
  }
})






//Parsing a json with the location
AFRAME.registerComponent('parsedlocation', {

	init:function (){
		console.log('Parse Ireland Monument/Architectural Dataset - Dublin');

		$.getJSON("resource/MonumentPoint3857.json", function(json_loc) {
      //console.log(json_loc.features.length);




      //Centre model DublinCentre_WM_3857.gltf
			//var lonWGS84cen = -6.266050;
			//var latWGS84cen = 53.342101;

      //Centre model DublinLargArea.glb
      var lonWGS84cen = -6.267287;
      var latWGS84cen = 53.343071;

		var sourcePrj = new proj4.defs('EPSG:4326');    //source coordinates will be in Longitude/Latitude 4326
		var destPrj = new proj4.defs('EPSG:3857');     //destination coordinates in WebMercator 3857

		var pcen4326 = new proj4.Point(lonWGS84cen,latWGS84cen);   //any object will do as long as it has 'x' and 'y' properties
		var pcen3857 = new proj4(sourcePrj, destPrj, pcen4326);

var listMon=[];
	for (var i = 0; i < json_loc.features.length; i++)
	{
		if(	json_loc.features[i].geometry !=null){
		var locations = json_loc.features[i].geometry.coordinates;

            var lonWGS84 = locations[0];
            var latWGS84 = locations[1];

	var sceneEl = document.querySelector('a-scene');
	var entityEl= sceneEl.querySelector('#NIAH');
	var mon = document.createElement('a-entity');
  //var mon = document.createElement('a-gltf-model');

	var tempx = pcen3857.x-lonWGS84;
	var tempy = pcen3857.y-latWGS84;

	var dist=Math.hypot(tempx-0, tempy-0);



  if(dist<1000){

	//mon.setAttribute('geometry', {primitive: 'box', depth:10, height:10, width: 10});

  mon.setAttribute('id','POI');
//  mon.setAttribute('src','#conepin');
//  mon.setAttribute('material','color','red');

  //Geometry
  var geometry = new THREE.ConeGeometry( 10, 40, 10 );
  var material = new THREE.MeshStandardMaterial( {color: 0x0000FF} );
  var cone = new THREE.Mesh( geometry, material );
  mon.setObject3D('mesh',cone);

	mon.object3D.position.set(-tempx,20,tempy);
  mon.object3D.rotation.set(THREE.Math.degToRad(180),0,0);


	mon.setAttribute('datamon', {SMRS:json_loc.features[i].properties.SMRS,CLASSDESC:json_loc.features[i].properties.CLASSDESC});

  mon.setAttribute('cursor-listenerb','');
  mon.setAttribute('data-clickable','');

if(listMon.includes(json_loc.features[i].properties.CLASSDESC)==false)
{
  listMon.push(json_loc.features[i].properties.CLASSDESC);
}



	entityEl.setAttribute('position', {x: 0, y: -1, z: 0});
	entityEl.appendChild(mon);
	}
	}}


  for (var k = 0;k < listMon.length; k++)
  {
  //  console.log(listMon[k]+"  "+k);
  }

}),




//Parse Architectural Buildings

$.getJSON("resource/NHAI.json", function(json_loc) {
  //console.log(json_loc);
  //console.log(json_loc.features.length);
  //console.log(json_loc.features[0].LATITUDE);

  //Centre model DublinCentre_WM_3857.gltf
  var lonWGS84cen = -6.266050;
  var latWGS84cen = 53.342101;

var sourcePrj = new proj4.defs('EPSG:4326');    //source coordinates will be in Longitude/Latitude 4326
var destPrj = new proj4.defs('EPSG:3857');     //destination coordinates in WebMercator 3857

var pcen4326 = new proj4.Point(lonWGS84cen,latWGS84cen);   //any object will do as long as it has 'x' and 'y' properties
var pcen3857 = new proj4(sourcePrj, destPrj, pcen4326);

var listYear=[];

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
//var monImg = document.createElement('a-image');

var tempx = pcen3857.x-p2.x;
var tempy = pcen3857.y-p2.y;

var dist=Math.hypot(tempx-0, tempy-0);


if(dist<1000){

  var geometry = new THREE.ConeGeometry( 10, 40, 10 );
  var material = new THREE.MeshStandardMaterial( {color: 0xff0000 } );
  var cone = new THREE.Mesh( geometry, material );
  mon.setObject3D('mesh',cone);

  mon.setAttribute('cursor-listenerc','');
  mon.setAttribute('data-clickable','');

  mon.object3D.position.set(-tempx,20,tempy);
  mon.object3D.rotation.set(THREE.Math.degToRad(180),0,0);

  mon.setAttribute('dataarch', {SURVEY_ID:json_loc.features[i].SURVEY_ID,IMAGE_LINK:json_loc.features[i].IMAGE_LINK,WEBSITE_LINK:json_loc.features[i].WEBSITE_LINK,DATEFROM:json_loc.features[i].DATEFROM,
  DATETO:json_loc.features[i].DATETO,ORIGINAL_TYPE:json_loc.features[i].ORIGINAL_TYPE, APPRAISAL:json_loc.features[i].APPRAISAL});

  if(listYear.includes(json_loc.features[i].DATEFROM)==false)
  {
    listYear.push(json_loc.features[i].DATEFROM);
  }


entityEl.setAttribute('position', {x: 0, y: -1, z: 0});
entityEl.appendChild(mon);

if(json_loc.features[i].IMAGE_LINK!=null){
/* fix this--
  var img = document.createElement('img');

  img.crossOrigin = 'anonymous'; // no credentials flag. Same as img.crossOrigin='anonymous'
  img.src = json_loc.features[i].IMAGE_LINK;
  console.log(img);
*/

//monImg.setAttribute("crossorigin","Anonymous");
//monImg.setAttribute("src",json_loc.features[i].IMAGE_LINK);
//monImg.setAttribute("position",{x: 0, y: 2, z: 0});
//monImg.setAttribute("height",60);
//monImg.setAttribute("width",50);
}

//mon.appendChild(monImg);

}
}
}

for (var k = 0;k < listYear.length; k++)
{
  //console.log(listYear[k]+"  "+k);
}




});



}});
