//Parsing a json with the location
// good solution would be to use a meshline https://www.clicktorelease.com/code/THREE.MeshLine/demo/index.html

//example ATCODE "940GZZLUACY" Archway - northerline



AFRAME.registerComponent('station', {
  schema: {
    NAME:{type: 'string'},
    ATCODE:{type: 'string'},
  }
});


AFRAME.registerComponent('createtubestations', {

  init:function (){
  		console.log('ParseTube stations');

      let sceneEl = document.querySelector('a-scene');
      let stationscontainer=sceneEl.querySelector('#stationscontainer');
      stationscontainer.object3D.rotation.set(0,THREE.Math.degToRad(180),THREE.Math.degToRad(180));

      var latWGS84cen = 51.509865;
      var lonWGS84cen = -0.118092;

      var sourcePrj = new proj4.defs('EPSG:4326');    //source coordinates will be in Longitude/Latitude 4326
      var destPrj = new proj4.defs('EPSG:3857');     //destination coordinates in WebMercator 3857

      var pcen4326 = new proj4.Point(lonWGS84cen,latWGS84cen);   //any object will do as long as it has 'x' and 'y' properties
      var pcen3857 = new proj4(sourcePrj, destPrj, pcen4326);


      var placeholder= new THREE.Geometry();
      var stationcont = document.createElement('a-entity');

      var groupstations=new THREE.Group();

      $.getJSON('resources/tubestations/list.json', function (data) {
        console.log(data);
          // suppose that data looks like this:
          // ["/data/a.json", "/data/b.json", "/data/c.json"]
          for (var i= 0; i < data.length; i++) {
              // send an AJAX request to each individual JSON file
              // available on the server as returned by the discover endpoint
              $.getJSON("resources/tubestations/"+data[i].filename, function (json_stations) {





  		//$.getJSON("resources/tubestations/LineStationsnorthern.json", function(json_stations) {
        //console.log(json_stations);

var material = new THREE.MeshBasicMaterial( {color: 0x0000FF, side: THREE.DoubleSide} );

        json_stations.stations.forEach(function (tubestations)
        {

          var point4326 = new proj4.Point(tubestations.longitude,tubestations.latitude);   //any object will do as long as it has 'x' and 'y' properties
          var point3857 = new proj4(sourcePrj, destPrj, point4326);

          var x = point3857.x-pcen3857.x;
          var y = 10;
          var z = point3857.y-pcen3857.y;


          var geometry = new THREE.ConeGeometry( 50, 150, 10 );

          var cone = new THREE.Mesh( geometry, material );
          cone.position.set(x,-150,z);
          //cone.rotation.set(THREE.Math.degToRad(180),0,0);
          cone.name=tubestations.name;

          //mergemeshes(cone,material);

          groupstations.add(cone);


          //  var mon = document.createElement('a-entity');
          // mon.setObject3D('mesh',cone);

          // mon.object3D.position.set(x,20,z);
           //mon.object3D.rotation.set(THREE.Math.degToRad(180),0,0);
          // mon.setAttribute('station', {NAME:tubestations.name,ATCODE:tubestations.atcocode});

           // stationscontainer.appendChild(mon);


        })



    })



  }
});

stationcont.setObject3D('mesh', groupstations);
stationscontainer.appendChild(stationcont);

console.log(stationcont.object3D.children[0]);

//instead of merging the meshes is better to create group that keep the object separated
function mergemeshes(meshtomerge,material)
{

meshtomerge.updateMatrix();

placeholder.merge(meshtomerge.geometry,meshtomerge.matrix);

//var theline=new THREE.Mesh(placeholder, new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));
var thepole=new THREE.Mesh(placeholder, material);

stationcont.setObject3D('mesh', thepole);
stationscontainer.appendChild(stationcont);

}










}
})
