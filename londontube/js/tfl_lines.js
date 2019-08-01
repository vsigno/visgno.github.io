//Parsing a json with the location
// good solution would be to use a meshline https://www.clicktorelease.com/code/THREE.MeshLine/demo/index.html
AFRAME.registerComponent('createtubelines', {

  init:function (){
  		console.log('ParseTube lines');

      let sceneEl = document.querySelector('a-scene');
      let tubecontainer=sceneEl.querySelector('#tubecontainer');
      tubecontainer.object3D.position.set(0,50,0);
      let mesharray=[];
      let placeholder = new THREE.SphereGeometry(10,35,35);
      let tubesegment = document.createElement('a-entity');
      tubecontainer.appendChild(tubesegment);

      var linesgroup=new THREE.Group();

      var latWGS84cen = 51.509865;
      var lonWGS84cen = -0.118092;

      var sourcePrj = new proj4.defs('EPSG:4326');    //source coordinates will be in Longitude/Latitude 4326
      var destPrj = new proj4.defs('EPSG:3857');     //destination coordinates in WebMercator 3857

      var pcen4326 = new proj4.Point(lonWGS84cen,latWGS84cen);   //any object will do as long as it has 'x' and 'y' properties
      var pcen3857 = new proj4(sourcePrj, destPrj, pcen4326);





  		$.getJSON("resources/TFL_Tube.json", function(json_tube) {
        console.log(json_tube.features.length);


        json_tube.features.forEach(function(tube)
        {

          const listlinesegment=[new THREE.Vector3(0,0,0)];


                for(let j in tube.properties.lines)
                {
                  //if(jsobj.properties.lines[j].end_sid=="940GZZLUEMB")
                //if(tube.properties.lines[j].name=="Central")
              //  {
                    const coordraw = [...tube.geometry.coordinates];
                    //Convert the array of points into vertices

                    var colraw=tube.properties.lines[j].colour;
                    //var col = colraw.substr(1);

                    var colorValue = parseInt ( colraw.replace("#","0x"), 16 );
                    var colored = new THREE.Color( colorValue );
                    var name=tube.properties.id;

                    var start=tube.properties.lines[j].start_sid;
                    var end=tube.properties.lines[j].end_sid;
//console.log(start);
//console.log(end);
                        for (var co = 0; co < coordraw.length; co++)
                              {
                              var point4326 = new proj4.Point(coordraw[co][0],coordraw[co][1]);   //any object will do as long as it has 'x' and 'y' properties
                              var point3857 = new proj4(sourcePrj, destPrj, point4326);

                              var x = point3857.x-pcen3857.x;
                              var y = 10;
                              var z = point3857.y-pcen3857.y;

                              coordraw[co] = new THREE.Vector3(x, y, z);
                              //listlinesegment.push(new THREE.Vector3(x, y, z));
                      }
                      tubeb(coordraw,colorValue,name,start,end);
                }

                //}



      });






function tubeb(coord,col,name,startd,endd){


        var path = new THREE.CatmullRomCurve3(coord);

        var geometry = new THREE.TubeGeometry( path, 3, 20, 4, false );
        //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var material = new THREE.MeshBasicMaterial( { color: col } );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.name=name;
        mesh.userData={ start: startd, end:endd };

        linesgroup.add(mesh);

/*
        //lines
        var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        var geometry = new THREE.Geometry();
        geometry.vertices=[...coord];
        var line = new THREE.Line( geometry, material );

        tubesegment.setObject3D('mesh', line);
*/

//tubeaddscene(mesh);


//mergemeshes(mesh,material);
}









function mergemeshes(meshtomerge,material)
{

meshtomerge.updateMatrix();

placeholder.merge(meshtomerge.geometry,meshtomerge.matrix);

//var theline=new THREE.Mesh(placeholder, new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));
var theline=new THREE.Mesh(placeholder, material);

tubesegment.setObject3D('mesh', theline);
tubesegment.object3D.rotation.set(0,THREE.Math.degToRad(180),THREE.Math.degToRad(180));

}






      })


      tubesegment.setObject3D('mesh', linesgroup);
      tubesegment.object3D.rotation.set(0,THREE.Math.degToRad(180),THREE.Math.degToRad(180));

      console.log(tubesegment.object3D.children[0]);




}
})
