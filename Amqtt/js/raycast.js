//global Variable
var jsonDb; //var to contain the parsed JSON
var xmlDb; //var to contain the parsed XML

AFRAME.registerComponent('cursor-listener', {
    
  init: function () {
	var sceneEl = document.querySelector('a-scene');
  
  var tempLine; //the endgegeometry, border of the mesh

  this.el.addEventListener('click', function (evt) {
       console.log('I was clicked at: ', evt.detail.intersection.object);

  if(evt.detail.intersection.object.children.length>0)
  {
    //if the [] >0 it means that there is the EdgesGeometry. We can remove it
    evt.detail.intersection.object.children=[];
  }
  
  else
  {
        //another method to highlight the mesh is to change its color
        //evt.detail.intersection.object.material.color.setHex( 0xff0000 );
        //console.log(evt.detail.intersection.object.material.color.getHexString());
        
        var geometry=evt.detail.intersection.object.geometry;
        var edges = new THREE.EdgesGeometry( geometry);
        tempLine = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xff0000 } ) );
        tempLine.name="templineid";
        
        //Add the EdgesGeometry as child of the mesh when clicked
        evt.detail.intersection.object.add(tempLine);

//Using XML version (as the selected mesh can be a main component [floor] or a furniture [chair] we need to go throught the parents)
  //the mesh used -Trapelo_Design- has been transformed in Blender due to the distance of the geometry from the origin. The transformation changed the
  //numbers of the id in _ We control if the id CONTAINS the string using the jQuery selector *
  var strParentParentParent=evt.detail.intersection.object.parent.parent.parent.name.substr(1);
  var strParentParent=evt.detail.intersection.object.parent.parent.name.substr(1);
  var strParent=evt.detail.intersection.object.parent.name.substr(1);
  var strObj=evt.detail.intersection.object.name.substr(1);
          
      let idObj=$(xmlDb).find("[id*='"+strObj+"']").attr('Name');
          console.log('Obj: '+idObj);

      let idParent=$(xmlDb).find("[id*='"+strParent+"']").attr('Name');
          console.log('Parent 1:'+ idParent);
      
      let idParentParent=$(xmlDb).find("[id*='"+strParentParent+"']").attr('Name');
          console.log('Parent 2: '+ idParentParent);
          
      let idParentParentParent=$(xmlDb).find("[id*='"+strParentParentParent+"']").attr('Name');
          console.log('Parent 3: '+ idParentParentParent);
              
      //create a label in the location of the click and with the name of the IFC element
          var textEl = document.createElement('a-entity');
              textEl.setAttribute('id','text');
              textEl.object3D.position.set(evt.detail.intersection.point.x,evt.detail.intersection.point.y+0.5,evt.detail.intersection.point.z);
              //	textEl.setAttribute('rotation',{x:180, y: 0, z: 0});
              // textEl.setAttribute('look-at','#userCamera');
              var textToViz="";
              if(typeof idObj === 'undefined')
              {
                textToViz=idParent;
              }
              else{
                textToViz=idObj;
              }
              textEl.setAttribute('text',{color: 'red', align: 'center', value:textToViz, height:'5', width: '5'});
              this.appendChild(textEl);
  
  //    console.log("Obj Name: "+evt.detail.intersection.object.name);
  //    console.log("Parent 1: "+evt.detail.intersection.object.parent.name);
  //    console.log("Parent 2: "+evt.detail.intersection.object.parent.parent.name);
  //    console.log("Parent 3: "+evt.detail.intersection.object.parent.parent.parent.name);
  //    console.log("Parent 4: "+evt.detail.intersection.object.parent.parent.parent.parent.name);
  //    console.log("Parent 5: "+evt.detail.intersection.object.parent.parent.parent.parent.parent.name);
  //    console.log("Parent 6: "+evt.detail.intersection.object.parent.parent.parent.parent.parent.parent.name);
      }
      });
    }
  });
  
  AFRAME.registerComponent('xml-parsing', {
    init: function () {
      $.ajax({
        type: "GET",
      	url: "Trapelo_Design.xml",
      	dataType: "xml",
      	success: function(xml) {
          xmlDb=xml;
        console.log('XML PARSED');
      }
      });
}}
);
  
  AFRAME.registerComponent('json-parsing', {
    init: function () {
    $.getJSON("Trapelo_Design.json", function(json_loc) {
      jsonDb=json_loc;
      console.log("JSON PARSED");
})
}
})






//Using JSON version
//remove the first character of the string, Blender put a _ instead of the number
  /*  let parentString=evt.detail.intersection.object.parent.name.substr(1);
    console.log(parentString);
    var parentObj = jsonDb.ifc.decomposition.IfcProject.IfcSite.IfcBuilding.IfcBuildingStorey.filter(d => d._id.includes(parentString));
    console.log(parentObj[0]);
    console.log("Obj Name: "+evt.detail.intersection.object.name);

    
//https://stackoverflow.com/questions/5072136/javascript-filter-for-objects/37616104
//filter works just with Array not Object v1
    Object.filter = (obj, predicate) =>
    Object.assign(...Object.keys(obj)
                    .filter( key => predicate(obj[key]) )
                    .map( key => ({ ['myObj']: obj[key] }) ) );
    
  var filtered = Object.filter(parentObj[0], val => val._id === '3k9SNKX5jFqQYQihHI1iLi');
  console.log(filtered.myObj._Name);
*/


//Find using underscore
/*
let objToFind = _.where(jsonDb.ifc.decomposition.IfcProject.IfcSite.IfcBuilding.IfcBuildingStorey, {_id:'00Anm4s4r7luYkA9gSC2lj'});
console.log(objToFind);
let theId='41UzFEpPAiBNNDMW3_djM';
let objToFindNest=_.findWhere(objToFind[0],{_id:theId   })
//let objToFindNest=_.findWhere(objToFind[0],{_id:+'41UzFEpPAiBNNDMW3_djM'})
console.log(objToFindNest._Name);
*/


//threejs raycast
/*
  init: function() {
    //let sceneEl = document.querySelector('a-scene');
    let camera= this.el.sceneEl.camera;
    var scene = this.el.sceneEl.object3D;
    
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    
    console.log(camera);
    
    this.el.addEventListener('mouseenter', (e) => {

      raycaster.setFromCamera( mouse, camera );
      
      var intersects = raycaster.intersectObjects(scene.children);
      console.log(intersects);
    })
  }
*/

//Mouseover
/*
this.el.addEventListener('mouseenter', (evt) => {
  //evt.detail.intersection.object.material.color.setHex( 0xff0000 );
  console.log(evt.detail.intersection.object.material.color.getHexString());
  var geometry=evt.detail.intersection.object.geometry;
  var edges = new THREE.EdgesGeometry( geometry);
  tempLine = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xff0000 } ) );
  tempLine.name="templineid";
  evt.detail.intersection.object.add(tempLine);
  tempObj=evt.detail.intersection.object;
})
this.el.addEventListener('mouseleave', (evt) => {
    tempObj.remove(tempLine);
})
*/

  