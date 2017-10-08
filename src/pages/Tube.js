import * as THREE from 'three';
import Base from './Base';


class MTube extends THREE.Curve {
  constructor(scale) {
    super();
    this.scale = scale;
  }
  getPoint(t) {
    let tx = t * 3 - 1.5;
    let ty = Math.sin( 2 * Math.PI * t );
    let tz = 0;

    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
  }
}



// 管子
export default class Tube extends Base {
	constructor(container, control){
		super(container, control, {});

		this.draw();
	}

	draw() {

    let path = new MTube( 500 );
    var geometry = new THREE.TubeGeometry(
      path,  //路径
      50, //tubularSegments 分段
      80, //radius 管子半径
      5,  //radiusSegments 横截面分段
      false // 是否闭合
    );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    material.wireframe = true;
    var mesh = new THREE.Mesh( geometry, material );
		
    this.rotateGroup.add(mesh);
	}

	
}
