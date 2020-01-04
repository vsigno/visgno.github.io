AFRAME.registerComponent('ifcquery', {
  
  init:function (){
  		console.log('IFC Query');

  let sceneEl = document.querySelector('a-scene');
  let ifcObj= sceneEl.querySelector('#ifcmodel').object3D;
  console.log(ifcObj);
}
  
})