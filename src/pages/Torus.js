import * as THREE from 'three';
import Base from './Base';
import $ from "jquery";

// 圆环
export default class Torus extends Base {
	constructor(container, $control){
		super(container, $control, {});

		this.data = {
			radius: 500,
			tube: 200, 
      radialSegments: 100,
			tubularSegments: 50,
			arc: 0,
		}
		
		this.material1 = new THREE.MeshLambertMaterial({color: '#ff0000'});//材质
    this.material1.wireframe = true;

		this.draw();

		this.addControlRange({ title: `圆环半径`, hashData: this.data, key: "radius",  max: 1000, min: 10, step:1, onChange: () => {this.draw();}});
		this.addControlRange({ title: `管子直径`, hashData: this.data, key: "tube",  max: 1000, min: 10, step:1, onChange: () => {this.draw();}});
		this.addControlRange({ title: `管子分段`, hashData: this.data, key: "radialSegments",  max: 500, min: 3, step:1, onChange: () => {this.draw();}});
		this.addControlRange({ title: `圆环分段`, hashData: this.data, key: "tubularSegments",  max: 500, min: 0, step:1, onChange: () => {this.draw();}});
		this.addControlRange({ title: `中心角`, hashData: this.data, key: "arc",  max: 360, min: 0, step:10, onChange: () => {this.draw();}});
		this.addControlCheck({ title: `仅线框`, hashData: this.material1, key: 'wireframe'});
	}

	draw() {
		if(this.mesh1) {
      this.rotateGroup.remove( this.mesh1 );
		}
		
		let geometry = new THREE.TorusGeometry (
      this.data.radius, //radius
			this.data.tube, //管子直径
			this.data.radialSegments, //radialSegments 
			this.data.tubularSegments, //tubularSegments
			this.data.arc, //中心角
		);

		this.mesh1 = new THREE.Mesh(geometry, this.material1);
		this.rotateGroup.add(this.mesh1);
	}
}