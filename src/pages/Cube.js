import * as THREE from 'three';
import Base from './Base';

// 立方体
export default class Cube extends Base {
	constructor(container, $control){
		super(container, $control, {});

		
		this.drawCube({color: '#ff0000'});
	}

	drawCube({x = 0, y = 0, z = 0, w = 300, h = 300, d = 300, color = '#ffffff'}) {
		let geometry = new THREE.CubeGeometry(w, //width
			h, //height
			d, //depth
			3, //widthSegments
			3, //heightSegments
			3, //depthSegments
		);
		let material = new THREE.MeshLambertMaterial({color: color});//材质
		//material.wireframe = true;
		let mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		this.rotateGroup.add(mesh);
	}
}


