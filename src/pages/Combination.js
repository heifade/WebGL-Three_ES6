import * as THREE from 'three';
import Base from './Base';

// 组合
export default class Combination extends Base {
	constructor(container, $control){
		super(container, $control, {});

		let geometry = new THREE.Geometry();

		geometry.merge(this.drawCube({x: -800}));
		geometry.merge(this.drawCube({x: -400}));
		geometry.merge(this.drawCube({x: 800}));
		geometry.merge(this.drawCube({x: 400}));
		geometry.merge(this.drawCube({y: 400}));
		geometry.merge(this.drawCube({y: -400}));
		geometry.merge(this.drawCube({z: 800}));
		geometry.merge(this.drawCube({z: 400}));
		geometry.merge(this.drawCube({z: -400}));
		geometry.merge(this.drawCube({z: -800}));
		geometry.merge(this.drawCube({}));

		let material = [
			new THREE.MeshLambertMaterial({color: '#ff0000'}),//材质
			new THREE.MeshLambertMaterial({color: '#ff0000'}),//材质
			new THREE.MeshLambertMaterial({color: '#00ff00'}),//材质
			new THREE.MeshLambertMaterial({color: '#00ff00'}),//材质
			new THREE.MeshLambertMaterial({color: '#0000ff'}),//材质
			new THREE.MeshLambertMaterial({color: '#ffff00'}),//材质
			new THREE.MeshLambertMaterial({color: '#ff00ff'}),//材质
			new THREE.MeshLambertMaterial({color: '#ff00ff'}),//材质
			new THREE.MeshLambertMaterial({color: '#00ffff'}),//材质
			new THREE.MeshLambertMaterial({color: '#00ffff'}),//材质
			new THREE.MeshLambertMaterial({color: '#ffffff'}),//材质
		];
		this.rotateGroup.add(new THREE.Mesh(geometry, material));
	}

	drawCube({x = 0, y = 0, z = 0, w = 400, h = 400, d = 400}) {
		let geometry = new THREE.CubeGeometry(
			w, //width
			h, //height
			d, //depth
			3, //widthSegments
			3, //heightSegments
			3, //depthSegments
		);
		geometry.translate(x, y, z);
		return geometry;
	}
}