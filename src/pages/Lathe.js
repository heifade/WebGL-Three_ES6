import * as THREE from 'three';
import Base from './Base';

// 车床
export default class Lathe extends Base {
	constructor(container, control){
		super(container, control, {});

		this.draw();
	}

	draw() {


    var points = [];
    for ( var i = 0; i < 10; i ++ ) {
      points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
    }
    var geometry = new THREE.LatheGeometry( points );

    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    material.wireframe = true;



    let mesh = new THREE.Mesh( geometry, material );

    mesh.scale.x = 50;
    mesh.scale.y = 50;
    mesh.scale.z = 50;
		
    this.rotateGroup.add(mesh);
	}

	
}
