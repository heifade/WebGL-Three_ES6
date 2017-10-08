import * as THREE from 'three';
import Base from './Base';






// 参数曲面机何体
export default class Parametric extends Base {
	constructor(container, control){
		super(container, control, {});

		this.draw();
	}

	draw() {


    let geometry = new THREE.ParametricGeometry( THREE.ParametricGeometries.klein, 25, 25 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    material.wireframe = true;



    let mesh = new THREE.Mesh( geometry, material );

    mesh.scale.x = 50;
    mesh.scale.y = 50;
    mesh.scale.z = 50;
		
    this.rotateGroup.add(mesh);
	}

	
}
