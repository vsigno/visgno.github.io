//Global Variable
var markerDict=new Object;

AFRAME.registerComponent('marktest', {
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
			
			const marker = this.el;
			
			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
				console.log('markerFound', markerId);
				if(markerId=='markerpa')
				{
					markerDict.markerpa="true";
								
				var sceneEl = document.querySelector('a-scene');
				
				sceneEl.querySelector('#star-box').setAttribute("material", "color: green");
				}
				
				if(markerId=='markercasa' && 	markerDict.markerpa=="true"){
				markerDict.markercasa="true";
				console.log('you found casa');
				}
				else if(markerId=='markercasa' && 	markerDict.markerpa=="false"){
				
				console.log('try again');
				}
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
			});
			
			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('markerLost', markerId);
				// TODO: Add your own code here to react to the marker being lost.
			});
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