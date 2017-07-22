import * as THREE from 'three';
import Base from './Base';

// 立方体
export default class MagicSquare extends Base {
	constructor(container, $control){
		super(container, $control, {});

		this.draw();
	}

	draw() {
		let matArray = [
      new THREE.MeshLambertMaterial({color: 0x009e60}),
      new THREE.MeshLambertMaterial({color: 0x0051ba}),
      new THREE.MeshLambertMaterial({color: 0xffd500}),
      new THREE.MeshLambertMaterial({color: 0xff5800}),
      new THREE.MeshLambertMaterial({color: 0xc41e3a}),
      new THREE.MeshLambertMaterial({color: 0xffffff}),
    ];

    let group = new THREE.Mesh();
    let w = 300;
    let w1 = w + 2;

    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        for(let k=0;k<3;k++){
          let cubeGeom = new THREE.CubeGeometry(w,w,w);
          let cube = new THREE.Mesh(cubeGeom, matArray);
          cube.position.set(i * w1 - w1, j * w1 - w1, k * w1 - w1);
          group.add(cube);
        }
      }
    }

          

    this.rotateGroup.add(group);
	}
}