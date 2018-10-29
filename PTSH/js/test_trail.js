let audioContext;
let audioElement;
let audioElementSource;
let foaSource;
let foaScene;
let foaGain;
let dimensions = {width: 1, height: 1, depth: 1};
let audioReady = false;

let audioSource;

let angle = 3 * Math.PI / 180;
let cx = 0;
let cy = 0;
let radius = 2;

/**
 * Select the desired rendering mode.
 * @param {Object} event
 * @private
 */


/**
 * Update the audio sound objects' positions.
 * @param {Object} elements
 * @private
 */
 
function updatePositions() {
  if (!audioReady)
    return;


	// increase the angle of rotation
        angle += 3 * Math.PI / 180;

        // calculate the new ball.x / ball.y
        var newX = cx + radius * Math.cos(angle);
        var newY = cy + radius * Math.sin(angle);


foaSource.setPosition(newX, newY, 0);
foaScene.setListenerPosition(0, 0, 0);
}

setInterval(function(){ updatePositions() }, 100);



function loadEvents()
{
	console.log(events[0]);
	audioSource='resources/'+events[0];
}


/**
 * @private
 */

function initAudio() {
  // Create <audio> streaming audio source.
  audioContext = new (window.AudioContext || window.webkitAudioContext);
  //let audioSource = 'resources/BrambushLiss.wav';
    
  
  audioElement = document.createElement('audio');
  audioElement.src = audioSource;
  audioElement.crossOrigin = 'anonymous';
  audioElement.load();
  audioElement.loop = true;
  audioElementSource =
    audioContext.createMediaElementSource(audioElement);

  // Create gain nodes.
  foaGain = audioContext.createGain();
  
  // Initialize scene and create Source(s).
  // Initialize PannerNode/Listener
  foaScene = new ResonanceAudio(audioContext, {ambisonicOrder: 1});
  foaSource = foaScene.createSource();
  
  // Connect audio graph.
  audioElementSource.connect(foaSource.input);
  foaScene.output.connect(foaGain);
  foaGain.connect(audioContext.destination);
  
  audioReady = true;
     
}

let onLoad = function() {
	
		
  // Initialize play button functionality.
  let sourcePlayback = document.getElementById('sourceButton');
  sourcePlayback.onclick = function(event) {
	  
    switch (event.target.textContent) {
      case 'Play': {
        if (!audioReady) {
          initAudio();
        }
        event.target.textContent = 'Pause';
        audioElement.play();
      }
      break;
      case 'Pause': {
        event.target.textContent = 'Play';
        audioElement.pause();
      }
      break;
    }
	
	
	
  };
};
window.addEventListener('load', onLoad);












