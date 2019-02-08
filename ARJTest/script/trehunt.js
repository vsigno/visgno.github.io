//Global Variable
var markerDict=new Object;

let angle = 3 * Math.PI / 180;
let cx = 0;
let cy = 0;
let radius = 2;


AFRAME.registerComponent('markInit', {
	init:function (){
		console.log('test');
	
	
	markerDict.markercasa="false";
	markerDict.markerpa="false";
	markerDict.markertree="false";
	markerDict.markerstar="false";
	
	console.log(markerDict.markercasa);
	}
});





AFRAME.registerComponent('registerevents', {
		init: function () {
			 
			 this.tick = AFRAME.utils.throttleTick(this.tick, 150, this);

			const marker = this.el;
			
			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
				console.log('markerFound', markerId);
				if(markerId=='markerpa')
				{
					markerDict.markerpa="true";
								
				var sceneEl = document.querySelector('a-scene');
								
				}
				
				if(markerId=='markertree'){
					markerDict.markertree="true";
					console.log('you found the video');
					var sceneEl = document.querySelector('a-scene');
					sceneEl.querySelector('#gameVideo').play();
					sceneEl.querySelector('#gameVideo').muted=false;
					
					
				}
				
				if(markerId=='markercasa' && 	markerDict.markerpa=="true"){
				markerDict.markercasa="true";
				console.log('you found casa');
				
				var sceneEl = document.querySelector('a-scene');
				
				
				sceneEl.querySelector('#star-box').setAttribute("material", "color: green");
				sceneEl.querySelector('#star-box').setAttribute("animation", "property: rotation; dir: alternate; dur: 1000; easing: easeInSine; loop: true; from:0 0 0; to:45 360 0");
				
				sceneEl.querySelector('#thesound').components.sound.playSound();
				
				//ResonanceAudio
				//sceneEl.querySelector('#thesound').components.resonanceaudiosrc.playSound();
				
				
				}
				else if(markerId=='markercasa' && 	markerDict.markerpa=="false"){
				
				console.log('try again');
				}
				
								
				
				
			});
			
			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('markerLost', markerId);
				
				var sceneEl = document.querySelector('a-scene');
				sceneEl.querySelector('#thesound').components.sound.stopSound();
				
				//resonanceaudio
				//var thesoundvar = sceneEl.querySelector('#thesound').components.resonanceaudiosrc.pauseSound();
				sceneEl.querySelector('#gameVideo').pause();
				
				// TODO: Add your own code here to react to the marker being lost.
			});
		},
		
	tick:function(time,timeDelta) {
		var sceneEl = document.querySelector('a-scene');
		
		if(sceneEl.querySelector('#thesound')!=null){
		// increase the angle of rotation
        angle += 3 * Math.PI / 180;
			//console.log(angle);
        // calculate the new ball.x / ball.y
         var newX = cx + radius * Math.cos(angle);
         var newY = cy + radius+4 * Math.sin(angle);
		 
		 
		 sceneEl.querySelector('#thesound').setAttribute('position', {x: newX, y: newY, z: -1});
		}
		}
	});
		
		
		
		/*
		<script>
	<!--this works just with the DEV version of AR.JS-->
	AFRAME.registerComponent('registerevents', {
		init: function () {
			
			const marker = this.el;
			
			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
				console.log('markerFound', markerId);
				if(markerId=='marker-star')
				{
				console.log('yep');
				var sceneEl = document.querySelector('a-scene');
				
				sceneEl.querySelector('#star-box').setAttribute("material", "color: green");
				}
				// TODO: Add your own code here to react to the marker being found.
			});
			
			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('markerLost', markerId);
				// TODO: Add your own code here to react to the marker being lost.
			});
		}
	});
	
	</script>
	*/