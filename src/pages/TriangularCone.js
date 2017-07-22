import * as THREE from 'three';
import Base from './Base';

// 三角锥，自制
export default class TriangularCone extends Base {
	constructor(container, $control){
		super(container, $control, {showFloor: true});

    this.draw({y: 200, color: 0xFF0000});
    
    let {geometry} = this.mesh1;
    for(let i=0;i<4;i++){
      this.addControlRange({ title: `点${i+1}X`, hashData: geometry.vertices[i], key: "x",  max: 5, min: -5, step:0.1, onChange: () => {geometry.verticesNeedUpdate = true;}});
      this.addControlRange({ title: `点${i+1}Y`, hashData: geometry.vertices[i], key: "y",  max: 5, min: -5, step:0.1, onChange: () => {geometry.verticesNeedUpdate = true;}});
      this.addControlRange({ title: `点${i+1}Z`, hashData: geometry.vertices[i], key: "z",  max: 5, min: -5, step:0.1, onChange: () => {geometry.verticesNeedUpdate = true;}});  
    }
	}

	draw({x = 0, y = 0, z = 0, w = 300, h = 300, d = 300, color = 0xffffff}) {
    let vertices = [
      new THREE.Vector3(0.3, 1, 0),
      new THREE.Vector3(1,-1,-1),
      new THREE.Vector3(1,-1,1),
      new THREE.Vector3(-1,-1,-1),
    ];

    let faces = [
      //两个三角形组成一个面（正方形）
      new THREE.Face3(0,2,1),//三角形的三个点必须逆时针方向。
      new THREE.Face3(0,1,3),

      new THREE.Face3(0,3,2),
      new THREE.Face3(2,3,1),
    ];

    let geometry = new THREE.Geometry();
    geometry.vertices = vertices;
    geometry.faces = faces;

    geometry.verticesNeedUpdate = true;
    geometry.computeFaceNormals(); //计算侧面

    let material = new THREE.MeshLambertMaterial({color: color});//材质
    this.mesh1 = new THREE.Mesh(geometry, material);
    this.mesh1.castShadow = true;
		this.mesh1.position.set(x, y, z);
    this.mesh1.scale.x = w;
    this.mesh1.scale.y = h;
    this.mesh1.scale.z = d;
    //mesh.rotation.y = 30 / 180 * Math.PI;

    this.rotateGroup.add(this.mesh1);
	}
}