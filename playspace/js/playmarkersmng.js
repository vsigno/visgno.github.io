//Global Variable
var markerDict=new Object;
var markersURLArray=[];
var markersNameArray=[];

var checktap=false;

let angle = 3 * Math.PI / 180;
let cx = 0;
let cy = 0;
let radius = 2;



AFRAME.registerComponent('markers_start',{
	init:function(){
		console.log('Add markers to the scene');

		//build the list of the markers_start

		for(var i=1; i<17; i++)
		{
			var url="resources/markers/new_May/pattern-Individual_Blocks-"+i+".patt";
			markersURLArray.push(url);
			markersNameArray.push('Marker_'+i);
			console.log(url);
		}

			var sceneEl = document.querySelector('a-scene');

			//var k=0;
			for(var k=0; k<16; k++)
			{
			var markerEl = document.createElement('a-marker');
			markerEl.setAttribute('type','pattern');
			markerEl.setAttribute('url',markersURLArray[k]);
			markerEl.setAttribute('id',markersNameArray[k]);
			//markerEl.setAttribute('id','markerswords');

			markerEl.setAttribute('registerevents','');
			sceneEl.appendChild(markerEl);

			//Adding a dummy text
			var textEl = document.createElement('a-entity');
			textEl.setAttribute('id','text');
			textEl.setAttribute('position',{x: 0, y: 0.7, z: 0});
			textEl.setAttribute('rotation',{x:-90, y: 0, z: 0});

			textEl.setAttribute('text',{color: 'red', align: 'center', value:markersNameArray[k], width: '5.5'});

			markerEl.appendChild(textEl);
		}





	}
});




AFRAME.registerComponent('markInit', {
	init:function (){

		console.log('test');


	markerDict.markerepsilon="false";
	markerDict.markerhydra="false";
	markerDict.markershield="false";
	markerDict.markerswords="false";
	markerDict.markertoycar="false";

	console.log(markerDict.markertoycar);
	}
});



AFRAME.registerComponent('registerevents', {
		init: function () {



			this.tick = AFRAME.utils.throttleTick(this.tick, 150, this);

			const marker = this.el;

			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
					console.log('markerFound', markerId);




				if(markerId=='markershield')
				{
					markerDict.markershield="true";

					console.log('you found the image');

					var sceneEl = document.querySelector('a-scene');


				}


				if(markerId=='markerhydra')
				{
					markerDict.markerhydra="true";

					console.log('you found the sound');

					var sceneEl = document.querySelector('a-scene');

					sceneEl.querySelector('#thesound').components.sound.playSound();
				}


				if(markerId=='markertoycar')
				{
					markerDict.markertoycar="true";

					console.log('you found the 3D model');

					var sceneEl = document.querySelector('a-scene');

				}



				if(markerId=='markerepsilon')
				{
					markerDict.markerepsilon="true";

					console.log('you found the video');

					var sceneEl = document.querySelector('a-scene');

					var device=navigator.platform;

					if(sceneEl.querySelector('#chromaVideo').paused==true)
					{
						sceneEl.querySelector('#chromaVideo').play();
						sceneEl.querySelector('#chromaVideo').muted=false;
					}
					else
					{
					sceneEl.querySelector('#chromaVideo').load();
					sceneEl.querySelector('#chromaVideo').play();
					sceneEl.querySelector('#chromaVideo').muted=false;
					}

				}



				if(markerId=='markerswords')
				{
					markerDict.markerswords="true";

					console.log('you found the video');

					var sceneEl = document.querySelector('a-scene');

					if(sceneEl.querySelector('#mocapVideo').paused==true)
					{
						sceneEl.querySelector('#mocapVideo').play();
						sceneEl.querySelector('#mocapVideo').muted=false;
					}
					else
					{
					sceneEl.querySelector('#mocapVideo').load();
					sceneEl.querySelector('#mocapVideo').play();
					sceneEl.querySelector('#mocapVideo').muted=false;
					}
				}


			});

			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('markerLost', markerId);

	//			var sceneEl = document.querySelector('a-scene');

		/*		if(sceneEl.querySelector('#thesound').components.sound.isPlaying==true){
				sceneEl.querySelector('#thesound').components.sound.stopSound();
				console.log("Stop the sound");}
*/
			//	device=navigator.platform;

				//		sceneEl.querySelector('#chromaVideo').pause();



			//	sceneEl.querySelector('#mocapVideo').pause();

			});
		},

	tick:function(time,timeDelta) {


		}

	});
