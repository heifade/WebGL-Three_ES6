import * as THREE from 'three';
import Base from './Base';

// 立方体多个
export default class PCubeMultiple extends Base {
	constructor(container, $control){
		super(container, $control, {});

		this.drawCube({x: -800, color: 0xFF0000});
		this.drawCube({x: -400, color: 0xFF0000});
		this.drawCube({x: 800, color: 0x00ff00});
		this.drawCube({x: 400, color: 0x00ff00});
		this.drawCube({y: 400, color: 0x0000ff});
		this.drawCube({y: -400, color: 0xffff00});
		this.drawCube({z: 800, color: 0xFF00ff});
		this.drawCube({z: 400, color: 0xFF00ff});
		this.drawCube({z: -400, color: 0x00ffff});
		this.drawCube({z: -800, color: 0x00ffff});
		this.drawCube({color: 0xffffff});
	}

	drawCube({x = 0, y = 0, z = 0, w = 300, h = 300, d = 300, color = 0xffffff}) {
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


