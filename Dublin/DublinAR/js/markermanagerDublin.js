//Global Variable
var markerDict=new Object;

var checktap=false;

let angle = 3 * Math.PI / 180;
let cx = 0;
let cy = 0;
let radius = 2;


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
				
					console.log('you found the pointCloud');
					
					var sceneEl = document.querySelector('a-scene');
					
					
				}
				
				
			});
			
			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('markerLost', markerId);
				
				var sceneEl = document.querySelector('a-scene');
				
			
				
			});
		},
		
	tick:function(time,timeDelta) {
		
		
		
		/*var sceneEl = document.querySelector('a-scene');
		
		if(sceneEl.querySelector('#thesound')!=null){
		// increase the angle of rotation
        angle += 3 * Math.PI / 180;
			//console.log(angle);
        // calculate the new ball.x / ball.y
         var newX = cx + radius * Math.cos(angle);
         var newY = cy + radius+4 * Math.sin(angle);
		 
		 
		 sceneEl.querySelector('#thesound').setAttribute('position', {x: newX, y: newY, z: -1});
		 sceneEl.querySelector('#boxsound').setAttribute('position', {x:newY*0.1 , y: 0, z: newX*0.1});
		}
		*/
		}
		
	});