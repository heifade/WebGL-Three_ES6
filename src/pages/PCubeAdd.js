import * as THREE from 'three';
import $ from "jquery";
import Base from './Base';

// 立方体
export default class PCubeAdd extends Base {
	constructor(container, $control){
		super(container, $control, {showFloor: true});

    this.meshList = [];
    for(let i = 0; i < 5; i++) {
      this.add();
    }

    this.addControlButton({ title: '添加', onClick: () => {this.add();}});
    this.addControlButton({ title: '删除', onClick: () => {this.remove();}});
  }

  add() {
    let x = (Math.random() * 2 - 1) * this.width;
    let y = Math.random() * this.height;
    let z = (Math.random() * 2 - 1) * 1000;
    let w = Math.random() * 100;
    let h = Math.random() * 100;
    let d = Math.random() * 100;
    let color = Math.random() * 0xffffff;
    this.meshList.push(this.drawCube({x: x, y: y, z: z, w: w, h: h, d: d, color: color}));
  }

  remove() {
    let mesh = this.meshList.pop();
    this.rotateGroup.remove(mesh);
  }

	drawCube({x = 0, y = 0, z = 0, w = 300, h = 300, d = 300, color = 0xffffff}) {
		let geometry = new THREE.CubeGeometry(w, //width
			h, //height
			d, //depth
		);
		let material = new THREE.MeshLambertMaterial({color: color});//材质
		let mesh = new THREE.Mesh(geometry, material);
    mesh.name = '长方体';
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
		this.rotateGroup.add(mesh);
    return mesh;
	}

  onAnimate() {
    // 遍历子元素，让每个子元素自转
    this.rotateGroup.traverse(e => {
      if(e instanceof THREE.Mesh && e != this.floorMesh){
        e.rotation.y += 0.02;
      }
    });
  }
}