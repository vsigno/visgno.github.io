//https://gis.stackexchange.com/questions/7430/what-ratio-scales-do-google-maps-zoom-levels-correspond-to
//metersPerPx = 156543.03392 * Math.cos(latLng.lat() * Math.PI / 180) / Math.pow(2, zoom)


//grid map using Tangram
AFRAME.registerComponent('gridtangram', {

  init:function()
{

  //grid on x
  var gridx=4;
  //grid on y
  var gridy=4;

  console.log('GRID Tangram');
  //Position, decimal degrees Center of the first cell
  var lat = 51.509865;
  var lon = -0.118092;

  //Earth’s radius, sphere
  var r=6378137;

  //offsets in meters for tile 256px 384 | tile 512px 768 | tile 1024px 1536
  var dn = 1536;
  var de = 1536;
  var sceneEl = document.querySelector('a-scene');
  var tilecontainer=sceneEl.querySelector('#tilebox');

  for(var i=0; i<gridx; i++)
  {
    for(var j=0; j<gridy; j++)
    {

      	var tile = document.createElement('a-entity');

        tile.setAttribute('position', {x: 1024*i, y: 0, z: -1024*j});
        tile.setAttribute('scale', {x: 1, y: 1, z: 1});
        tile.setAttribute('rotation', {x: -90, y: 0, z: 0});
        tile.setAttribute('geometry',{'primitive':'plane','width':'1024','height':'1024'});
        tile.setAttribute('material',{'shader':'flat'});



        //Coordinate offsets in radians
        var dLat = (dn*j)/r;
        var   dLon = (de*i)/(r*Math.cos(Math.PI*lat/180));

        console.log(dLon);

        //OffsetPosition, decimal degrees
        var  latO = lat + dLat * 180/Math.PI;
        var   lonO = lon + dLon * 180/Math.PI;

        tile.setAttribute('tangram-map',{'apiKey':'UJcQwnnfQnWcPtKe2aYaEw',"center":lonO+","+latO,"zoom":"16",'pxToWorldRatio':'1','style':'#yamlRefill'});

        tilecontainer.appendChild(tile);

    }

  }
}
}),



//grid map using Tangram and listen event
///////////////////////////
AFRAME.registerComponent('listentangram', {

init:function()
{
  this.el.addEventListener('tangram-map-loaded', function()
  {
    console.log("done")
    i=i+1;
    singletile(i,0)

  })


var i=0;
  //grid on x
  var gridx=4;
  //grid on y
  var gridy=4;

  console.log('GRID Tangram');
  //Position, decimal degrees Center of the first cell
  var lat = 51.509865;
  var lon = -0.118092;

  //Earth’s radius, sphere
  var r=6378137;

  //offsets in meters for tile 256px 384 | tile 512px 768 | tile 1024px 1536
  var dn = 1536;
  var de = 1536;
  var sceneEl = document.querySelector('a-scene');
  var tilecontainer=sceneEl.querySelector('#tilebox');

   singletile(i,0);


async function singletile(i,j)
{
  var tile = document.createElement('a-entity');

  tile.setAttribute('position', {x: 1024*i, y: 0, z: -1024*j});
  tile.setAttribute('scale', {x: 1, y: 1, z: 1});
  tile.setAttribute('rotation', {x: -90, y: 0, z: 0});
  tile.setAttribute('geometry',{'primitive':'plane','width':'1024','height':'1024'});
  tile.setAttribute('material',{'shader':'flat'});



  //Coordinate offsets in radians
  var dLat = (dn*j)/r;
  var   dLon = (de*i)/(r*Math.cos(Math.PI*lat/180));

  console.log(dLon);

  //OffsetPosition, decimal degrees
  var  latO = lat + dLat * 180/Math.PI;
  var   lonO = lon + dLon * 180/Math.PI;

  tile.setAttribute('tangram-map',{'apiKey':'UJcQwnnfQnWcPtKe2aYaEw',"center":lonO+","+latO,"zoom":"16",'pxToWorldRatio':'1','style':'#yamlRefill'});


  tilecontainer.appendChild(tile);
}





}
}),











