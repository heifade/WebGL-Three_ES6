



import * as THREE from 'three';
import Base from './Base';


// 十二面体
export default class Icosahedron extends Base {
	constructor(container, control){
		super(container, control, {});

		this.draw();
	}

	draw() {

    
    

    var geometry = new THREE.IcosahedronGeometry(
      500, //radius
      0, //detail
    );


    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    material.wireframe = true;
    var mesh = new THREE.Mesh( geometry, material );

    
		
    this.rotateGroup.add(mesh);
	}

	
}
