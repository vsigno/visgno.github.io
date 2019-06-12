//Global Variable
var markerDict=new Object;
var markersURLArray=[];
var markersNameArray=[];

var videoURLArray=[];

var checktap=false;


AFRAME.registerComponent('markers_start',{
	init:function(){
		console.log('Add markers to the scene');

		//build the list of the markers_start

		for(var i=1; i<17; i++)
		{
			var url="resources/markers/pattern-Individual_Blocks-"+i+".patt";
			markersURLArray.push(url);
			markersNameArray.push('Marker_'+i);
			console.log(url);

			var urlvideo="resources/videos/Video_Marker_"+i+".mp4"
			videoURLArray.push(urlvideo);

		}


			var sceneEl = document.querySelector('a-scene');
			var storeVideo=sceneEl.querySelector('#storevideo')


			for(var k=0; k<16; k++)
			{
			var markerEl = document.createElement('a-marker');
			markerEl.setAttribute('type','pattern');
			markerEl.setAttribute('url',markersURLArray[k]);
			markerEl.setAttribute('id',markersNameArray[k]);


			markerEl.setAttribute('registerevents','');
			sceneEl.appendChild(markerEl);

			//Adding a dummy text
			var textEl = document.createElement('a-entity');
			textEl.setAttribute('id','text');
			textEl.setAttribute('position',{x: 0, y: 0.7, z: 0});
			textEl.setAttribute('rotation',{x:-90, y: 0, z: 0});

			textEl.setAttribute('text',{color: 'red', align: 'center', value:markersNameArray[k], width: '5.5'});

			markerEl.appendChild(textEl);

			//Adding a dummy videos

			var videoEl=document.createElement('video');
			videoEl.setAttribute('id','Video_Marker_'+(k+1));
			videoEl.setAttribute('src',videoURLArray[k]);
			videoEl.setAttribute('loop','');
			videoEl.setAttribute('muted','');
			videoEl.setAttribute('webkit-playsinline', '');
			videoEl.setAttribute('playsinline','');

			console.log(videoEl);
			storeVideo.appendChild(videoEl);


			var videoEntity=document.createElement('a-video');
			videoEntity.setAttribute('id','video'+(k+1));
			videoEntity.setAttribute('class','video');
			videoEntity.setAttribute('position',{x: 0, y: 0.583, z: 0});
			videoEntity.setAttribute('rotation',{x:0, y: 0, z: 0});
			videoEntity.setAttribute('material',{shader:'chromakey',src:'#Video_Marker_'+(k+1),color:'0 1 0'});
//			console.log(videoEntity);
			markerEl.appendChild(videoEntity);


		}

	}
});


AFRAME.registerComponent('registerevents', {
		init: function () {
			const marker = this.el;

			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
					console.log('markerFound', markerId);

					marker.emit('IamReady',{value:markerId});


					var sceneEl = document.querySelector('a-scene');

					if(sceneEl.querySelector('#Video_'+markerId).paused==true)
					{
						sceneEl.querySelector('#Video_'+markerId).play();
						sceneEl.querySelector('#Video_'+markerId).muted=false;
					}
					else
					{
					sceneEl.querySelector('#Video_'+markerId).load();
					sceneEl.querySelector('#Video_'+markerId).play();
					sceneEl.querySelector('#Video_'+markerId).muted=false;
					}

			});

			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('markerLost', markerId);

				var sceneEl = document.querySelector('a-scene');

				if(sceneEl.querySelector('#Video_'+markerId).paused==false)
				{
					sceneEl.querySelector('#Video_'+markerId).pause();
				}

			});
		},

	});
