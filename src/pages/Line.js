import * as THREE from 'three';
import Base from './Base';

// 线条
export default class Line extends Base {
	constructor(container, control){
		super(container, control, {});

		this.draw();
	}

	draw() {
		// 画线
    // 线的顶点集合
    let geometry = new THREE.Geometry();
    // 添加顶点
    geometry.vertices.push(
      new THREE.Vector3(-500, 500, 0),
      new THREE.Vector3(500, 500, 0),
      new THREE.Vector3(500, -500, 0),
      new THREE.Vector3(-500, -500, 0),
      new THREE.Vector3(-500, 500, 0),
    );
    // 设置顶点颜色
    geometry.colors.push(
      new THREE.Color(0xFF0000),
      new THREE.Color(0x00ff00),
      new THREE.Color(0x0000FF),
      new THREE.Color(0x00FFFF),
      new THREE.Color(0xFF0000),
    );
    // 线的材质
    let material = new THREE.LineBasicMaterial({
      // color: 0xff0000,
      linewidth: 1,
      vertexColors: THREE.VertexColors,
    });
    let line = new THREE.Line(geometry, //顶点
      material, //材质
      THREE.LineStrip, //折线
    );
    this.rotateGroup.add(line);
	}

	
}
