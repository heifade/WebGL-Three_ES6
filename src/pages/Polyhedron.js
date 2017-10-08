import * as THREE from 'three';
import Base from './Base';






// 多面体
export default class Polyhedron extends Base {
	constructor(container, control){
		super(container, control, {});

		this.draw();
	}

	draw() {

    
    var verticesOfCube = [
        -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
        -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
    ];

    var indicesOfFaces = [
        2,1,0,    0,3,2,
        0,4,7,    7,3,0,
        0,1,5,    5,4,0,
        1,2,6,    6,5,1,
        2,3,7,    7,6,2,
        4,5,6,    6,7,4
    ];

    var geometry = new THREE.PolyhedronGeometry(
      verticesOfCube,
      indicesOfFaces,
      6, //radius 
      0  //detail
    );


    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    material.wireframe = true;
    var mesh = new THREE.Mesh( geometry, material );

    mesh.scale.x = 50;
    mesh.scale.y = 50;
    mesh.scale.z = 50;
		
    this.rotateGroup.add(mesh);
	}

	
}
