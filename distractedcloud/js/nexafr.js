AFRAME.registerComponent('nexaframe', {

  init:function (){

    function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    //var model = getURLParameter('model') || "resources/models/DublinCastle_3DMod.nxs";
    //var model = getURLParameter('model') || "resources/models/BonnieJaimie_hanway.nxs";
    var model = getURLParameter('model') || "resources/models/05_Rathbone_Pl_2M.nxz";
    //01_Fitzroy_Sq
    //02_TCR
    //03_Car_Floor
    //04_Hanway_St_2M
    //05_Rathbone_Pl
    // London_Euston_UCL_N_C
    //DublinCastle_40MPC_Scaled

    var renderer = this.el.sceneEl.renderer;

    var scene=this.el.sceneEl;
    var canvas =scene.querySelector('#nexcont');

    var nexus_obj = new NexusObject(model, onNexusLoad, function() { redraw = true; }, renderer);

    canvas.setObject3D('mesh',nexus_obj);

    function render() {
      Nexus.beginFrame(renderer.context);
    	renderer.render( scene, camera );
    	Nexus.endFrame(renderer.context);
    }


    function onNexusLoad() {
    	var s   = 1/nexus_obj.geometry.boundingSphere.radius;
    	var target = new THREE.Vector3();
    	var p = nexus_obj.geometry.boundingBox.getCenter(target).negate();
    	nexus_obj.position.set(p.x*s, p.y*s, p.y*s); //.set(p.x, p.y, p.z); // = p; //.set(p.x, p.y, p.z);
    	nexus_obj.scale.set(s, s, s);
    	redraw = false;
    	//nexus_obj.material = new THREE.PointsMaterial( {  size:13, color: 0x00ff00, transparent: false, opacity:0.25 } );
      nexus_obj.material = new THREE.PointsMaterial({size:1, vertexColors: THREE.VertexColors });
    }
}
}
)
