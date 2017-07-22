import * as THREE from 'three';
import Base from './Base';

// 三维文本
export default class Text extends Base {
	constructor(container, $control){
		super(container, $control, {});

    this.draw();
		
	}

	draw() {

    let I = this;

    let loader = new THREE.FontLoader();
    loader.load( '/src/fonts/font.json', function ( font ) {
      var geometry = new THREE.TextGeometry( 'Hello WebGL', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
      });

      let material = new THREE.MeshLambertMaterial({color: '#ff0000'});//材质
      material.wireframe = true;
      let mesh = new THREE.Mesh(geometry, material);
      I.rotateGroup.add(mesh);

    });

    


	}
}