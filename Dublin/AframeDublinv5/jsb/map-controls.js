/* global THREE AFRAME */
AFRAME.registerComponent('buildextrud', {

  init: function () {
    var mapEl = document.querySelector('[mapbox]').object3D;

    console.log(mapEl);

  },
 tick: function (time, delta)
 {  var mapEl = document.querySelector('[mapbox]');
   mapEl.addEventListener('mapbox-loaded', function() {
     //console.log(mapEl.object3D);
 })}
        });

AFRAME.registerComponent('map-controls', {

  dependencies: ['tangram-map'],

  init: function () {
    this.map = this.el.components['tangram-map'].getMap();
                    },

   tick: function (time, delta) {

        var mapEl = document.querySelector('[tangram-map]');
        // /var setProperty = window.AFRAME.utils.entity.setComponentProperty;

        mapEl.addEventListener('tangram-map-loaded', function() {
          //  console.log(mapEl.getAttribute('tangram-map', 'center'));
            var lat=this.getAttribute('tangram-map', 'center');
            //console.log(lat.center[0]);
            var latflo=parseFloat(lat.center[0]);
            var lonflo=parseFloat(lat.center[1]);

            //this.setAttribute('tangram-map', {center: [latflo+0.01,lonflo+0.01]},true);
          //const origPos={x: lat.center[0], y:lat.center[1]}

            var offset ={x: latflo+0.01, y:lonflo+0.01} ;

            this.map = mapEl.components['tangram-map'].getMap();
          //  console.log(offset);
            this.map.panTo([latflo+0.01,lonflo+0.01], {animate: true});
            mapEl.emit('tangram-map-moveend');

  })}
});
