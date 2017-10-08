import * as THREE from 'three';
import Base from './Base';

// 平面
export default class Plane extends Base {
	constructor(container, $control){
		super(container, $control,{});

		this.draw();
	}
	
  draw() {
    let geometry = new THREE.PlaneGeometry(
      500,    // width
      500,   // height
      3,   // widthSegments 
      4,   // heightSegments 
    );
    let material = new THREE.MeshNormalMaterial( {side: THREE.DoubleSide} );
    material.wireframe = true;
    
    let mesh = new THREE.Mesh( geometry, material );
    this.rotateGroup.add( mesh );
  }
	
}
