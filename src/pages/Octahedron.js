import * as THREE from 'three';
import Base from './Base';

// 八面体
export default class Octahedron extends Base {
	constructor(container, control){
		super(container, control, {});

		this.draw();
	}

	draw() {


    let geometry = new THREE.OctahedronGeometry( 
      500, //radius
      0, //detail
    );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    material.wireframe = true;



    let mesh = new THREE.Mesh( geometry, material );
		
    this.rotateGroup.add(mesh);
	}

	
}
