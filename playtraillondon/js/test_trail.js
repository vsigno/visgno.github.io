let audioContext;
let audioElement;
let audioElementSource;
let foaSource;
let foaScene;
let foaGain;
let dimensions = {width: 1, height: 1, depth: 1};
let audioReady = false;

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
function updatePositions(elements) {
  if (!audioReady)
    return;

  for (let i = 0; i < elements.length; i++) {
    let x = (elements[i].x - 0.5) * dimensions.width / 2;
    let y = 0;
    let z = (elements[i].y - 0.5) * dimensions.depth / 2;
    if (i == 0) {
      pannerNode.setPosition(x, y, z);
      foaSource.setPosition(x, y, z);
      toaSource.setPosition(x, y, z);
    } else {
      audioContext.listener.setPosition(x, y, z);
      foaScene.setListenerPosition(x, y, z);
      toaScene.setListenerPosition(x, y, z);
    }
  }
}

/**
 * @private
 */
function initAudio() {
  // Create <audio> streaming audio source.
  audioContext = new (window.AudioContext || window.webkitAudioContext);
  let audioSource = 'resources/BrambushLiss.wav';
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