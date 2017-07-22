import * as THREE from 'three';
import $ from 'jquery';
import Base from './Base';

// 立方体缩放
export default class PCubeScale extends Base {
	constructor(container, $control){
    super(container, $control, {showFloor: true, showGrid: true});
    
    this.material1 = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});//材质
		this.material1.wireframe = true;

    this.draw();


    this.ctrlBar.addControlRange({ title: `X`, hashData: this.mesh.scale, key: "x",  max: 5, min: 1, step:0.1});
    this.ctrlBar.addControlRange({ title: `Y`, hashData: this.mesh.scale, key: "y",  max: 5, min: 1, step:0.1});
    this.ctrlBar.addControlRange({ title: `Z`, hashData: this.mesh.scale, key: "z",  max: 5, min: 1, step:0.1});
    this.ctrlBar.addControlCheck({ title: `仅线框`, hashData: this.material1, key: 'wireframe'});
	}

	draw() {
		// 立方体
    let geometry = new THREE.CubeGeometry(100, //width
      300, //height
      100, //depth
    );
		this.mesh = new THREE.Mesh(geometry, this.material1);
    this.mesh.castShadow = true;
    
    // 方法1：
    this.mesh.position.set(0, 300 * this.mesh.scale.y / 2, 0);
    this.mesh.scale.x = 1;
    this.mesh.scale.y = 1;
    this.mesh.scale.z = 1;
    

    // let angle = 30;
    // // 方法2（使用变化矩阵）：
    // let matrix = new THREE.Matrix4() //单位矩阵
    //   .multiply(new THREE.Matrix4().set(
    //     1, 0, 0, 0, // x方向移动
    //     0, 1, 0, 300, // y方向移动
    //     0, 0, 1, 0, // z方向移动
    //     0, 0, 0, 1,
    //   ))
    //   .multiply(new THREE.Matrix4().set(
    //     2, 0, 0, 0, // x方向放大2倍
    //     0, 2, 0, 0, // y方向放大2倍
    //     0, 0, 2, 0, // z方向放大2倍
    //     0, 0, 0, 1,
    //   ))
    //   .multiply(new THREE.Matrix4().set(
    //     Math.cos(angle * Math.PI / 180), -Math.sin(angle * Math.PI / 180), 0, 0, 
    //     Math.sin(angle * Math.PI / 180), Math.cos(angle * Math.PI / 180), 0, 0,
    //     0, 0, 1, 0,
    //     0, 0, 0, 1,
    //   ));
    // mesh.applyMatrix(matrix);
    
    //mesh.matrix = scaleM;
    //mesh.matrixAutoUpdate = false;//距阵禁用自动更新
    
    //console.log(matrix);
    
    // material.castShadow = true;

		this.rotateGroup.add(this.mesh);
	}

  

	

}