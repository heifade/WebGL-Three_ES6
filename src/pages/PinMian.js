import * as THREE from 'three';
import Base from './Base';
import PlaneGeometry1 from '../geometry/PlaneGeometry1';

// 自定义平面
export default class PinMian extends Base {
	constructor(container, $control){
		super(container, $control, {});

		this.draw();
	}

	draw() {
		let geometry = new PlaneGeometry1(500, 500, 5, 5);
    let material = new THREE.MeshLambertMaterial({color: 0x0000ff, wireframe: true});
    let mesh = new THREE.Mesh(geometry, material);
    //mesh.position = new THREE.Vector3(0, 0, 0);
    this.rotateGroup.add(mesh);
	}
}