//grid map using MapBox
/////////////////////////////////////////////
AFRAME.registerComponent('gridmb', {

init:function()
{

//grid on x
var gridx=5;
//grid on y
var gridy=5;

console.log('GRID MapBox');
//Position, decimal degrees Center of the first cell
var lat = 51.509865;
var lon = -0.118092;

//Earth’s radius, sphere
var r=6378137;

//offsets in meters for tile 512px 384 | tile 1024px 768 | tile 2048px 1536
var dn = 768;
var de = 768;
var sceneEl = document.querySelector('a-scene');
var tilecontainer=sceneEl.querySelector('#tilebox');

/*
function singletile(i,j)
{
  var tile = document.createElement('a-mapbox');

  tile.setAttribute('position', {x: 10.24*i, y: 0, z: -10.24*j});
  tile.setAttribute('scale', {x: 1, y: 1, z: 1});
  tile.setAttribute('rotation', {x: -90, y: 0, z: 0});
  tile.setAttribute('width', '10.24');
  tile.setAttribute('height', '10.24');

  //Coordinate offsets in radians
  var dLat = (dn*j)/r;
  var   dLon = (de*i)/(r*Math.cos(Math.PI*lat/180));
  console.log(dLon);
  //OffsetPosition, decimal degrees
  var  latO = lat + dLat * 180/Math.PI;
  var   lonO = lon + dLon * 180/Math.PI;

  tile.setAttribute('mapbox', {"center":lonO+","+latO,"zoom":"16","accessToken":"pk.eyJ1IjoidnNpZ25vIiwiYSI6ImNpeXhoc3o0aTAwMTIyd3FwdjlycmtoOW0ifQ.K4OJGOvagarG5QyqBTErrw","style":"mapbox://styles/mapbox/streets-v10"});

  tile.addEventListener('mapbox-loaded', function()
  {
    console.log("done")

  })

  tilecontainer.appendChild(tile);
}



for(var i=0; i<gridx; i++)
{
  for(var j=0; j<gridy; j++)
  {

    	singletile(i,j);

  }

}

*/

for(var i=0; i<gridx; i++)
{
  for(var j=0; j<gridy; j++)
  {

    	var tile = document.createElement('a-mapbox');

      tile.setAttribute('position', {x: 10.24*i, y: 0, z: -10.24*j});
      tile.setAttribute('scale', {x: 1, y: 1, z: 1});
      tile.setAttribute('rotation', {x: -90, y: 0, z: 0});
      tile.setAttribute('width', '10.24');
      tile.setAttribute('height', '10.24');

      //Coordinate offsets in radians
      var dLat = (dn*j)/r;
      var   dLon = (de*i)/(r*Math.cos(Math.PI*lat/180));

      console.log(dLon);

      //OffsetPosition, decimal degrees
      var  latO = lat + dLat * 180/Math.PI;
      var   lonO = lon + dLon * 180/Math.PI;

      tile.setAttribute('mapbox', {"center":lonO+","+latO,"zoom":"16","accessToken":"pk.eyJ1IjoidnNpZ25vIiwiYSI6ImNpeXhoc3o0aTAwMTIyd3FwdjlycmtoOW0ifQ.K4OJGOvagarG5QyqBTErrw","style":"mapbox://styles/mapbox/streets-v10"});

      tile.addEventListener('mapbox-loaded', function()
      {
        console.log("done")

      })
      tilecontainer.appendChild(tile);

  }

}

}
});




/* First script to test the offset formula
AFRAME.registerComponent('latlongoff', {

init:function()
{
  console.log('test');
  //Position, decimal degrees
  var lat = 51.509865;
  var lon = -0.118092;
  //Earth’s radius, sphere
  var r=6378137;

  //offsets in meters
  var dn = 0;
  var de = 384;

  //Coordinate offsets in radians
  var dLat = dn/r;
  var   dLon = de/(r*Math.cos(Math.PI*lat/180));
console.log(dLon);
  //OffsetPosition, decimal degrees
var  latO = lat + dLat * 180/Math.PI;
var   lonO = lon + dLon * 180/Math.PI;

  console.log(latO);
  console.log(lonO);
}

});
*/
