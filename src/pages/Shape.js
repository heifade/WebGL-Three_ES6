import * as THREE from 'three';
import Base from './Base';

// 自定义图形
export default class Shape extends Base {
	constructor(container, $control){
		super(container, $control, {});

		this.draw();
	}
	
  draw() {
    let heartShape = new THREE.Shape();
    let x = 0, y = 0;
    // heartShape.moveTo( x + 5, y + 5 );
    // heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    // heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    // heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    // heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    // heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    // heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

    heartShape.moveTo(10, 10);
    heartShape.lineTo(10, 0);
    heartShape.lineTo(0, 0);
    heartShape.lineTo(0, 10);
    heartShape.lineTo(5, 15);

    let geometry = new THREE.ShapeGeometry( heartShape );

    let material = new THREE.MeshNormalMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
    material.wireframe = true;
    
    let mesh = new THREE.Mesh( geometry, material );
    mesh.scale.x = 20;
    mesh.scale.y = 20;
    this.rotateGroup.add( mesh );
  }
	
}
