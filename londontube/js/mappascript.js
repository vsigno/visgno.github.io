//https://wirewhiz.com/canvas-texture/

//USING STATIC MAPS
/*
const key = 'pk.eyJ1IjoidnNpZ25vIiwiYSI6ImNpeXhoc3o0aTAwMTIyd3FwdjlycmtoOW0ifQ.K4OJGOvagarG5QyqBTErrw'

const options = {
  lat: 51.509865,
  lng: -0.118092,
  zoom: 16,
  scale:2,
  width: 1280,
  height: 1280,
  //style: 'dark-v9'
  //style: 'mapbox://styles/mapbox/traffic-night-v2',
  //style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
  //style:'mapbox://styles/mapbox/streets-v10',
  //pitch: 50,
}

const mappa = new Mappa('Mapbox', key);

let myMap;

myMap = mappa.staticMap(options);
let img;

function preload() {
  // Load the image
  img = loadImage(myMap.imgUrl);
  console.log(myMap.imgUrl);
}


function setup() {
      let cnv = createCanvas(4096, 4096);
      cnv.parent("canvasId");
    //  background(102);
      image(img, 0, 0);

}

function draw() {
//clear();
  fill(255, 204, 0);
  ellipse(1000, 1000, 800, 800);

}
*/




/*
//USING TILE MAPS
//MapBox key
const key = 'pk.eyJ1IjoidnNpZ25vIiwiYSI6ImNpeXhoc3o0aTAwMTIyd3FwdjlycmtoOW0ifQ.K4OJGOvagarG5QyqBTErrw'

const options = {
  lat: 51.509865,
  lng: -0.118092,
  zoom: 5,
  studio: true,
//  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
  style: 'mapbox://styles/mapbox/traffic-night-v2',
  //style:'mapbox://styles/mapbox/streets-v10',
  //pitch: 50,
}

const mappa = new Mappa('Mapbox',key);
let myMap;

let canvas;

function setup() {
 canvas = createCanvas(1000, 1000);
      canvas.parent("canvasId");

      myMap=mappa.tileMap(options);
      myMap.overlay(canvas);

}

function draw() {


  clear();
  fill(255, 204, 0);
  ellipse(1000, 1000, 800, 800);

}


$(function() {
  $(document).keyup(function(evt) {
    if (evt.keyCode == 32) {
      space = false;
    }
  }).keydown(function(evt) {
    if (evt.keyCode == 32) {
      space = true;

      if(typeof myMap.map !== "undefined")
        {
         console.log(myMap.map.getContainer());

//access all the tiles
         var x = document.getElementsByClassName("leaflet-tile leaflet-tile-loaded");
         console.log(x);

        }

      console.log('space')
    }
  });
});


*/




AFRAME.registerComponent('gridmap', {

init:function()
{

//grid on x
var gridx=4;
//grid on y
var gridy=4;

console.log('GRID p5js');
//Position, decimal degrees Center of the first cell
var lat = 51.509865;
var lon = -0.118092;

//Earth’s radius, sphere
var r=6378137;

//offsets in meters for tile 512px 384 | tile 1024px 768 | tile 2048px 1536
var dn = 384;
var de = 384;
var sceneEl = document.querySelector('a-scene');
var tilecontainer=sceneEl.querySelector('#tilebox');

for(var i=0; i<gridx; i++)
{
  for(var j=0; j<gridy; j++)
  {

    	var tile = document.createElement('a-entity');

      tile.setAttribute('position', {x: 1024*i, y: 10, z: -1024*j});
      tile.setAttribute('scale', {x: 1, y: 1, z: 1});
      tile.setAttribute('rotation', {x: -90, y: 0, z: 0});
      tile.setAttribute('geometry',{primitive: 'plane', width: 1024, height: 1024});

      //Coordinate offsets in radians
      var dLat = (dn*j)/r;
      var dLon = (de*i)/(r*Math.cos(Math.PI*lat/180));

      console.log(dLon);

      //OffsetPosition, decimal degrees
      var  latO = lat + dLat * 180/Math.PI;
      var   lonO = lon + dLon * 180/Math.PI;

      tilecontainer.appendChild(tile);

      var url=p5map(latO,lonO);

      tile.setAttribute('material',{src:url});

      console.log('this is the img'+ url);


  }

}



function p5map(latAfr,lngAfr)
{
  const key = 'pk.eyJ1IjoidnNpZ25vIiwiYSI6ImNpeXhoc3o0aTAwMTIyd3FwdjlycmtoOW0ifQ.K4OJGOvagarG5QyqBTErrw'

  const options = {
    lat: latAfr, //51.509865,
    lng: lngAfr, //-0.118092,
    zoom: 17,
    scale:1,
    width: 1024,
    height: 1024,
    style:'navigation-guidance-night-v4' //satellite-v9  dark-v10

    }

    //const mappa = new Mappa('Mapbox', key);
    const mappa = new Mappa('Mapbox', key);

    let myMap;

    myMap = mappa.staticMap(options);
    let img;

    function preload() {
      img = loadImage(myMap.imgUrl);
      console.log(myMap.imgUrl);
    }



return myMap.imgUrl;
}

}
});

























AFRAME.registerComponent('mappastart', {


init:function (){
  var component = document.querySelector("#screen").components["canvas-material"];
      var ctx = component.getContext()


      function getRndColor() {
          var r = 255*Math.random()|0,
                  g = 255*Math.random()|0,
                  b = 255*Math.random()|0;
          return 'rgb(' + r + ',' + g + ',' + b + ')';
      }


      window.setInterval(function(){

          ctx.clearRect(0,0,4096 ,4096);
          ctx.fillStyle = getRndColor();
          ctx.fillRect(Math.random()*4096,Math.random()*4096,500,500);
          ctx.fillStyle = "black";
          ctx.font = "300px serif";
          ctx.fillText("Hello world", 500, 600);
          //this update function says to update the texture in aframe
          component.updateTexture();
      },1000)




}


/*
  init:function (){
    console.log('ciao');


    let canvas=document.getElementById('canvasId');

    console.log("somethig should be happening!");

    console.log(canvas);

// API Key for Mapboxgl. Get one here:
// https://www.mapbox.com/studio/account/tokens/
const key = 'pk.eyJ1IjoidnNpZ25vIiwiYSI6ImNpeXhoc3o0aTAwMTIyd3FwdjlycmtoOW0ifQ.K4OJGOvagarG5QyqBTErrw'

const options = {
  lat: 50,
  lng: 2,
  zoom: 1,
  //style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
style:'mapbox://styles/mapbox/streets-v10',
  //pitch: 50,
}

const mappa = new Mappa('MapboxGL', key);

let myMap;

function setup() {
   myMap = mappa.tileMap(options);
   myMap.overlay(canvas);
   console.log(myMap.overlay);
}


  }
  */
}
)
