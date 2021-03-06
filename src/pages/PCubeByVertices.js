import * as THREE from 'three';
import Base from './Base';
import $ from "jquery";

// 立方体，自制
export default class PCubeByVertices extends Base {
	constructor(container, $control){
    super(container, $control, {showFloor: true});
    

    this.material1 = new THREE.MeshLambertMaterial({color: '#ff0000'});//材质
    this.material1.wireframe = true;

    this.draw({y: 200, color: 0xFF0000});
    
    let {geometry} = this.mesh1;

    for(let i=0;i<8;i++){
      this.ctrlBar.addControlRange({ title: `点${i+1}X`, hashData: geometry.vertices[i], key: "x",  max: 5, min: -5, step:0.1, onChange: () => {geometry.verticesNeedUpdate = true;}});
      this.ctrlBar.addControlRange({ title: `点${i+1}Y`, hashData: geometry.vertices[i], key: "y",  max: 5, min: -5, step:0.1, onChange: () => {geometry.verticesNeedUpdate = true;}});
      this.ctrlBar.addControlRange({ title: `点${i+1}Z`, hashData: geometry.vertices[i], key: "z",  max: 5, min: -5, step:0.1, onChange: () => {geometry.verticesNeedUpdate = true;}});  
    }
    this.ctrlBar.addControlCheck({ title: `仅线框`, hashData: this.material1, key: 'wireframe'});
	}

	draw({x = 0, y = 0, z = 0, w = 300, h = 300, d = 300, color = 0xffffff}) {

    let vertices = [
      new THREE.Vector3(1,1,1),
      new THREE.Vector3(1,1,-1),
      new THREE.Vector3(1,-1,-1),
      new THREE.Vector3(1,-1,1),
      new THREE.Vector3(-1,-1,1),
      new THREE.Vector3(-1,-1,-1),
      new THREE.Vector3(-1,1,-1),
      new THREE.Vector3(-1,1,1),
    ];

    let faces = [
      //两个三角形组成一个面（正方形）
      new THREE.Face3(7,0,6),//三角形的三个点必须逆时针方向。
      new THREE.Face3(6,0,1),

      new THREE.Face3(4,5,3),
      new THREE.Face3(3,5,2),

      new THREE.Face3(0,3,2),
      new THREE.Face3(0,2,1),

      new THREE.Face3(2,5,1),
      new THREE.Face3(1,5,6),

      new THREE.Face3(7,6,5),
      new THREE.Face3(7,5,4),

      new THREE.Face3(7,4,3),
      new THREE.Face3(7,3,0),
    ];

    let geometry = new THREE.Geometry();
    geometry.vertices = vertices;
    geometry.faces = faces;

    geometry.verticesNeedUpdate = true;
    geometry.computeFaceNormals(); //计算侧面


    
    this.mesh1 = new THREE.Mesh(geometry, this.material1);
    this.mesh1.castShadow = true;
		this.mesh1.position.set(x, y, z);
		this.rotateGroup.add(this.mesh1);

    this.mesh1.scale.x = w / 2;
    this.mesh1.scale.y = h / 2;
    this.mesh1.scale.z = d / 2;

    //this.mesh1.matrixAutoUpdate = false;//距阵禁用自动更新
	}
}