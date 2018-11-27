//const DracoModule = module;

AFRAME.registerComponent('drc-model', {
    schema: {
        drcUrl: {type: 'string'}
    },
    init: function() {
        this.model = null;
        this.drcLoader = new THREE.DRACOLoader();
        this.drcLoader.crossOrigin = '';
    },
    
    update: function() {
        var data = this.data;
        if (!data.drcUrl) { return ; }
        this.remove();
        this.loadObj(data.drcUrl);
    },
    
    remove: function() {
        if (!this.model) { return; }
        this.el.removeObject3D('mesh');
    },
    
    loadObj: function(drcUrl) {
        var self = this;
        var el = this.el;
        var drcLoader = this.drcLoader;
        drcLoader.load(drcUrl, function(bufferGeometry) {
            //var material = new THREE.MeshStandardMaterial({vertexColors: THREE.VertexColors});
				console.log('ready...');
            let geometry;
            // Point cloud does not have face indices.
            if (bufferGeometry.index == null) {
              
			  
			  var material = new THREE.PointsMaterial({
                        size:0.1,
                        vertexColors: THREE.VertexColors,
                        transparent: !0,
                        opacity: 1,
                        depthWrite: !0
                    });
			  
			  
			  
			  geometry = new THREE.Points(bufferGeometry, material);
			  console.log('PointCloud');
			  
			  
            } else {
              bufferGeometry.computeVertexNormals();
			  
			  var material = new THREE.MeshStandardMaterial({vertexColors: THREE.VertexColors});
              
			  geometry = new THREE.Mesh(bufferGeometry, material);
			  console.log('mesh');
            }
            
            // Compute range of the geometry coordinates for proper rendering.
            bufferGeometry.computeBoundingBox();
            const sizeX = bufferGeometry.boundingBox.max.x - bufferGeometry.boundingBox.min.x;
            const sizeY = bufferGeometry.boundingBox.max.y - bufferGeometry.boundingBox.min.y;
            const sizeZ = bufferGeometry.boundingBox.max.z - bufferGeometry.boundingBox.min.z;
            const diagonalSize = Math.sqrt(sizeX * sizeX + sizeY * sizeY + sizeZ * sizeZ);
            const scale = 1.0 / diagonalSize;
            const midX = (bufferGeometry.boundingBox.min.x + bufferGeometry.boundingBox.max.x) / 2;
            const midY = (bufferGeometry.boundingBox.min.y + bufferGeometry.boundingBox.max.y) / 2;
            const midZ = (bufferGeometry.boundingBox.min.z + bufferGeometry.boundingBox.max.z) / 2;

            geometry.scale.multiplyScalar(scale);
            geometry.position.x = -midX * scale;
            geometry.position.y = -midY * scale;
            geometry.position.z = -midZ * scale;
            //geometry.castShadow = true;
            //geometry.receiveShadow = true;
            self.model = geometry;
            
            el.setObject3D('mesh', geometry);
            el.emit('model-loaded', {format: 'drc', model: geometry});
        });
    }
});